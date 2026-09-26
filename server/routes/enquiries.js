const express = require('express');
const router = express.Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileStorage');
const { requireAdminAuth } = require('../middleware/auth');

const ENQUIRIES_FILE = path.join(__dirname, '../data/enquiries.json');

router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const enquiries = await readJsonFile(ENQUIRIES_FILE, []);
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load enquiries' });
  }
});

router.post('/', async (req, res) => {
  try {
    const enquiries = await readJsonFile(ENQUIRIES_FILE, []);
    const body = req.body;

    const newEnquiry = {
      id: `enq-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
      created_at: new Date().toISOString(),
      name: body.name || 'Anonymous Guest',
      phone: body.phone || 'N/A',
      email: body.email || '',
      package_title: body.package_title || body.destination || 'Custom Itinerary',
      destinations: body.destinations || [],
      travel_date: body.travel_date || '',
      travellers: body.travellers || (body.adults ? `${body.adults} Adults, ${body.children || 0} Children` : 'N/A'),
      duration: body.duration || '',
      hotel_category: body.hotel_category || '',
      cab_type: body.cab_type || '',
      budget: body.budget || '',
      notes: body.notes || '',
      source: body.source || 'Website Form',
      status: 'New'
    };

    enquiries.unshift(newEnquiry);
    // cap at 500 records so the json file doesn't blow up
    if (enquiries.length > 500) {
      enquiries.length = 500;
    }

    await writeJsonFile(ENQUIRIES_FILE, enquiries);
    res.status(201).json({ success: true, enquiry: newEnquiry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const enquiries = await readJsonFile(ENQUIRIES_FILE, []);
    const { id } = req.params;
    const index = enquiries.findIndex(e => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    enquiries[index] = {
      ...enquiries[index],
      ...req.body,
      id: enquiries[index].id
    };

    await writeJsonFile(ENQUIRIES_FILE, enquiries);
    res.json(enquiries[index]);
  } catch (error) {
    res.status(500).json({ error: 'Could not update enquiry status' });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const enquiries = await readJsonFile(ENQUIRIES_FILE, []);
    const { id } = req.params;
    const filtered = enquiries.filter(e => e.id !== id);

    if (filtered.length === enquiries.length) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    await writeJsonFile(ENQUIRIES_FILE, filtered);
    res.json({ message: 'Enquiry deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete enquiry' });
  }
});

module.exports = router;
