import { useState, useEffect } from 'react';

/**
 * Returns current window dimensions and updates on resize.
 * Replaces direct window.innerWidth usage in JSX which doesn't respond to resize.
 */
const useWindowSize = () => {
    const [size, setSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        // Set initial value in case it changed before mount
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};

export default useWindowSize;
