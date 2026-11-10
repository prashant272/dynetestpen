import React, { useState, useEffect } from 'react';
import { 
    Search, User, Heart, ShoppingCart, Menu, X, ChevronRight, ChevronDown, 
    Phone, Mail, Award, FileText, ArrowRight, ShieldCheck, CheckCircle2,
    Layers, Sparkles, Building2, ExternalLink
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import RequestQuoteModal from './common/RequestQuoteModal';
import { INDUSTRIAL_CATEGORIES } from '../data/industrialData';

const Navbar = () => {
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCertModalOpen, setIsCertModalOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close drawers on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsMegaMenuOpen(false);
        setIsMobileSearchOpen(false);
    }, [location.pathname]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileMenuOpen(false);
            setIsMobileSearchOpen(false);
        }
    };

    const userInfo = (() => {
        try {
            return JSON.parse(localStorage.getItem('userInfo'));
        } catch {
            return null;
        }
    })();

    const totalCartCount = Array.isArray(cartItems) 
        ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
        : 0;

    return (
        <>
            <header className="sticky top-0 z-50 w-full font-sans bg-white select-none transition-shadow duration-300">
                
                {/* 1. TOP INDUSTRIAL ACCREDITATION STRIP */}
                <div className="bg-[#0B3B6F] text-white text-[11px] py-1.5 px-3 sm:px-6 border-b border-blue-900/40">
                    <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2">
                        
                        {/* Direct Contacts */}
                        <div className="flex items-center gap-3 sm:gap-4 font-medium text-blue-100">
                            <a 
                                href="tel:+918448336036" 
                                className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors"
                            >
                                <Phone size={12} className="text-[#FFC107]" />
                                <span className="font-semibold tracking-wide">+91-8448336036</span>
                            </a>
                            <span className="hidden sm:inline text-blue-300/40">|</span>
                            <a 
                                href="mailto:sales@imagetechindustries.com" 
                                className="hidden sm:flex items-center gap-1.5 hover:text-[#FFC107] transition-colors"
                            >
                                <Mail size={12} className="text-[#FFC107]" />
                                <span>sales@imagetechindustries.com</span>
                            </a>
                        </div>

                        {/* Center Tagline (Desktop) */}
                        <div className="hidden lg:flex items-center gap-2 text-white/90 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
                            <span>Manufacturer of Premium Dyne Test Pens, Inks &amp; Doctor Blades</span>
                        </div>

                        {/* ISO Accreditation Badge */}
                        <div className="flex items-center gap-1.5 bg-[#FFC107]/20 hover:bg-[#FFC107]/30 text-[#FFC107] px-2.5 py-0.5 rounded-md font-bold border border-[#FFC107]/40 tracking-wider shadow-xs">
                            <Award size={12} className="shrink-0" />
                            <span>ISO 9001:2015 Certified</span>
                        </div>

                    </div>
                </div>

                {/* 2. MAIN HEADER (Logo, Search, CTAs) */}
                <div className={`border-b border-[#E2E8F0] transition-all duration-200 ${isScrolled ? 'py-2 sm:py-2.5 shadow-sm' : 'py-2.5 sm:py-3.5'}`}>
                    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
                        
                        {/* Left: Mobile Hamburger & Brand Logo */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <button
                                className="lg:hidden p-2 -ml-1 text-[#172B4D] hover:text-[#0B3B6F] hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open Navigation Drawer"
                            >
                                <Menu size={22} />
                            </button>

                            <Link to="/" className="flex items-center group">
                                <img
                                    src="/logo.jpg"
                                    alt="ImageTech Industries Logo"
                                    className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                                />
                            </Link>
                        </div>

                        {/* Center: Large Desktop Industrial Product Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-4">
                            <form onSubmit={handleSearch} className="w-full relative">
                                <div className="flex items-center border border-[#DCE5EF] focus-within:border-[#0B3B6F] focus-within:ring-2 focus-within:ring-[#0B3B6F]/10 rounded-xl overflow-hidden transition-all bg-[#F8FAFC]">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by Dyne level, ink, doctor blade, or part number..."
                                        className="w-full py-2.5 pl-4 pr-10 text-xs sm:text-sm text-[#172B4D] placeholder-gray-400 bg-transparent outline-none font-medium"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Submit search"
                                        className="bg-[#0B3B6F] hover:bg-[#0D6EFD] text-white px-5 py-2.5 transition-colors flex items-center justify-center shrink-0"
                                    >
                                        <Search size={16} />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right: Actions (Mobile Search, Request Quote, Account, Wishlist, Cart) */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5">
                            
                            {/* Mobile Search Toggle Button */}
                            <button
                                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                                aria-label="Toggle search bar"
                                className="md:hidden p-2 text-gray-700 hover:text-[#0B3B6F] hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Search size={20} />
                            </button>

                            {/* Request a Quote CTA */}
                            <button
                                onClick={() => setIsQuoteOpen(true)}
                                className="inline-flex items-center gap-1.5 bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] text-xs font-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 border border-yellow-500/20 tracking-tight"
                            >
                                <FileText size={15} />
                                <span className="hidden xs:inline">Request a Quote</span>
                                <span className="xs:hidden">RFQ</span>
                            </button>

                            {/* Commercial User Portal */}
                            <Link
                                to={userInfo ? "/profile" : "/login"}
                                className="hidden sm:flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 text-[#172B4D] hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-[#DCE5EF]"
                                title={userInfo ? `Signed in as ${userInfo.name}` : "Client Portal Sign In"}
                            >
                                <div className="w-8 h-8 rounded-full bg-[#0B3B6F]/5 border border-[#DCE5EF] flex items-center justify-center text-[#0B3B6F]">
                                    <User size={16} />
                                </div>
                                <div className="hidden xl:block text-left leading-tight">
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Client Portal</span>
                                    <span className="text-xs font-black text-[#172B4D] truncate max-w-[100px] block">
                                        {userInfo ? userInfo.name?.split(' ')[0] : 'Sign In'}
                                    </span>
                                </div>
                            </Link>

                            {/* Wishlist Icon */}
                            <Link
                                to="/wishlist"
                                className="hidden sm:flex relative p-2 text-gray-700 hover:text-[#0B3B6F] hover:bg-gray-50 rounded-lg transition-colors"
                                aria-label="Saved specifications"
                            >
                                <Heart size={20} />
                                {wishlistItems?.length > 0 && (
                                    <span className="absolute top-1 right-1 bg-[#0D6EFD] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            {/* Shopping Cart Button */}
                            <Link
                                to="/cart"
                                className="relative flex items-center gap-2 bg-[#0B3B6F] hover:bg-[#082a50] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all shadow-sm active:scale-95"
                                aria-label="Procurement cart"
                            >
                                <ShoppingCart size={17} />
                                <span className="hidden sm:inline text-xs font-bold">Cart</span>
                                <span className="bg-[#FFC107] text-[#0B3B6F] text-[11px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-xs">
                                    {totalCartCount}
                                </span>
                            </Link>

                        </div>

                    </div>

                    {/* Mobile Expandable Search Dropdown */}
                    {isMobileSearchOpen && (
                        <div className="md:hidden px-3 pt-2.5 pb-1 animate-fade-in">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search Dyne pens, inks, doctor blades..."
                                    className="w-full py-2.5 pl-10 pr-4 text-xs bg-[#F8FAFC] border border-[#0B3B6F] rounded-xl text-[#172B4D] outline-none shadow-inner font-medium"
                                />
                                <Search size={16} className="absolute left-3.5 top-3 text-[#0B3B6F]" />
                            </form>
                        </div>
                    )}
                </div>

                {/* 3. DESKTOP NAVIGATION MENU & MEGA MENU */}
                <nav className="hidden lg:block bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
                        
                        {/* Nav Items */}
                        <ul className="flex items-center gap-1 font-semibold text-xs text-[#172B4D] tracking-wide">
                            
                            <li>
                                <Link 
                                    to="/" 
                                    className={`px-3.5 py-3 block hover:text-[#0B3B6F] transition-colors relative ${
                                        location.pathname === '/' 
                                            ? 'text-[#0B3B6F] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0B3B6F]' 
                                            : ''
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    to="/shop" 
                                    className={`px-3.5 py-3 block hover:text-[#0B3B6F] transition-colors relative ${
                                        location.pathname === '/shop' 
                                            ? 'text-[#0B3B6F] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0B3B6F]' 
                                            : ''
                                    }`}
                                >
                                    Products
                                </Link>
                            </li>

                            {/* Categories with Mega Menu Hover */}
                            <li 
                                className="relative"
                                onMouseEnter={() => setIsMegaMenuOpen(true)}
                                onMouseLeave={() => setIsMegaMenuOpen(false)}
                            >
                                <button 
                                    className={`px-3.5 py-3 flex items-center gap-1.5 hover:text-[#0B3B6F] transition-colors font-semibold ${
                                        isMegaMenuOpen ? 'text-[#0B3B6F]' : ''
                                    }`}
                                >
                                    <span>Categories</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#0B3B6F]' : 'text-gray-400'}`} />
                                </button>

                                {/* High-End Mega Menu Dropdown */}
                                {isMegaMenuOpen && (
                                    <div className="absolute top-full left-0 w-[780px] bg-white rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#DCE5EF] p-6 z-50 animate-fade-in">
                                        
                                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B3B6F]">
                                                    Industrial Product Divisions
                                                </h4>
                                                <p className="text-[11px] text-gray-500">
                                                    Formulated strictly per ASTM D-2578, ISO 8296 and flexo converting norms.
                                                </p>
                                            </div>
                                            <Link 
                                                to="/shop" 
                                                className="text-xs font-bold text-[#0D6EFD] hover:underline flex items-center gap-1"
                                            >
                                                Full Catalog <ChevronRight size={13} />
                                            </Link>
                                        </div>

                                        <div className="grid grid-cols-12 gap-5">
                                            {/* Subcategory 1: Dyne Test Pen */}
                                            <div className="col-span-6 bg-gradient-to-br from-blue-50/70 to-indigo-50/30 p-4 rounded-xl border border-blue-100 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-[#0D6EFD]" />
                                                            <h5 className="text-xs font-black uppercase tracking-wider text-[#0B3B6F]">
                                                                Dyne Test Pen Subcategory
                                                            </h5>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-[#0B3B6F] bg-white px-2 py-0.5 rounded shadow-2xs border border-blue-200">
                                                            23 Pens
                                                        </span>
                                                    </div>

                                                    <Link
                                                        to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
                                                        onClick={() => setIsMegaMenuOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DCE5EF] hover:border-[#0D6EFD] hover:shadow-xs transition-all group"
                                                    >
                                                        <div className="w-14 h-14 rounded-lg bg-[#0B3B6F]/5 border border-blue-100 overflow-hidden shrink-0">
                                                            <img 
                                                                src="https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/a9b2386377ae5a2a8ddfb3070f83f195.webp" 
                                                                alt="Dyne Test Pen" 
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h6 className="text-sm font-bold text-[#172B4D] group-hover:text-[#0D6EFD] truncate">
                                                                MAGNET Dyne Test Pen
                                                            </h6>
                                                            <p className="text-[11px] text-gray-500 mt-0.5">
                                                                Valve-action spring loaded pens (28 to 72 Dyne/cm)
                                                            </p>
                                                            <span className="inline-block mt-1.5 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                                                Explore 23 Pen Values &rarr;
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className="mt-3 pt-2.5 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-gray-500">
                                                    <span>ASTM D-2578 / ISO 8296</span>
                                                    <span className="font-semibold text-[#0B3B6F]">Available: 28–72 Dyne</span>
                                                </div>
                                            </div>

                                            {/* Subcategory 2: Dyne Test Pen Ink */}
                                            <div className="col-span-6 bg-gradient-to-br from-indigo-50/60 to-purple-50/30 p-4 rounded-xl border border-indigo-100 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-indigo-600" />
                                                            <h5 className="text-xs font-black uppercase tracking-wider text-[#0B3B6F]">
                                                                Dyne Test Pen Ink Subcategory
                                                            </h5>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded shadow-2xs border border-indigo-200">
                                                            23 Inks
                                                        </span>
                                                    </div>

                                                    <Link
                                                        to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen%20Ink"
                                                        onClick={() => setIsMegaMenuOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#DCE5EF] hover:border-[#0D6EFD] hover:shadow-xs transition-all group"
                                                    >
                                                        <div className="w-14 h-14 rounded-lg bg-[#0B3B6F]/5 border border-indigo-100 overflow-hidden shrink-0">
                                                            <img 
                                                                src="https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/products/72351621b7d9014281b6ef81aa567f7a.webp" 
                                                                alt="Dyne Test Pen Ink" 
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h6 className="text-sm font-bold text-[#172B4D] group-hover:text-[#0D6EFD] truncate">
                                                                Dyne Test Pen Ink Bottles
                                                            </h6>
                                                            <p className="text-[11px] text-gray-500 mt-0.5">
                                                                Calibrated testing liquids (28 to 72 Dyne/cm)
                                                            </p>
                                                            <span className="inline-block mt-1.5 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                                                                Explore 23 Ink Values &rarr;
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className="mt-3 pt-2.5 border-t border-indigo-200/60 flex items-center justify-between text-[11px] text-gray-500">
                                                    <span>100ml / 250ml Bottled Formulations</span>
                                                    <span className="font-semibold text-indigo-900">Lab Drawdown Tested</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Promo Ribbon inside Mega Menu */}
                                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs bg-[#F8FAFC] p-3 rounded-xl">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <ShieldCheck size={16} className="text-[#0B3B6F]" />
                                                <span>Custom Dyne levels (28 to 72 Dyne/cm) formulated upon request.</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setIsMegaMenuOpen(false);
                                                    setIsQuoteOpen(true);
                                                }}
                                                className="text-xs font-bold text-[#0B3B6F] hover:text-[#0D6EFD] underline"
                                            >
                                                Request Custom Calibration
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </li>

                            <li>
                                <Link 
                                    to="/about" 
                                    className={`px-3.5 py-3 block hover:text-[#0B3B6F] transition-colors relative ${
                                        location.pathname === '/about' 
                                            ? 'text-[#0B3B6F] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0B3B6F]' 
                                            : ''
                                    }`}
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <button 
                                    onClick={() => setIsCertModalOpen(true)}
                                    className="px-3.5 py-3 block hover:text-[#0B3B6F] transition-colors font-semibold cursor-pointer"
                                >
                                    Certifications
                                </button>
                            </li>

                            <li>
                                <Link 
                                    to="/blog" 
                                    className={`px-3.5 py-3 block hover:text-[#0B3B6F] transition-colors relative ${
                                        location.pathname === '/blog' 
                                            ? 'text-[#0B3B6F] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0B3B6F]' 
                                            : ''
                                    }`}
                                >
                                    Blog
                                </Link>
                            </li>

                            <li>
                                <Link 
                                    to="/contact" 
                                    className={`px-3.5 py-3 block hover:text-[#0B3B6F] transition-colors relative ${
                                        location.pathname === '/contact' 
                                            ? 'text-[#0B3B6F] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#0B3B6F]' 
                                            : ''
                                    }`}
                                >
                                    Contact Us
                                </Link>
                            </li>

                        </ul>

                        {/* Helpline on Right */}
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0B3B6F]">
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-500 font-normal">Technical Sales:</span>
                            <a href="tel:+918448336036" className="hover:text-[#0D6EFD] transition-colors tracking-wide">
                                +91 8448336036
                            </a>
                        </div>

                    </div>
                </nav>

                {/* 4. PREMIUM MOBILE SLIDE-OUT DRAWER */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] lg:hidden flex">
                        
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Sliding Container */}
                        <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300">
                            
                            {/* Drawer Header with Industrial Banner */}
                            <div className="p-4 bg-[#0B3B6F] text-white flex items-center justify-between border-b border-blue-900">
                                <div className="flex items-center gap-2.5">
                                    <img 
                                        src="/logo.jpg" 
                                        alt="ImageTech Industries" 
                                        className="h-9 w-auto brightness-0 invert" 
                                    />
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Client Portal Quick Access Bar in Drawer */}
                            <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-[#0B3B6F] text-white flex items-center justify-center font-bold text-xs">
                                        {userInfo ? userInfo.name?.charAt(0).toUpperCase() : <User size={16} />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#172B4D]">
                                            {userInfo ? userInfo.name : 'Commercial Portal'}
                                        </p>
                                        <p className="text-[10px] text-gray-500">
                                            {userInfo ? userInfo.email : 'Sign in for orders & invoices'}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    to={userInfo ? "/profile" : "/login"}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xs font-bold text-[#0B3B6F] hover:underline"
                                >
                                    {userInfo ? 'View' : 'Login'}
                                </Link>
                            </div>

                            {/* RFQ Action in Mobile Drawer */}
                            <div className="p-4 border-b border-gray-100">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsQuoteOpen(true);
                                    }}
                                    className="w-full bg-[#FFC107] hover:bg-[#e0a800] text-[#0B3B6F] py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <FileText size={16} />
                                    <span>Request an Industrial Quote</span>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="p-4 space-y-1 text-sm font-semibold">
                                <Link 
                                    to="/" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-[#0B3B6F]"
                                >
                                    <span>Home</span>
                                    <ChevronRight size={14} className="text-gray-400" />
                                </Link>

                                <Link 
                                    to="/shop" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-[#0B3B6F]"
                                >
                                    <span>All Industrial Products</span>
                                    <ChevronRight size={14} className="text-gray-400" />
                                </Link>

                                {/* Categories Section */}
                                <div className="pt-3 pb-1 text-[11px] font-black text-[#0B3B6F] uppercase tracking-wider px-3">
                                    Categories &amp; Subcategories
                                </div>

                                {/* Dyne Test Pen Accordion / Block */}
                                <div className="bg-blue-50/50 rounded-xl p-2.5 my-1 border border-blue-100">
                                    <div className="flex items-center justify-between px-1 pb-1">
                                        <span className="text-xs font-bold text-[#0B3B6F]">Dyne Test Pen</span>
                                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                                            2 Subcategories
                                        </span>
                                    </div>
                                    <div className="space-y-1 mt-1 pl-2">
                                        <Link
                                            to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white text-gray-800 text-xs font-medium border border-blue-100"
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#0D6EFD]" />
                                                Dyne Test Pen
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-mono">22 Pens</span>
                                        </Link>
                                        <Link
                                            to="/shop?category=Dyne%20Test%20Pen&subcategory=Dyne%20Test%20Pen%20Ink"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white text-gray-800 text-xs font-medium border border-blue-100"
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                                Dyne Test Pen Ink
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-mono">23 Inks</span>
                                        </Link>
                                    </div>
                                </div>

                                {INDUSTRIAL_CATEGORIES.filter(c => c.name !== 'Dyne Test Pen').map((cat, idx) => (
                                    <Link
                                        key={idx}
                                        to={`/shop?category=${encodeURIComponent(cat.name)}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between py-2 px-3 pl-5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#0B3B6F] text-xs font-medium"
                                    >
                                        <span>{cat.name}</span>
                                        <span className="text-[10px] text-gray-400 font-mono">{cat.count.split(' ')[0]}</span>
                                    </Link>
                                ))}

                                <div className="pt-3 pb-1 text-[11px] font-black text-[#0B3B6F] uppercase tracking-wider px-3">
                                    Company &amp; Resources
                                </div>
                                <Link 
                                    to="/about" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2.5 px-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-[#0B3B6F]"
                                >
                                    About ImageTech Industries
                                </Link>
                                <button 
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsCertModalOpen(true);
                                    }}
                                    className="w-full text-left block py-2.5 px-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-[#0B3B6F] font-medium"
                                >
                                    ISO 9001:2015 Certifications
                                </button>
                                <Link 
                                    to="/blog" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2.5 px-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-[#0B3B6F]"
                                >
                                    Technical Bulletins &amp; Blog
                                </Link>
                                <Link 
                                    to="/contact" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2.5 px-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-[#0B3B6F]"
                                >
                                    Contact &amp; Plant Location
                                </Link>
                                <Link 
                                    to="/faqs" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2.5 px-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-[#0B3B6F]"
                                >
                                    Frequently Asked Questions
                                </Link>
                            </div>

                            {/* Mobile Drawer Footer Contacts */}
                            <div className="mt-auto p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs text-gray-600 space-y-2">
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-[#0B3B6F]" />
                                    <a href="tel:+918448336036" className="font-bold text-[#0B3B6F]">
                                        +91 8448336036
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-[#0B3B6F]" />
                                    <a href="mailto:sales@imagetechindustries.com" className="text-gray-600 truncate">
                                        sales@imagetechindustries.com
                                    </a>
                                </div>
                                <div className="pt-2 text-[10px] text-gray-400">
                                    C-31, Nawada Housing Complex, New Delhi - 110059
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </header>

            {/* Certificate Modal Lightbox */}
            {isCertModalOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setIsCertModalOpen(false)}
                >
                    <div 
                        className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <Award size={20} className="text-[#0B3B6F]" />
                                <h3 className="text-base font-black text-[#0B3B6F]">
                                    ISO 9001:2015 Quality Certificate
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsCertModalOpen(false)}
                                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center max-h-[75vh]">
                            <img
                                src="https://www.imagetechindustries.com/images/certification.jpg"
                                alt="ImageTech ISO 9001:2015 Certification"
                                className="w-full h-full object-contain max-h-[70vh]"
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                            <span>ImageTech Industries Quality Assurance</span>
                            <a
                                href="https://www.imagetechindustries.com/images/certification.jpg"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#0D6EFD] font-bold hover:underline"
                            >
                                Open Full Resolution &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Request a Quote Dialog */}
            <RequestQuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                initialProduct="Header RFQ Inquiry"
            />
        </>
    );
};

export default Navbar;
