type IconProps = {
  className?: string;
};

export function EasyCleanIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 39L24 30C25.21 28.79 27.18 28.79 28.39 30L31 32.61V24C31 22.34 32.34 21 34 21C35.66 21 37 22.34 37 24V35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 27C37 25.34 38.34 24 40 24C41.66 24 43 25.34 43 27V36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43 29C43 27.34 44.34 26 46 26C47.66 26 49 27.34 49 29V39C49 45.08 44.08 50 38 50H31C27.82 50 24.78 48.74 22.54 46.46L15 39Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 14L16.5 17.5L20 19L16.5 20.5L15 24L13.5 20.5L10 19L13.5 17.5L15 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 12L49 14.5L51.5 15.5L49 16.5L48 19L47 16.5L44.5 15.5L47 14.5L48 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}