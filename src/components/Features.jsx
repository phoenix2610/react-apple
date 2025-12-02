import React, { useEffect, useRef, useState } from 'react';
import MacbookCanvas from './MacbookCanvas';
import useMacbookStore from './store';
import { features } from './constants/index.js';
import FloatingLines from './FloatingLines';
import GradientText from './GradientText';

const Features = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const { setTexture, setScale } = useMacbookStore();

    useEffect(() => {
        // Set scale for features section
        setScale(0.08);

        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll progress through the section (0 to 1)
            const scrollStart = windowHeight;
            const scrollEnd = -sectionHeight;
            const scrollRange = scrollStart - scrollEnd;
            const currentScroll = rect.top - scrollEnd;

            let progress = 1 - (currentScroll / scrollRange);
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);

            // Calculate which feature is active (divide into 5 segments)
            const featureIndex = Math.min(Math.floor(progress * features.length), features.length - 1);
            setActiveFeatureIndex(featureIndex);

            // Update texture when feature changes
            if (features[featureIndex]) {
                setTexture(features[featureIndex].video);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setTexture, setScale]);

    // Smoother rotation with reduced speed (half of previous)
    const rotationY = scrollProgress * Math.PI * 2; // 360 degrees / 1 full rotation
    const rotation = [0, rotationY, 0];

    return (
        <section ref={sectionRef} className="min-h-[150vh] relative bg-gradient-to-b from-black to-[#1a1a1a] p-0 overflow-hidden">
            {/* FloatingLines Background - Bottom Centered */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: 0,
                display: 'flex',
                alignItems: 'flex-end', // Align to bottom
                justifyContent: 'center',
                paddingBottom: '50px' // Add some padding from bottom
            }}>
                <FloatingLines
                    linesGradient={['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']}
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[8, 12, 10]}
                    lineDistance={[6, 5, 7]}
                    topWavePosition={{ x: 8.0, y: 0.0, rotate: -0.3 }}
                    middleWavePosition={{ x: 5.0, y: 0.0, rotate: 0.2 }}
                    bottomWavePosition={{ x: 3.0, y: 0.0, rotate: 0.4 }}
                    animationSpeed={1.2}
                    interactive={true}
                    bendRadius={4.0}
                    bendStrength={-0.6}
                    mouseDamping={0.12}
                    parallax={true}
                    parallaxStrength={0.15}
                    mixBlendMode="screen"
                />
            </div>

            {/* Content - Above FloatingLines */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
                <div className="absolute top-10 text-center z-20 w-full">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Powerful Features</h2>
                    <p className="text-xl text-gray-400">Discover what makes this MacBook exceptional</p>
                </div>

                <div className="w-full h-[60vh] flex items-center justify-center max-w-[1600px] mx-auto relative">

                    {/* Render ALL features with gradient text */}
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`absolute flex flex-col gap-4 max-w-[300px] z-20 transition-all duration-700 ease-out ${feature.className} ${index === activeFeatureIndex
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-10 pointer-events-none'
                                }`}
                        >
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="w-12 h-12 object-contain"
                            />
                            <GradientText
                                colors={['#A78BFA', '#DDD6FE', '#C4B5FD', '#8B5CF6', '#A78BFA']} // Start and end with same color for smooth loop
                                animationSpeed={3}
                                showBorder={false}
                                className="text-2xl font-bold"
                            >
                                {feature.title}
                            </GradientText>
                            <GradientText
                                colors={['#E9D5FF', '#F3E8FF', '#DDD6FE', '#E9D5FF']} // Start and end with same color
                                animationSpeed={5}
                                showBorder={false}
                                className="text-lg leading-relaxed"
                            >
                                {feature.description}
                            </GradientText>
                        </div>
                    ))}

                    {/* CENTER - 3D MacBook */}
                    <div className="w-1/2 h-full relative z-10 flex items-center justify-center">
                        <MacbookCanvas
                            mode="features"
                            rotation={rotation}
                        />
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                    {features.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeFeatureIndex ? 'bg-white scale-125' : 'bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;