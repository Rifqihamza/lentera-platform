import MagicBento from "@/components/ui/magic-bento"
export default function AboutPage() {
    return (
        <>
            <section id="about" className="w-full h-dvh">
                <MagicBento
                    textAutoHide={true}
                    enableStars
                    enableSpotlight
                    enableBorderGlow={true}
                    enableTilt={false}
                    enableMagnetism={false}
                    clickEffect
                    spotlightRadius={400}
                    particleCount={12}
                    glowColor="234, 159, 6"
                    disableAnimations={false}
                />
            </section>
        </>
    )
}