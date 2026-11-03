import { readFile } from "node:fs/promises";
import path from "node:path";
import LegacyScripts from "@/components/LegacyScripts";

// V1 et V2 : le HTML d'origine (legacy/body.html) est servi tel quel, rendu côté serveur.
export default async function LegacyPage({ version }) {
  const html = await readFile(path.join(process.cwd(), "legacy/body.html"), "utf8");

  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
      <LegacyScripts version={version} />
    </>
  );
}
