export default function Footer() {
  return (
    <footer id="about" className="px-6 md:px-10 py-16 md:py-24 border-t border-ink/10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl md:text-3xl text-ink max-w-md">
            Journalism student in Amsterdam, currently at Het Parool.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-body text-sm text-ink-dim md:items-end">
          <a href="mailto:you@example.com" data-cursor="hover" className="hover:text-ink transition-colors">
            you@example.com
          </a>
          <a href="https://instagram.com/jep_parker" data-cursor="hover" className="hover:text-ink transition-colors">
            @jep_parker
          </a>
        </div>
      </div>
      <p className="mt-16 font-body text-xs text-ink-dim">© {new Date().getFullYear()}</p>
    </footer>
  );
}
