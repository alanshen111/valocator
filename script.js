let selectedSlot = null;
let offsetX, offsetY; // Global variables for offset

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
    { name: 'Yoru', path: 'images/agents/duelists/yoru.webp' },
    { name: 'Breach', path: 'images/agents/initiators/breach.webp' },
    { name: 'Fade', path: 'images/agents/initiators/fade.webp' },
    { name: 'Gekko', path: 'images/agents/initiators/gekko.webp' },
    { name: 'Kayo', path: 'images/agents/initiators/kayo.webp' },
    { name: 'Skye', path: 'images/agents/initiators/skye.webp' },
    { name: 'Sova', path: 'images/agents/initiators/sova.webp' },
    { name: 'Chamber', path: 'images/agents/sentinels/chamber.webp' },
    { name: 'Cypher', path: 'images/agents/sentinels/cypher.webp' },
    { name: 'Deadlock', path: 'images/agents/sentinels/deadlock.webp' },
    { name: 'Killjoy', path: 'images/agents/sentinels/killjoy.webp' },
    { name: 'Sage', path: 'images/agents/sentinels/sage.webp' },
    { name: 'Vyse', path: 'images/agents/sentinels/vyse.webp' },
];

// Allow drop on the body
document.body.addEventListener('dragover', event => {
    event.preventDefault(); // Prevent default to allow drop
});

// Handle drop event on the body
document.body.addEventListener('drop', event => {
    event.preventDefault(); // Prevent default action
    const id = event.dataTransfer.getData('text/plain'); // Get the ID of the dragged element
    const draggableElement = document.getElementById(id);
    
    // Position the dragged element at the drop location
    if (draggableElement) {
        draggableElement.style.position = 'absolute'; // Ensure the position is absolute
        draggableElement.style.left = `${event.clientX - offsetX - 50}px`; // Set left position based on cursor position
        draggableElement.style.top = `${event.clientY - offsetY - 60}px`; // Set top position based on cursor position
    }
});

// Call the function when the page loads or when you want to show the menu
window.onload = () => {
    const agentSelectionDiv = document.getElementById('agent-selection');

    agents.forEach(agent => {
        const img = document.createElement('img');
        img.src = agent.path;
        img.alt = agent.name;
        img.className = 'agent';
        img.onclick = () => selectAgent(agent.path, agent.name);
        agentSelectionDiv.appendChild(img);
    });

    // Add event listeners to the agent slots for drag functionality
    const agentSlots = document.querySelectorAll('.agent-slot');
    agentSlots.forEach(slot => {
        slot.addEventListener('dragstart', dragStart);
        slot.addEventListener('dragend', dragEnd);
        slot.setAttribute('draggable', 'true'); // Ensure each slot is draggable
    });
}

// Opens the agent selection menu
function openAgentSelection(slotIndex) {
    const agentSelectionDiv = document.getElementById('agent-selection');

    // Check if the same slot is clicked again
    if (selectedSlot === slotIndex && !agentSelectionDiv.classList.contains('hidden')) {
        closeAgentSelection();
    } else {
        selectedSlot = slotIndex;
        agentSelectionDiv.classList.remove('hidden');
    }
}

// Handles agent selection and fills the slot with the selected agent
function selectAgent(path, name) {
    const slot = document.getElementById(`slot-${selectedSlot}`);
    slot.style.backgroundImage = `url(${path})`; // Set background image
    slot.style.backgroundColor = `#ba3a46`
    closeAgentSelection();
}
// Closes the agent selection menu
function closeAgentSelection() {
    document.getElementById('agent-selection').classList.add('hidden');
}

// Handle drag start event
function dragStart(event) {
    // Store the offset
    const draggableElement = event.target;
    offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
    
    event.dataTransfer.setData('text/plain', draggableElement.id); // Store the ID of the dragged element
}

// Function to handle drag end
function dragEnd(event) {
    console.log('Drag ended for:', event.target.id);
    event.target.style.opacity = ''; // Reset opacity when drag ends
}
