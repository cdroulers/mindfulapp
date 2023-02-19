import db from "../db";
import { EntryDto, EntryCreationData, EntryUpdateData } from "./EntryDto";

type PouchEntryDto = Omit<EntryDto, "timestamp" | "behavioralActivation"> & {
  timestamp: string;
  behavioralActivation?: Omit<NonNullable<EntryDto["behavioralActivation"]>, "timestamp"> & {
    timestamp: string;
  };
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
    .map(pouchEntryToDto);
}

function pouchEntryToDto(entry: PouchEntryDto): EntryDto {
  return {
    ...entry,
    timestamp: new Date(entry.timestamp),
    behavioralActivation: entry.behavioralActivation
      ? {
          ...entry.behavioralActivation,
          timestamp: new Date(entry.behavioralActivation.timestamp),
        }
      : undefined,
  };
}

export async function addEntry(
  entry: EntryCreationData,
  markPreviousAsDone: boolean
): Promise<{ added: EntryDto; updated?: EntryDto }> {
  const timestamp = new Date().toISOString();

  let updated: EntryDto | undefined;
  if (markPreviousAsDone) {
    const previousDoc = (
      await db.allDocs<PouchEntryDto>({
        include_docs: true,
        descending: true,
        startkey: "entry\ufff0",
        endkey: "entry",
        limit: 1,
      })
    ).rows[0];

    if (previousDoc?.doc?.behavioralActivation) {
      previousDoc.doc.behavioralActivation.done = true;
      await db.put(previousDoc.doc);
      updated = pouchEntryToDto(previousDoc.doc);
    }
  }

  const doc: PouchEntryDto = {
    _id: "entry:" + timestamp,
    timestamp,
    ...entry,
    behavioralActivation: entry.behavioralActivation
      ? {
          action: entry.behavioralActivation.action,
          timestamp: entry.behavioralActivation.timestamp.toISOString(),
          done: false,
        }
      : undefined,
  };

  await db.put(doc);
  const found = await db.get<PouchEntryDto>(doc._id);
  const added = pouchEntryToDto(found);
  return { added, updated };
}

export async function updateEntry(id: string, update: EntryUpdateData): Promise<EntryDto> {
  const entry = await db.get<PouchEntryDto>(id);

  entry.primaryMood = update.primaryMood;
  entry.secondaryMoods = update.secondaryMoods;
  entry.text = update.text;
  entry.behavioralActivation = update.behavioralActivation
    ? {
        ...update.behavioralActivation,
        timestamp: update.behavioralActivation.timestamp.toISOString(),
      }
    : undefined;
  await db.put(entry);
  return pouchEntryToDto(entry);
}

export async function markBehavioralActivationAsDone(id: string): Promise<EntryDto | undefined> {
  const entry = await db.get<PouchEntryDto>(id);

  if (entry?.behavioralActivation) {
    entry.behavioralActivation.done = true;
    await db.put(entry);
    return pouchEntryToDto(entry);
  }

  return undefined;
}
