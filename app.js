/**
 * app.js - Vanilla JavaScript Memory Match Game Logic
 *
 * Core game logic, state management, UI manipulation, and accessibility enhancements.
 * Follows ES6+ standards and modular design principles.
 */

// --- Game Configuration & Constants ---

const ICON_SVGS = {
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A10 10 0 0 1 3.5 15H1V9h2.5A10 10 0 0 1 13 4l4 4-2.5 2.5L22 17l-4 4-3.5-3.5"></path></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    anchor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 10A2.5 2.5 0 0 0 16 7.5c-1.5 0-3-.5-4.5-1.5-1.4-1-3.1-1-4.5 0-1.5 1-3 1-4.5 1.5A2.5 2.5 0 0 0 1 13a4.5 4.5 0 0 0 4.5 4.5H19a5.5 5.5 0 0 0 0-11z"></path></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
    feather: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a4 4 0 0 0-5.66-5.66L9.66 12.99l-5.65 5.66-1.06-1.06 5.65-5.66L14.58 4.25a4 4 0 0 0-5.66-5.66L2 14.07l1.06 1.06 5.66-5.65 5.65 5.65 1.06-1.06-5.65-5.66 5.66-5.65a4 4 0 0 0 5.66 5.66z"></path></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    umbrella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2A8 8 0 0 0 4 10v7h16v-7a8 8 0 0 0-8-8z"></path><line x1="12" y1="17" x2="12" y2="22"></line><path d="M12 22a2 2 0 0 1-2-2"></path><path d="M12 22a2 2 0 0 0 2-2"></path></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 12 12 12 20"></polyline><line x1="22" y1="2" x2="2" y2="22"></line><path d="M20 12v10H4V12"></path><path d="M22 7.78V12h-4.22a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2H22V7.78z"></path><path d="M2 7.78V12h4.22a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2V7.78z"></path></svg>',
};

// Card back pattern (simple diagonal stripe SVG)
const CARD_BACK_PATTERN_SVG = `
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" fill="var(--color-card-back)"/>
        <line x1="0" y1="20" x2="20" y2="0" stroke="var(--color-text-light)" stroke-width="2"/>
        <line x1="10" y1="20" x2="20" y2="10" stroke="var(--color-text-light)" stroke-width="2"/>
        <line x1="0" y1="10" x2="10" y2="0" stroke="var(--color-text-light)" stroke-width="2"/>
    </svg>
`;
const CARD_BACK_PATTERN_URL = `url('data:image/svg+xml;base64,${btoa(CARD_BACK_PATTERN_SVG)}')`;

const DIFFICULTIES = {
    easy: { pairs: 6, cols: 4, rows: 3, total: 12 },
    normal: { pairs: 8, cols: 4, rows: 4, total: 16 },
    hard: { pairs: 12, cols: 6, rows: 4, total: 24 },
};

// --- Game State ---

let gameState = {
    difficulty: 'easy',
    moves: 0,
    time: 0,
    matchedPairs: 0,
    cards: [], // Array of card objects
    flippedCards: [], // Max 2 cards
    isGameActive: false,
    isProcessing: false, // Prevents flipping more than 2 cards
    timerInterval: null,
};

// --- DOM Elements ---

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
    startModal: $('#start-modal'),
    endModal: $('#end-modal'),
    settingsModal: $('#settings-modal'),
    gameBoard: $('#game-board'),
    gameHeader: $('#game-header'),
    movesCount: $('#moves-count'),
    timeElapsed: $('#time-elapsed'),
    matchedPairs: $('#matched-pairs'),
    highScoreList: $('#high-score-list'),
    hcToggle: $('#hc-toggle'),
    motionToggle: $('#motion-toggle'),
    soundToggle: $('#sound-toggle'),
    themeSelector: $('#theme-selector'),
    newHighScoreMessage: $('#new-high-score-message'),
};

