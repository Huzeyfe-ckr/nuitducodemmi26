/**
 * assets.js - Asset Management System
 * Handles loading and managing themed assets (backgrounds, obstacles, objects, sky)
 */

// Current theme being used
let currentTheme = 1;
let totalThemes = 3; // Three themes available

// Asset containers
let themeAssets = {};

// Theme switching variables
let lastThemeSwitchTime = 0;
let themeSwitchInterval = 10000; // 10 seconds for theme 1
let theme2Duration = 10000; // 10 seconds for theme 2
let theme3Duration = 10000; // 10 seconds for theme 3

// Background scrolling variables
let backgroundScrollY = 0;
let backgroundScrollSpeed = 2;

// Background music variables
let backgroundMusic = null;
let isMusicPlaying = false;

/**
 * Preloads all assets for available themes
 * Should be called in preload()
 */
function preloadAssets() {
  // Load both themes
  loadTheme(1);
  loadTheme(2);
  loadTheme(3);
  lastThemeSwitchTime = millis();
  
  // Load background music
  backgroundMusic = loadSound('assets/son/Gerudo Valley - The Legend of Zelda Ocarina of Time.mp3');
}

/**
 * Loads all assets for a specific theme
 * @param {number} themeNumber - The theme number to load
 */
function loadTheme(themeNumber) {
  const themePath = `assets/${themeNumber}/`;
  
  // Define asset names per theme
  let skyFile;
  let bgFile;
  
  if (themeNumber === 1) {
    skyFile = 'sky.jpg';
    bgFile = 'bg.jpg';
  } else if (themeNumber === 2) {
    skyFile = 'sky1.png';
    bgFile = 'bg1.png';
  } else if (themeNumber === 3) {
    skyFile = 'sky3.png';
    bgFile = null; // Theme 3 has no background image
  }
  
  themeAssets[themeNumber] = {
    sky: loadImage(`${themePath}${skyFile}`),
    background: bgFile ? loadImage(`${themePath}${bgFile}`) : null,
    obstacles: [],
    objects: []
  };
  
  // Load obstacles based on theme
  if (themeNumber === 1) {
    // Theme 1 has obstacles 1 and 2
    for (let i = 1; i <= 2; i++) {
      let img = loadImage(`${themePath}obstacle_${i}.png`);
      themeAssets[themeNumber].obstacles.push(img);
    }
    // Load object
    let objImg = loadImage(`${themePath}object_1.png`);
    themeAssets[themeNumber].objects.push(objImg);
  } else if (themeNumber === 2) {
    // Theme 2 has obstacle 3
    let img = loadImage(`${themePath}obstacle_3.png`);
    themeAssets[themeNumber].obstacles.push(img);
    // Reuse obstacle 3 again to have at least 2 options
    themeAssets[themeNumber].obstacles.push(img);
    // Load object
    let objImg = loadImage(`${themePath}object_1.png`);
    themeAssets[themeNumber].objects.push(objImg);
  } else if (themeNumber === 3) {
    // Theme 3 has obstacle_5 (which is now named object_1.png)
    let img = loadImage(`${themePath}object_1.png`);
    themeAssets[themeNumber].obstacles.push(img);
    // Reuse again to have at least 2 options
    themeAssets[themeNumber].obstacles.push(img);
    // Load object (which is now named obstacle_5.png)
    let objImg = loadImage(`${themePath}obstacle_5.png`);
    themeAssets[themeNumber].objects.push(objImg);
  }
}

/**
 * Switches to a new theme WITHOUT resetting the timer
 * This version is called by pose validation logic
 */
function switchThemeForPose() {
  // Just cycle through themes, don't reset the timer
  currentTheme = (currentTheme % totalThemes) + 1;
  
  // Preload new theme if not already loaded
  if (!themeAssets[currentTheme]) {
    loadTheme(currentTheme);
  }
  
  // Reset background scroll position for new theme
  backgroundScrollY = 0;
}

/**
 * Switches to a new random theme
 * Called by the automatic theme switching system
 */
function switchToNewTheme() {
  // Cycle through themes
  currentTheme = (currentTheme % totalThemes) + 1;
  
  // Preload new theme if not already loaded
  if (!themeAssets[currentTheme]) {
    loadTheme(currentTheme);
  }
  
  // Reset background scroll position for new theme
  backgroundScrollY = 0;
  lastThemeSwitchTime = millis();
}

