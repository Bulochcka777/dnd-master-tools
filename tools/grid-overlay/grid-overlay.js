/**
 * DnD Master Tools — Grid Overlay (Расчерновка карты)
 * Модуль наложения сетки (квадратной и гексагональной) на карту баттлмапа.
 */
(function() {
  'use strict';

  // Состояние приложения
  const state = {
    originalImage: null,
    imageFileName: 'map',
    gridType: 'square',      // 'square' | 'hex'
    cols: 10,
    rows: 10,
    squareCells: false,
    color: '#808080',
    thickness: 2,
    opacity: 100,
    showLabels: false,
    showDiagonals: false,
    dragMode: false,
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    dragStartX: 0,
    dragStartY: 0,
    dragInitialOffsetX: 0,
    dragInitialOffsetY: 0
  };

  // Элементы DOM
  const elements = {
    fileInput: document.getElementById('fileInput'),
    dropzone: document.getElementById('dropzone'),
    fileInfo: document.getElementById('fileInfo'),
    fileName: document.getElementById('fileName'),
    fileSize: document.getElementById('fileSize'),
    placeholder: document.getElementById('placeholder'),
    canvasWrapper: document.getElementById('canvasWrapper'),
    gridCanvas: document.getElementById('gridCanvas'),
    gridTypeRadios: document.querySelectorAll('input[name="gridType"]'),
    colsInput: document.getElementById('colsInput'),
    rowsInput: document.getElementById('rowsInput'),
    rowsLabel: document.getElementById('rowsLabel'),
    squareToggle: document.getElementById('squareToggle'),
    squareToggleLabel: document.getElementById('squareToggleLabel'),
    colorPicker: document.getElementById('colorPicker'),
    thicknessInput: document.getElementById('thicknessInput'),
    thicknessValue: document.getElementById('thicknessValue'),
    opacityInput: document.getElementById('opacityInput'),
    opacityValue: document.getElementById('opacityValue'),
    labelsToggle: document.getElementById('labelsToggle'),
    diagonalToggle: document.getElementById('diagonalToggle'),
    diagonalToggleLabel: document.getElementById('diagonalToggleLabel'),
    dragToggle: document.getElementById('dragToggle'),
    resetPosition: document.getElementById('resetPosition'),
    formatSelect: document.getElementById('formatSelect'),
    downloadBtn: document.getElementById('downloadBtn'),
    resetBtn: document.getElementById('resetBtn')
  };

  let drawRAF = null;
  let displayScale = 1; // Отношение ширины отображения к оригинальной ширине изображения

  // Инициализация
  function init() {
    setupEventListeners();
  }

  function setupEventListeners() {
    // Загрузка через input
    elements.fileInput.addEventListener('change', handleFileInput);

    // Drag and drop для зоны загрузки
    elements.dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      elements.dropzone.classList.add('go-dropzone--active');
    });

    elements.dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      elements.dropzone.classList.remove('go-dropzone--active');
    });

    elements.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      elements.dropzone.classList.remove('go-dropzone--active');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    // Переключение типа сетки
    elements.gridTypeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.gridType = e.target.value;
        updateUIForGridType();
        requestRedraw();
      });
    });

    // Настройки столбцов и строк
    elements.colsInput.addEventListener('input', (e) => {
      state.cols = Math.max(1, parseInt(e.target.value, 10) || 1);
      requestRedraw();
    });

    elements.rowsInput.addEventListener('input', (e) => {
      state.rows = Math.max(1, parseInt(e.target.value, 10) || 1);
      requestRedraw();
    });

    // Квадратные ячейки 1:1
    elements.squareToggle.addEventListener('change', (e) => {
      state.squareCells = e.target.checked;
      elements.rowsInput.disabled = state.squareCells;
      elements.rowsLabel.style.opacity = state.squareCells ? '0.4' : '1';
      requestRedraw();
    });

    // Цвет
    elements.colorPicker.addEventListener('input', (e) => {
      state.color = e.target.value;
      requestRedraw();
    });

    // Толщина
    elements.thicknessInput.addEventListener('input', (e) => {
      state.thickness = parseInt(e.target.value, 10) || 1;
      elements.thicknessValue.textContent = state.thickness;
      requestRedraw();
    });

    // Прозрачность
    elements.opacityInput.addEventListener('input', (e) => {
      state.opacity = parseInt(e.target.value, 10) || 100;
      elements.opacityValue.textContent = state.opacity;
      requestRedraw();
    });

    // Метки ячеек
    elements.labelsToggle.addEventListener('change', (e) => {
      state.showLabels = e.target.checked;
      requestRedraw();
    });

    // Диагонали
    elements.diagonalToggle.addEventListener('change', (e) => {
      state.showDiagonals = e.target.checked;
      requestRedraw();
    });

    // Режим перетаскивания сетки
    elements.dragToggle.addEventListener('click', () => {
      state.dragMode = !state.dragMode;
      if (state.dragMode) {
        elements.dragToggle.classList.add('go-btn-drag--active');
        elements.dragToggle.textContent = '✓ Режим перетаскивания активен';
        elements.resetPosition.hidden = false;
        elements.gridCanvas.style.cursor = 'grab';
      } else {
        elements.dragToggle.classList.remove('go-btn-drag--active');
        elements.dragToggle.textContent = 'Перетащить сетку';
        elements.gridCanvas.style.cursor = 'default';
        state.isDragging = false;
      }
    });

    // Сброс смещения сетки
    elements.resetPosition.addEventListener('click', () => {
      state.offsetX = 0;
      state.offsetY = 0;
      requestRedraw();
    });

    // Drag-события на холсте (мышь)
    elements.gridCanvas.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    // Touch-события для мобильных
    elements.gridCanvas.addEventListener('touchstart', (e) => {
      if (!state.dragMode || e.touches.length === 0) return;
      e.preventDefault();
      onDragStart({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      });
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!state.isDragging || e.touches.length === 0) return;
      onDragMove({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      });
    });

    window.addEventListener('touchend', onDragEnd);

    // Скачивание
    elements.downloadBtn.addEventListener('click', exportImage);

    // Сброс всего
    elements.resetBtn.addEventListener('click', resetAll);

    // Ресайз окна
    window.addEventListener('resize', () => {
      if (state.originalImage) {
        setupCanvas();
        requestRedraw();
      }
    });
  }

  // Обновление UI для гексов/квадратов
  function updateUIForGridType() {
    const isHex = state.gridType === 'hex';
    elements.diagonalToggleLabel.style.display = isHex ? 'none' : 'inline-flex';
    elements.squareToggleLabel.style.display = isHex ? 'none' : 'inline-flex';

    if (isHex) {
      elements.rowsInput.disabled = true;
      elements.rowsLabel.style.opacity = '0.4';
    } else {
      elements.rowsInput.disabled = state.squareCells;
      elements.rowsLabel.style.opacity = state.squareCells ? '0.4' : '1';
    }
  }

  // Загрузка файла
  function handleFileInput(e) {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения (PNG, JPG, WEBP и др.)');
      return;
    }

    state.imageFileName = file.name.replace(/\.[^/.]+$/, '');

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        state.originalImage = img;
        state.offsetX = 0;
        state.offsetY = 0;

        elements.fileName.textContent = file.name;
        elements.fileSize.textContent = `${img.naturalWidth}×${img.naturalHeight} (${formatBytes(file.size)})`;
        elements.fileInfo.hidden = false;
        elements.placeholder.hidden = true;
        elements.placeholder.style.display = 'none';
        elements.canvasWrapper.hidden = false;
        elements.canvasWrapper.style.display = 'block';
        elements.downloadBtn.disabled = false;

        setupCanvas();
        requestRedraw();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Расчет размеров canvas под контейнер
  function setupCanvas() {
    if (!state.originalImage) return;

    const img = state.originalImage;
    const container = elements.canvasWrapper.parentElement;
    const maxW = Math.max(300, container.clientWidth - 40);
    const maxH = Math.max(300, window.innerHeight - 150);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    let targetW = imgW;
    let targetH = imgH;

    const scale = Math.min(maxW / imgW, maxH / imgH, 1);
    targetW = Math.round(imgW * scale);
    targetH = Math.round(imgH * scale);

    elements.gridCanvas.width = targetW;
    elements.gridCanvas.height = targetH;

    displayScale = targetW / imgW;
  }

  // Запрос перерисовки через requestAnimationFrame
  function requestRedraw() {
    if (drawRAF) cancelAnimationFrame(drawRAF);
    drawRAF = requestAnimationFrame(redraw);
  }

  // Главная отрисовка
  function redraw() {
    if (!state.originalImage) return;

    const canvas = elements.gridCanvas;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(state.originalImage, 0, 0, w, h);

    if (state.gridType === 'square') {
      drawSquareGrid(ctx, w, h, displayScale);
    } else {
      drawHexGrid(ctx, w, h, displayScale);
    }
  }

  // Отрисовка квадратной сетки
  function drawSquareGrid(ctx, canvasW, canvasH, scale) {
    const cols = state.cols;
    let rows = state.rows;
    const cellW = canvasW / cols;
    let cellH;

    if (state.squareCells) {
      cellH = cellW;
      rows = Math.ceil(canvasH / cellH);
      if (elements.rowsInput.value != rows && scale === displayScale) {
        elements.rowsInput.value = rows;
      }
    } else {
      cellH = canvasH / rows;
    }

    const strokeColor = hexToRgba(state.color, state.opacity / 100);
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(1, state.thickness * scale);

    // Смещение сетки (с циклическим сдвигом для бесконечного ощущения)
    const offX = (state.offsetX * scale) % cellW;
    const offY = (state.offsetY * scale) % cellH;

    ctx.beginPath();

    // Вертикальные линии
    const startCol = Math.floor(-offX / cellW) - 1;
    const endCol = Math.ceil((canvasW - offX) / cellW) + 1;
    for (let i = startCol; i <= endCol; i++) {
      const x = Math.round(i * cellW + offX);
      if (x >= 0 && x <= canvasW) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasH);
      }
    }

    // Горизонтальные линии
    const startRow = Math.floor(-offY / cellH) - 1;
    const endRow = Math.ceil((canvasH - offY) / cellH) + 1;
    for (let j = startRow; j <= endRow; j++) {
      const y = Math.round(j * cellH + offY);
      if (y >= 0 && y <= canvasH) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasW, y);
      }
    }

    // Диагональные линии
    if (state.showDiagonals) {
      for (let i = startCol; i <= endCol; i++) {
        for (let j = startRow; j <= endRow; j++) {
          const x1 = i * cellW + offX;
          const y1 = j * cellH + offY;
          const x2 = x1 + cellW;
          const y2 = y1 + cellH;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.moveTo(x2, y1);
          ctx.lineTo(x1, y2);
        }
      }
    }

    ctx.stroke();

    // Метки ячеек (A, B, C... и 1, 2, 3...)
    if (state.showLabels) {
      const fontSize = Math.max(9, Math.min(cellW, cellH) * 0.28);
      ctx.font = `bold ${Math.round(fontSize)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = strokeColor;

      // Столбцы (буквы сверху)
      for (let i = 0; i < cols; i++) {
        const x = i * cellW + offX + cellW / 2;
        if (x > 0 && x < canvasW) {
          const label = getColumnLabel(i);
          drawTextWithOutline(ctx, label, x, Math.max(fontSize, offY + fontSize / 2 + 4));
        }
      }

      // Строки (цифры слева)
      for (let j = 0; j < rows; j++) {
        const y = j * cellH + offY + cellH / 2;
        if (y > 0 && y < canvasH) {
          const label = String(j + 1);
          drawTextWithOutline(ctx, label, Math.max(fontSize, offX + fontSize / 2 + 4), y);
        }
      }
    }

    ctx.restore();
  }

  // Отрисовка гексагональной сетки (pointy-topped)
  function drawHexGrid(ctx, canvasW, canvasH, scale) {
    const cols = state.cols;
    const hexW = canvasW / (cols + 0.5);
    const hexSize = hexW / Math.sqrt(3);
    const hexH = 2 * hexSize;
    const rowHeight = 1.5 * hexSize;
    const rows = Math.ceil(canvasH / rowHeight) + 1;

    if (elements.rowsInput.value != rows && scale === displayScale) {
      elements.rowsInput.value = rows;
    }

    const strokeColor = hexToRgba(state.color, state.opacity / 100);
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(1, state.thickness * scale);

    const offX = state.offsetX * scale;
    const offY = state.offsetY * scale;

    ctx.beginPath();

    for (let r = -1; r <= rows + 1; r++) {
      for (let c = -1; c <= cols + 1; c++) {
        const cx = c * hexW + (r % 2 !== 0 ? hexW / 2 : 0) + hexW / 2 + offX;
        const cy = r * rowHeight + hexSize + offY;

        if (cx > -hexW && cx < canvasW + hexW && cy > -hexH && cy < canvasH + hexH) {
          drawHexagon(ctx, cx, cy, hexSize);
        }
      }
    }

    ctx.stroke();

    // Метки в центре каждого гекса
    if (state.showLabels) {
      const fontSize = Math.max(8, hexSize * 0.35);
      ctx.font = `bold ${Math.round(fontSize)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = strokeColor;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * hexW + (r % 2 !== 0 ? hexW / 2 : 0) + hexW / 2 + offX;
          const cy = r * rowHeight + hexSize + offY;

          if (cx > 0 && cx < canvasW && cy > 0 && cy < canvasH) {
            const label = `${getColumnLabel(c)}${r + 1}`;
            drawTextWithOutline(ctx, label, cx, cy);
          }
        }
      }
    }

    ctx.restore();
  }

  // Путь для остроконечного гексагона
  function drawHexagon(ctx, cx, cy, radius) {
    for (let i = 0; i < 6; i++) {
      const angle = (60 * i - 30) * (Math.PI / 180);
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
  }

  // Отрисовка текста с тонким контуром для читаемости на любом фоне
  function drawTextWithOutline(ctx, text, x, y) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  // Перетаскивание сетки
  function onDragStart(e) {
    if (!state.dragMode) return;
    state.isDragging = true;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
    state.dragInitialOffsetX = state.offsetX;
    state.dragInitialOffsetY = state.offsetY;
    elements.gridCanvas.style.cursor = 'grabbing';
  }

  function onDragMove(e) {
    if (!state.isDragging || !state.dragMode) return;
    const dx = (e.clientX - state.dragStartX) / displayScale;
    const dy = (e.clientY - state.dragStartY) / displayScale;
    state.offsetX = state.dragInitialOffsetX + dx;
    state.offsetY = state.dragInitialOffsetY + dy;
    requestRedraw();
  }

  function onDragEnd() {
    if (!state.isDragging) return;
    state.isDragging = false;
    if (state.dragMode) {
      elements.gridCanvas.style.cursor = 'grab';
    }
  }

  // Экспорт готового изображения в исходном разрешении
  function exportImage() {
    if (!state.originalImage) return;

    const img = state.originalImage;
    const format = elements.formatSelect.value; // 'png' | 'jpg' | 'webp'
    const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;

    // Offscreen Canvas в оригинальном разрешении
    const offCanvas = document.createElement('canvas');
    offCanvas.width = img.naturalWidth;
    offCanvas.height = img.naturalHeight;
    const offCtx = offCanvas.getContext('2d');

    // 1. Исходное фото
    offCtx.drawImage(img, 0, 0);

    // 2. Сетка с масштабом 1 (исходный размер)
    if (state.gridType === 'square') {
      drawSquareGrid(offCtx, img.naturalWidth, img.naturalHeight, 1);
    } else {
      drawHexGrid(offCtx, img.naturalWidth, img.naturalHeight, 1);
    }

    // 3. Формирование ссылки на скачивание
    const quality = (format === 'jpg' || format === 'webp') ? 0.92 : 1.0;
    const dataUrl = offCanvas.toDataURL(mimeType, quality);

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${state.imageFileName}_grid.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Сброс всех настроек
  function resetAll() {
    state.originalImage = null;
    state.imageFileName = 'map';
    state.cols = 10;
    state.rows = 10;
    state.squareCells = false;
    state.color = '#808080';
    state.thickness = 2;
    state.opacity = 100;
    state.showLabels = false;
    state.showDiagonals = false;
    state.dragMode = false;
    state.isDragging = false;
    state.offsetX = 0;
    state.offsetY = 0;

    elements.fileInput.value = '';
    elements.fileInfo.hidden = true;
    elements.placeholder.hidden = false;
    elements.placeholder.style.display = '';
    elements.canvasWrapper.hidden = true;
    elements.canvasWrapper.style.display = 'none';
    elements.downloadBtn.disabled = true;

    elements.colsInput.value = '10';
    elements.rowsInput.value = '10';
    elements.rowsInput.disabled = false;
    elements.rowsLabel.style.opacity = '1';
    elements.squareToggle.checked = false;
    elements.colorPicker.value = '#808080';
    elements.thicknessInput.value = '2';
    elements.thicknessValue.textContent = '2';
    elements.opacityInput.value = '100';
    elements.opacityValue.textContent = '100';
    elements.labelsToggle.checked = false;
    elements.diagonalToggle.checked = false;

    elements.dragToggle.classList.remove('go-btn-drag--active');
    elements.dragToggle.textContent = 'Перетащить сетку';
    elements.resetPosition.hidden = true;
    elements.gridCanvas.style.cursor = 'default';

    if (drawRAF) cancelAnimationFrame(drawRAF);
  }

  // Вспомогательные утилиты
  function getColumnLabel(index) {
    if (index < 0) return '';
    let label = '';
    let n = index + 1;
    while (n > 0) {
      const r = (n - 1) % 26;
      label = String.fromCharCode(65 + r) + label;
      n = Math.floor((n - 1) / 26);
    }
    return label;
  }

  function hexToRgba(hex, alpha) {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  document.addEventListener('DOMContentLoaded', init);
})();
