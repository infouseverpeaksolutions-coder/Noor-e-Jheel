const path = require('path');
const { readJsonFile } = require('../utils/fileStorage');

const SETTINGS_FILE = path.join(__dirname, '../data/settings.json');

async function requireAdminAuth(req, res, next) {
  // allow token in query string for quick curl testing
  const token = req.headers['x-admin-token'] || req.query.admin_token;
  if (!token) {
    return res.status(401).json({ error: 'Admin token missing' });
  }

  try {
    const settings = await readJsonFile(SETTINGS_FILE, {});
    const validPin = process.env.ADMIN_PIN || settings.admin_pin || 'noor2025';

    if (token !== validPin) {
      return res.status(403).json({ error: 'Invalid admin token' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Auth verification failed: ' + err.message });
  }
}

module.exports = { requireAdminAuth };
