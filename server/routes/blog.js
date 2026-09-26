const router = require('express').Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileStorage');
const { requireAdminAuth } = require('../middleware/auth');

const BLOG_FILE = path.join(__dirname, '../data/blog.json');

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
    const articles = await readJsonFile(BLOG_FILE, []);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve articles' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const articles = await readJsonFile(BLOG_FILE, []);
    const { slug } = req.params;

    const article = articles.find(a => a.slug === slug || a.id === slug);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Post lookup failed' });
  }
});

router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const articles = await readJsonFile(BLOG_FILE, []);
    const body = req.body;

    if (!body.title || !body.content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newSlug = body.slug ? slugify(body.slug) : slugify(body.title);
    const newId = `blog-${Date.now().toString(36)}`;

    const newArticle = {
      id: newId,
      title: body.title,
      slug: newSlug,
      category: body.category || 'Travel Guide',
      read_time: body.read_time || '5 min read',
      published_date: body.published_date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: body.author || 'Noor-e-Jheel Travel Desk',
      cover_image: body.cover_image || 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      summary: body.summary || '',
      content: body.content
    };

    articles.unshift(newArticle);
    await writeJsonFile(BLOG_FILE, articles);

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Post creation failed' });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const articles = await readJsonFile(BLOG_FILE, []);
    const { id } = req.params;
    const index = articles.findIndex(a => a.id === id || a.slug === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const current = articles[index];
    const body = req.body;

    articles[index] = {
      ...current,
      ...body,
      id: current.id,
      slug: body.slug ? slugify(body.slug) : current.slug
    };

    await writeJsonFile(BLOG_FILE, articles);
    res.json(articles[index]);
  } catch (error) {
    res.status(500).json({ error: 'Could not update post' });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const articles = await readJsonFile(BLOG_FILE, []);
    const { id } = req.params;
    const filtered = articles.filter(a => a.id !== id && a.slug !== id);

    if (filtered.length === articles.length) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await writeJsonFile(BLOG_FILE, filtered);
    res.json({ message: 'Article deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
