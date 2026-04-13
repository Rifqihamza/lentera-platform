import AboutPage from "./about/page";
import HomePage from "./home/page";
import Grainient from "@/components/background/grainients";
export default function App() {
  return (

    <>
      <div className="fixed top-0 left-0 w-full h-full -z-50">
        <Grainient
          color1="#000000"
          color2="#eab308"
          color3="#000000"
          timeSpeed={0.4}
          colorBalance={0.150}
          warpStrength={10}
          warpFrequency={5}
          warpSpeed={0.5}
          warpAmplitude={50}
          blendAngle={90}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={0.5}
          grainAmount={0.1}
          grainScale={0.1}
          grainAnimated={false}
          contrast={1}
          gamma={0.5}
          saturation={0.5}
          centerX={0}
          centerY={0}
          zoom={1}
        />
      </div>
      <HomePage />
      <AboutPage />
    </>

  );
}
