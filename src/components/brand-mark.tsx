export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <title>Jurispro </title>
      <path
        d="M24 6v36"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M9 13h30"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M14 42h20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <circle cx="24" cy="13" r="2.6" fill="currentColor" />
      <path
        d="M9 13 3 27h12L9 13Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M39 13 33 27h12L39 13Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
