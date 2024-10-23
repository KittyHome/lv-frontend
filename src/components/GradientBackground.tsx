import { useEffect, useRef } from "react";
import { Gradient } from "../lib/Gradient";

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient = new Gradient({
        canvas: canvasRef.current,
        colors: ["#011621", "#090B12", "#310663", "#090B12"],
        amplitude: 50,
        density: [0.1, 0.1],
        angle: 0,
      });

      gradient.init();
    }
  }, []);

  return (
    <canvas
      className="w-screen h-screen fixed left-0 top-0 z-0"
      ref={canvasRef}
    />
  );
};

export default GradientBackground;
