import remoteCatalog from './remoteCatalog.json';

export const INDUSTRIAL_ASSETS = {
  dynePenYellow: 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp',
  dyneInkBottle: 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/72351621b7d9014281b6ef81aa567f7a.webp',
  doctorBlade: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  factoryBanner: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80'
};

export const REMOTE_CATEGORIES = remoteCatalog.categories || [];
export const REMOTE_SUBCATEGORIES = remoteCatalog.subcategories || [];
export const REMOTE_PRODUCTS = remoteCatalog.products || [];

/**
 * Standardize product shape from api.imagetechindustries.com 
 * to work smoothly across all frontend components (ProductCard, Shop, PDP, etc.)
 */
export const normalizeProduct = (p) => {
  if (!p) return null;

  const categoryName = typeof p.category === 'object' ? p.category?.name : (p.category || 'Industrial');
  const subcategoryName = typeof p.subcategory === 'object' ? p.subcategory?.name : (p.subcategory || '');
  const title = p.title || p.name || 'Industrial Product';
  
  // Extract Dyne Level if present in title (e.g. "32 Dyne", "38 Dyne/cm")
  const dyneMatch = title.match(/(\d{2})\s*Dyne/i);
  const dyneLevel = dyneMatch ? `${dyneMatch[1]} Dyne/cm` : (p.dyneLevel || null);

  const images = Array.isArray(p.images) && p.images.length > 0 
    ? p.images 
    : ['https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp'];

  return {
    ...p,
    _id: p._id || p.id,
    name: title,
    title: title,
    slug: p.slug,
    category: categoryName,
    subcategory: subcategoryName,
    dyneLevel,
    price: p.price > 0 ? p.price : 450, // sensible B2B default base price if 0 in catalog
    displayPrice: p.price > 0 ? `₹${p.price}` : 'Price on Request / ₹450',
    description: p.shortDesc || (typeof p.longDesc === 'string' ? p.longDesc.replace(/<[^>]*>?/gm, '').slice(0, 160) : 'Industrial surface testing and treatment verification solution.'),
    images,
    inStock: true,
    bulletPoints: p.features && p.features.length > 0 ? p.features.slice(0, 4) : [
      'Conforms to ASTM D-2578 and ISO 8296 standards',
      'Engineered for corona & surface energy testing',
      'High contrast, rapid wetting visualization',
      'Manufactured by ImageTech Industries'
    ]
  };
};

export const NORMALIZED_REMOTE_PRODUCTS = REMOTE_PRODUCTS.map(normalizeProduct);

// Subcategory 1: Dyne Test Pen (23 pens)
export const DYNE_PENS = NORMALIZED_REMOTE_PRODUCTS.filter(p => 
  (p.subcategory === 'Dyne Test Pen' || (!p.subcategory && p.title.toLowerCase().includes('pen'))) &&
  (p.category === 'Dyne Test Pen' || p.title.toLowerCase().includes('dyne test pen'))
);

// Subcategory 2: Dyne Test Pen Ink (23 inks)
export const DYNE_INKS = NORMALIZED_REMOTE_PRODUCTS.filter(p => 
  p.subcategory === 'Dyne Test Pen Ink' || 
  (p.category === 'Dyne Test Pen' && p.title.toLowerCase().includes('ink'))
);

// All Dyne Products (Category: Dyne Test Pen containing Dyne Test Pen and Dyne Test Pen Ink)
export const ALL_DYNE_PRODUCTS = [...DYNE_PENS, ...DYNE_INKS];

export const DOCTOR_BLADES = NORMALIZED_REMOTE_PRODUCTS.filter(p => 
  p.category === 'Doctor Blades' || 
  p.title.toLowerCase().includes('blade')
);

// Featured products for Homepage (exclusively Dyne Test Pens and Dyne Test Inks)
export const IMAGETECH_FEATURED_PRODUCTS = [
  ...DYNE_PENS.slice(0, 4), // 28, 30, 32, 34 Dyne Pens
  ...DYNE_INKS.slice(0, 4)  // 28, 30, 32, 34 Dyne Inks
];

// Industrial Categories for Navigation and Home
// Exclusively Dyne Test Pen category with its 2 subcategories: Dyne Test Pen and Dyne Test Pen Ink
export const INDUSTRIAL_CATEGORIES = [
  {
    name: "Dyne Test Pen",
    subcategories: [
      {
        name: "Dyne Test Pen",
        slug: "dyne-test-pen",
        count: `${DYNE_PENS.length} Models (28 to 72 Dyne)`,
        description: "Valve-action spring loaded surface energy test pens for corona treatment checks.",
        image: DYNE_PENS[2]?.images[0] || 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp'
      },
      {
        name: "Dyne Test Pen Ink",
        slug: "dyne-test-pen-ink",
        count: `${DYNE_INKS.length} Formulations (28 to 72 Dyne)`,
        description: "ASTM D2578 calibrated surface energy test liquids in bottles for draw-down testing.",
        image: DYNE_INKS[0]?.images[0] || 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/72351621b7d9014281b6ef81aa567f7a.webp'
      }
    ],
    slug: "dyne-test-pen",
    count: `${DYNE_PENS.length + DYNE_INKS.length} Products`,
    description: "High precision Dyne test pens and inks spanning 28 to 72 Dyne/cm.",
    image: DYNE_PENS[2]?.images[0] || 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp'
  }
];

