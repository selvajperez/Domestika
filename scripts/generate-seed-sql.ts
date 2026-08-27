// Genera supabase/seed.sql a partir de src/data/seed/androids.ts, para
// que el contenido tenga una única fuente de verdad. Se ejecuta a mano
// con `npx tsx scripts/generate-seed-sql.ts` cada vez que cambian los
// datos del catálogo temporal.
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ANDROIDS } from "../src/data/seed/androids";
import type { Android } from "../src/types/android";

function sqlString(value: string | null | undefined) {
  if (value === null || value === undefined) return "null";
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlNumber(value: number | null | undefined) {
  if (value === null || value === undefined) return "null";
  return String(value);
}

function sqlBool(value: boolean) {
  return value ? "true" : "false";
}

function androidInsert(android: Android) {
  const specsJson = JSON.stringify(android.specs).replace(/'/g, "''");

  return `insert into androids (
  id, code, name, model, slug, category, function_title,
  short_description, long_description, personality, quote,
  purchase_price, leasing_monthly, currency, purchase_available,
  leasing_available, stock, height_m, weight_kg, autonomy_hours,
  max_assistance_kg, voice_recognition, social_interaction,
  connectivity, sanitary_limit, requires_specialized_install,
  main_image_url, specs, featured, active
) values (
  '${android.id}', ${sqlString(android.code)}, ${sqlString(android.name)},
  ${sqlString(android.model)}, ${sqlString(android.slug)}, '${android.category}',
  ${sqlString(android.functionTitle)}, ${sqlString(android.shortDescription)},
  ${sqlString(android.longDescription)}, ${sqlString(android.personality)},
  ${sqlString(android.quote)}, ${sqlNumber(android.purchasePrice)},
  ${sqlNumber(android.leasingMonthly)}, ${sqlString(android.currency)},
  ${sqlBool(android.purchaseAvailable)}, ${sqlBool(android.leasingAvailable)},
  ${sqlNumber(android.stock)}, ${sqlNumber(android.heightM)}, ${sqlNumber(android.weightKg)},
  ${sqlNumber(android.autonomyHours)}, ${sqlNumber(android.maxAssistanceKg)},
  ${sqlString(android.voiceRecognition)}, ${sqlString(android.socialInteraction)},
  ${sqlString(android.connectivity)}, ${sqlString(android.sanitaryLimit)},
  ${sqlBool(android.requiresSpecializedInstall)}, ${sqlString(android.mainImageUrl)},
  '${specsJson}'::jsonb, ${sqlBool(android.featured)}, ${sqlBool(android.active)}
);`;
}

function capabilityInserts(android: Android) {
  return android.capabilities
    .map(
      (capability, index) => `insert into android_capabilities (android_id, title, description, sort_order)
values ('${android.id}', ${sqlString(capability.title)}, ${sqlString(capability.description)}, ${index});`,
    )
    .join("\n");
}

const header = `-- Seed generado automáticamente desde src/data/seed/androids.ts
-- No editar a mano: correr \`npx tsx scripts/generate-seed-sql.ts\`.
truncate table android_gallery, android_capabilities, androids restart identity cascade;
`;

const body = ANDROIDS.map((android) =>
  [androidInsert(android), capabilityInserts(android)].filter(Boolean).join("\n"),
).join("\n\n");

const outPath = path.join(__dirname, "..", "supabase", "seed.sql");
writeFileSync(outPath, `${header}\n${body}\n`);
console.log(`Escrito ${outPath}`);
