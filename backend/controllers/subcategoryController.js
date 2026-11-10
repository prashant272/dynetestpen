import Subcategory from '../models/Subcategory.js';

export const getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { category: categoryId } : {};
    const subcategories = await Subcategory.find(filter).populate('category');
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error: error.message });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const { name, slug, category, status } = req.body;
    const subcategory = new Subcategory({ name, slug, category, status });
    await subcategory.save();
    const populated = await Subcategory.findById(subcategory._id).populate('category');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Error creating subcategory', error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, category, status } = req.body;
    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, slug, category, status },
      { new: true }
    ).populate('category');
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating subcategory', error: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting subcategory', error: error.message });
  }
};
