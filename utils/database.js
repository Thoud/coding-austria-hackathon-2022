import postgres from 'postgres';

const sql = postgres({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
});

export async function getGemeinde() {
  const res = await sql`
    SELECT ev_insgesamt, gemeindename
    FROM public.e_verbrauch_gemeinde
    WHERE gemeindename
    LIKE 'Ludweis-Aigen'
`;

  return res[0];
}

export async function getCapacity() {
  const pv = await sql`
    SELECT kapazität
    FROM public.energie_produktion
    WHERE energiequelle = 'PV'
`;

  const wind = await sql`
    SELECT kapazität
    FROM public.energie_produktion
    WHERE energiequelle = 'Windpark'
`;

  return { pv: pv[0], wind: wind[0] };
}
