const express = require('express');
const router = express.Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileStorage');
const { requireAdminAuth } = require('../middleware/auth');

const DESTINATIONS_FILE = path.join(__dirname, '../data/destinations.json');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

router.get('/', async (req, res) => {
  try {
    const destinations = await readJsonFile(DESTINATIONS_FILE, []);
    const { region, popular } = req.query;

    let result = [...destinations];
    if (region) {
      result = result.filter(d => (d.region || '').toLowerCase() === region.toLowerCase());
    }
    if (popular === 'true') {
      result = result.filter(d => d.is_popular === true);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch destinations' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const destinations = await readJsonFile(DESTINATIONS_FILE, []);
    const { slug } = req.params;

    const dest = destinations.find(d => d.slug === slug || d.id === slug);
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json(dest);
  } catch (error) {
    res.status(500).json({ error: 'Destination query failed' });
  }
});

router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const destinations = await readJsonFile(DESTINATIONS_FILE, []);
    const body = req.body;

    if (!body.name) {
      return res.status(400).json({ error: 'Destination name is required' });
    }

    const newSlug = body.slug ? slugify(body.slug) : slugify(body.name);
    const newId = `dest-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

    const newDestination = {
      id: newId,
      name: body.name,
      slug: newSlug,
      region: body.region || 'kashmir',
      tagline: body.tagline || '',
      description: body.description || '',
      hero_image: body.hero_image || 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      best_time_to_visit: body.best_time_to_visit || 'April to October',
      temperature_summary: body.temperature_summary || '15°C - 28°C',
      how_to_reach: body.how_to_reach || '',
      top_attractions: Array.isArray(body.top_attractions) ? body.top_attractions : (body.top_attractions ? body.top_attractions.split(',').map(s => s.trim()).filter(Boolean) : []),
      top_activities: Array.isArray(body.top_activities) ? body.top_activities : (body.top_activities ? body.top_activities.split(',').map(s => s.trim()).filter(Boolean) : []),
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      is_popular: Boolean(body.is_popular)
    };

    destinations.push(newDestination);
    await writeJsonFile(DESTINATIONS_FILE, destinations);

    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ error: 'Error saving destination: ' + error.message });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const destinations = await readJsonFile(DESTINATIONS_FILE, []);
    const { id } = req.params;
    const index = destinations.findIndex(d => d.id === id || d.slug === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const current = destinations[index];
    const body = req.body;

    const updated = {
      ...current,
      ...body,
      id: current.id,
      slug: body.slug ? slugify(body.slug) : current.slug
    };

    destinations[index] = updated;
    await writeJsonFile(DESTINATIONS_FILE, destinations);

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const destinations = await readJsonFile(DESTINATIONS_FILE, []);
    const { id } = req.params;
    const filtered = destinations.filter(d => d.id !== id && d.slug !== id);

    if (filtered.length === destinations.length) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    await writeJsonFile(DESTINATIONS_FILE, filtered);
    res.json({ message: 'Destination deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove destination' });
  }
});

module.exports = router;
