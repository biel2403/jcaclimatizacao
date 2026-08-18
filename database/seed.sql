INSERT INTO leads (
  name,
  phone,
  email,
  city,
  neighborhood,
  service_type,
  equipment_type,
  brand,
  btus,
  quantity,
  description,
  status,
  internal_notes
) VALUES
(
  'Mariana Souza',
  '11999990000',
  'mariana@example.com',
  'Sao Paulo',
  'Centro',
  'Higienizacao e limpeza',
  'Split',
  'LG',
  '12000',
  1,
  'Preciso higienizar o aparelho da sala.',
  'NOVO',
  'Lead ficticio para desenvolvimento.'
),
(
  'Carlos Almeida',
  '11988887777',
  NULL,
  'Sao Paulo',
  'Mooca',
  'Instalacao',
  'Split Inverter',
  'Samsung',
  '18000',
  2,
  'Instalacao de dois aparelhos novos.',
  'CONTATO',
  'Cliente prefere contato depois das 18h.'
)
ON CONFLICT DO NOTHING;
