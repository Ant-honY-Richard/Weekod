import React, { ReactNode } from 'react';

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
    variant?: 'default' | 'rainbow' | 'neon' | 'cyber' | 'electric';
    intensity?: 'subtle' | 'normal' | 'intense';
}

export default function GradientText({
    children,
    className = "",
    colors,
    animationSpeed = 3,
    showBorder = false,
    variant = 'default',
    intensity = 'normal',
}: GradientTextProps) {
    // Theme-based color variants matching your website's color scheme
    const colorVariants = {
        default: ["#B721FF", "#FF00C8", "#00D9FF", "#B721FF"],
        rainbow: ["#B721FF", "#FF00C8", "#00D9FF", "#FFD600", "#B721FF"],
        neon: ["#00D9FF", "#B721FF", "#FF00C8", "#00D9FF"],
        cyber: ["#B721FF", "#00D9FF", "#B721FF"],
        electric: ["#FFD600", "#00D9FF", "#B721FF", "#FF00C8", "#FFD600"],
    };

    const selectedColors = colors || colorVariants[variant];
    
    // Intensity settings
    const intensitySettings = {
        subtle: {
            backgroundSize: "200% 100%",
            glowOpacity: 0.3,
            shadowBlur: 8,
        },
        normal: {
            backgroundSize: "300% 100%",
            glowOpacity: 0.5,
            shadowBlur: 12,
        },
        intense: {
            backgroundSize: "400% 100%",
            glowOpacity: 0.7,
            shadowBlur: 16,
        },
    };

    const settings = intensitySettings[intensity];

    const gradientStyle = {
        background: `linear-gradient(90deg, ${selectedColors.join(", ")})`,
        backgroundSize: settings.backgroundSize,
        animationDuration: `${animationSpeed}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationName: 'gradient-flow',
    };

    const glowStyle = {
        filter: `drop-shadow(0 0 ${settings.shadowBlur}px rgba(183, 33, 255, ${settings.glowOpacity})) drop-shadow(0 0 ${settings.shadowBlur * 1.5}px rgba(255, 0, 200, ${settings.glowOpacity * 0.7}))`,
    };

    return (
        <>
            <style jsx>{`
                @keyframes gradient-flow {
                    0% {
                        background-position: 0% 50%;
                    }
                    25% {
                        background-position: 100% 50%;
                    }
                    50% {
                        background-position: 200% 50%;
                    }
                    75% {
                        background-position: 300% 50%;
                    }
                    100% {
                        background-position: 400% 50%;
                    }
                }
                
                @keyframes border-flow {
                    0% {
                        background-position: 0% 50%;
                        opacity: 0.8;
                    }
                    25% {
                        background-position: 100% 50%;
                        opacity: 1;
                    }
                    50% {
                        background-position: 200% 50%;
                        opacity: 0.9;
                    }
                    75% {
                        background-position: 300% 50%;
                        opacity: 1;
                    }
                    100% {
                        background-position: 400% 50%;
                        opacity: 0.8;
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 ${settings.shadowBlur}px rgba(183, 33, 255, ${settings.glowOpacity})) 
                                drop-shadow(0 0 ${settings.shadowBlur * 1.5}px rgba(255, 0, 200, ${settings.glowOpacity * 0.7}));
                    }
                    50% {
                        filter: drop-shadow(0 0 ${settings.shadowBlur * 1.5}px rgba(183, 33, 255, ${settings.glowOpacity * 1.2})) 
                                drop-shadow(0 0 ${settings.shadowBlur * 2}px rgba(255, 0, 200, ${settings.glowOpacity}));
                    }
                }
            `}</style>
            
            <div
                className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-all duration-500 overflow-hidden cursor-pointer group ${className}`}
            >
                {showBorder && (
                    <>
                        {/* Animated border */}
                        <div
                            className="absolute inset-0 rounded-[1.25rem] p-[2px] z-0 pointer-events-none"
                            style={{
                                background: `linear-gradient(90deg, ${selectedColors.join(", ")})`,
                                backgroundSize: settings.backgroundSize,
                                animation: `border-flow ${animationSpeed}s ease-in-out infinite`,
                            }}
                        >
                            <div
                                className="absolute inset-[2px] bg-background rounded-[1.125rem] z-[-1]"
                            />
                        </div>
                        
                        {/* Glow effect for border */}
                        <div
                            className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[-2]"
                            style={{
                                background: `linear-gradient(90deg, ${selectedColors.join(", ")})`,
                                backgroundSize: settings.backgroundSize,
                                animation: `border-flow ${animationSpeed}s ease-in-out infinite`,
                                filter: `blur(${settings.shadowBlur}px)`,
                            }}
                        />
                    </>
                )}
                
                {/* Main text with gradient */}
                <div
                    className="inline-block relative z-10 text-transparent bg-clip-text font-bold transition-all duration-300 group-hover:scale-105"
                    style={{
                        ...gradientStyle,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        animation: `gradient-flow ${animationSpeed}s ease-in-out infinite, pulse-glow ${animationSpeed * 2}s ease-in-out infinite`,
                    }}
                >
                    {children}
                </div>
                
                {/* Additional glow layer for intense effect */}
                {intensity === 'intense' && (
                    <div
                        className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                        style={{
                            background: `linear-gradient(90deg, ${selectedColors.map(color => `${color}20`).join(", ")})`,
                            backgroundSize: settings.backgroundSize,
                            animation: `gradient-flow ${animationSpeed * 1.5}s ease-in-out infinite reverse`,
                            borderRadius: 'inherit',
                            filter: `blur(${settings.shadowBlur * 2}px)`,
                        }}
                    />
                )}
            </div>
        </>
    );
}