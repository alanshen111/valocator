let selectedSlot = null;
let selectedMap = null;
let currentRole = 'Attacker'; // To track the current role
let offsetX, offsetY; // Global variables for offset

const maps = [
    { name: 'Abyss', minimap_path: 'images/maps/minimaps/abyss.webp', artwork_path: 'images/maps/artworks/abyss.webp' },
    { name: 'Ascent', minimap_path: 'images/maps/minimaps/ascent.webp', artwork_path: 'images/maps/artworks/ascent.webp' },
    { name: 'Bind', minimap_path: 'images/maps/minimaps/bind.webp', artwork_path: 'images/maps/artworks/bind.webp' },
    { name: 'Breeze', minimap_path: 'images/maps/minimaps/breeze.webp', artwork_path: 'images/maps/artworks/breeze.webp' },
    { name: 'Fracture', minimap_path: 'images/maps/minimaps/fracture.webp', artwork_path: 'images/maps/artworks/fracture.webp' },
    { name: 'Haven', minimap_path: 'images/maps/minimaps/haven.webp', artwork_path: 'images/maps/artworks/haven.webp' },
    { name: 'Icebox', minimap_path: 'images/maps/minimaps/icebox.webp', artwork_path: 'images/maps/artworks/icebox.webp' },
    { name: 'Lotus', minimap_path: 'images/maps/minimaps/lotus.webp', artwork_path: 'images/maps/artworks/lotus.webp' },
    { name: 'Pearl', minimap_path: 'images/maps/minimaps/pearl.webp', artwork_path: 'images/maps/artworks/pearl.webp' },
    { name: 'Split', minimap_path: 'images/maps/minimaps/split.webp', artwork_path: 'images/maps/artworks/split.webp' },
    { name: 'Sunset', minimap_path: 'images/maps/minimaps/sunset.webp', artwork_path: 'images/maps/artworks/sunset.webp' },
];

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

document.getElementById('map').addEventListener('click', openMapSelection);

// Handle drop event on the body
document.body.addEventListener('drop', event => {
    event.preventDefault(); // Prevent default action
    const id = event.dataTransfer.getData('text/plain'); // Get the ID of the dragged element
    const draggableElement = document.getElementById(id);
    
    // Position the dragged element at the drop location
    if (draggableElement) {
        draggableElement.style.position = 'absolute'; // Ensure the position is absolute
        draggableElement.style.left = `${event.clientX - offsetX - 30}px`; // Set left position based on cursor position
        draggableElement.style.top = `${event.clientY - offsetY - 40}px`; // Set top position based on cursor position
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

// Function to open the map selection menu
function openMapSelection(event) {
    const mapSelectionDiv = document.getElementById('map-selection');
    const roleSwapDiv = document.getElementById('role-swap');

    // Initialize the role swap images
    const attackerImage = document.createElement('img');
    const defenderImage = document.createElement('img');
    
    attackerImage.src = 'images/attacker.webp';
    attackerImage.alt = 'Attacker';
    attackerImage.id = 'attacker-image';
    attackerImage.onclick = () => swapRole();
    defenderImage.src = 'images/defender.webp';
    defenderImage.alt = 'Defender';
    defenderImage.id = 'defender-image';
    defenderImage.onclick = () => swapRole();
    
    if (currentRole === 'Defender') {
        attackerImage.style.display = 'none'; // Hide attacker image
    } else {
        defenderImage.style.display = 'none'; // Hide defender image
    }
    
    roleSwapDiv.appendChild(attackerImage);
    roleSwapDiv.appendChild(defenderImage);

    // Toggle visibility based on current selection
    if (selectedMap && !mapSelectionDiv.classList.contains('hidden')) {
        closeMapSelection();
    } else {
        mapSelectionDiv.classList.remove('hidden');

        // Clear previous images
        mapSelectionDiv.innerHTML = '';

        // Append role swap images
        roleSwapDiv.id = 'role-swap';
        mapSelectionDiv.appendChild(roleSwapDiv);
        
        // Append map images to the selection menu
        maps.forEach(map => {
            const img = document.createElement('img');
            img.src = map.artwork_path;
            img.alt = map.name;
            img.onclick = () => selectMap(map.minimap_path, map.name); // Handle selection
            mapSelectionDiv.appendChild(img);
        });
        selectedMap = true; // Set selectedMap to true to indicate the menu is open
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

// Function to handle map selection
function selectMap(path, name) {
    selectedMap = name; // Store the name of the selected map
    const mapImg = document.getElementById('map');
    mapImg.src = path; // Change the map image source

    // Flip the map image upside down if the current role is Defender
    if (currentRole === 'Defender') {
        mapImg.style.transform = 'rotate(180deg)'; // Apply rotation
    } else {
        mapImg.style.transform = 'none'; // Reset transformation for other roles
    }

    closeMapSelection(); // Close the map selection menu
}
// Function to close the map selection menu
function closeMapSelection() {
    const mapSelectionDiv = document.getElementById('map-selection');
    mapSelectionDiv.classList.add('hidden');
    const roleSwapDiv = document.getElementById('role-swap');
    roleSwapDiv.innerHTML = ''; // Clear the role swap images
    selectedMap = false; // Set selectedMap to false to indicate the menu is closed
}

function swapRole() {
    const attackerImage = document.getElementById('attacker-image');
    const defenderImage = document.getElementById('defender-image');
    const mapImg = document.getElementById('map'); // Get the map image element

    // Swap roles and update visibility of images
    if (currentRole === 'Attacker') {
        currentRole = 'Defender';
        attackerImage.style.display = 'none'; // Hide attacker image
        defenderImage.style.display = 'block'; // Show defender image
    } else {
        currentRole = 'Attacker';
        defenderImage.style.display = 'none'; // Hide defender image
        attackerImage.style.display = 'block'; // Show attacker image
    }

    // Immediately flip the map image based on the current role
    if (currentRole === 'Defender') {
        mapImg.style.transform = 'rotate(180deg)'; // Flip upside down
    } else {
        mapImg.style.transform = 'none'; // Reset transformation for Attacker
    }
}
