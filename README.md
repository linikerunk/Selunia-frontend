# Selúnia Frontend (MVP)

MVP de loja virtual feminina com categorias de semi joias, roupas e cosméticos. Inclui header, footer, home, listagem por categoria, página de produto e carrinho com store global.

- React + TypeScript + Vite
- Roteamento com React Router
- Estado de carrinho com Zustand
- Mocks tipados com adapter `src/services/api.ts` pronto para troca por backend

## Scripts

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview local do build

## Estrutura

- `src/pages` — páginas: Home, Categoria, Produto, Carrinho
- `src/components` — Header, Footer, ProductCard
- `src/store` — `cartStore` (Zustand)
- `src/mocks` — dados de exemplo (produtos e categorias)
- `src/services/api.ts` — camada para futura integração com backend

## Integração com backend

Substituir chamadas no `api` por `fetch('/api/...')` ou cliente HTTP. O shape dos dados está descrito em `src/types/product.ts`.