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

export function IconeFechar(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Icone>
  );
}

export function IconeBussola(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16 8-2.5 5.5L8 16l2.5-5.5z" />
    </Icone>
  );
}

export function IconeLivro(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5z" fill="currentColor" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </Icone>
  );
}

export function IconeMarcador(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M6 3h12v18l-6-4-6 4z" fill="currentColor" />
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

export function IconeInformacao(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </Icone>
  );
}

export function IconeProfessor(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a4 4 0 0 0-.45-3.35" />
    </Icone>
  );
}

export function IconeMapa(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icone>
  );
}

export function IconeSol(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Icone>
  );
}

export function IconeAlerta(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </Icone>
  );
}

export function IconeBloqueado(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 14.14 14.14" />
    </Icone>
  );
}

export function IconeCheck(props: IconeProps) {
  return (
    <Icone {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Icone>
  );
}

export function IconeRelogio(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Icone>
  );
}

export function IconeLixo(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
    </Icone>
  );
}

export function IconeCalendarioCortado(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M21 8.5V6a2 2 0 0 0-2-2h-3.5" />
      <path d="M3 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 1.73-1" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <path d="m2 2 20 20" />
    </Icone>
  );
}