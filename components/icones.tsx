import type { ComponentProps } from "react";

type IconeProps = ComponentProps<"svg">;

function Icone({ children, ...props }: IconeProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconeCreditos(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 12.9 7 22l5-3 5 3-1.5-9.1" />
    </Icone>
  );
}

export function IconeAdicionar(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </Icone>
  );
}

export function IconeBusca(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Icone>
  );
}

export function IconeSetaBaixo(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icone>
  );
}
