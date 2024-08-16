import { sha256 } from 'js-sha256';

const GRID_SIZE = 64;
const GENERATIONS = 100;
const NOISE_INJECTION_FREQUENCY = 10; // Inject noise every 10 generations

function generateKey(seed, length) {
  let key = sha256(seed);
  while (key.length < length) {
    key += sha256(key);
  }
  return key.slice(0, length);
}

function customEvolveGrid(grid, rules) {
  const newGrid = grid.map(row => [...row]);
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const neighbors = countNeighbors(grid, i, j);
      newGrid[i][j] = rules[neighbors] || (neighbors === 3) || (neighbors === 2 && grid[i][j]);
    }
  }
  return newGrid;
}

function countNeighbors(grid, x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = (x + i + GRID_SIZE) % GRID_SIZE;
      const newY = (y + j + GRID_SIZE) % GRID_SIZE;
      count += grid[newX][newY] ? 1 : 0;
    }
  }
  return count;
}

function initializeGrid(seed) {
  const hash = sha256(seed);
  const grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = parseInt(hash[(i * GRID_SIZE + j) % hash.length], 16) % 2 === 1;
    }
  }
  return grid;
}

function injectNoise(grid, key, generation) {
  const noiseHash = sha256(key + generation.toString());
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (parseInt(noiseHash[(i * GRID_SIZE + j) % noiseHash.length], 16) % 64 === 0) {
        grid[i][j] = !grid[i][j];
      }
    }
  }
  return grid;
}

function gridToString(grid) {
  return grid.flat().map(cell => cell ? '1' : '0').join('');
}

function xorEncrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function generateCustomRules(key) {
  const ruleHash = sha256(key);
  const rules = {};
  for (let i = 0; i < 9; i++) {
    rules[i] = parseInt(ruleHash.substr(i * 4, 4), 16) % 2 === 1;
  }
  return rules;
}

export function encrypt(plaintext, key, updateVisualization) {
  if (!plaintext || !key || key.length < 32) {
    throw new Error('Invalid input: Plaintext and key (min 32 characters) are required.');
  }

  try {
    let grid = initializeGrid(key);
    updateVisualization({ name: 'Initial Grid', type: 'grid', data: grid });

    const customRules = generateCustomRules(key);
    updateVisualization({ name: 'Custom Rules', type: 'text', data: JSON.stringify(customRules) });

    for (let i = 0; i < GENERATIONS; i++) {
      grid = customEvolveGrid(grid, customRules);
      if (i % NOISE_INJECTION_FREQUENCY === 0) {
        grid = injectNoise(grid, key, i);
        updateVisualization({ name: `Grid after Noise Injection (Gen ${i})`, type: 'grid', data: grid });
      }
      if (i === GENERATIONS - 1) {
        updateVisualization({ name: 'Final Grid', type: 'grid', data: grid });
      }
    }

    const gameOfLifeKey = gridToString(grid);
    updateVisualization({ name: 'Game of Life Key', type: 'binary', data: gameOfLifeKey });

    const expandedKey = generateKey(gameOfLifeKey + key, plaintext.length);
    updateVisualization({ name: 'Expanded Key', type: 'text', data: expandedKey });

    const encrypted = xorEncrypt(plaintext, expandedKey);
    const base64Encrypted = btoa(encrypted);
    updateVisualization({ name: 'Encrypted Text', type: 'text', data: base64Encrypted });

    return { encrypted: base64Encrypted, stages: [] };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

export function decrypt(ciphertext, key, updateVisualization) {
  if (!ciphertext || !key || key.length < 32) {
    throw new Error('Invalid input: Ciphertext and key (min 32 characters) are required.');
  }

  try {
    const encrypted = atob(ciphertext);
    updateVisualization({ name: 'Decoded Ciphertext', type: 'text', data: encrypted });

    let grid = initializeGrid(key);
    updateVisualization({ name: 'Initial Grid', type: 'grid', data: grid });

    const customRules = generateCustomRules(key);
    updateVisualization({ name: 'Custom Rules', type: 'text', data: JSON.stringify(customRules) });

    for (let i = 0; i < GENERATIONS; i++) {
      grid = customEvolveGrid(grid, customRules);
      if (i % NOISE_INJECTION_FREQUENCY === 0) {
        grid = injectNoise(grid, key, i);
        updateVisualization({ name: `Grid after Noise Injection (Gen ${i})`, type: 'grid', data: grid });
      }
      if (i === GENERATIONS - 1) {
        updateVisualization({ name: 'Final Grid', type: 'grid', data: grid });
      }
    }

    const gameOfLifeKey = gridToString(grid);
    updateVisualization({ name: 'Game of Life Key', type: 'binary', data: gameOfLifeKey });

    const expandedKey = generateKey(gameOfLifeKey + key, encrypted.length);
    updateVisualization({ name: 'Expanded Key', type: 'text', data: expandedKey });

    const decrypted = xorEncrypt(encrypted, expandedKey);
    updateVisualization({ name: 'Decrypted Text', type: 'text', data: decrypted });

    return { decrypted, stages: [] };
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error(`Decryption failed: ${error.message}`);
  }
}