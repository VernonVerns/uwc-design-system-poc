import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import { UWCButton } from "@uwc/react";
import React, { useCallback, useEffect, useState } from "react";

type SlideItem = {
    id?: string;
    title: string;
    action: {
        label: string;
        url: string;
    };
    mediaType: "image" | "video";
    imageSrc?: string;
    imageAlt?: string;

    videoSrc?: string;
    videoControls?: boolean;
    videoAutoPlay?: boolean;
    videoLoop?: boolean;
    videoMuted?: boolean;

    indicatorTitle?: string;
    indicatorSubtitle?: string;

    overlayIntensity?: 0 | 25 | 50 | 75;
}

interface UWCBannerProps {
    slides: SlideItem[];
    className?: string;
    showIndicators?: boolean;
    showControls?: boolean;
    height: "full" | "half";
    autoPlay?: boolean;
    autoPlayInterval?: number;
    transition: "fade" | "slide";
    loop?: boolean;
    overlay: boolean;
}

export const UWCBanner: React.FC<UWCBannerProps> = ({
    slides,
    className = "",
    showIndicators = true,
    showControls = true,
    height = "full",
    autoPlay = true,
    autoPlayInterval = 5000,
    transition = "fade",
    loop = true,
    overlay = true,
}) => {
    const [current, setCurrent] = useState(0);
    
    const goToSlide = useCallback((index: number) => {
        if (slides.length === 0) return;
        let newIndex = index;
        if (newIndex < 0) {
            newIndex = loop ? slides.length - 1 : 0;
        } else if (newIndex >= slides.length) {
            newIndex = loop ? 0 : slides.length - 1;
        }
        setCurrent(newIndex);
    }, [slides.length, loop]);

    useEffect(() => {
        const currentSlide = slides[current];

        // If it's a video
        if (currentSlide.mediaType === "video") {
            const videoEl = document.querySelector(
                `.slide-item:nth-child(${current + 1}) video`
            ) as HTMLVideoElement | null;

            if (videoEl) {
                // Ensure video restarts when slide becomes active
                videoEl.currentTime = 0;
                videoEl.play();

                const handleEnd = () => {
                    goToSlide(current + 1);
                };

                videoEl.addEventListener("ended", handleEnd);

                return () => {
                    videoEl.removeEventListener("ended", handleEnd);
                };
            }
        }

        // If it's an image
        if (currentSlide.mediaType === "image") {
            const timer = setTimeout(() => {
                goToSlide(current + 1);
            }, autoPlayInterval);

            return () => clearTimeout(timer);
        }

    }, [current, slides, autoPlayInterval, goToSlide]);

    const slideHeight = height === "full" ? "100vh" : "50vh";

    return (
        <div className={`uwc-banner ${className}`} style={{ height: slideHeight, backgroundColor: "#888" }}>
            <div className="slides-container">
                {slides.map((slide, index) => {
                    const isActive = index === current;
                    const opacity = isActive ? 1 : 0;

                    return (
                        <div key={slide.id ?? index}
                            className={`slide-item ${transition === "slide" ? "transform transition-transform" : ""}`}
                            style={{
                                opacity,
                                zIndex: isActive ? 2 : 1,
                                transform:
                                    transition === "slide"
                                        ? `translateX(${(index - current) * 100}%)`
                                        : "none",
                                    
                            }}
                        >
                            {slide.mediaType === "image" && slide.imageSrc && (
                                <img
                                    src={slide.imageSrc}
                                    alt={slide.imageAlt ?? ""}
                                    className="img-bg"
                                />
                            )}

                            {slide.mediaType === "video" && slide.videoSrc && (
                                <video
                                    src={slide.videoSrc}
                                    className="video-bg"
                                    autoPlay={slide.videoAutoPlay}
                                    muted={slide.videoMuted}
                                    controls={slide.videoControls}
                                    playsInline
                                />
                            )}

                            {overlay && (
                                <div
                                    className="slide-overlay"
                                    style={{ opacity: slide.overlayIntensity ?? 0.3 }}
                                />
                            )}
                            <div className="slide-content">
                                <h1 className="slide-title">{slide.title}</h1>
                                <UWCButton
                                    kind="primary"
                                    href={slide.action.url}
                                >
                                    {slide.action.label}
                                </UWCButton>
                            </div>
                        </div>
                    )}
                )}
            </div>
            <div className="banner-controls">
                {showControls && height !== 'half' && (
                    <div className="nav-btn-container">
                        <button type="button" className="nav-btn btn-next" onClick={() => goToSlide(current - 1)}>
                            <ArrowLeft size={20} />
                        </button>
                        <button type="button" className="nav-btn btn-prev" onClick={() => goToSlide(current + 1)}>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
                {showIndicators && height !== 'half' && (
                    <div className="indicator-container">
                        {slides.map((_, index) => (
                            <div  className="indicator-item" onClick={() => goToSlide(index)} key={index}>
                                <div className={`indicator-line ${index === current ? 'active-indicator' : ''}`}></div>
                                <div className="indicator-title">
                                    {slides[index].indicatorTitle}
                                </div>
                                <div className="indicator-description">
                                    {slides[index].indicatorSubtitle}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
