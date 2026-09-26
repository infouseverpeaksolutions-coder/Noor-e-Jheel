const fs = require('fs').promises;
const path = require('path');

// basic promise-chain lock so parallel writes don't step on each other
class FileLock {
  constructor() {
    this.queue = Promise.resolve();
  }

  acquire(fn) {
    const next = this.queue.then(() => fn());
    this.queue = next.catch(() => {});
    return next;
  }
}

const fileLocks = new Map();

function getLock(filePath) {
  const normalized = path.resolve(filePath);
  if (!fileLocks.has(normalized)) {
    fileLocks.set(normalized, new FileLock());
  }
  return fileLocks.get(normalized);
}

async function readJsonFile(filePath, defaultValue = []) {
  try {
    const fullPath = path.resolve(filePath);
    let data = await fs.readFile(fullPath, 'utf8');
    // strip BOM if someone edited json in windows notepad
    if (data.charCodeAt(0) === 0xFEFF) {
      data = data.slice(1);
    }
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeJsonFile(filePath, defaultValue);
      return defaultValue;
    }
    console.error(`[fileStorage] failed reading ${filePath}:`, error.message);
    throw error;
  }
}

// write to .tmp first then rename so read operations never hit half-written json
async function writeJsonFile(filePath, data) {
  const lock = getLock(filePath);
  return lock.acquire(async () => {
    try {
      const fullPath = path.resolve(filePath);
      const dir = path.dirname(fullPath);
      await fs.mkdir(dir, { recursive: true });

      const tempPath = `${fullPath}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
      const jsonString = JSON.stringify(data, null, 2);

      await fs.writeFile(tempPath, jsonString, 'utf8');
      await fs.rename(tempPath, fullPath);
      return true;
    } catch (err) {
      // serverless environments (e.g. vercel lambda) have read-only filesystems
      console.warn(`[fileStorage] write skipped (${err.message}) for ${filePath}`);
      return false;
    }
  });
}

module.exports = {
  readJsonFile,
  writeJsonFile
};