/**
 * Updates theme switching based on elapsed time
 * Should be called in the draw() loop
 */
function updateThemeSwitching() {
  let currentTime = millis();
  let elapsedTime = currentTime - lastThemeSwitchTime;
  
  // Determine duration for current theme
  let requiredDuration;
  if (currentTheme === 1) {
    requiredDuration = themeSwitchInterval;
  } else if (currentTheme === 2) {
    requiredDuration = theme2Duration;
  } else if (currentTheme === 3) {
    requiredDuration = theme3Duration;
  }
  
  if (elapsedTime >= requiredDuration) {
    switchToNewTheme();
  }
}

/**
 * Gets the current theme's assets
 * @returns {Object} Current theme's assets
 */
function getCurrentThemeAssets() {
  return themeAssets[currentTheme] || null;
}

/**
 * Gets a random obstacle image from current theme
 * @returns {p5.Image} Random obstacle image
 */
function getRandomObstacle() {
  const assets = getCurrentThemeAssets();
  if (assets && assets.obstacles && assets.obstacles.length > 0) {
    let idx = floor(random(assets.obstacles.length));
    return assets.obstacles[idx];
  }
  return null;
}

/**
 * Gets a random object/decor image from current theme
 * @returns {p5.Image} Random object image
 */
function getRandomObject() {
  const assets = getCurrentThemeAssets();
  if (assets && assets.objects && assets.objects.length > 0) {
    let idx = floor(random(assets.objects.length));
    return assets.objects[idx];
  }
  return null;
}

/**
 * Draws the sky background at the top
 * Takes full width and top 1/3 of screen height
 */
function drawSky() {
  const assets = getCurrentThemeAssets();
  if (assets && assets.sky) {
    // Draw sky at the top portion of the screen (top 1/3)
    let skyHeight = height / 3;
    push();
    imageMode(CORNER);
    image(assets.sky, 0, 0, width, skyHeight);
    pop();
  }
}

/**
 * Updates the scrolling background position
 */
function updateBackgroundScroll() {
  if (!isPaused && !gameOver) {
    backgroundScrollY += backgroundScrollSpeed;
    
    // Get background image height
    const assets = getCurrentThemeAssets();
    if (assets && assets.background) {
      // Reset when we've scrolled a full screen height
      if (backgroundScrollY >= height) {
        backgroundScrollY = 0;
      }
    }
  }
}

/**
 * Draws the scrolling background (ground/terrain)
 * Starts from bottom and scrolls up to simulate movement
 * Takes full width and only bottom 2/3 of screen height
 */
function drawScrollingBackground() {
  const assets = getCurrentThemeAssets();
  if (!assets || !assets.background) {
    return;
  }
  
  let bg = assets.background;
  let trackTop = height / 3; // Start drawing from horizon line
  let trackHeight = height - trackTop; // Bottom 2/3 of screen
  
  // Calculate scale to fit the full width
  let bgAspect = bg.width / bg.height;
  let scaledWidth = width; // Full width
  let scaledHeight = scaledWidth / bgAspect;
  
  // Position at left edge (full width)
  let xPos = 0;
  
  push();
  // Simple approach: tile the background vertically for seamless scrolling
  let imgHeight = scaledHeight;
  let y1 = trackTop + (backgroundScrollY % imgHeight) - imgHeight;
  
  // Draw multiple instances to cover the entire bottom 2/3
  image(bg, xPos, y1, scaledWidth, imgHeight);
  image(bg, xPos, y1 + imgHeight, scaledWidth, imgHeight);
  
  // If needed, draw a third instance
  if (y1 + imgHeight * 2 < height) {
    image(bg, xPos, y1 + imgHeight * 2, scaledWidth, imgHeight);
  }
  
  pop();
}

/**
 * Starts the background music loop
 */
function startBackgroundMusic() {
  if (backgroundMusic) {
    // Wait for the sound to be loaded before playing
    if (backgroundMusic.isLoaded && backgroundMusic.isLoaded()) {
      backgroundMusic.play();
      backgroundMusic.setLoop(true);
    } else {
      // If not loaded yet, retry after a short delay
      setTimeout(startBackgroundMusic, 500);
    }
  }
}

/**
 * Stops the background music
 */
function stopBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.stop();
  }
}
