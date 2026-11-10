import CustomPage from '../models/CustomPage.js';

// Get all custom pages
export const getCustomPages = async (req, res) => {
  try {
    const pages = await CustomPage.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom pages', error: error.message });
  }
};

// Get custom page by slug
export const getCustomPageBySlug = async (req, res) => {
  try {
    const page = await CustomPage.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ message: 'Custom page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom page', error: error.message });
  }
};

// Create custom page
export const createCustomPage = async (req, res) => {
  try {
    const page = new CustomPage(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A page with this slug already exists.' });
    }
    res.status(400).json({ message: 'Error creating custom page', error: error.message });
  }
};

// Update custom page
export const updateCustomPage = async (req, res) => {
  try {
    const page = await CustomPage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!page) {
      return res.status(404).json({ message: 'Custom page not found' });
    }
    res.json(page);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A page with this slug already exists.' });
    }
    res.status(400).json({ message: 'Error updating custom page', error: error.message });
  }
};

// Delete custom page
export const deleteCustomPage = async (req, res) => {
  try {
    const page = await CustomPage.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Custom page not found' });
    }
    res.json({ message: 'Custom page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting custom page', error: error.message });
  }
};
