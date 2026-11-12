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

export function IconeRelogio(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icone>
  );
}

export function IconeInfo(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </Icone>
  );
}

export function IconeLocal(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
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

export function IconePorDoSol(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M12 10V2M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M16 6l-4 4-4-4M16 18a4 4 0 0 0-8 0" />
    </Icone>
  );
}

export function IconeLua(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icone>
  );
}

export function IconeLixeira(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <path d="M10 11v6M14 11v6" />
    </Icone>
  );
}

export function IconeUsuario(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icone>
  );
}

export function IconeCheck(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icone>
  );
}

export function IconeMais(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M5 12h14M12 5v14" />
    </Icone>
  );
}

export function IconeAlerta(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </Icone>
  );
}

export function IconeAlertaCirculo(props: IconeProps) {
  return (
    <Icone {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </Icone>
  );
}

export function IconeProibido(props: IconeProps) {
  return (
    <Icone {...props}>
      <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </Icone>
  );
}