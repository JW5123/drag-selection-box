import { mountScenario } from './dragselect-core.js';
import { SCENARIOS, DEFAULT_SCENARIO_ID } from './scenarios.js';

function getScenarioId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') || DEFAULT_SCENARIO_ID;
}

function getScenarioById(id) {
  return SCENARIOS.find((scenario) => scenario.id === id) || SCENARIOS[0];
}

function renderLinks(container, activeScenarioId) {
  container.innerHTML = '';
  SCENARIOS.forEach((scenario) => {
    const link = document.createElement('a');
    link.href = `?mode=${encodeURIComponent(scenario.id)}`;
    link.textContent = scenario.label;
    if (scenario.id === activeScenarioId) {
      link.classList.add('active');
    }
    container.appendChild(link);
  });
}

function applyScenarioLayout(shell, board, scenario) {
  shell.className = `shell ${scenario.shellClass}`;
  board.className = `board ${scenario.boardClass}`;
}

function bootstrap() {
  const pageTitle = document.getElementById('pageTitle');
  const links = document.getElementById('scenarioLinks');
  const status = document.getElementById('testStatus');
  const shell = document.getElementById('testShell');
  const board = document.getElementById('testBoard');
  const dragStartRuleSelect = document.getElementById('dragStartRule');
  const edgeSpeedInput = document.getElementById('edgeSpeed');
  const edgeSpeedValue = document.getElementById('edgeSpeedValue');

  const requestedId = getScenarioId();
  const scenario = getScenarioById(requestedId);

  document.title = scenario.title;
  pageTitle.textContent = scenario.title;
  renderLinks(links, scenario.id);
  applyScenarioLayout(shell, board, scenario);

  mountScenario({
    shell,
    board,
    status,
    scenario,
    dragStartRuleSelect,
    edgeSpeedInput,
    edgeSpeedValue
  });
}

bootstrap();
