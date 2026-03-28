export const SCENARIOS = [
  {
    id: 'vertical',
    label: '直向',
    title: 'DragSelect 直向測試',
    shellClass: 'vertical',
    boardClass: 'vertical',
    count: 220,
    prefix: 'V',
    selectionThreshold: 0,
    autoScrollSpeed: 12,
    overflowTolerance: { x: 24, y: 36 }
  },
  {
    id: 'horizontal',
    label: '橫向',
    title: 'DragSelect 橫向測試',
    shellClass: 'horizontal',
    boardClass: 'horizontal',
    count: 180,
    prefix: 'H',
    selectionThreshold: 0,
    autoScrollSpeed: 12,
    overflowTolerance: { x: 40, y: 24 }
  },
  {
    id: 'mixed',
    label: '混合',
    title: 'DragSelect 直橫混合測試',
    shellClass: 'mixed',
    boardClass: 'mixed',
    count: 320,
    prefix: 'M',
    selectionThreshold: 0,
    autoScrollSpeed: 12,
    overflowTolerance: { x: 32, y: 32 }
  }
];

export const DEFAULT_SCENARIO_ID = 'vertical';
