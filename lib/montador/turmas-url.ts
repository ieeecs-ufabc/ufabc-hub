const PARAM = "turmas";
const STORAGE_KEY = "montador:turmas";

const unicos = (ids: string[]) => [...new Set(ids)];

export function lerIdsDaUrl(): string[] {
  const bruto = new URLSearchParams(window.location.search).get(PARAM);
  if (!bruto) return [];
  return unicos(bruto.split(/[\s+,]+/).filter(Boolean));
}

export function escreverIdsNaUrl(ids: string[]) {
  const params = new URLSearchParams(window.location.search);
  params.delete(PARAM);

  const partes = [params.toString(), ids.length ? `${PARAM}=${ids.join("+")}` : ""].filter(Boolean);
  const search = partes.length ? `?${partes.join("&")}` : "";

  const novo = `${window.location.pathname}${search}${window.location.hash}`;
  const atual = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (novo !== atual) window.history.replaceState(estadoDaPagina(), "", novo);
}

// Repassa só o estado da própria página (sem as chaves internas "__" do Next.js):
// assim o Next.js integra a nova URL ao roteador em vez de sobrescrevê-la ao voltar.
function estadoDaPagina() {
  const estado: Record<string, unknown> = window.history.state ?? {};
  return Object.fromEntries(Object.entries(estado).filter(([chave]) => !chave.startsWith("__")));
}

export function lerIdsSalvos(): string[] {
  try {
    const bruto = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(bruto) ? unicos(bruto.map(String)) : [];
  } catch {
    return [];
  }
}

export function salvarIds(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage indisponível (modo privado, cota cheia...): a URL continua funcionando.
  }
}

export function mesmasTurmas(a: string[], b: string[]) {
  return a.length === b.length && a.every((id) => b.includes(id));
}
