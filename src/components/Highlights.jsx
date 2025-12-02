import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedList from './AnimatedList';

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;

        // Section fade in
        gsap.fromTo(el,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Title animation
        gsap.fromTo(title,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Subtitle animation
        gsap.fromTo(subtitle,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                scrollTrigger: {
                    trigger: subtitle,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, []);

    const items = [
        'Ultra-smooth performance',
        'Stunning visuals',
        'All day battery life'
    ];

    return (
        <section
            ref={sectionRef}
            className="highlights-section relative w-full min-h-screen overflow-hidden bg-black text-white flex flex-col"
            style={{
                backgroundImage: 'url(/highlight-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'crisp-edges'
            }}
        >
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 pb-10">
                {/* Main Title */}
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-center"
                    style={{
                        color: '#8E9AAF',
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)'
                    }}
                >
                    MacBook Pro M3
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-base md:text-lg lg:text-xl text-gray-200 mb-16 max-w-3xl mx-auto text-center"
                    style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
                >
                    Experience the power of the new M3 chip in a design that defies physics.
                </p>

                {/* Feature List - Top positioned */}
                <AnimatedList
                    items={items}
                    onItemSelect={(item, index) => console.log(item, index)}
                    showGradients={true}
                    enableArrowNavigation={true}
                    displayScrollbar={false}
                    className="max-w-3xl mx-auto text-left"
                />
            </div>
        </section>
    );
};

export default Highlights;