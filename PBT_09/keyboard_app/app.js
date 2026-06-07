// Keyboard App - Keyboard Navigation & Accessibility
const images = ["📱", "💻", "📲", "⌨️", "🖱️"];
let currentImageIndex = 0;
let isPlaying = false;
let slideShowInterval = null;

const galleryDisplay = document.querySelector("#galleryDisplay");
const imageCounter = document.querySelector("#imageCounter");
const playPauseBtn = document.querySelector("#playPauseBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const imageBtns = document.querySelectorAll(".image-btn");

const commandModal = document.querySelector("#commandModal");
const commandInput = document.querySelector("#commandInput");
const commandList = document.querySelector("#commandList");
const commandPaletteBtn = document.querySelector("#commandPaletteBtn");

const galleryModal = document.querySelector("#galleryModal");
const galleryModalDisplay = document.querySelector("#galleryModalDisplay");
const modalClose = document.querySelector("#modalClose");
const modalPrevBtn = document.querySelector("#modalPrevBtn");
const modalNextBtn = document.querySelector("#modalNextBtn");

const commands = [
    { name: "Next Image", desc: "→ hoặc D", action: () => showNextImage() },
    { name: "Previous Image", desc: "← hoặc A", action: () => showPrevImage() },
    { name: "Play/Pause", desc: "Space", action: () => togglePlayPause() },
    { name: "Jump to Image 1", desc: "1", action: () => jumpToImage(0) },
    { name: "Jump to Image 2", desc: "2", action: () => jumpToImage(1) },
    { name: "Jump to Image 3", desc: "3", action: () => jumpToImage(2) },
    { name: "Jump to Image 4", desc: "4", action: () => jumpToImage(3) },
    { name: "Jump to Image 5", desc: "5", action: () => jumpToImage(4) },
    { name: "Open Gallery Modal", desc: "Enter", action: () => openGalleryModal() },
    { name: "Close Modal", desc: "Escape", action: () => closeGalleryModal() },
];

// Display image
function displayImage() {
    galleryDisplay.textContent = images[currentImageIndex];
    imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    galleryModalDisplay.textContent = images[currentImageIndex];

    imageBtns.forEach((btn, index) => {
        if (index === currentImageIndex) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    displayImage();
}

// Show previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    displayImage();
}

// Jump to image
function jumpToImage(index) {
    currentImageIndex = index;
    displayImage();
}

// Toggle play/pause
function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.textContent = "⏸ Pause";
        slideShowInterval = setInterval(() => {
            showNextImage();
        }, 2000);
    } else {
        playPauseBtn.textContent = "▶ Play";
        clearInterval(slideShowInterval);
    }
}

// Gallery Modal
function openGalleryModal() {
    galleryModal.classList.remove("hidden");
    galleryModalDisplay.textContent = images[currentImageIndex];
    modalClose.focus();
}

function closeGalleryModal() {
    galleryModal.classList.add("hidden");
    galleryDisplay.focus();
}

// Command Palette
function openCommandPalette() {
    commandModal.classList.remove("hidden");
    commandInput.focus();
    renderCommands("");
}

function closeCommandPalette() {
    commandModal.classList.add("hidden");
    commandInput.value = "";
}

function renderCommands(filter = "") {
    const filtered = filter.trim()
        ? commands.filter(cmd => cmd.name.toLowerCase().includes(filter.toLowerCase()))
        : commands;

    commandList.innerHTML = filtered.map((cmd, index) => `
        <li class="command-item" data-index="${index}">
            <strong>${cmd.name}</strong><br>
            <small>${cmd.desc}</small>
        </li>
    `).join("");

    // Select first item
    if (commandList.children.length > 0) {
        commandList.children[0].classList.add("selected");
    }
}

// Event Listeners - Gallery buttons
prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);
playPauseBtn.addEventListener("click", togglePlayPause);

imageBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => jumpToImage(index));
});

galleryDisplay.addEventListener("click", openGalleryModal);

// Gallery Modal buttons
modalClose.addEventListener("click", closeGalleryModal);
modalPrevBtn.addEventListener("click", showPrevImage);
modalNextBtn.addEventListener("click", showNextImage);

// Command Palette
commandPaletteBtn.addEventListener("click", openCommandPalette);

commandInput.addEventListener("input", (e) => {
    renderCommands(e.target.value);
});

// Keyboard events
document.addEventListener("keydown", (e) => {
    // Ctrl+K - Command Palette
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (commandModal.classList.contains("hidden")) {
            openCommandPalette();
        } else {
            closeCommandPalette();
        }
    }

    // Gallery controls (only if command palette not open)
    if (commandModal.classList.contains("hidden")) {
        // Arrow keys
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            e.preventDefault();
            showNextImage();
        }

        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            e.preventDefault();
            showPrevImage();
        }

        // Space - Play/Pause
        if (e.key === " ") {
            e.preventDefault();
            togglePlayPause();
        }

        // Number keys 1-5
        if (e.key >= "1" && e.key <= "5") {
            const index = parseInt(e.key) - 1;
            jumpToImage(index);
        }

        // Enter - Open modal
        if (e.key === "Enter") {
            openGalleryModal();
        }
    }

    // Escape - Close modal or command palette
    if (e.key === "Escape") {
        if (!commandModal.classList.contains("hidden")) {
            closeCommandPalette();
        } else if (!galleryModal.classList.contains("hidden")) {
            closeGalleryModal();
        }
    }
});

// Command selection with keyboard
commandInput.addEventListener("keydown", (e) => {
    const items = commandList.querySelectorAll(".command-item");
    const selected = commandList.querySelector(".command-item.selected");
    const selectedIndex = Array.from(items).indexOf(selected);

    if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (selectedIndex + 1) % items.length;
        updateCommandSelection(items, nextIndex);
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (selectedIndex - 1 + items.length) % items.length;
        updateCommandSelection(items, prevIndex);
    }

    if (e.key === "Enter") {
        e.preventDefault();
        if (selected) {
            const cmdIndex = parseInt(selected.dataset.index);
            const cmd = commands[cmdIndex];
            if (cmd) {
                cmd.action();
                closeCommandPalette();
            }
        }
    }
});

function updateCommandSelection(items, index) {
    items.forEach(item => item.classList.remove("selected"));
    items[index].classList.add("selected");
    items[index].scrollIntoView({ block: "nearest" });
}

// Click on command item
document.addEventListener("click", (e) => {
    const commandItem = e.target.closest(".command-item");
    if (commandItem) {
        const cmdIndex = parseInt(commandItem.dataset.index);
        const cmd = commands[cmdIndex];
        if (cmd) {
            cmd.action();
            closeCommandPalette();
        }
    }
});

// Close command modal when clicking outside
commandModal.addEventListener("click", (e) => {
    if (e.target === commandModal) {
        closeCommandPalette();
    }
});

// Close gallery modal when clicking outside
galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
        closeGalleryModal();
    }
});

// Initialize
displayImage();
