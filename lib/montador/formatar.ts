export function formatarCreditos(creditos: number) {
  return `${creditos} ${creditos === 1 ? "Crédito" : "Créditos"}`;
}
