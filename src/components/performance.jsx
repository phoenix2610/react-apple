import React, { useEffect, useRef, useState } from 'react';
import { performanceImages, performanceImgPositions } from './constants/index.js';

const Performance = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll progress through the section
            // Progress goes from 0 (top of section at bottom of viewport) to 1 (bottom of section at top of viewport)
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            // Calculate progress based on section position
            // When section enters view from bottom: progress = 0
            // When section center aligns with viewport center: progress = 0.5
            // When section exits from top: progress = 1
            const scrollStart = windowHeight;
            const scrollEnd = -sectionHeight;
            const scrollRange = scrollStart - scrollEnd;
            const currentScroll = sectionTop - scrollEnd;

            let progress = 1 - (currentScroll / scrollRange);
            progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getImageStyle = (imageId) => {
        const position = performanceImgPositions.find((pos) => pos.id === imageId);

        if (!position) {
            return {
                opacity: 0,
                visibility: 'hidden'
            };
        }

        // Calculate spread factor based on scroll progress
        // At progress 0 (top): spreadFactor = 0 (images hidden/centered)
        // At progress 0.5 (center): spreadFactor = 1 (images fully spread)
        // At progress 1 (bottom): spreadFactor = 0 (images hidden/centered again)
        const spreadFactor = scrollProgress <= 0.5
            ? scrollProgress * 2  // 0 to 1 in first half
            : (1 - scrollProgress) * 2;  // 1 to 0 in second half

        // Center image (p5) stays centered and scales up
        if (position.center) {
            const scale = 0.3 + (spreadFactor * 0.9); // Scale from 0.3 to 1.2
            return {
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: spreadFactor,
                zIndex: 10,
                transition: 'none' // Smooth scroll-driven animation
            };
        }

        // Calculate final positions for other images
        let targetLeft = 50;
        let targetTop = 50;

        if (position.left !== undefined) {
            targetLeft = position.left;
        } else if (position.right !== undefined) {
            targetLeft = 100 - position.right;
        }

        if (position.top !== undefined) {
            targetTop = position.top;
        } else if (position.bottom !== undefined) {
            targetTop = 100 - position.bottom;
        }

        // Interpolate between center (50%, 50%) and target position based on spreadFactor
        const currentLeft = 50 + (targetLeft - 50) * spreadFactor;
        const currentTop = 50 + (targetTop - 50) * spreadFactor;

        return {
            left: `${currentLeft}%`,
            top: `${currentTop}%`,
            transform: `translate(-50%, -50%) scale(${spreadFactor})`,
            opacity: spreadFactor * 0.85,
            zIndex: 2,
            transition: 'none' // Smooth scroll-driven animation
        };
    };

    return (
        <section ref={sectionRef} className="performance-section">
            <div className="performance-container">
                <div className="performance-content" style={{
                    opacity: Math.min(scrollProgress * 3, 1), // Fade in quickly
                    transform: `translateY(${(1 - Math.min(scrollProgress * 2, 1)) * 30}px)`,
                    transition: 'none'
                }}>
                    <h2 className="performance-title">Extreme Performance</h2>
                    <p className="performance-subtitle">Powered by Apple Silicon</p>
                </div>

                <div className="performance-images">
                    {performanceImages.map((image) => (
                        <img
                            key={image.id}
                            src={image.src}
                            alt={image.alt}
                            className="performance-image"
                            style={getImageStyle(image.id)}
                            loading="eager"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Performance;