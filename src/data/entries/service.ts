import db from "../db";
import { Entry, EntryCreationData } from "./Entry";

export async function getEntries(): Promise<Entry[]> {
  const docs = await db.allDocs<Entry>({
    include_docs: true,
    descending: true,
    startkey: "entry:",
    endkey: "entry:\uffff",
  });
  return docs.rows.map((x) => x.doc!);
}

export async function addEntry(entry: EntryCreationData): Promise<Entry> {
  const timestamp = new Date().toISOString();
  const doc: Entry = {
    _id: "entry:" + timestamp,
    timestamp,
    ...entry,
  };

  await db.put(doc);
  const wot = await db.get<Entry>(doc._id);
  return wot;
}
