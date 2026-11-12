import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { 
    ChevronRight, ChevronLeft, ShoppingCart, Zap, FileText, 
    Maximize2, Award, ShieldCheck, CheckCircle2, Check,
    Clock, Truck, FileCheck, Layers, Droplets, Target,
    Download, HelpCircle, ArrowRight, Play, Volume2, VolumeX, X
} from 'lucide-react';
import { PRODUCTS_API_URL } from '../api';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import SEO from '../components/SEO';
import RequestQuoteModal from '../components/common/RequestQuoteModal';
import ColorSelectionModal from '../components/common/ColorSelectionModal';
import { IMAGETECH_FEATURED_PRODUCTS, ALL_DYNE_PRODUCTS, DYNE_PENS, DYNE_INKS } from '../data/industrialData';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState('add'); // 'add' | 'buy'

    // Interactive Zoom State
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
        setZoomPosition({ x, y });
    };

    // Fetch product from backend or fallback to catalog
    const { data: dbProduct } = useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            try {
                const res = await axios.get(`${PRODUCTS_API_URL}/products/${slug}`);
                return res.data;
            } catch {
                return null;
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    // Fetch all catalog products for dynamic complementary recommendation
    const { data: allCatalogProducts = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await axios.get(`${PRODUCTS_API_URL}/products`);
                return Array.isArray(res.data) ? res.data : (res.data.products || []);
            } catch {
                return [];
            }
        },
        staleTime: 1000 * 60 * 15,
    });

    const rawProduct = dbProduct || IMAGETECH_FEATURED_PRODUCTS.find(p => p.slug === slug || p._id === slug) || IMAGETECH_FEATURED_PRODUCTS[0];

    // Safely extract string values for React children to prevent "Objects are not valid as a React child"
    const product = React.useMemo(() => {
        if (!rawProduct) return null;
        const categoryName = typeof rawProduct.category === 'object' ? rawProduct.category?.name : (rawProduct.category || "DYNE TEST PEN");
        const subcategoryName = typeof rawProduct.subcategory === 'object' ? rawProduct.subcategory?.name : (rawProduct.subcategory || "DYNE TEST PEN");
        const title = rawProduct.title || rawProduct.name || "Magnet Dyne Test Pen – 48 Dyne for Corona Treatment Check";
        const desc = rawProduct.shortDesc || (typeof rawProduct.longDesc === 'string' ? rawProduct.longDesc.replace(/<[^>]*>?/gm, '').slice(0, 220) : rawProduct.description);

        const dyneMatch = title.match(/(\d{2})\s*Dyne/i);
        const dyneNumber = dyneMatch ? dyneMatch[1] : (rawProduct.dyneLevel ? String(rawProduct.dyneLevel).match(/(\d{2})/)?.[1] || "38" : "38");
        const dyneLevel = `${dyneNumber} Dyne/cm`;

        return {
            ...rawProduct,
            name: title,
            title: title,
            category: categoryName,
            subcategory: subcategoryName,
            description: desc,
            dyneNumber: dyneNumber,
            dyneLevel: dyneLevel,
            price: typeof rawProduct.price === 'number' ? rawProduct.price : 0
        };
    }, [rawProduct]);

    // Default Industrial Dyne Testing demonstration video if product has no custom video
    const demoVideoUrl = (Array.isArray(product?.videos) && product.videos.length > 0)
        ? product.videos[0]
        : (product?.video || '/hero.mp4');

    const images = (product?.images && product.images.length > 0)
        ? product.images
        : [
            'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp'
        ];

    const handleAddToCart = (e) => {
        e?.preventDefault();
        setPendingAction('add');
        setIsColorModalOpen(true);
    };

    const handleBuyNow = () => {
        setPendingAction('buy');
        setIsColorModalOpen(true);
    };

    const handleColorConfirm = (chosenColor) => {
        const rawName = product.name || product.title || 'Magnet Dyne Test Pen';
        const cleanBaseName = rawName.replace(/\s*\((Blue|Pink)\s*Ink\)/gi, '').trim();
        const titledWithName = `${cleanBaseName} (${chosenColor} Ink)`;

        const productWithSpecs = {
            ...product,
            name: titledWithName,
            title: titledWithName,
            selectedSize: 'Standard',
            selectedColor: chosenColor,
            color: chosenColor
        };

        if (pendingAction === 'buy') {
            addToCart(productWithSpecs, quantity);
            if (!localStorage.getItem('userToken')) {
                navigate('/login?redirect=/checkout/address');
                return;
            }
            navigate('/checkout/address');
        } else {
            addToCart(productWithSpecs, quantity);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }
    };

    // Dynamic Related Products:
    // If current is Pen -> suggest Inks starting from current Dyne, stepping by +2 (4 items)
    // If current is Ink -> suggest Pens starting from current Dyne, stepping by +2 (4 items)
    const relatedProducts = React.useMemo(() => {
        if (!product) return [];

        const titleLower = (product.title || '').toLowerCase();
        const isCurrentPen = titleLower.includes('pen') && !titleLower.includes('ink');
        
        // Extract current product Dyne number (e.g. 48)
        const currentMatch = (product.title || '').match(/(\d{2})\s*Dyne/i);
        const currentDyneNum = currentMatch ? parseInt(currentMatch[1], 10) : 38;

        // Use backend products list if available, else local normalized catalog
        const pool = (allCatalogProducts && allCatalogProducts.length > 0)
            ? allCatalogProducts
            : (isCurrentPen ? DYNE_INKS : DYNE_PENS);

        // Filter complementary pool
        const candidates = pool.filter(p => {
            const t = (p.title || p.name || '').toLowerCase();
            const sub = typeof p.subcategory === 'object' ? (p.subcategory?.name || '') : (p.subcategory || '');
            const cat = typeof p.category === 'object' ? (p.category?.name || '') : (p.category || '');

            if (isCurrentPen) {
                // We want INKS
                return t.includes('ink') && (cat === 'Dyne Test Pen' || sub === 'Dyne Test Pen Ink' || t.includes('dyne test'));
            } else {
                // We want PENS
                return t.includes('pen') && !t.includes('ink') && (cat === 'Dyne Test Pen' || sub === 'Dyne Test Pen' || t.includes('dyne test'));
            }
        }).map(p => {
            const t = p.title || p.name || '';
            const match = t.match(/(\d{2})\s*Dyne/i);
            const dyneVal = match ? parseInt(match[1], 10) : 0;
            const img = Array.isArray(p.images) && p.images.length > 0
                ? p.images[0]
                : (isCurrentPen 
                    ? 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/72351621b7d9014281b6ef81aa567f7a.webp'
                    : 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp'
                );

            return {
                title: t,
                dyneVal,
                price: typeof p.price === 'number' ? p.price : 0,
                unit: 'unit',
                image: img,
                slug: p.slug
            };
        }).filter(p => p.dyneVal > 0);

        // Sort ascending by Dyne rating
        candidates.sort((a, b) => a.dyneVal - b.dyneVal);

        // Pick products starting at or immediately above currentDyneNum (stepping 2 by 2)
        let selected = candidates.filter(p => p.dyneVal >= currentDyneNum);
        if (selected.length < 4) {
            // wrap around if near 72 Dyne
            selected = [...selected, ...candidates.filter(p => p.dyneVal < currentDyneNum)];
        }

        return selected.slice(0, 4);
    }, [product, allCatalogProducts]);

    if (!product) return null;

    return (
        <div className="bg-[#F8FAFC] min-h-screen font-sans pb-16 pt-4 text-[#172B4D]">
            <SEO
                title={`${product.name} | ImageTech Industries`}
                description={product.description || `specification for ${product.name} manufactured by ImageTech Industries.`}
                image={images[0]}
                type="product"
            />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                
                {/* 1. Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6">
                    <Link to="/" className="hover:text-[#0D6EFD] flex items-center gap-1">
                        <span>Home</span>
                    </Link>
                    <ChevronRight size={13} className="text-gray-400" />
                    <Link to="/shop" className="hover:text-[#0D6EFD]">Product Catalog</Link>
                    <ChevronRight size={13} className="text-gray-400" />
                    <span className="text-gray-700 font-bold truncate max-w-lg">{product.name}</span>
                </nav>

                {/* 2. Top Product Card (Split View) */}
                <div className="bg-white rounded-2xl border border-[#DCE5EF] p-6 lg:p-8 shadow-xs">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                        
                        {/* Left: Product Imagery with Side Thumbnails (5 cols) */}
                        <div className="lg:col-span-5 space-y-4">
                            
                            {/* Vertical Thumbnail Strip on Left + Main Stage on Right */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3 items-start">
                                
                                {/* Vertical Thumbnails & Watch Video Button */}
                                <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[360px] hide-scrollbar shrink-0 w-full sm:w-[72px]">
                                    {images.slice(0, 4).map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`w-16 h-16 sm:w-full sm:h-[72px] rounded-xl overflow-hidden bg-[#F5F8FC] border-2 transition-all p-1 flex items-center justify-center shrink-0 ${
                                                selectedImage === idx ? 'border-[#0D6EFD] ring-2 ring-blue-100 shadow-xs' : 'border-[#DCE5EF] hover:border-gray-300'
                                            }`}
                                        >
                                            <img src={img} alt="thumb" className="w-full h-full object-contain mix-blend-multiply" />
                                        </button>
                                    ))}

                                    {/* Video Thumbnail Button (Side-bar) */}
                                    <button
                                        onClick={() => setIsVideoModalOpen(true)}
                                        className="w-16 h-16 sm:w-full sm:h-[72px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0B3B6F] to-[#0D6EFD] text-white border-2 border-transparent hover:border-[#FFC107] p-1 flex flex-col items-center justify-center gap-1 shrink-0 shadow-xs group transition-all"
                                        title="Watch Testing Demonstration Video"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-[#FFC107] group-hover:text-[#0B3B6F] flex items-center justify-center transition-colors">
                                            <Play size={11} className="fill-current ml-0.5" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-wider text-white">Watch</span>
                                    </button>
                                </div>

                                {/* Main Stage with Interactive Cursor Zoom */}
                                <div 
                                    className="relative flex-1 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-[#EBF2FA] to-[#F1F6FC] border-2 border-[#DCE5EF] hover:border-[#0D6EFD] flex items-center justify-center p-6 group cursor-crosshair transition-colors duration-200"
                                    onMouseMove={handleMouseMove}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <img
                                        src={images[selectedImage] || images[0]}
                                        alt={product.name}
                                        style={{
                                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            transform: isHovered ? 'scale(2.2)' : 'scale(1)',
                                        }}
                                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-150 ease-out pointer-events-none"
                                    />
                                    
                                    {/* Dyne/CM Pill Badge */}
                                    <span className="absolute top-4 left-4 bg-[#0B3B6F] text-white text-xs font-mono font-black px-3 py-1 rounded-md shadow-xs pointer-events-none z-10">
                                        {product.dyneLevel}
                                    </span>

                                    {/* Zoom Hint Badge */}
                                    <span className={`absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[#0B3B6F] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs border border-gray-200 pointer-events-none transition-opacity duration-200 ${
                                        isHovered ? 'opacity-0' : 'opacity-100'
                                    }`}>
                                        Hover to Zoom
                                    </span>

                                    {/* Zoom/Expand Icon */}
                                    <button
                                        onClick={() => window.open(images[selectedImage] || images[0], '_blank')}
                                        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-gray-600 rounded-lg shadow-xs border border-gray-200 transition-colors z-10"
                                        title="View full image"
                                    >
                                        <Maximize2 size={16} />
                                    </button>
                                </div>

                            </div>

                            {/* ISO Quality Strip */}
                            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#DCE5EF] flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0B3B6F] shrink-0">
                                    <Award size={20} />
                                </div>
                                <div className="leading-snug">
                                    <h4 className="text-xs font-black text-[#0B3B6F]">ISO 9001:2015 Laboratory Verified</h4>
                                    <p className="text-[11px] text-gray-500 font-medium">Every batch certified for surface tension tolerance per ASTM D2578.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Technical Details & Commercial Options (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col justify-between">
                            <div>
                                {/* Category Badges */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[11px] font-black tracking-wider text-[#0B3B6F] bg-[#EBF2FA] px-2.5 py-0.5 rounded uppercase">
                                        {product.category || "DYNE TEST PEN"}
                                    </span>
                                    <span className="text-[11px] font-black tracking-wider text-[#0D6EFD] bg-blue-50 px-2.5 py-0.5 rounded uppercase">
                                        {product.subcategory || "DYNE TEST PEN"}
                                    </span>
                                </div>

                                {/* Product Title */}
                                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0B3B6F] tracking-tight leading-tight mb-2">
                                    {product.name}
                                </h1>

                                {/* Accent Highlight Bar */}
                                <div className="w-14 h-1 bg-[#FFC107] rounded-full mb-4" />

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                                    {product.description || "The Magnet Dyne Test Pen – 48 Dyne is used to check surface wettability after corona treatment. It helps assess the treated surface of materials used in printing and flexible packaging applications."}
                                </p>

                                {/* Official B2B Commercial Price Strip */}
                                <div className="p-4 sm:p-5 bg-[#F8FAFC] rounded-2xl border border-[#DCE5EF] mb-6 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">
                                            {quantity > 1 ? `OFFICIAL B2B TOTAL PRICE (${quantity} UNITS)` : 'OFFICIAL B2B COMMERCIAL PRICE'}
                                        </span>
                                        <div className="flex items-baseline gap-2 mt-0.5">
                                            {product.price > 0 ? (
                                                <>
                                                    <span className="text-3xl sm:text-4xl font-black text-[#0B3B6F]">₹{product.price * quantity}</span>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-500">
                                                        {quantity > 1 ? `(₹${product.price} / unit)` : '/ unit (+ GST)'}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-2xl sm:text-3xl font-black text-[#0B3B6F]">
                                                    {product.price === 0 ? '₹0' : 'Price on Request'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-emerald-50 border border-emerald-200/80 px-4 py-2 rounded-xl text-right">
                                        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                            Ready Stock in Plant
                                        </div>
                                        <p className="text-[10px] text-emerald-700/80 font-medium mt-0.5">Dispatch within 24–48 Hours</p>
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-xs font-black text-[#0B3B6F]">Quantity:</span>
                                    <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3.5 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 text-xs font-mono font-black text-[#0B3B6F]">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-3.5 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons: Add to Cart, Request Bulk RFQ, Direct Procurement */}
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
                                    <button
                                        onClick={handleAddToCart}
                                        className={`text-xs font-black py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95 ${
                                            isAdded 
                                                 ? 'bg-emerald-600 text-white' 
                                                 : 'bg-[#0B3B6F] hover:bg-[#082a50] text-white'
                                        }`}
                                    >
                                        <ShoppingCart size={15} />
                                        <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
                                    </button>

                                    <button
                                        onClick={() => setIsQuoteOpen(true)}
                                        className="bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] text-xs font-black py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                                    >
                                        <FileText size={15} />
                                        <span>Request RFQ</span>
                                    </button>

                                    <button
                                        onClick={handleBuyNow}
                                        className="bg-white hover:bg-gray-50 text-[#0B3B6F] border-2 border-[#0B3B6F] text-xs font-black py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                                    >
                                        <Zap size={15} className="text-[#0B3B6F]" />
                                        <span>Buy Now</span>
                                    </button>

                                    <a
                                        href="/ImageTech_Dyne_Pen_Catalog.pdf"
                                        download="ImageTech_Dyne_Pen_Catalog.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-50 hover:bg-blue-100 text-[#0B3B6F] border border-blue-200 text-xs font-bold py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                                        title="Download Full Dyne Pen Catalog (PDF)"
                                    >
                                        <Download size={15} className="text-[#0D6EFD]" />
                                        <span>Catalog PDF</span>
                                    </a>
                                </div>

                                {/* Trust Indicators Strip */}
                                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                    <div className="flex items-center gap-2">
                                        <Award size={18} className="text-[#0D6EFD] shrink-0" />
                                        <div className="leading-tight">
                                            <p className="font-bold text-[#0B3B6F] text-[11px]">ASTM D2578</p>
                                            <p className="text-[10px] text-gray-400">Traceable</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={18} className="text-[#0D6EFD] shrink-0" />
                                        <div className="leading-tight">
                                            <p className="font-bold text-[#0B3B6F] text-[11px]">100% Valve</p>
                                            <p className="text-[10px] text-gray-400">Action Seal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileCheck size={18} className="text-[#0D6EFD] shrink-0" />
                                        <div className="leading-tight">
                                            <p className="font-bold text-[#0B3B6F] text-[11px]">Certificate</p>
                                            <p className="text-[10px] text-gray-400">of Analysis</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck size={18} className="text-[#0D6EFD] shrink-0" />
                                        <div className="leading-tight">
                                            <p className="font-bold text-[#0B3B6F] text-[11px]">Fast &amp; Reliable</p>
                                            <p className="text-[10px] text-gray-400">Dispatch</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. Parameter Badges Strip (Product Name, Brand, Dyne Value, Colours, Application, Industry) */}
                <div className="mt-6 bg-white rounded-2xl border border-[#DCE5EF] p-4 shadow-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        
                        {/* 1. Product Name */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B3B6F] shrink-0">
                                <Layers size={16} />
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Product Name</span>
                                <span className="text-xs font-bold text-[#0B3B6F] truncate block">Magnet Dyne Test Pen</span>
                            </div>
                        </div>

                        {/* 2. Brand */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B3B6F] shrink-0">
                                <Award size={16} />
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Brand</span>
                                <span className="text-xs font-bold text-[#0B3B6F] truncate block">Magnet</span>
                            </div>
                        </div>

                        {/* 3. Dyne Value */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B3B6F] shrink-0">
                                <Target size={16} />
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Dyne Value</span>
                                <span className="text-xs font-bold text-[#0B3B6F] truncate block">
                                    {product.dyneLevel || `${product.dyneNumber || '38'} Dyne`}
                                </span>
                            </div>
                        </div>

                        {/* 4. Available Colours */}
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center gap-1 shrink-0">
                                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block border border-white shadow-2xs" />
                                <span className="w-3 h-3 rounded-full bg-pink-500 inline-block border border-white shadow-2xs" />
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Available Colours</span>
                                <span className="text-xs font-bold text-[#0B3B6F] truncate block">Blue and Pink</span>
                            </div>
                        </div>

                        {/* 5. Main Application */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B3B6F] shrink-0">
                                <ShieldCheck size={16} />
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Main Application</span>
                                <span className="text-xs font-bold text-[#0B3B6F] truncate block">Corona Treatment Check</span>
                            </div>
                        </div>

                        {/* 6. Industry */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B3B6F] shrink-0">
                                <Droplets size={16} />
                            </div>
                            <div className="min-w-0">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Industry</span>
                                <span className="text-xs font-bold text-[#0B3B6F] truncate block">Printing &amp; Flexible Packaging</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 4. Tab Navigation Strip */}
                <div className="mt-8 flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {[
                        { id: 'OVERVIEW', label: 'Overview & Description', icon: FileText },
                        { id: 'SPECIFICATIONS', label: 'Specifications', icon: Layers },
                        { id: 'FEATURES', label: 'Key Features', icon: Target },
                        { id: 'DOWNLOADS', label: 'Catalog & Datasheet', icon: Download },
                        { id: 'FAQS', label: 'FAQs', icon: HelpCircle },
                    ].map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                    isActive
                                        ? 'bg-[#0B3B6F] text-white shadow-xs'
                                        : 'bg-white text-gray-600 hover:text-[#0B3B6F] border border-[#DCE5EF]'
                                }`}
                            >
                                <Icon size={14} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 5. Tab Content: Side-by-side Overview & Why Choose Layout */}
                <div className="mt-6 bg-white rounded-2xl border border-[#DCE5EF] p-6 lg:p-8 shadow-xs">
                    
                    {/* OVERVIEW TAB */}
                    {activeTab === 'OVERVIEW' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Left: Product Overview + Ideal For (6 cols) */}
                            <div className="lg:col-span-5 space-y-6">
                                <div>
                                    <h3 className="text-base font-black text-[#0B3B6F] tracking-tight mb-2">
                                        Product Overview
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        The Magnet Dyne Test Pen – 48 Dyne is a surface tension testing pen used to verify the effectiveness of corona treatment on plastic films and other non-porous surfaces. It provides a quick, accurate, and easy method to evaluate surface energy before printing, coating, or lamination.
                                    </p>
                                </div>

                                {/* Ideal For Blue Card */}
                                <div className="bg-[#F0F5FA] rounded-xl p-5 border border-blue-100">
                                    <h4 className="text-xs font-black text-[#0B3B6F] mb-3">
                                        Ideal For
                                    </h4>
                                    <ul className="space-y-2 text-xs text-gray-700">
                                        <li className="flex items-center gap-2 font-medium">
                                            <Check size={14} className="text-[#0D6EFD] stroke-[3]" />
                                            <span>Treated plastic films (PE, PP, PET, BOPP, etc.)</span>
                                        </li>
                                        <li className="flex items-center gap-2 font-medium">
                                            <Check size={14} className="text-[#0D6EFD] stroke-[3]" />
                                            <span>Printing and lamination processes</span>
                                        </li>
                                        <li className="flex items-center gap-2 font-medium">
                                            <Check size={14} className="text-[#0D6EFD] stroke-[3]" />
                                            <span>Quality control and process verification</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Center: Why Choose This Pen? (4 cols) */}
                            <div className="lg:col-span-4 space-y-4">
                                <h3 className="text-base font-black text-[#0B3B6F] tracking-tight mb-4">
                                    Why Choose This Pen?
                                </h3>

                                <div className="space-y-3.5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0D6EFD] shrink-0 mt-0.5">
                                            <Target size={16} />
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-bold text-[#0B3B6F]">Accurate &amp; Reliable</h5>
                                            <p className="text-[11px] text-gray-500 leading-snug">Consistent dyne value for precise surface testing.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0D6EFD] shrink-0 mt-0.5">
                                            <Droplets size={16} />
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-bold text-[#0B3B6F]">Quick &amp; Easy Testing</h5>
                                            <p className="text-[11px] text-gray-500 leading-snug">Instant surface wettability check in seconds.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0D6EFD] shrink-0 mt-0.5">
                                            <Layers size={16} />
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-bold text-[#0B3B6F]">Industry Standard</h5>
                                            <p className="text-[11px] text-gray-500 leading-snug">As per ASTM D2578 for surface tension measurement.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0D6EFD] shrink-0 mt-0.5">
                                            <ShieldCheck size={16} />
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-bold text-[#0B3B6F]">Batch Certified</h5>
                                            <p className="text-[11px] text-gray-500 leading-snug">Supplied with Certificate of Analysis (CoA).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Technical Test Action Photo (3 cols) */}
                            <div className="lg:col-span-3">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-[#DCE5EF] shadow-2xs">
                                    <img
                                        src="https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/8d02be4431b74562168390ac452c85f3.webp"
                                        alt="Dyne pen testing surface"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                        </div>
                    )}

                    {/* SPECIFICATIONS TAB */}
                    {activeTab === 'SPECIFICATIONS' && (
                        <div className="max-w-3xl">
                            <h3 className="text-sm font-black text-[#0B3B6F] uppercase tracking-wider mb-4">
                                Laboratory Specifications
                            </h3>
                            <div className="border border-[#DCE5EF] rounded-xl overflow-hidden">
                                <table className="w-full text-left text-xs divide-y divide-[#DCE5EF]">
                                    <tbody className="divide-y divide-[#DCE5EF]">
                                        <tr className="bg-[#F8FAFC]">
                                            <td className="px-4 py-3 font-bold text-gray-700 w-1/3">Product Name</td>
                                            <td className="px-4 py-3 font-bold text-[#0B3B6F]">{product.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-gray-700">Brand</td>
                                            <td className="px-4 py-3 font-bold text-[#0B3B6F]">Magnet</td>
                                        </tr>
                                        <tr className="bg-[#F8FAFC]">
                                            <td className="px-4 py-3 font-bold text-gray-700">Dyne Value</td>
                                            <td className="px-4 py-3 font-bold text-[#0B3B6F]">{product.dyneLevel}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-gray-700">Available Colours</td>
                                            <td className="px-4 py-3 font-bold text-[#0B3B6F]">Blue and Pink</td>
                                        </tr>
                                        <tr className="bg-[#F8FAFC]">
                                            <td className="px-4 py-3 font-bold text-gray-700">Application</td>
                                            <td className="px-4 py-3 font-bold text-[#0B3B6F]">Surface Energy &amp; Corona Treatment Check</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-gray-700">Standard</td>
                                            <td className="px-4 py-3 font-bold text-[#0B3B6F]">ASTM D-2578 / ISO 8296</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* FEATURES TAB */}
                    {activeTab === 'FEATURES' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                            {[
                                "Chisel Tip with Spring-Loaded Valve Action",
                                "Available in 28 to 72 Dyne/cm increments",
                                "Designed specifically for corona treatment verification",
                                "Suitable for plastic films, foils and non-porous surfaces",
                                "Pre-calibrated and batch tested in laboratory",
                                "Hermetically sealed body prevents drying and evaporation"
                            ].map((f, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE5EF] text-xs font-semibold text-gray-800">
                                    <CheckCircle2 size={16} className="text-[#0D6EFD] shrink-0" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* FAQS TAB */}
                    {activeTab === 'FAQS' && (
                        <div className="space-y-3 max-w-3xl">
                            {[
                                { q: "What is a Dyne Test Pen used for?", a: "A Dyne Test Pen is used to check the surface energy of plastic films, metal foils, and non-porous surfaces after corona or plasma treatment." },
                                { q: "What dyne values are available?", a: "MAGNET Dyne Test Pens are available from 28 to 72 Dyne/cm in even value steps." },
                                { q: "How do I interpret the wetting test result?", a: "Apply a continuous line of liquid on the test film. If the liquid remains continuous for 2 seconds without beading up, the surface energy meets or exceeds that dyne rating." }
                            ].map((faq, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE5EF]">
                                    <h5 className="text-xs font-bold text-[#0B3B6F] mb-1">Q: {faq.q}</h5>
                                    <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* DOWNLOADS TAB */}
                    {activeTab === 'DOWNLOADS' && (
                        <div className="max-w-2xl space-y-3">
                            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE5EF] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText size={20} className="text-[#0B3B6F]" />
                                    <div>
                                        <p className="text-xs font-bold text-[#0B3B6F]">MAGNET Dyne Test Pen Official Catalog &amp; Lab Report</p>
                                        <p className="text-[10px] text-gray-400">PDF Document • 2.2 MB • ASTM D2578 / IS : 6104</p>
                                    </div>
                                </div>
                                <a 
                                    href="/ImageTech_Dyne_Pen_Catalog.pdf"
                                    download="ImageTech_Dyne_Pen_Catalog.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold text-white bg-[#0B3B6F] hover:bg-[#082a50] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                                >
                                    <span>Download</span> <Download size={13} />
                                </a>
                            </div>
                        </div>
                    )}

                </div>

                {/* 6. Related Products Carousel Strip */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-[#0B3B6F]">
                            Related Products
                        </h3>
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-lg bg-white border border-[#DCE5EF] flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-2xs">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-white border border-[#DCE5EF] flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-2xs">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {relatedProducts.map((rel, idx) => (
                            <Link
                                key={idx}
                                to={rel.slug ? `/product/${rel.slug}` : '/shop'}
                                className="bg-white rounded-2xl border border-[#DCE5EF] hover:border-[#0D6EFD] p-4 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all duration-300"
                            >
                                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F8FAFC] p-4 flex items-center justify-center mb-3">
                                    <img
                                        src={rel.image}
                                        alt={rel.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-[#172B4D] group-hover:text-[#0D6EFD] truncate transition-colors">
                                        {rel.title}
                                    </h4>
                                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            {typeof rel.price === 'number' && rel.price > 0 ? (
                                                <span className="text-xs font-black text-[#0B3B6F]">
                                                    ₹{rel.price} <span className="text-[10px] font-normal text-gray-400">/ {rel.unit}</span>
                                                </span>
                                            ) : (
                                                <span className="text-xs font-black text-[#0B3B6F]">
                                                    {rel.price === 0 ? '₹0' : 'Price on Request'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-blue-50 text-[#0B3B6F] flex items-center justify-center group-hover:bg-[#0B3B6F] group-hover:text-white transition-colors">
                                            <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* Floating Picture-in-Picture Industrial Video Widget (Exact match to reference) */}
            <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
                <div className="relative w-[130px] sm:w-[150px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-white/80 group">
                    <video
                        src={demoVideoUrl}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setIsVideoModalOpen(true)}
                    />

                    {/* Overlay controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                    {/* Live Indicator */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        DEMO
                    </div>

                    {/* Audio Toggle */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                    </button>

                    {/* Expand Play Prompt */}
                    <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white/25 hover:bg-[#FFC107] hover:text-[#0B3B6F] text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-md group-hover:scale-110"
                    >
                        <Play size={18} className="fill-current ml-0.5" />
                    </button>

                    <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                        <span className="text-[10px] font-bold text-white/95 leading-tight block drop-shadow-xs">
                            Testing in Action
                        </span>
                    </div>
                </div>
            </div>

            {/* Ink Color Selection Modal */}
            <ColorSelectionModal
                isOpen={isColorModalOpen}
                onClose={() => setIsColorModalOpen(false)}
                product={product}
                actionType={pendingAction}
                onConfirm={handleColorConfirm}
            />

            {/* Video Modal Player */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                        <div className="p-3 bg-[#0B3B6F] text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Play size={16} className="text-[#FFC107] fill-current" />
                                <span className="text-xs font-black uppercase tracking-wider">
                                    {product.name} – Surface Adhesion Testing
                                </span>
                            </div>
                            <button
                                onClick={() => setIsVideoModalOpen(false)}
                                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="aspect-video bg-black flex items-center justify-center">
                            <video
                                src={demoVideoUrl}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Quote Modal */}
            <RequestQuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                initialProduct={product.name}
            />
        </div>
    );
};

export default ProductDetails;