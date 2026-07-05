import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-bg/90 backdrop-blur-sm border-b border-ink/8">
      <Link href="/" className="font-display text-base tracking-tightest text-ink">
        Jep Parker
      </Link>
      <div className="flex gap-7 font-body text-xs uppercase tracking-widest text-ink-dim">
        <Link href="/work" className="hover:text-ink transition-colors">Work</Link>
        <Link href="/about" className="hover:text-ink transition-colors">About</Link>
        <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
