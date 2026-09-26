const express = require('express');
const router = express.Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileStorage');
const { requireAdminAuth } = require('../middleware/auth');

const PACKAGES_FILE = path.join(__dirname, '../data/packages.json');

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
    const packages = await readJsonFile(PACKAGES_FILE, []);
    const { category, featured, destination, search } = req.query;

    let result = [...packages];

    if (category) {
      const catLower = category.toLowerCase();
      result = result.filter(p => (p.category || '').toLowerCase() === catLower);
    }

    if (featured === 'true') {
      result = result.filter(p => p.is_featured === true);
    }

    if (destination) {
      const destLower = destination.toLowerCase();
      result = result.filter(p => 
        (p.destinations || []).some(d => d.toLowerCase().includes(destLower))
      );
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p => 
        (p.title || '').toLowerCase().includes(term) ||
        (p.short_description || '').toLowerCase().includes(term) ||
        (p.destinations || []).some(d => d.toLowerCase().includes(term))
      );
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not load packages: ' + error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const packages = await readJsonFile(PACKAGES_FILE, []);
    const { slug } = req.params;

    const pkg = packages.find(p => p.slug === slug || p.id === slug);
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: 'Error loading package details' });
  }
});

router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const packages = await readJsonFile(PACKAGES_FILE, []);
    const body = req.body;

    if (!body.title || !body.starting_price) {
      return res.status(400).json({ error: 'Title and starting_price are required' });
    }

    const newSlug = body.slug ? slugify(body.slug) : slugify(body.title);
    const newId = `pkg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

    const newPackage = {
      id: newId,
      title: body.title,
      slug: newSlug,
      category: body.category || 'kashmir',
      duration: body.duration || '6 Days / 5 Nights',
      days: Number(body.days) || 6,
      nights: Number(body.nights) || 5,
      starting_price: Number(body.starting_price),
      original_price: body.original_price ? Number(body.original_price) : Number(body.starting_price) * 1.2,
      short_description: body.short_description || '',
      description: body.description || '',
      hero_image: body.hero_image || 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split('\n').filter(Boolean) : []),
      destinations: Array.isArray(body.destinations) ? body.destinations : (body.destinations ? body.destinations.split(',').map(s => s.trim()).filter(Boolean) : []),
      itinerary: Array.isArray(body.itinerary) ? body.itinerary : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : (body.inclusions ? body.inclusions.split('\n').filter(Boolean) : []),
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : (body.exclusions ? body.exclusions.split('\n').filter(Boolean) : []),
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      faqs: Array.isArray(body.faqs) ? body.faqs : [],
      status: body.status || 'active',
      is_featured: Boolean(body.is_featured),
      rating: Number(body.rating) || 4.9,
      reviews_count: Number(body.reviews_count) || 25
    };

    packages.push(newPackage);
    await writeJsonFile(PACKAGES_FILE, packages);

    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ error: 'Package creation failed: ' + error.message });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const packages = await readJsonFile(PACKAGES_FILE, []);
    const { id } = req.params;
    const index = packages.findIndex(p => p.id === id || p.slug === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const current = packages[index];
    const body = req.body;

    const updated = {
      ...current,
      ...body,
      id: current.id, // keep id fixed
      slug: body.slug ? slugify(body.slug) : current.slug,
      starting_price: body.starting_price !== undefined ? Number(body.starting_price) : current.starting_price,
      days: body.days !== undefined ? Number(body.days) : current.days,
      nights: body.nights !== undefined ? Number(body.nights) : current.nights,
      highlights: Array.isArray(body.highlights) ? body.highlights : current.highlights,
      destinations: Array.isArray(body.destinations) ? body.destinations : current.destinations,
      itinerary: Array.isArray(body.itinerary) ? body.itinerary : current.itinerary,
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : current.inclusions,
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : current.exclusions
    };

    packages[index] = updated;
    await writeJsonFile(PACKAGES_FILE, packages);

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Could not update package' });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const packages = await readJsonFile(PACKAGES_FILE, []);
    const { id } = req.params;
    const filtered = packages.filter(p => p.id !== id && p.slug !== id);

    if (filtered.length === packages.length) {
      return res.status(404).json({ error: 'Package not found' });
    }

    await writeJsonFile(PACKAGES_FILE, filtered);
    res.json({ message: 'Package deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
