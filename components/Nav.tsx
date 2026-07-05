import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 mix-blend-difference">
      <Link href="/" data-cursor="hover" className="font-display text-lg tracking-tightest text-ink">
        Jep Parker
      </Link>
      <div className="flex gap-6 font-body text-sm text-ink-dim">
        <Link href="/work" data-cursor="hover" className="hover:text-ink transition-colors">Work</Link>
        <Link href="/about" data-cursor="hover" className="hover:text-ink transition-colors">About</Link>
        <Link href="/contact" data-cursor="hover" className="hover:text-ink transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
