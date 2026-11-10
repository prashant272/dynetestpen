import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Layers, Heart, ShoppingCart, User, FileText } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

const BottomNav = () => {
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const location = useLocation();

    // Hide bottom nav on admin routes, reels, and checkout payment screen
    if (
        location.pathname.startsWith('/admin') ||
        location.pathname.startsWith('/reels') ||
        location.pathname === '/checkout/payment'
    ) {
        return null;
    }

    const token = localStorage.getItem('userToken');

    const totalCartCount = Array.isArray(cartItems) 
        ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
        : 0;

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Products', icon: Layers, path: '/shop' },
        { name: 'Saved', icon: Heart, path: '/wishlist', badge: wishlistItems?.length },
        { name: 'Cart', icon: ShoppingCart, path: '/cart', badge: totalCartCount },
        { name: 'Account', icon: User, path: token ? '/profile' : '/login' }
    ];

    const handleTabClick = (path) => {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(8);
        }
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav
            aria-label="Mobile Bottom Navigation"
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#DCE5EF] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)' }}
        >
            <div className="flex justify-around items-center h-14 max-w-md mx-auto px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => handleTabClick(item.path)}
                            className={({ isActive }) =>
                                `relative flex flex-col items-center justify-center w-full h-full py-1 text-[11px] font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'text-[#0B3B6F] font-bold scale-105'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="relative">
                                        <Icon 
                                            size={20} 
                                            strokeWidth={isActive ? 2.5 : 2} 
                                            className={isActive ? 'text-[#0B3B6F]' : 'text-gray-500'} 
                                        />
                                        {!!item.badge && item.badge > 0 && (
                                            <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-[#FFC107] text-[#0B3B6F] text-[10px] font-black rounded-full flex items-center justify-center border border-white shadow-xs">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <span className="mt-0.5 tracking-tight">{item.name}</span>
                                    {isActive && (
                                        <span className="absolute bottom-1 w-1 h-1 bg-[#0B3B6F] rounded-full" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
};

export default React.memo(BottomNav);
