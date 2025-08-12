import React from 'react';
import GradientText from './GradientText';

export default function GradientTextDemo() {
    return (
        <div className="min-h-screen bg-background p-8 space-y-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
                    Enhanced GradientText Component Demo
                </h1>
                
                {/* Default Variant */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">Default Variant</h2>
                    <div className="space-y-4">
                        <GradientText className="text-4xl">
                            Weekod - Digital Innovation
                        </GradientText>
                        <GradientText className="text-2xl" showBorder>
                            With Animated Border
                        </GradientText>
                    </div>
                </section>

                {/* Different Variants */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">Color Variants</h2>
                    <div className="space-y-4">
                        <GradientText variant="rainbow" className="text-3xl">
                            Rainbow Variant
                        </GradientText>
                        <GradientText variant="neon" className="text-3xl">
                            Neon Variant
                        </GradientText>
                        <GradientText variant="cyber" className="text-3xl">
                            Cyber Variant
                        </GradientText>
                        <GradientText variant="electric" className="text-3xl">
                            Electric Variant
                        </GradientText>
                    </div>
                </section>

                {/* Intensity Levels */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">Intensity Levels</h2>
                    <div className="space-y-4">
                        <GradientText intensity="subtle" className="text-3xl">
                            Subtle Intensity
                        </GradientText>
                        <GradientText intensity="normal" className="text-3xl">
                            Normal Intensity
                        </GradientText>
                        <GradientText intensity="intense" className="text-3xl">
                            Intense Glow Effect
                        </GradientText>
                    </div>
                </section>

                {/* Animation Speed */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">Animation Speed</h2>
                    <div className="space-y-4">
                        <GradientText animationSpeed={2} className="text-3xl">
                            Fast Animation (2s)
                        </GradientText>
                        <GradientText animationSpeed={6} className="text-3xl">
                            Slow Animation (6s)
                        </GradientText>
                    </div>
                </section>

                {/* Combined Effects */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">Combined Effects</h2>
                    <div className="space-y-6">
                        <GradientText 
                            variant="rainbow" 
                            intensity="intense" 
                            showBorder 
                            animationSpeed={3}
                            className="text-5xl font-black"
                        >
                            WEEKOD
                        </GradientText>
                        <GradientText 
                            variant="electric" 
                            intensity="intense" 
                            showBorder 
                            animationSpeed={4}
                            className="text-3xl"
                        >
                            Future of Digital Solutions
                        </GradientText>
                    </div>
                </section>

                {/* Usage Examples */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">Usage Examples</h2>
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <pre className="text-sm text-muted-foreground overflow-x-auto">
{`// Basic usage
<GradientText>Your Text Here</GradientText>

// With border and custom variant
<GradientText variant="neon" showBorder>
  Neon Text with Border
</GradientText>

// Intense glow effect
<GradientText 
  variant="electric" 
  intensity="intense" 
  animationSpeed={3}
>
  High Impact Text
</GradientText>

// Custom colors
<GradientText 
  colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
  showBorder
>
  Custom Color Scheme
</GradientText>`}
                        </pre>
                    </div>
                </section>
            </div>
        </div>
    );
}