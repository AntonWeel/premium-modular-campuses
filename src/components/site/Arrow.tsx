const Arrow = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 16 8"
    fill="none"
    aria-hidden
    className={`h-2 w-4 flex-none ${className}`}
  >
    <path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default Arrow;
