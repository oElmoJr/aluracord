CREATE TABLE IF NOT EXISTS mensagens (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  legacy_id bigint,
  sala text NOT NULL CHECK (sala IN ('geral', 'games', 'anime', 'kpop')),
  de varchar(39) NOT NULL,
  texto text NOT NULL CHECK (length(trim(texto)) BETWEEN 1 AND 4000),
  color varchar(7) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mensagens_sala_id_idx ON mensagens (sala, id DESC);
ALTER TABLE mensagens ADD COLUMN IF NOT EXISTS legacy_id bigint;
CREATE UNIQUE INDEX IF NOT EXISTS mensagens_sala_legacy_idx ON mensagens (sala, legacy_id);
ALTER TABLE mensagens DROP CONSTRAINT IF EXISTS mensagens_de_check;
