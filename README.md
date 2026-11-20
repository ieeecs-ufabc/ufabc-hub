# UFABC Hub

O UFABC Hub é um site com utilitários para ajudar os alunos da UFABC no dia a dia da graduação. Por enquanto, sua única funcionalidade é o montador de grades, que permite escolher turmas, visualizar conflitos de horário e compartilhar a grade do quadrimestre por link. Novas funcionalidades virão no futuro.

Projeto mantido pelo time **WebCS** da [IEEE Computer Society – UFABC](https://github.com/ieeecs-ufabc).

## ✨ Funcionalidades

### Montador de Grade
- **Busca de disciplinas e turmas** do quadrimestre atual, com informações de campus (SA/SBC), turno, vagas, reservas e idiomas.
- **Detecção de conflitos de horário**, incluindo aulas quinzenais (Q1/Q2): uma aula semanal colide com tudo; Q1 só colide com Q1, e Q2 só com Q2.
- **Detalhes da disciplina**: créditos, carga horária, TPIE (teoria, prática, extensão e individuais), docentes, bibliografia básica e complementar.
- **Disciplinas recomendadas** a partir da disciplina escolhida.
- **Compartilhamento por URL**: a grade fica no link (`?turmas=id+id+id`), então basta enviá-lo.
- **Persistência local**: a grade é salva no `localStorage` do navegador.
- **Interface mobile-first**: monte sua grade direto em seu celular.

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router, Cache Components)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Prisma ORM 8](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) 15+

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20.9 ou superior
- npm
- Uma instância de PostgreSQL 15+ com os dados do quadrimestre

### Instalação

```bash
git clone https://github.com/ieeecs-ufabc/ufabc-hub.git
cd ufabc-hub
git checkout develop
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | String de conexão do PostgreSQL (`postgresql://usuario:senha@host:5432/banco`). |
| `ETL_REVALIDATE_SECRET` | Token usado para autenticar a invalidação de cache em `POST /api/revalidate`. |

### Rodando em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm start
```

## 📜 Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera o build de produção. |
| `npm start` | Sobe o build de produção. |
| `npm run lint` | Roda o ESLint. |
| `npm run contract:emit` | Regenera `contract.json` e `contract.d.ts` a partir de `prisma/contract.prisma`. |

## 🗄️ Banco de dados

O modelo de dados está em [`prisma/contract.prisma`](prisma/contract.prisma) e inclui `Quadrimestre`, `Curso`, `Disciplina`, `DisciplinaRecomendacao`, `Docente`, `Turma` e `HorarioAula`.

Depois de editar o contrato, rode `npm run contract:emit` e versione os arquivos gerados (`contract.json` e `contract.d.ts`).

O app apenas **lê** os dados: o quadrimestre marcado com `is_atual = true` é o que aparece no montador.

Para obter e popular os dados corretamente, use o [ufabc-etl](https://github.com/darlancruz/ufabc-etl). Sempre que o banco for atualizado, invalide o cache do site chamando o endpoint `/api/revalidate`, como descrito na seção [Cache e revalidação](#️-cache-e-revalidação).

## ♻️ Cache e revalidação

A lista de turmas do quadrimestre atual é cacheada com a tag `quadrimestre-atual`. Quando os dados do banco forem atualizados, invalide o cache chamando:

```bash
curl -X POST https://<seu-dominio>/api/revalidate \
  -H "Authorization: Bearer $ETL_REVALIDATE_SECRET"
```

Sem o token correto, a rota responde `401`.

## 📁 Estrutura do projeto

```
ufabc-hub/
├── app/                    # Rotas, layout, estilos globais e tema da grade
│   └── api/revalidate/     # Endpoint de invalidação de cache
├── components/             # Componentes de UI
│   └── montador/           # Grade, busca, cards de turma, popups e menu
├── lib/montador/           # Lógica pura: conflitos, normalização, URL das turmas
├── prisma/                 # Contrato do banco (schema) e cliente
├── public/                 # Arquivos estáticos (ilustrações das capivaras)
└── services/               # Acesso a dados (quadrimestre atual)
```

## 🤝 Contribuindo

1. Faça um fork do repositório.
2. Crie uma branch a partir de `develop`: `git checkout -b feat/minha-feature`.
3. Faça commits seguindo o [Conventional Commits](https://www.conventionalcommits.org/pt-br/), por exemplo `feat: add new feature`.
4. Rode `npm run lint` antes de enviar.
5. Envie a branch e abra um Pull Request para `develop`.

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
