import React, { useState } from 'react';
import { ShoppingCart, Eye, Zap, Check, Heart, Trash2, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import RequestQuoteModal from './common/RequestQuoteModal';

const ProductCard = ({ product, isWishlistPage = false }) => {
    const { name, title, price, description, images, category, dyneLevel, inStock = true, stock = 100 } = product;
    const { addToCart } = useCart();
    const { toggleWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const categoryDisplay = typeof category === 'object' ? category?.name : category;
    const subcategoryDisplay = typeof product.subcategory === 'object' ? product.subcategory?.name : product.subcategory;
    const productName = title || name || product.slug?.replace(/-/g, ' ').toUpperCase() || 'Dyne Test Solution';

    // Extract or compute Dyne Level if present in name
    const detectedDyne = dyneLevel || (() => {
        const match = productName?.match(/(\d{2})\s*DYNE/i);
        return match ? `${match[1]} Dyne/cm` : null;
    })();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({ ...product, selectedSize: 'Standard' }, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        addToCart({ ...product, selectedSize: 'Standard' }, quantity);
        if (!localStorage.getItem('userToken')) {
            navigate('/login?redirect=/checkout/address');
            return;
        }
        navigate('/checkout/address');
    };

    const handleCardClick = () => {
        navigate(`/product/${product.slug || product._id}`);
    };

    const productImage = (images && images.length > 0)
        ? images[0]
        : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';

    return (
        <>
            <div
                className="group bg-white rounded-xl border border-[#DCE5EF] hover:border-[#0D6EFD] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer relative"
                onClick={handleCardClick}
            >
                {/* Header Badges & Wishlist Trigger */}
                <div className="absolute top-2.5 left-2.5 z-10 hidden sm:flex flex-col gap-1 items-start">
                    {detectedDyne && (
                        <span className="bg-[#0B3B6F] text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded shadow-xs tracking-wide">
                            {detectedDyne}
                        </span>
                    )}
                    {subcategoryDisplay ? (
                        <span className="bg-white/95 backdrop-blur-xs text-[#0B3B6F] border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                            {subcategoryDisplay}
                        </span>
                    ) : categoryDisplay && (
                        <span className="bg-white/90 backdrop-blur-xs text-[#172B4D] border border-gray-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                            {categoryDisplay}
                        </span>
                    )}
                </div>

                <div className="absolute top-2.5 right-2.5 z-10">
                    {isWishlistPage ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                removeFromWishlist(product._id || product.id);
                            }}
                            className="p-1.5 bg-red-600 hover:bg-red-700 rounded-full shadow-sm transition-colors text-white"
                            title="Remove specification"
                        >
                            <Trash2 size={15} />
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                toggleWishlist(product);
                            }}
                            className="p-1.5 bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 rounded-full backdrop-blur-xs shadow-xs border border-gray-200 transition-colors"
                            title="Save for Later"
                        >
                            <Heart 
                                size={15} 
                                className={`transition-colors ${isInWishlist(product._id || product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                            />
                        </button>
                    )}
                </div>

                {/* Industrial Product Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border-b border-[#DCE5EF] flex items-center justify-center p-3">
                    <OptimizedImage
                        src={productImage}
                        alt={name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Quick View Hover Strip */}
                    <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-[#0B3B6F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick();
                            }}
                            className="text-xs font-bold text-white flex items-center gap-1 hover:underline"
                        >
                            <Eye size={13} /> View Full Specification
                        </button>
                    </div>
                </div>

                {/* Technical Product Info */}
                <div className="p-2.5 sm:p-4 flex flex-col flex-1">
                    
                    {/* Stock Status Indicator */}
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5 text-[10px] sm:text-[11px]">
                        <span className="flex items-center gap-1 font-semibold text-green-700 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                            <span className="truncate">{inStock ? 'In Stock' : 'Custom Batch'}</span>
                        </span>
                        <span className="text-gray-400 text-[9px] sm:text-[10px] shrink-0 font-mono hidden xs:inline">ISO 9001</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xs sm:text-sm md:text-base font-black text-[#172B4D] group-hover:text-[#0D6EFD] transition-colors line-clamp-2 leading-tight mb-1 min-h-[2rem]">
                        {productName}
                    </h3>

                    {/* Description - Compact on mobile, fuller on desktop */}
                    <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
                        {description || "High-precision surface energy testing tool engineered for film converting, flexo printing and corona discharge validation."}
                    </p>

                    {/* Commercial Pricing & Quantity Strip */}
                    <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100 space-y-2 sm:space-y-3">
                        
                        <div className="flex items-center justify-between gap-1">
                            <div>
                                <span className="block text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                                    {quantity > 1 ? `Total (${quantity})` : 'Base Price'}
                                </span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm sm:text-base md:text-lg font-black text-[#0B3B6F]">₹{price * quantity}</span>
                                    <span className="text-[9px] sm:text-[11px] text-gray-500">
                                        {quantity > 1 ? `(₹${price})` : '/ unit'}
                                    </span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 shrink-0" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-l cursor-pointer"
                                    type="button"
                                >
                                    -
                                </button>
                                <span className="px-1.5 sm:px-2 text-[11px] sm:text-xs font-mono font-bold text-gray-800">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-r cursor-pointer"
                                    type="button"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons: Add to Cart & Buy Now */}
                        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                            <button
                                onClick={handleAddToCart}
                                type="button"
                                className={`text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1 border active:scale-95 cursor-pointer ${
                                    isAdded 
                                        ? 'bg-green-50 text-green-700 border-green-300' 
                                        : 'bg-[#F5F8FC] text-[#0B3B6F] border-[#DCE5EF] hover:bg-blue-50'
                                }`}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={12} className="shrink-0" /> <span className="truncate">Added</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={12} className="shrink-0" /> <span className="truncate">Add</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleBuyNow}
                                type="button"
                                className="bg-[#0B3B6F] hover:bg-[#0D6EFD] text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                            >
                                <Zap size={12} className="fill-[#FFC107] text-[#FFC107] shrink-0" />
                                <span className="truncate">Buy</span>
                            </button>
                        </div>

                        {/* Request Bulk Quote Secondary Link (Desktop only) */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsQuoteOpen(true);
                            }}
                            className="hidden sm:flex w-full text-center text-[11px] font-bold text-[#0D6EFD] hover:underline pt-1 items-center justify-center gap-1 cursor-pointer"
                        >
                            <FileText size={12} /> Bulk / OEM Quote Inquiry
                        </button>

                    </div>
                </div>
            </div>

            <RequestQuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                initialProduct={name}
            />
        </>
    );
};

export default React.memo(ProductCard);
