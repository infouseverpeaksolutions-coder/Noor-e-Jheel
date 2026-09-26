const router = require('express').Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileStorage');
const { requireAdminAuth } = require('../middleware/auth');

const TESTIMONIALS_FILE = path.join(__dirname, '../data/testimonials.json');

router.get('/', async (req, res) => {
  try {
    const testimonials = await readJsonFile(TESTIMONIALS_FILE, []);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch testimonials' });
  }
});

router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const testimonials = await readJsonFile(TESTIMONIALS_FILE, []);
    const body = req.body;

    if (!body.name || !body.comment) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }

    const newTestimonial = {
      id: `test-${Date.now().toString(36)}`,
      name: body.name,
      location: body.location || '',
      package: body.package || '',
      rating: Number(body.rating) || 5,
      date: body.date || 'Recent',
      comment: body.comment,
      avatar: body.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    testimonials.unshift(newTestimonial);
    await writeJsonFile(TESTIMONIALS_FILE, testimonials);

    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const testimonials = await readJsonFile(TESTIMONIALS_FILE, []);
    const { id } = req.params;
    const index = testimonials.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    testimonials[index] = {
      ...testimonials[index],
      ...req.body,
      id: testimonials[index].id
    };

    await writeJsonFile(TESTIMONIALS_FILE, testimonials);
    res.json(testimonials[index]);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const testimonials = await readJsonFile(TESTIMONIALS_FILE, []);
    const { id } = req.params;
    const filtered = testimonials.filter(t => t.id !== id);

    if (filtered.length === testimonials.length) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    await writeJsonFile(TESTIMONIALS_FILE, filtered);
    res.json({ message: 'Testimonial deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Could not remove review' });
  }
});

module.exports = router;
