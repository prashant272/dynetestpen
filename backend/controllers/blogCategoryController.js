import BlogCategory from '../models/BlogCategory.js';

export const getBlogCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog categories', error: error.message });
  }
};

export const createBlogCategory = async (req, res) => {
  try {
    const category = new BlogCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog category', error: error.message });
  }
};

export const updateBlogCategory = async (req, res) => {
  try {
    const category = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog category', error: error.message });
  }
};

export const deleteBlogCategory = async (req, res) => {
  try {
    await BlogCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog category', error: error.message });
  }
};
