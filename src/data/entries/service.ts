import db from "../db";
import { EntryDto, EntryCreationData } from "./EntryDto";

export async function getEntries(): Promise<EntryDto[]> {
  const docs = await db.allDocs<EntryDto>({
    include_docs: true,
    descending: true,
    startkey: "entry\ufff0",
    endkey: "entry",
  });
  return docs.rows.map((x) => x.doc!);
}

export async function addEntry(entry: EntryCreationData): Promise<EntryDto> {
  const timestamp = new Date().toISOString();
  const doc: EntryDto = {
    _id: "entry:" + timestamp,
    timestamp,
    ...entry,
  };

  await db.put(doc);
  const wot = await db.get<EntryDto>(doc._id);
  return wot;
}
