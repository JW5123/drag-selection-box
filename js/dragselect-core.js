import DragSelect from '../node_modules/dragselect/dist/DragSelect.esm.js';

function createCards(board, total, prefix) {
  for (let i = 1; i <= total; i += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'item';
    button.dataset.id = `${prefix}-${i}`;
    button.innerHTML = `<span class="title">${prefix} ${String(i).padStart(3, '0')}</span>`;
    board.appendChild(button);
  }
}

export function mountScenario({
  shell,
  board,
  status,
  scenario,
  dragStartRuleSelect,
  edgeSpeedInput,
  edgeSpeedValue
}) {
  if (!shell || !board || !status) {
    throw new Error('測試頁缺少必要節點');
  }

  createCards(board, scenario.count, scenario.prefix);

  const ds = new DragSelect({
    area: shell,
    selectables: board.querySelectorAll('.item'),
    customStyles: true,
    selectedClass: 'is-selected',
    selectorClass: 'selection-box',
    draggability: false,
    immediateDrag: false,
    multiSelectMode: false,
    selectionThreshold: scenario.selectionThreshold,
    autoScrollSpeed: scenario.autoScrollSpeed,
    overflowTolerance: scenario.overflowTolerance
  });

  const refresh = () => {
    status.textContent = `目前選取: ${ds.getSelection().length}`;
  };

  let dragStartRule = 'card-or-gap';

  const syncEdgeSpeedText = () => {
    if (!edgeSpeedInput || !edgeSpeedValue) {
      return;
    }
    edgeSpeedValue.textContent = edgeSpeedInput.value;
  };

  const setEdgeSpeed = (nextValue) => {
    const parsed = Number(nextValue);
    const value = Number.isFinite(parsed) ? Math.max(1, Math.min(30, parsed)) : scenario.autoScrollSpeed;
    ds.setSettings({ autoScrollSpeed: value });

    if (edgeSpeedInput) {
      edgeSpeedInput.value = String(value);
    }
    syncEdgeSpeedText();
  };

  ['DS:select', 'DS:unselect', 'DS:end'].forEach((eventName) => {
    ds.subscribe(eventName, refresh);
  });

  if (dragStartRuleSelect) {
    dragStartRuleSelect.value = dragStartRule;
    dragStartRuleSelect.addEventListener('change', () => {
      dragStartRule = dragStartRuleSelect.value;
    });
  }

  if (edgeSpeedInput) {
    edgeSpeedInput.value = String(scenario.autoScrollSpeed);
    syncEdgeSpeedText();
    edgeSpeedInput.addEventListener('input', () => {
      setEdgeSpeed(edgeSpeedInput.value);
    });
  }

  ds.subscribe('DS:start:pre', ({ event }) => {
    if (dragStartRule !== 'gap-only') {
      return;
    }

    if (!(event instanceof Event)) {
      return;
    }

    const target = event.target instanceof Element ? event.target : null;
    const startedOnCard = Boolean(target && target.closest('.item'));

    if (startedOnCard) {
      ds.break();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    ds.clearSelection();
    refresh();
  });

  refresh();
  return ds;
}
