import Location from '../models/Location.js';

// Get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ name: 1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error: error.message });
  }
};

// Create a new location
export const createLocation = async (req, res) => {
  try {
    const { name, slug, state, status } = req.body;
    const existing = await Location.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'Location with this slug already exists' });
    }
    const location = new Location({ name, slug, state, status });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ message: 'Error creating location', error: error.message });
  }
};

// Update a location
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndUpdate(id, req.body, { new: true });
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(400).json({ message: 'Error updating location', error: error.message });
  }
};

// Delete a location
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete(id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting location', error: error.message });
  }
};
