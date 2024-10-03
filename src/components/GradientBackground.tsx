import { useEffect, useRef } from "react";
import { Gradient } from "../lib/Gradient";

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient = new Gradient({
        canvas: canvasRef.current,
        colors: ["#161A25", "#090B12", "#161A25", "#090B12"],
        amplitude: 320,
        density: [0.01, 0.16],
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
