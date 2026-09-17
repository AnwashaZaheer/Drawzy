export const Footer = () => {
  return (
    <footer className="py-8 text-center text-sm font-semibold text-ink/60 mt-auto">
      <div className="flex justify-center gap-5 mb-2">
        <a href="#" className="hover:text-ink hover:underline underline-offset-4">How to Play</a>
        <a href="#" className="hover:text-ink hover:underline underline-offset-4">Privacy</a>
        <a href="#" className="hover:text-ink hover:underline underline-offset-4">Terms</a>
      </div>
      <p>made with <span className="animate-bounce-soft inline-block">❤️</span> · Drawzy © 2026</p>
    </footer>
  );
};