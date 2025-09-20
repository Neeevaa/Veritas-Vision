import type { SVGProps } from 'react';

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google</title>
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.86 2.25-4.82 2.25-3.64 0-6.55-3-6.55-6.6s2.91-6.6 6.55-6.6c1.98 0 3.39.82 4.16 1.56l2.5-2.38C18.33 1.93 15.86 1 12.48 1 7.02 1 3 5.02 3 10.5s4.02 9.5 9.48 9.5c2.79 0 4.95-.94 6.61-2.62 1.76-1.76 2.33-4.25 2.33-6.84 0-.48-.04-.92-.1-1.32H12.48z"
        fill="currentColor"
      />
    </svg>
  );
}
