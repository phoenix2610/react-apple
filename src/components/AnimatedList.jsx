import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientText from './GradientText';

gsap.registerPlugin(ScrollTrigger);

const AnimatedList = ({
    items,
    onItemSelect = () => { },
    showGradients = true,
    enableArrowNavigation = false,
    displayScrollbar = false,
    className = ""
}) => {
    const listRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const gradientColors = [
        ["#60a5fa", "#a855f7", "#ec4899", "#60a5fa"],
        ["#facc15", "#f97316", "#ef4444", "#facc15"],
        ["#4ade80", "#14b8a6", "#3b82f6", "#4ade80"],
        ["#f472b6", "#c084fc", "#60a5fa", "#f472b6"],
        ["#fb923c", "#fbbf24", "#a3e635", "#fb923c"]
    ];

    useEffect(() => {
        const listItems = listRef.current?.querySelectorAll('.animated-list-item');

        if (listItems && listItems.length > 0) {
            gsap.fromTo(
                listItems,
                {
                    x: -30,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, [items]);

    useEffect(() => {
        if (!enableArrowNavigation) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, -1));
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                onItemSelect(items[selectedIndex], selectedIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enableArrowNavigation, selectedIndex, items, onItemSelect]);

    const handleItemClick = (item, index) => {
        setSelectedIndex(index);
        onItemSelect(item, index);
    };

    return (
        <div
            ref={listRef}
            className={`animated-list space-y-6 ${displayScrollbar ? 'overflow-auto max-h-96' : 'overflow-hidden'} ${className}`}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`animated-list-item cursor-pointer transition-all duration-300 hover:translate-x-3 ${selectedIndex === index ? 'translate-x-3 opacity-100' : ''
                        }`}
                    onClick={() => handleItemClick(item, index)}
                    role="button"
                    tabIndex={0}
                >
                    {showGradients ? (
                        <GradientText
                            colors={gradientColors[index % gradientColors.length]}
                            animationSpeed={3}
                            showBorder={false}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold"
                        >
                            {item}
                        </GradientText>
                    ) : (
                        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            {item}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AnimatedList;