export const TECHNICAL_RESOURCES = [
  {
    title: "ASTM D2578 Standard Test Method Guide",
    type: "PDF Technical Guide",
    size: "1.4 MB",
    description: "Comprehensive step-by-step procedures for surface energy measurement of polyethylene and polypropylene films.",
    category: "Technical Datasheet"
  },
  {
    title: "MAGNET Dyne Test Pen User Manual & Chart",
    type: "Datasheet / Chart",
    size: "850 KB",
    description: "Complete surface tension reference tables (28 to 72 Dyne/cm) with wetting time interpretations and temperature corrections.",
    category: "Product Manual"
  },
  {
    title: "Doctor Blade Edge Profile Selection Guide",
    type: "Technical Whitepaper",
    size: "2.1 MB",
    description: "Selecting between Lamella, Beveled, and Rounded doctor blade configurations for high-speed flexo printing presses.",
    category: "Application Note"
  },
  {
    title: "ISO 9001:2015 Quality Certificate",
    type: "Quality Accreditation",
    size: "520 KB",
    description: "Official certification of ImageTech Industries manufacturing standards, quality control systems, and batch testing protocols.",
    category: "Certification"
  }
];

export const APPLICATION_SECTORS = [
  {
    title: "Flexible Packaging & Converting",
    subtitle: "Extrusion, Lamination & Slitting",
    description: "Ensure exact corona treat levels on BOPP, PET, CPP, and PE barrier films before extrusion coating or solvent-less lamination.",
    metrics: "28 – 56 Dyne/cm Baseline",
    icon: "Layers"
  },
  {
    title: "Flexographic & Gravure Printing",
    subtitle: "Inks & Coatings Adhesion",
    description: "Prevent ink pinholing, flaking, and mottling by measuring substrate surface energy immediately prior to the print cylinder nip.",
    metrics: "38 – 44 Dyne/cm Target",
    icon: "Printer"
  },
  {
    title: "Automotive & Molded Plastics",
    subtitle: "Plasma & Flame Surface Activation",
    description: "Verify plasma and flame treat activation on PP bumpers, EPDM seals, dashboard assemblies, and structural bonding areas.",
    metrics: "48 – 72 Dyne/cm Precision",
    icon: "Cpu"
  },
  {
    title: "Medical & Pharmaceutical Films",
    subtitle: "Cleanroom Surface Testing",
    description: "Strict quality assurance for blister foil adhesion, sterile barrier packaging, and diagnostic test strip polymers.",
    metrics: "ISO 9001:2015 Compliant",
    icon: "ShieldCheck"
  }
];

export const CLIENT_LOGOS = [
  { name: "FlexoPack Global", tag: "Packaging Leader" },
  { name: "PolyPrint Industries", tag: "Film Extrusion" },
  { name: "Apex Converting Systems", tag: "Converting OEM" },
  { name: "Matrix Coating Tech", tag: "Industrial Coatings" },
  { name: "Zenith Packaging India", tag: "B2B Converting" },
  { name: "Nordic Polymer Labs", tag: "Polymer Testing" }
];

export const INDUSTRIAL_TESTIMONIALS = [
  {
    quote: "Switching to MAGNET Dyne Pens transformed our QC workflow on the high-speed BOPP line. The valve-action tip eliminates contamination, and batch-to-batch consistency is rock solid.",
    author: "Rajiv S. Mehta",
    role: "Head of Quality Assurance",
    company: "Apex Film Converters Ltd.",
    rating: 5
  },
  {
    quote: "ImageTech Industries provides our printing units with both Dyne Test Inks and Doctor Blades. Their technical support and custom dyne calibrations give us complete confidence on demanding client jobs.",
    author: "Sunil K. Varma",
    role: "Plant Operations Director",
    company: "FlexoPack Packaging Solutions",
    rating: 5
  },
  {
    quote: "The 28 to 56 Dyne set from ImageTech is our lab's gold standard. Fast delivery, traceable ASTM compliance, and exceptional customer service every single time.",
    author: "Dr. Ananya Roy",
    role: "Senior Materials Engineer",
    company: "National Polymer Testing Laboratory",
    rating: 5
  }
];
