import React, { useState, useEffect } from 'react';

const isRunningStandalone = () => {
    if (typeof window === 'undefined') return false;
    const isStandaloneDisplay = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone = window.navigator && window.navigator.standalone === true;
    const hasPwaSource = window.location.search.includes('source=pwa');
    const isAndroidApp = document.referrer && document.referrer.includes('android-app://');
    return Boolean(isStandaloneDisplay || isIosStandalone || hasPwaSource || isAndroidApp);
};

const SplashScreen = () => {
    // Only display if opened as installed app (standalone mode), NEVER in standard browser tabs
    const [isVisible, setIsVisible] = useState(() => {
        if (!isRunningStandalone()) return false;
        return !sessionStorage.getItem('imagetech_splash_seen');
    });
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // If not running as installed standalone app, never display
        if (!isRunningStandalone()) {
            setIsVisible(false);
            return;
        }

        // Only show once per app session
        const hasSeenSplash = sessionStorage.getItem('imagetech_splash_seen');
        if (hasSeenSplash) {
            setIsVisible(false);
            return;
        }

        // Start fading out after 1.5 seconds
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 1500);

        // Remove completely from DOM after fade completes
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('imagetech_splash_seen', 'true');
        }, 2100);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    const handleDismiss = () => {
        setIsFading(true);
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('imagetech_splash_seen', 'true');
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            onClick={handleDismiss}
            role="presentation"
            aria-label="Welcome to ImageTech Industries"
            className={`fixed inset-0 z-[99999] bg-[#0B3B6F] flex flex-col items-center justify-center select-none cursor-pointer transition-opacity duration-600 ease-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            <div className="flex flex-col items-center gap-4 z-10 text-center px-6">
                <img src="/logo.svg" alt="ImageTech Industries" className="h-16 w-auto brightness-0 invert" />
                <p className="text-xs uppercase font-bold tracking-[0.25em] text-[#FFC107]">Surface Testing Solutions</p>
                <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden mt-2">
                    <div className="w-1/2 h-full bg-[#FFC107] rounded-full animate-[pulse_1.2s_infinite_ease-in-out]" />
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
