import GradientBackground from "../components/GradientBackground";

const ComingSoon = () => {
  return (
    <>
      <GradientBackground />
      <div className="flex flex-col items-center justify-center h-screen relative">
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </>
  );
};

export default ComingSoon;
