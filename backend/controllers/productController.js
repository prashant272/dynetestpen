import Product from '../models/Product.js';
import Location from '../models/Location.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('subcategory');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Check if slug contains '-in-' for pSEO
    const inIndex = slug.lastIndexOf('-in-');
    let productSlug = slug;
    let locationSlug = null;
    let location = null;
    
    if (inIndex !== -1) {
      productSlug = slug.substring(0, inIndex);
      locationSlug = slug.substring(inIndex + 4);
      location = await Location.findOne({ slug: locationSlug, status: 'Active' });
      
      // If location doesn't exist, we fallback to treating the whole slug as product slug
      if (!location) {
        productSlug = slug;
      }
    }

    let product = await Product.findOne({ slug: productSlug }).populate('category').populate('subcategory');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    // Dynamic Location SEO Replacement
    if (location) {
      // Create a deep copy to modify
      product = JSON.parse(JSON.stringify(product));
      
      const cityName = location.name;
      
      // Replace {city} placeholders
      const replaceCity = (text) => text ? text.replace(/{city}/gi, cityName) : text;
      
      product.title = product.title.includes('{city}') ? replaceCity(product.title) : `${product.title} in ${cityName}`;
      product.seoTitle = product.seoTitle ? (product.seoTitle.includes('{city}') ? replaceCity(product.seoTitle) : `${product.seoTitle} in ${cityName}`) : `${product.title} in ${cityName}`;
      
      product.shortDesc = replaceCity(product.shortDesc);
      product.longDesc = replaceCity(product.longDesc);
      product.seoDescription = replaceCity(product.seoDescription);
      product.seoKeywords = replaceCity(product.seoKeywords);
      
      if (product.overviewFeatures) {
         product.overviewFeatures = product.overviewFeatures.map(f => ({
             ...f, 
             title: replaceCity(f.title), 
             desc: replaceCity(f.desc)
         }));
      }
      
      if (product.faqs) {
         product.faqs = product.faqs.map(f => ({
             ...f, 
             question: replaceCity(f.question), 
             answer: replaceCity(f.answer)
         }));
      }
      
      // Keep the actual requested slug for frontend consistency
      product.slug = slug; 
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.subcategory) {
      data.subcategory = null;
    }
    const product = new Product(data);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (!data.subcategory) {
      data.subcategory = null;
    }
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error: error.message });
  }
};
