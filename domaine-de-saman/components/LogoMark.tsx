// The last hill on the drive in — the roofline and attic window between
// the two big trees. Hill, roof, and trunks follow the nav's currentColor
// (so they adapt to the transparent/solid nav states); the tree canopies
// and the window keep their own fixed colors, since those are the point
// of the mark.
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 26 Q16 21 30 26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10.5 17 L16 6.5 L21.5 17 Z" fill="currentColor" />
      <line x1="8" y1="17.5" x2="8" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="24" y1="17.5" x2="24" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="8" cy="14" r="6.3" fill="#5B8C63" />
      <circle cx="5" cy="18" r="3.8" fill="#5B8C63" />
      <circle cx="24" cy="14" r="6.3" fill="#5B8C63" />
      <circle cx="27" cy="18" r="3.8" fill="#5B8C63" />
      <circle cx="16" cy="12.5" r="1.9" fill="#E8C878" />
    </svg>
  );
}
