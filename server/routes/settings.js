const express = require('express');
const router = express.Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileStorage');
const { requireAdminAuth } = require('../middleware/auth');

const SETTINGS_FILE = path.join(__dirname, '../data/settings.json');

// don't expose admin pin in public response
router.get('/', async (req, res) => {
  try {
    const settings = await readJsonFile(SETTINGS_FILE, {});
    const { admin_pin, ...publicSettings } = settings;
    res.json(publicSettings);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch site configuration' });
  }
});

// admin endpoint includes secret keys/pin
router.get('/admin', requireAdminAuth, async (req, res) => {
  try {
    const settings = await readJsonFile(SETTINGS_FILE, {});
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Admin settings read failed' });
  }
});

router.put('/', requireAdminAuth, async (req, res) => {
  try {
    const current = await readJsonFile(SETTINGS_FILE, {});
    const updated = {
      ...current,
      ...req.body
    };

    await writeJsonFile(SETTINGS_FILE, updated);
    const { admin_pin, ...publicSettings } = updated;
    res.json(publicSettings);
  } catch (error) {
    res.status(500).json({ error: 'Could not save settings' });
  }
});

module.exports = router;
