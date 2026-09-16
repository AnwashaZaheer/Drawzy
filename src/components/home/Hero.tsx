export const Hero = () => {
  return (
    <div className="text-center py-12 px-4 relative max-w-2xl mx-auto">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
        Draw it.<br />
        <span className="text-indigo-600 relative inline-block">
          Guess it.
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-yellow-400" />
          </svg>
        </span><br />
        Win it.
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 font-medium">
        A fast, fun multiplayer drawing game where your imagination does the talking.
      </p>
    </div>
  );
};
