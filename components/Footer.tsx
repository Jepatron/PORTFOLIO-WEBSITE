export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl md:text-4xl text-ink tracking-tightest max-w-sm leading-[1.1]">
            Journalism student in Amsterdam, currently at Het Parool.
          </p>
        </div>
        <div className="flex flex-col gap-3 font-body text-sm text-ink-dim md:items-end md:justify-end">
          <a href="mailto:Jepvanzomeren@gmail.com" className="hover:text-ink transition-colors">
            Jepvanzomeren@gmail.com
          </a>
          <a href="https://instagram.com/jep_parker" className="hover:text-ink transition-colors">
            @jep_parker
          </a>
        </div>
      </div>
      <div className="mt-16 flex items-end justify-between border-t border-ink/10 pt-6">
        <p className="font-body text-xs text-ink-dim">© {new Date().getFullYear()} Jep Parker</p>
        <p className="font-body text-xs text-ink-dim">Amsterdam</p>
      </div>
    </footer>
  );
}
