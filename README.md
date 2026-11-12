# Aluracord

Chat público com quatro salas (geral, games, anime e kpop), avatares do GitHub e stickers.
O visual original foi preservado. O Supabase apagado foi substituído por PostgreSQL no Neon;
o site continua hospedado na Vercel.

## Executar

Requer Node.js 24 e npm. Instale com `npm ci`.

Na primeira configuração, conecte o projeto Vercel `elmojrs-projects/aluracord` e o banco
Neon `aluracord-db`, então execute `vercel env pull .env.local --yes`.
Para usar outro PostgreSQL compatível com o driver HTTP Neon, configure `DATABASE_URL`
em `.env.local`, conforme `.env.example`. Nunca exponha a conexão com `NEXT_PUBLIC_`.

```sh
npm run db:migrate
npm run dev
```

Em ambientes que exigem proxy HTTP, use `NODE_USE_ENV_PROXY=1` com Node.js 24.
Para produção: `npm run build` e `npm start`.

## Funcionamento

- O navegador acessa `/api/mensagens?sala=geral|games|anime|kpop`; a conexão ao banco fica no servidor.
- As últimas 100 mensagens de cada sala são atualizadas a cada 3 segundos.
- O envio valida sala, nome de usuário, tamanho do texto e endereço HTTPS dos stickers.
- A entrada usa um apelido no formato de usuário do GitHub, como no projeto original.
  Não há autenticação GitHub: o apelido não comprova identidade.
- O botão X apenas oculta a mensagem na sessão atual, como no projeto original.
- As quatro salas ficam na tabela `mensagens`, separadas pela coluna `sala`.

## Backup e restauração

```sh
# Cria um JSON com todas as mensagens e IDs em backups/ (ignorado pelo Git):
npm run db:backup
# Ou escolha um destino (o comando recusa sobrescrever arquivo existente):
npm run db:backup -- backups/meu-backup.json

# Em um banco novo, configure DATABASE_URL, crie a estrutura e importe:
npm run db:migrate
npm run db:restore -- backups/meu-backup.json
```

A restauração é transacional e não sobrescreve IDs existentes. Para uma cópia exata,
restaure em um banco vazio. Guarde os arquivos fora do servidor e do repositório público:
eles contêm as mensagens. O esquema fica versionado em `database/schema.sql`.
O comando de exportação é manual; não há agendamento automático de backup.

## Recuperação de novembro de 2026

O código anterior à recuperação e seu histórico estão preservados na branch
[`backup/antes-recuperacao-2026-11-12`](https://github.com/oElmoJr/aluracord/tree/backup/antes-recuperacao-2026-11-12).
Foram recuperadas 54 mensagens do backup fornecido de 2022: 43 na sala geral, 1 em games,
6 em anime (antiga tabela `mensagenstech`) e 4 em kpop. Datas, autores, textos, cores e
IDs de origem foram preservados (`legacy_id`, combinado com `sala`). O arquivo fornecido
de 2024 não contém as tabelas públicas de mensagens. Os backups originais e seu conteúdo
não foram adicionados ao repositório público.

Next.js e React foram atualizados para versões compatíveis com as correções de segurança.
O override de `@testing-library/react` corrige uma dependência de testes antiga incluída
pelo SkynexUI e permite instalar com React 18 sem ignorar a validação de dependências.

O override do PostCSS aplica correções de segurança à dependência do Next.js.
