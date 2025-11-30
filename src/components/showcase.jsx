import React, { useRef } from 'react';
import { useMediaQuery } from "@react-hook/media-query";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const videoRef = useRef(null);

    useGSAP(() => {
        if (!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#showcase",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                    onEnter: () => {
                        if (videoRef.current) {
                            videoRef.current.muted = false;
                            videoRef.current.play().catch(err => {
                                console.log("Video play failed:", err);
                                // Fallback to muted if audio autoplay is blocked
                                videoRef.current.muted = true;
                                videoRef.current.play();
                            });
                        }
                    },
                    onLeave: () => {
                        if (videoRef.current) {
                            videoRef.current.pause();
                        }
                    },
                    onEnterBack: () => {
                        if (videoRef.current) {
                            videoRef.current.muted = false;
                            videoRef.current.play().catch(err => {
                                console.log("Video play failed:", err);
                                videoRef.current.muted = true;
                                videoRef.current.play();
                            });
                        }
                    },
                    onLeaveBack: () => {
                        if (videoRef.current) {
                            videoRef.current.pause();
                        }
                    }
                }
            });

            timeline
                .to('.mask img', {
                    scale: 60,
                    duration: 2,
                    ease: "power1.inOut"
                })
                .to('.content', {
                    opacity: 1,
                    y: 0,
                    ease: "power1.in"
                });
        }
    }, [isTablet]);

    return (
        <section id="showcase">
            <div className="media">
                <video
                    ref={videoRef}
                    src="/videos/sukuna_vs_mahito.mp4"
                    loop
                    playsInline
                    preload="auto"
                />
                <div className="mask">
                    <img src="/mask-logo.svg" alt="Mask Logo" />
                </div>
            </div>

            <div className="content">
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <h2>Rocket chip</h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Introducing {' '}
                                <span className="text-white">M5, the next generation of Apple silicon</span>
                                . M5 powers
                            </p>

                            <p>
                                Across the iPhone 17 Pro camera system, you'll find innovation that goes to great lengths. The telephoto features the next generation of our tetraprism design and a 56% larger sensor. With an equivalent 200 mm focal length, the 8x optical-quality zoom makes this the longest iPhone Telephoto ever — offering 16x total optical zoom range. So you can explore an even wider range of creative choices and add a longer reach to your compositions.
                            </p>

                            <p>
                                From home movies to Hollywood productions, iPhone 17 Pro is up to any challenge. With more pro video features than ever — like enhanced video stabilisation, cinema-grade specs and compatibility with industry-standard workflows — iPhone 17 Pro puts powerful filmmaking tools within reach, wherever you need them.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-3xs space-y-12">
                        <div className="space-y-5">
                            <p>iPhone 17 Pro</p>
                            <h3>upto 4x faster</h3>
                            <p>better rendering than previous gen</p>
                        </div>

                        <div className="space-y-5">
                            <p>iPhone 17 Pro</p>
                            <h3>upto 4x faster</h3>
                            <p>better rendering than previous gen</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Showcase
