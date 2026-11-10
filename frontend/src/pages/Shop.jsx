import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
    Filter, ArrowRight, ShoppingCart, RotateCcw, SlidersHorizontal, 
    Layers, ShieldCheck, CheckCircle2, ChevronDown, FileText, Search, X
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_API_URL } from '../api';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import SEO from '../components/SEO';
import ProductSkeleton from '../components/skeletons/ProductSkeleton';
import ProductCard from '../components/ProductCard';
import RequestQuoteModal from '../components/common/RequestQuoteModal';
import { IMAGETECH_FEATURED_PRODUCTS, INDUSTRIAL_CATEGORIES, ALL_DYNE_PRODUCTS } from '../data/industrialData';

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubcategory, setSelectedSubcategory] = useState('All');
    const [selectedDynes, setSelectedDynes] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Query parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const cat = searchParams.get('category');
        if (cat) {
            setSelectedCategory(cat);
        } else {
            setSelectedCategory('All');
        }
        
        const subcat = searchParams.get('subcategory');
        if (subcat) {
            setSelectedSubcategory(subcat);
        } else {
            setSelectedSubcategory('All');
        }

        const search = searchParams.get('search');
        if (search) setSearchQuery(search);
    }, [location.search]);

    const [searchQuery, setSearchQuery] = useState('');

    // Fetch database products
    const { data: dbProducts = [], isLoading } = useQuery({
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

    // Filter products strictly to Category: "Dyne Test Pen" containing "Dyne Test Pen" and "Dyne Test Pen Ink"
    const allProducts = useMemo(() => {
        const rawList = (dbProducts && dbProducts.length > 0) ? dbProducts : [];
        
        // Filter strictly for Dyne Test Pen category items
        const dyneItems = rawList.filter(p => {
            const catName = typeof p.category === 'object' ? p.category?.name : (p.category || '');
            const subName = typeof p.subcategory === 'object' ? p.subcategory?.name : (p.subcategory || '');
            const title = p.title || p.name || '';
            return (
                catName === 'Dyne Test Pen' ||
                subName === 'Dyne Test Pen' ||
                subName === 'Dyne Test Pen Ink' ||
                title.toLowerCase().includes('dyne test pen') ||
                title.toLowerCase().includes('dyne test ink')
            );
        }).map(p => ({
            ...p,
            _id: p._id || p.id,
            name: p.title || p.name,
            title: p.title || p.name,
            slug: p.slug,
            category: 'Dyne Test Pen',
            subcategory: typeof p.subcategory === 'object' ? p.subcategory?.name : (p.subcategory || (p.title?.toLowerCase().includes('ink') ? 'Dyne Test Pen Ink' : 'Dyne Test Pen')),
            images: Array.isArray(p.images) && p.images.length > 0 ? p.images : ['https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp'],
            price: p.price > 0 ? p.price :0,
            displayPrice: p.price > 0 ? `₹${p.price}` : 'Price on Request',
            description: p.shortDesc || (typeof p.longDesc === 'string' ? p.longDesc.replace(/<[^>]*>?/gm, '').slice(0, 160) : 'Industrial surface testing and treatment verification solution.'),
            inStock: true
        }));

        if (dyneItems.length > 0) {
            return dyneItems;
        }

        return ALL_DYNE_PRODUCTS;
    }, [dbProducts]);

    const dyneOptions = ['28 Dyne/cm', '30 Dyne/cm', '32 Dyne/cm', '34 Dyne/cm', '38 Dyne/cm', '42 Dyne/cm'];

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => 
                (p.name && p.name.toLowerCase().includes(query)) ||
                (p.description && p.description.toLowerCase().includes(query)) ||
                (p.category && p.category.toLowerCase().includes(query))
            );
        }

        if (selectedCategory !== 'All') {
            result = result.filter(p => 
                p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (selectedSubcategory !== 'All') {
            result = result.filter(p => {
                const subName = typeof p.subcategory === 'object' ? p.subcategory?.name : p.subcategory;
                if (subName && subName.toLowerCase() === selectedSubcategory.toLowerCase()) return true;
                // fallback matching for title if subcategory wasn't explicitly populated
                if (selectedSubcategory === 'Dyne Test Pen' && p.name && p.name.toLowerCase().includes('pen')) return true;
                if (selectedSubcategory === 'Dyne Test Pen Ink' && p.name && p.name.toLowerCase().includes('ink')) return true;
                return false;
            });
        }

        if (selectedDynes.length > 0) {
            result = result.filter(p => {
                return selectedDynes.some(d => (p.name || '').includes(d.split(' ')[0]));
            });
        }

        if (sortBy === 'price-asc') {
            result.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => (b.price || 0) - (a.price || 0));
        }

        return result;
    }, [allProducts, searchQuery, selectedCategory, selectedSubcategory, selectedDynes, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <main className="pt-8 pb-20 min-h-screen bg-[#F5F8FC] font-sans">
            <SEO
                title="Industrial Product Catalogue | Dyne Test pen and Dyne test Ink"
                description="Explore ImageTech Industries complete range of MAGNET Dyne Test Pens (28 to 72 Dyne/cm), ASTM D2578 Dyne Test Inks, Doctor Blades, and testing equipment."
            />

            <div className="max-w-[1400px] mx-auto px-2 sm:px-4 md:px-8">
                
                {/* Clean Industrial Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 sm:pb-5 border-b border-[#DCE5EF]">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B3B6F] tracking-tight">
                            All Products
                        </h1>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        {/* Mobile Filter Button (visible only on mobile/tablet) */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden flex-1 sm:flex-none bg-white hover:bg-gray-50 text-[#0B3B6F] font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-xs border border-[#DCE5EF] inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
                        >
                            <SlidersHorizontal size={15} className="text-[#0B3B6F]" />
                            <span>Filters</span>
                            {(selectedCategory !== 'All' || selectedSubcategory !== 'All' || selectedDynes.length > 0) && (
                                <span className="w-2 h-2 rounded-full bg-[#0D6EFD]" />
                            )}
                        </button>

                        <button
                            onClick={() => setIsQuoteOpen(true)}
                            className="flex-1 sm:flex-none bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] font-black text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-95 inline-flex items-center justify-center gap-2 border border-yellow-500/30 shrink-0 cursor-pointer"
                        >
                            <FileText size={16} className="text-[#0B3B6F]" />
                            <span>Request Bulk RFQ</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Quick Category Horizontal Pills */}
                <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                    <button
                        onClick={() => {
                            setSelectedCategory('All');
                            setSelectedSubcategory('All');
                            navigate('/shop');
                        }}
                        className={`text-xs px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all shadow-2xs ${
                            selectedCategory === 'All' && selectedSubcategory === 'All'
                                ? 'bg-[#0B3B6F] text-white ring-2 ring-[#0B3B6F]/20'
                                : 'bg-white text-gray-700 border border-[#DCE5EF]'
                        }`}
                    >
                        All ({allProducts.length})
                    </button>
                    <button
                        onClick={() => {
                            setSelectedCategory('Dyne Test Pen');
                            setSelectedSubcategory('Dyne Test Pen');
                            navigate(`/shop?category=${encodeURIComponent('Dyne Test Pen')}&subcategory=${encodeURIComponent('Dyne Test Pen')}`);
                        }}
                        className={`text-xs px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all shadow-2xs ${
                            selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen'
                                ? 'bg-[#0B3B6F] text-white ring-2 ring-[#0B3B6F]/20'
                                : 'bg-white text-gray-700 border border-[#DCE5EF]'
                        }`}
                    >
                        Dyne Test Pen (22)
                    </button>
                    <button
                        onClick={() => {
                            setSelectedCategory('Dyne Test Pen');
                            setSelectedSubcategory('Dyne Test Pen Ink');
                            navigate(`/shop?category=${encodeURIComponent('Dyne Test Pen')}&subcategory=${encodeURIComponent('Dyne Test Pen Ink')}`);
                        }}
                        className={`text-xs px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all shadow-2xs ${
                            selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen Ink'
                                ? 'bg-[#0B3B6F] text-white ring-2 ring-[#0B3B6F]/20'
                                : 'bg-white text-gray-700 border border-[#DCE5EF]'
                        }`}
                    >
                        Dyne Test Ink (23)
                    </button>
                </div>

                {/* Main Catalogue Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Sidebar Filters (3 cols) - Sticky under navbar so it locks and stays in screen */}
                    <div className="hidden lg:block lg:col-span-3 sticky top-[165px] bg-white p-5 rounded-2xl border border-[#DCE5EF] shadow-xs space-y-4">
                        
                        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                            <span className="text-xs font-bold text-[#172B4D] uppercase tracking-wider flex items-center gap-1.5">
                                <Filter size={14} /> Technical Filters
                            </span>
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setSelectedDynes([]);
                                    setSearchQuery('');
                                    navigate('/shop');
                                }}
                                className="text-[11px] text-[#0D6EFD] hover:underline font-semibold"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <h4 className="text-[11px] font-black text-[#0B3B6F] uppercase tracking-wider mb-2">
                                Product Division
                            </h4>
                            <div className="space-y-1 text-xs">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSelectedSubcategory('All');
                                        navigate('/shop');
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center justify-between ${
                                        selectedCategory === 'All' && selectedSubcategory === 'All'
                                            ? 'bg-[#0B3B6F] text-white shadow-xs' 
                                            : 'text-[#172B4D] hover:bg-[#F5F8FC] border border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <span>All Dyne Products</span>
                                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                                        selectedCategory === 'All' && selectedSubcategory === 'All' ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#0B3B6F]'
                                    }`}>
                                        {allProducts.length}
                                    </span>
                                </button>

                                {/* Dyne Test Pen Subcategory */}
                                <button
                                    onClick={() => {
                                        setSelectedCategory('Dyne Test Pen');
                                        setSelectedSubcategory('Dyne Test Pen');
                                        navigate(`/shop?category=${encodeURIComponent('Dyne Test Pen')}&subcategory=${encodeURIComponent('Dyne Test Pen')}`);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center justify-between ${
                                        selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen'
                                            ? 'bg-[#0B3B6F] text-white shadow-xs' 
                                            : 'text-[#172B4D] hover:bg-[#F5F8FC] border border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <span>Dyne Test Pen</span>
                                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                                        selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#0D6EFD]'
                                    }`}>
                                        22
                                    </span>
                                </button>

                                {/* Dyne Test Pen Ink Subcategory */}
                                <button
                                    onClick={() => {
                                        setSelectedCategory('Dyne Test Pen');
                                        setSelectedSubcategory('Dyne Test Pen Ink');
                                        navigate(`/shop?category=${encodeURIComponent('Dyne Test Pen')}&subcategory=${encodeURIComponent('Dyne Test Pen Ink')}`);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center justify-between ${
                                        selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen Ink'
                                            ? 'bg-[#0B3B6F] text-white shadow-xs' 
                                            : 'text-[#172B4D] hover:bg-[#F5F8FC] border border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <span>Dyne Test Pen Ink</span>
                                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                                        selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen Ink' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
                                    }`}>
                                        23
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Dyne Level Filters */}
                        <div className="pt-2 border-t border-gray-100">
                            <h4 className="text-[11px] font-black text-[#0B3B6F] uppercase tracking-wider mb-2">
                                Target Dyne Rating
                            </h4>
                            <div className="grid grid-cols-2 gap-1.5">
                                {dyneOptions.map((dyne, idx) => {
                                    const isChecked = selectedDynes.includes(dyne);
                                    return (
                                        <label 
                                            key={idx} 
                                            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all cursor-pointer text-xs ${
                                                isChecked 
                                                    ? 'bg-blue-50 border-[#0D6EFD] text-[#0B3B6F] font-bold' 
                                                    : 'border-gray-200 hover:bg-gray-50 text-gray-700 font-medium'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    if (e.target.checked) setSelectedDynes([...selectedDynes, dyne]);
                                                    else setSelectedDynes(selectedDynes.filter(d => d !== dyne));
                                                }}
                                                className="w-3.5 h-3.5 rounded text-[#0B3B6F] focus:ring-[#0B3B6F] border-gray-300 cursor-pointer"
                                            />
                                            <span className="text-[11px] leading-tight font-mono">{dyne.replace(' Dyne/cm', '')} Dyne</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Quote Assistance */}
                        <div className="bg-gradient-to-br from-[#F5F8FC] to-[#EDF3FA] p-3.5 rounded-xl border border-[#DCE5EF] text-center">
                            <h5 className="text-[11px] font-black text-[#0B3B6F] mb-0.5 uppercase tracking-wide">Custom Dyne Formulations</h5>
                            <p className="text-[10px] text-gray-600 mb-2 leading-tight">
                                Need custom 28–72 Dyne/cm or OEM private labeling?
                            </p>
                            <button
                                onClick={() => setIsQuoteOpen(true)}
                                className="w-full bg-[#0B3B6F] hover:bg-[#08294d] text-white text-[11px] font-bold py-1.5 rounded-lg transition-all shadow-xs flex items-center justify-center cursor-pointer"
                            >
                                Contact Lab
                            </button>
                        </div>

                    </div>

                    {/* Products Grid (9 cols) */}
                    <div className="lg:col-span-9 space-y-6">
                        
                        {/* Control Bar: Product Count & Sort */}
                        <div className="bg-white p-4 rounded-xl border border-[#DCE5EF] flex flex-wrap items-center justify-between gap-4">
                            <div className="text-xs text-gray-600">
                                Showing <span className="font-bold text-[#172B4D]">{filteredProducts.length}</span> industrial products
                                {selectedCategory !== 'All' && (
                                    <span> in <span className="font-bold text-[#0B3B6F]">{selectedCategory}</span></span>
                                )}
                                {selectedSubcategory !== 'All' && (
                                    <span> &gt; <span className="font-bold text-[#0D6EFD]">{selectedSubcategory}</span></span>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-xs text-gray-500 font-medium">Sort By:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="text-xs font-semibold bg-[#F5F8FC] border border-[#DCE5EF] rounded-lg px-3 py-1.5 text-[#172B4D] outline-none"
                                >
                                    <option value="featured">Featured / Best Sellers</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Cards */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))}
                            </div>
                        ) : paginatedProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-[#DCE5EF]">
                                <h3 className="text-base font-bold text-[#172B4D] mb-1">No matching products found</h3>
                                <p className="text-xs text-gray-500 mb-4">Try clearing some filter criteria or search for a different dyne level.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSelectedDynes([]);
                                        setSearchQuery('');
                                    }}
                                    className="bg-[#0B3B6F] text-white text-xs font-bold px-4 py-2 rounded-lg"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                                {paginatedProducts.map((p, idx) => (
                                    <ProductCard key={p._id || idx} product={p} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-6">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                                            currentPage === i + 1 
                                                ? 'bg-[#0B3B6F] text-white' 
                                                : 'bg-white border border-[#DCE5EF] text-[#172B4D] hover:bg-gray-50'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}

                    </div>

                </div>

            </div>

            {/* Mobile Filter Bottom Drawer / Modal */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
                    <div 
                        className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <Filter size={16} className="text-[#0B3B6F]" />
                                <h3 className="text-sm font-black text-[#0B3B6F] uppercase tracking-wider">
                                    Technical Filters
                                </h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSelectedSubcategory('All');
                                        setSelectedDynes([]);
                                        setSearchQuery('');
                                    }}
                                    className="text-xs text-[#0D6EFD] font-bold hover:underline"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Drawer Body (Scrollable) */}
                        <div className="p-5 overflow-y-auto space-y-6">
                            
                            {/* 1. Product Division */}
                            <div>
                                <h4 className="text-xs font-black text-[#0B3B6F] uppercase tracking-wider mb-2.5">
                                    Product Division
                                </h4>
                                <div className="space-y-1.5">
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('All');
                                            setSelectedSubcategory('All');
                                        }}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center justify-between text-xs ${
                                            selectedCategory === 'All' && selectedSubcategory === 'All'
                                                ? 'bg-[#0B3B6F] text-white' 
                                                : 'text-gray-700 bg-gray-50 border border-gray-200'
                                        }`}
                                    >
                                        <span>All Dyne Products</span>
                                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white/20">
                                            {allProducts.length}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedCategory('Dyne Test Pen');
                                            setSelectedSubcategory('Dyne Test Pen');
                                        }}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center justify-between text-xs ${
                                            selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen'
                                                ? 'bg-[#0B3B6F] text-white' 
                                                : 'text-gray-700 bg-gray-50 border border-gray-200'
                                        }`}
                                    >
                                        <span>Dyne Test Pen</span>
                                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-[#0D6EFD]">
                                            22
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedCategory('Dyne Test Pen');
                                            setSelectedSubcategory('Dyne Test Pen Ink');
                                        }}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl font-bold transition-all flex items-center justify-between text-xs ${
                                            selectedCategory === 'Dyne Test Pen' && selectedSubcategory === 'Dyne Test Pen Ink'
                                                ? 'bg-[#0B3B6F] text-white' 
                                                : 'text-gray-700 bg-gray-50 border border-gray-200'
                                        }`}
                                    >
                                        <span>Dyne Test Pen Ink</span>
                                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                                            23
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* 2. Dyne Level Checkboxes */}
                            <div>
                                <h4 className="text-xs font-black text-[#0B3B6F] uppercase tracking-wider mb-2.5">
                                    Target Dyne Rating
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {dyneOptions.map((dyne, idx) => {
                                        const isChecked = selectedDynes.includes(dyne);
                                        return (
                                            <button 
                                                key={idx} 
                                                type="button"
                                                onClick={() => {
                                                    if (isChecked) setSelectedDynes(selectedDynes.filter(d => d !== dyne));
                                                    else setSelectedDynes([...selectedDynes, dyne]);
                                                }}
                                                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                                                    isChecked 
                                                        ? 'bg-[#0B3B6F] border-[#0B3B6F] text-white shadow-xs' 
                                                        : 'border-gray-200 bg-gray-50 text-gray-700'
                                                }`}
                                            >
                                                <span>{dyne.replace(' Dyne/cm', '')} Dyne</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Custom OEM Help */}
                            <div className="bg-[#F5F8FC] p-4 rounded-xl border border-[#DCE5EF] text-center">
                                <h5 className="text-xs font-bold text-[#0B3B6F] mb-1">Custom Dyne Formulations?</h5>
                                <p className="text-[11px] text-gray-500 mb-3">28 to 72 Dyne/cm or OEM private labeling available</p>
                                <button
                                    onClick={() => {
                                        setIsMobileFilterOpen(false);
                                        setIsQuoteOpen(true);
                                    }}
                                    className="w-full bg-[#0B3B6F] text-white text-xs font-bold py-2 rounded-lg"
                                >
                                    Contact Lab
                                </button>
                            </div>

                        </div>

                        {/* Drawer Footer CTA */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full bg-[#0B3B6F] text-white font-black text-sm py-3.5 rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
                            >
                                <span>Show {filteredProducts.length} Results</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <RequestQuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                initialProduct="Industrial Catalog Inquiry"
            />
        </main>
    );
};

export default Shop;