// --- Utility Functions ---

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} The shuffled array.
 */
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/**
 * Formats time from seconds into M:SS format.
 * @param {number} seconds - Time in seconds.
 * @returns {string} Formatted time string.
 */
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${paddedSeconds}`;
};

/**
 * Calculates a score based on moves and time.
 * Formula: 1000 - (moves * 10) - (time * 2)
 * Lower score is better (it's a penalty score, but displayed as a high score).
 * @param {number} moves - The number of moves.
 * @param {number} time - The time elapsed in seconds.
 * @returns {number} The calculated score.
 */
const calculateScore = (moves, time) => {
    // Score is calculated as a penalty: lower is better.
    // Base score (1000) minus penalties for moves and time.
    return 1000 - (moves * 10) - (time * 2);
};

// --- DOM Rendering & Card Management ---

/**
 * Creates the HTML element for a single card.
 * @param {object} card - The card object from the game state.
 * @returns {HTMLElement} The card scene div element.
 */
const createCardElement = (card) => {
    const cardScene = document.createElement('div');
    cardScene.className = 'card-scene';

    const cardEl = document.createElement('button');
    cardEl.className = 'card';
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('tabindex', 0); // Make card focusable
    cardEl.dataset.id = card.id;
    cardEl.dataset.value = card.value;
    cardEl.setAttribute('aria-label', `Card: ${card.value}, face down`);

    // Card Back (Pattern)
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.setProperty('--card-back-pattern', CARD_BACK_PATTERN_URL);

    // Card Face (Icon)
    const cardFace = document.createElement('div');
    cardFace.className = 'card-face';
    cardFace.innerHTML = ICON_SVGS[card.value];

    cardEl.appendChild(cardBack);
    cardEl.appendChild(cardFace);
    cardScene.appendChild(cardEl);

    cardEl.addEventListener('click', handleCardClick);

    return cardScene;
};

/**
 * Updates a card's visual state (flipped/matched).
 * @param {HTMLElement} cardEl - The card button element.
 * @param {boolean} isFlipped - True to flip, false to flip back.
 * @param {boolean} isMatched - True to mark as matched.
 */
const updateCardVisuals = (cardEl, isFlipped, isMatched) => {
    const cardValue = cardEl.dataset.value;
    const isReducedMotion = document.body.classList.contains('reduce-motion');

    if (isFlipped) {
        // Only add flipping transition if motion is enabled
        if (!isReducedMotion) {
            cardEl.classList.add('flipping');
        }
        cardEl.classList.add('flipped');
        cardEl.setAttribute('aria-label', `Card: ${cardValue}, face up`);
    } else {
        cardEl.classList.remove('flipped');
        cardEl.setAttribute('aria-label', `Card: ${cardValue}, face down`);
    }

    if (isMatched) {
        cardEl.classList.add('matched');
        cardEl.removeEventListener('click', handleCardClick);
        cardEl.setAttribute('tabindex', -1); // Remove from tab order
        cardEl.setAttribute('aria-label', `Card: ${cardValue}, matched`);
        // Remove flipping class after a short delay for animation to finish
        setTimeout(() => cardEl.classList.remove('flipping'), isReducedMotion ? 0 : 400);
    }
    
    // Ensure 'flipping' class is removed after the transition on unflip
    if (!isFlipped && !isMatched && !isReducedMotion) {
        setTimeout(() => cardEl.classList.remove('flipping'), 400);
    }
};

/**
 * Sets up the game board grid based on the current difficulty.
 */
const setupGameBoard = () => {
    const { cols, rows } = DIFFICULTIES[gameState.difficulty];
    elements.gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    elements.gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    elements.gameBoard.innerHTML = '';
    
    gameState.cards.forEach(card => {
        elements.gameBoard.appendChild(createCardElement(card));
    });
};

// --- Game Logic ---

/**
 * Initializes the card set for the selected difficulty.
 * @param {string} difficulty - The selected difficulty key.
 * @returns {Array<object>} The array of shuffled card objects.
 */
const createCardSet = (difficulty) => {
    const { pairs } = DIFFICULTIES[difficulty];
    const iconKeys = Object.keys(ICON_SVGS).slice(0, pairs);
    
    let cardValues = [];
    iconKeys.forEach(key => {
        cardValues.push(key, key); // Create pairs
    });

    const shuffledValues = shuffle(cardValues);
    
    return shuffledValues.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
        isMatched: false,
    }));
};

/**
 * Starts the game timer.
 */
const startTimer = () => {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    
    gameState.timerInterval = setInterval(() => {
        if (gameState.isGameActive) {
            gameState.time++;
            elements.timeElapsed.textContent = formatTime(gameState.time);
        }
    }, 1000);
};

/**
 * Stops the game timer.
 */
const stopTimer = () => {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
};

/**
 * Handles the logic after two cards have been flipped.
 */
const checkForMatch = () => {
    gameState.isProcessing = true;
    const [card1, card2] = gameState.flippedCards;
    
    const cardEl1 = elements.gameBoard.querySelector(`[data-id="${card1.id}"]`);
    const cardEl2 = elements.gameBoard.querySelector(`[data-id="${card2.id}"]`);

    if (card1.value === card2.value) {
        // Match found!
        setTimeout(() => {
            card1.isMatched = true;
            card2.isMatched = true;
            updateCardVisuals(cardEl1, true, true);
            updateCardVisuals(cardEl2, true, true);
            
            gameState.matchedPairs++;
            elements.matchedPairs.textContent = gameState.matchedPairs;

            playSound('match');
            gameState.flippedCards = [];
            gameState.isProcessing = false;
            
            checkGameWin();
        }, 800);
    } else {
        // Mismatch
        playSound('mismatch');
        setTimeout(() => {
            // Flip back
            updateCardVisuals(cardEl1, false, false);
            updateCardVisuals(cardEl2, false, false);

            card1.isFlipped = false;
            card2.isFlipped = false;
            
            gameState.flippedCards = [];
            gameState.isProcessing = false;
        }, 1200); // Short delay on mismatch
    }
};

/**
 * Checks if the game has been won.
 */
const checkGameWin = () => {
    const totalPairs = DIFFICULTIES[gameState.difficulty].pairs;
    if (gameState.matchedPairs === totalPairs) {
        gameState.isGameActive = false;
        stopTimer();
        playSound('win');
        
        // Calculate score and check for high score
        const finalScore = calculateScore(gameState.moves, gameState.time);
        const isNewHighScore = saveHighScore(gameState.difficulty, finalScore, gameState.moves, gameState.time);

        // Populate and show end modal
        displayEndModal(finalScore, isNewHighScore);
    }
};

// --- Event Handlers ---

/**
 * Handles card click/tap/enter events.
 */
const handleCardClick = (event) => {
    // Traverse up to find the actual card element
    let cardEl = event.target.closest('.card');
    if (!cardEl || !gameState.isGameActive || gameState.isProcessing || cardEl.classList.contains('flipped')) {
        return;
    }

    const cardId = parseInt(cardEl.dataset.id);
    const card = gameState.cards.find(c => c.id === cardId);

    if (!card || card.isMatched) return;

    // Flip the card
    card.isFlipped = true;
    updateCardVisuals(cardEl, true, false);
    gameState.flippedCards.push(card);
    playSound('flip');

    // Update moves only on the first flip of a turn
    if (gameState.flippedCards.length === 1) {
        gameState.moves++;
        elements.movesCount.textContent = gameState.moves;
    }

    // Check for match
    if (gameState.flippedCards.length === 2) {
        checkForMatch();
    }
};

/**
 * Starts a new game based on the currently selected difficulty.
 */
const startGame = () => {
    // Determine difficulty from selected radio button
    const selectedDifficultyEl = $('input[name="difficulty"]:checked');
    if (!selectedDifficultyEl) return;
    
    gameState.difficulty = selectedDifficultyEl.value;

    // Reset state
    stopTimer();
    gameState.moves = 0;
    gameState.time = 0;
    gameState.matchedPairs = 0;
    gameState.isGameActive = true;
    gameState.isProcessing = false;
    gameState.flippedCards = [];

    // Setup UI
    elements.movesCount.textContent = '0';
    elements.timeElapsed.textContent = '0:00';
    elements.matchedPairs.textContent = '0';
    elements.startModal.classList.add('hidden');
    elements.gameHeader.classList.remove('hidden');

    // Prepare cards
    gameState.cards = createCardSet(gameState.difficulty);
    setupGameBoard();
    startTimer();
};

// --- Modal & UI Display ---

/**
 * Displays the End Game Modal with stats.
 * @param {number} finalScore - The final calculated score.
 * @param {boolean} isNewHighScore - True if a new best score was achieved.
 */
const displayEndModal = (finalScore, isNewHighScore) => {
    const statsHtml = `
        <div class="stat-item">Time: <span class="stat-value">${formatTime(gameState.time)}</span></div>
        <div class="stat-item">Moves: <span class="stat-value">${gameState.moves}</span></div>
        <div class="stat-item">Pairs: <span class="stat-value">${gameState.matchedPairs} / ${DIFFICULTIES[gameState.difficulty].pairs}</span></div>
        <div class="stat-item">Score: <span class="stat-value">${finalScore}</span></div>
    `;
    $('#end-stats').innerHTML = statsHtml;
    
    if (isNewHighScore) {
        elements.newHighScoreMessage.classList.remove('hidden');
    } else {
        elements.newHighScoreMessage.classList.add('hidden');
    }
    
    elements.endModal.classList.remove('hidden');
    renderHighScores(); // Update high score panel
};

/**
 * Opens a modal and adds a listener to close it on 'Escape'.
 * @param {HTMLElement} modalEl - The modal element.
 */
const openModal = (modalEl) => {
    modalEl.classList.remove('hidden');
    // Set focus to the modal for screen reader
    modalEl.setAttribute('aria-hidden', 'false');
    const firstFocusable = modalEl.querySelector('button, input, select');
    if (firstFocusable) firstFocusable.focus();
    
    const closeModalOnEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalEl);
            document.removeEventListener('keydown', closeModalOnEscape);
        }
    };
    document.addEventListener('keydown', closeModalOnEscape);
    
    // If it's the settings modal, update the toggles
    if (modalEl === elements.settingsModal) {
        elements.hcToggle.checked = document.body.classList.contains('high-contrast');
        elements.motionToggle.checked = document.body.classList.contains('reduce-motion');
        elements.soundToggle.checked = elements.soundToggle.dataset.muted === 'false';
    }
};

/**
 * Closes a modal.
 * @param {HTMLElement} modalEl - The modal element.
 */
const closeModal = (modalEl) => {
    modalEl.classList.add('hidden');
    modalEl.setAttribute('aria-hidden', 'true');
};

// --- High Score Management (localStorage) ---

const HIGH_SCORE_KEY = 'memoryMatchHighScores';

/**
 * Loads high scores from localStorage.
 * @returns {object} The high scores object.
 */
const loadHighScores = () => {
    const scores = localStorage.getItem(HIGH_SCORE_KEY);
    return scores ? JSON.parse(scores) : { easy: [], normal: [], hard: [] };
};

/**
 * Saves a new score and checks if it's a new best.
 * @param {string} difficulty - The difficulty key.
 * @param {number} score - The calculated score.
 * @param {number} moves - The moves count.
 * @param {number} time - The time count.
 * @returns {boolean} True if the score was a new best score.
 */
const saveHighScore = (difficulty, score, moves, time) => {
    const scores = loadHighScores();
    const newScore = { score, moves, time, date: new Date().toISOString() };
    
    // Add score to the list
    scores[difficulty].push(newScore);
    
    // Sort scores: lower penalty score is better (ascending score)
    scores[difficulty].sort((a, b) => b.score - a.score); 
    
    // Keep only the top 5 scores
    scores[difficulty] = scores[difficulty].slice(0, 5);

    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));

    // Check if the new score made it to the top 5
    return scores[difficulty].some(s => s.date === newScore.date);
};

/**
 * Renders the high score list in the panel.
 */
const renderHighScores = () => {
    const scores = loadHighScores();
    let html = '';
    
    ['easy', 'normal', 'hard'].forEach(diff => {
        html += `<li><strong>${diff.toUpperCase()}</strong>: ${scores[diff][0] ? scores[diff][0].score : 'N/A'}</li>`;
    });

    elements.highScoreList.innerHTML = html || '<li>No scores yet!</li>';
};

// --- Accessibility & Settings ---

/**
 * Applies the selected theme (color palette).
 * @param {string} theme - The theme name ('default', 'pastel').
 */
const applyTheme = (theme) => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    // Re-apply high contrast if it was active
    if (elements.hcToggle.checked) {
        document.body.classList.add('high-contrast');
    }
};

/**
 * Toggles the high contrast mode.
 * @param {boolean} enable - True to enable, false to disable.
 */
const toggleHighContrast = (enable) => {
    document.body.classList.toggle('high-contrast', enable);
};

/**
 * Toggles the reduce motion setting.
 * @param {boolean} enable - True to enable, false to disable.
 */
const toggleReduceMotion = (enable) => {
    document.body.classList.toggle('reduce-motion', enable);
};

// --- Sound Management ---

/**
 * Plays a sound effect if sounds are enabled.
 * NOTE: Sound files are placeholders.
 * @param {string} effect - 'flip', 'match', 'mismatch', or 'win'.
 */
const playSound = (effect) => {
    if (elements.soundToggle.dataset.muted === 'true') {
        return;
    }

    // Lazy load and play (assuming you have audio files in /assets/audio/)
    const audioPath = {
        flip: 'assets/audio/flip.mp3',
        match: 'assets/audio/match.mp3',
        mismatch: 'assets/audio/mismatch.mp3',
        win: 'assets/audio/win.mp3',
    }[effect];

    if (audioPath) {
        const audio = new Audio(audioPath);
        audio.volume = 0.5;
        audio.play().catch(e => console.warn(`Could not play sound ${effect}:`, e));
    }
};

/**
 * Toggles the global sound setting.
 * @param {boolean} enable - True to enable sounds, false to mute.
 */
const toggleSound = (enable) => {
    elements.soundToggle.dataset.muted = enable ? 'false' : 'true';
};

// --- Initialization & Event Listeners ---

const init = () => {
    // 1. Initial State Setup
    document.body.style.setProperty('--card-back-pattern', CARD_BACK_PATTERN_URL);
    renderHighScores();
    
    // Check for OS/Browser accessibility preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        toggleReduceMotion(true);
        elements.motionToggle.checked = true;
    }
    
    // Initialize sound state
    elements.soundToggle.dataset.muted = 'false';

    // 2. Button and Modal Event Listeners
    $('#start-game-button').addEventListener('click', startGame);
    $('#replay-button').addEventListener('click', () => {
        closeModal(elements.endModal);
        startGame();
    });
    
    // Settings Button Handlers
    $('#settings-button-start').addEventListener('click', () => openModal(elements.settingsModal));
    $('#pause-button').addEventListener('click', () => {
        if (gameState.isGameActive) {
            gameState.isGameActive = false;
            stopTimer();
            // Reuse the settings modal as a pause screen
            openModal(elements.settingsModal); 
        }
    });
    $('#close-settings').addEventListener('click', () => {
        closeModal(elements.settingsModal);
        // Resume game only if we were previously in-game (check if header is visible)
        if (gameState.time > 0) { 
            gameState.isGameActive = true;
            startTimer();
        }
    });

    // 3. Settings Toggles Event Listeners
    elements.hcToggle.addEventListener('change', (e) => toggleHighContrast(e.target.checked));
    elements.motionToggle.addEventListener('change', (e) => toggleReduceMotion(e.target.checked));
    elements.soundToggle.addEventListener('change', (e) => toggleSound(e.target.checked));
    elements.themeSelector.addEventListener('change', (e) => applyTheme(e.target.value));

    // 4. Global Keyboard Controls for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'p' || e.key === 'P') {
            if (gameState.isGameActive) {
                $('#pause-button').click();
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', init);

// --- Test Hooks (Exportable Functions) ---
// For unit/test purposes, though not used in this main file.
export { shuffle, calculateScore, formatTime };