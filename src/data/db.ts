import PouchDB from "pouchdb";
import { download } from "../shared/files";

const db = new PouchDB("mindfulapp");

export default db;

export async function exportAll(): Promise<void> {
  const allDocs = await db.allDocs({ include_docs: true });
  download(
    JSON.stringify(allDocs.rows.map(({ doc }) => doc)),
    "mindfulapp-export.json",
    "application/json"
  );
}
