export default function MaskReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="mask-reveal-inner block" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}
