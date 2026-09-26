const API_BASE = '/api';

export const api = {
  async getPackages(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/packages${query ? `?${query}` : ''}`);
      if (!res.ok) throw new Error('Failed to load packages');
      return await res.json();
    } catch (err) {
      console.error('getPackages error:', err);
      return [];
    }
  },

  async getPackageBySlug(slug) {
    const res = await fetch(`${API_BASE}/packages/${slug}`);
    if (!res.ok) throw new Error('Package not found');
    return res.json();
  },

  async getDestinations(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/destinations${query ? `?${query}` : ''}`);
      if (!res.ok) throw new Error('Failed to load destinations');
      return await res.json();
    } catch (err) {
      console.error('getDestinations error:', err);
      return [];
    }
  },

  async getDestinationBySlug(slug) {
    const res = await fetch(`${API_BASE}/destinations/${slug}`);
    if (!res.ok) throw new Error('Destination not found');
    return res.json();
  },

  async getTestimonials() {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (!res.ok) throw new Error('Failed to load testimonials');
      return await res.json();
    } catch (err) {
      console.error('getTestimonials error:', err);
      return [];
    }
  },

  async getBlogs() {
    try {
      const res = await fetch(`${API_BASE}/blog`);
      if (!res.ok) throw new Error('Failed to load blog posts');
      return await res.json();
    } catch (err) {
      console.error('getBlogs error:', err);
      return [];
    }
  },

  async getBlogBySlug(slug) {
    const res = await fetch(`${API_BASE}/blog/${slug}`);
    if (!res.ok) throw new Error('Blog post not found');
    return res.json();
  },

  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('Failed to load settings');
      return await res.json();
    } catch (err) {
      console.error('getSettings error:', err);
      return null;
    }
  },

  // fire and forget lead capture so offline/slow server doesn't block whatsapp redirect
  async submitEnquiry(payload) {
    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  }
};
