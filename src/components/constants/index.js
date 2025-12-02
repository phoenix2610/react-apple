export const navlinks = [
    { label: 'store' },
    { label: 'mac' },
    { label: 'ipad' },
    { label: 'iphone' },
    { label: 'watch' },
    { label: 'airpods' },
    { label: 'music' },
    { label: 'support' }
];

export const performanceImages = [
    { id: 'p1', src: '/performance1.png', alt: 'Performance 1' },
    { id: 'p2', src: '/performance2.png', alt: 'Performance 2' },
    { id: 'p3', src: '/performance3.png', alt: 'Performance 3' },
    { id: 'p4', src: '/performance4.png', alt: 'Performance 4' },
    { id: 'p5', src: '/performance5.jpg', alt: 'Performance Main' },
    { id: 'p6', src: '/performance6.png', alt: 'Performance 6' },
    { id: 'p7', src: '/performance7.png', alt: 'Performance 7' }
];

export const performanceImgPositions = [
    { id: 'p1', left: 35, top: 15 },      // goes far left and top
    { id: 'p2', left: 45, top: 25 },      // goes left and top  
    { id: 'p3', right: 35, top: 15 },     // goes far right and top
    { id: 'p4', right: 45, top: 25 },     // goes right and top
    { id: 'p5', center: true },           // stays at center (main element)
    { id: 'p6', left: 45, bottom: 25 },   // goes left and bottom
    { id: 'p7', right: 45, bottom: 25 }   // goes right and bottom
];

export const features = [
    {
        id: 1,
        title: 'Power & Performance',
        description: 'Experience lightning-fast performance with the latest M3 chip technology.',
        video: '/videos/feature-1.mp4',
        icon: '/feature-icon1.svg',
        className: 'top-[20%] left-[5%] text-right items-end'
    },
    {
        id: 2,
        title: 'Stunning Display',
        description: 'Immerse yourself in brilliant colors and incredible detail with Liquid Retina XDR.',
        video: '/videos/feature-2.mp4',
        icon: '/feature-icon2.svg',
        className: 'top-[35%] right-[5%] text-left items-start'
    },
    {
        id: 3,
        title: 'All-Day Battery',
        description: 'Work unplugged with up to 22 hours of battery life for maximum productivity.',
        video: '/videos/feature-3.mp4',
        icon: '/feature-icon3.svg',
        className: 'top-[50%] left-[5%] text-right items-end'
    },
    {
        id: 4,
        title: 'Advanced Camera',
        description: 'Stay connected with a 1080p FaceTime HD camera and studio-quality mics.',
        video: '/videos/feature-4.mp4',
        icon: '/feature-icon4.svg',
        className: 'top-[65%] right-[5%] text-left items-start'
    },
    {
        id: 5,
        title: 'Connectivity',
        description: 'Connect everything with Thunderbolt 4 ports, Wi-Fi 6E, and Bluetooth 5.3.',
        video: '/videos/feature-5.mp4',
        icon: '/feature-icon5.svg',
        className: 'top-[80%] left-[5%] text-right items-end'
    }
];