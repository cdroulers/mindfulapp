import db from "../db";
import { EntryDto, EntryCreationData } from "./EntryDto";

type PouchEntryDto = Omit<EntryDto, "timestamp"> & {
  timestamp: string;
};

export async function getEntries(): Promise<EntryDto[]> {
  const docs = await db.allDocs<PouchEntryDto>({
    include_docs: true,
    descending: true,
    startkey: "entry\ufff0",
    endkey: "entry",
  });
  return docs.rows
    .filter((x) => Boolean(x.doc))
    .map((x) => x.doc!)
    .map(
      (x) =>
        ({
          ...x,
          timestamp: new Date(x.timestamp),
        } as EntryDto)
    );
}

export async function addEntry(entry: EntryCreationData): Promise<EntryDto> {
  const timestamp = new Date().toISOString();
  const doc: PouchEntryDto = {
    _id: "entry:" + timestamp,
    timestamp,
    ...entry,
  };

  await db.put(doc);
  const wot = await db.get<EntryDto>(doc._id);
  return wot;
}
