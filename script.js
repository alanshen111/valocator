let selectedSlot = null;

const agents = [
    { name: 'Astra', path: 'images/agents/controllers/astra.webp' },
    { name: 'Brimstone', path: 'images/agents/controllers/brimstone.webp' },
    { name: 'Harbor', path: 'images/agents/controllers/harbor.webp' },
    { name: 'Omen', path: 'images/agents/controllers/omen.webp' },
    { name: 'Viper', path: 'images/agents/controllers/viper.webp' },
    { name: 'Clove', path: 'images/agents/duelists/clove.webp' },
    { name: 'Iso', path: 'images/agents/duelists/iso.webp' },
    { name: 'Jett', path: 'images/agents/duelists/jett.webp' },
    { name: 'Neon', path: 'images/agents/duelists/neon.webp' },
    { name: 'Phoenix', path: 'images/agents/duelists/phoenix.webp' },
    { name: 'Raze', path: 'images/agents/duelists/raze.webp' },
    { name: 'Reyna', path: 'images/agents/duelists/reyna.webp' },
    { name: 'Yoru', path: 'images/agents/duelists/yoru.webp' }
];

// Call the function when the page loads or when you want to show the menu
window.onload = init();

function init() {
    const agentSelectionDiv = document.getElementById('agent-selection');

    agents.forEach(agent => {
        const img = document.createElement('img');
        img.src = agent.path;
        img.alt = agent.name;
        img.className = 'agent';
        img.onclick = () => selectAgent(agent.path, agent.name);
        agentSelectionDiv.appendChild(img);
    });
}

// Opens the agent selection menu
function openAgentSelection(slotIndex) {
    selectedSlot = slotIndex;

    document.getElementById('agent-selection').classList.remove('hidden');
}

// Handles agent selection and fills the slot with the selected agent
function selectAgent(path, name) {
    const slot = document.getElementById(`slot-${selectedSlot}`);
    slot.innerHTML = `<img src="${path}" alt="${name}" class="agent">`;
    closeAgentSelection();
}

// Closes the agent selection menu
function closeAgentSelection() {
    document.getElementById('agent-selection').classList.add('hidden');
}
