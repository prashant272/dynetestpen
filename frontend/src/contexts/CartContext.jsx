import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getOfflineCart, saveOfflineCart, clearOfflineCart } from '../offline/db';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Fallback hydration from IndexedDB if localStorage was empty
    useEffect(() => {
        if (cartItems.length === 0) {
            getOfflineCart().then((items) => {
                if (items && items.length > 0) {
                    setCartItems(items);
                    localStorage.setItem('cart', JSON.stringify(items));
                }
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        saveOfflineCart(cartItems);
    }, [cartItems]);

    const addToCart = (product, qty = 1) => {
        setCartItems(prevItems => {
            const colorKey = product.selectedColor || 'Blue';
            const sizeKey = product.selectedSize || 'Standard';
            const uniqueId = `${product._id}-${sizeKey}-${colorKey}`;
            
            const existItem = prevItems.find(x => {
                const xColor = x.selectedColor || 'Blue';
                const xSize = x.selectedSize || 'Standard';
                return `${x._id}-${xSize}-${xColor}` === uniqueId;
            });
            
            toast.success(`${product.name || product.title} (${colorKey}) added to cart!`);
            
            if (existItem) {
                return prevItems.map(x => {
                    const xColor = x.selectedColor || 'Blue';
                    const xSize = x.selectedSize || 'Standard';
                    return `${x._id}-${xSize}-${xColor}` === uniqueId 
                        ? { ...x, qty: x.qty + qty } 
                        : x;
                });
            } else {
                return [...prevItems, { ...product, selectedColor: colorKey, selectedSize: sizeKey, qty }];
            }
        });
    };

    const removeFromCart = (id, size = null, color = null) => {
        setCartItems(prevItems => prevItems.filter(x => {
            if (size || color) {
                const matchId = x._id === id;
                const matchSize = !size || (x.selectedSize === size);
                const matchColor = !color || (x.selectedColor === color);
                return !(matchId && matchSize && matchColor);
            }
            return x._id !== id;
        }));
        toast.info("Item removed from cart");
    };

    const updateQty = (id, qty, size = null, color = null) => {
        setCartItems(prevItems =>
            prevItems.map(x => {
                const matchId = x._id === id;
                const matchSize = !size || (x.selectedSize === size);
                const matchColor = !color || (x.selectedColor === color);
                return (matchId && matchSize && matchColor) ? { ...x, qty } : x;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
        clearOfflineCart();
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
