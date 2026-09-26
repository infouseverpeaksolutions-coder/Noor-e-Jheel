const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const packagesRouter = require('./routes/packages');
const destinationsRouter = require('./routes/destinations');
const testimonialsRouter = require('./routes/testimonials');
const blogRouter = require('./routes/blog');
const settingsRouter = require('./routes/settings');
const enquiriesRouter = require('./routes/enquiries');

const app = express();
const PORT = process.env.PORT || 5001;

// cors open for local dev, tighten allowed origins before deploying
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/packages', packagesRouter);
app.use('/api/destinations', destinationsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/enquiries', enquiriesRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'noor-e-jheel-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, _next) => {
  console.error('[server error]', err.stack || err);
  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
    console.log(`json store: ${path.join(__dirname, 'data')}`);
  });
}

module.exports = app;
