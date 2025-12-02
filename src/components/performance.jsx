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
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            const scrollStart = windowHeight;
            const scrollEnd = -sectionHeight;
            const scrollRange = scrollStart - scrollEnd;
            const currentScroll = sectionTop - scrollEnd;

            let progress = 1 - (currentScroll / scrollRange);
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

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

        const spreadFactor = scrollProgress <= 0.5
            ? scrollProgress * 2
            : (1 - scrollProgress) * 2;

        if (position.center) {
            const scale = 0.3 + (spreadFactor * 0.9);
            return {
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: spreadFactor,
                zIndex: 10,
                transition: 'none'
            };
        }

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

        const currentLeft = 50 + (targetLeft - 50) * spreadFactor;
        const currentTop = 50 + (targetTop - 50) * spreadFactor;

        return {
            left: `${currentLeft}%`,
            top: `${currentTop}%`,
            transform: `translate(-50%, -50%) scale(${spreadFactor})`,
            opacity: spreadFactor * 0.85,
            zIndex: 2,
            transition: 'none'
        };
    };

    return (
        <section ref={sectionRef} className="performance-section">
            <div className="performance-container">
                <div className="performance-content" style={{
                    opacity: Math.min(scrollProgress * 3, 1),
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