import PouchDB from "pouchdb";
import { download } from "../shared/files";
import i18next from "i18next";

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

export type ImportResult =
  | {
      success: true;
    }
  | {
      success: false;
      code: "NO_FILE" | "UNKNOWN_ERROR" | "BULK_ERROR";
      message: string;
      errors?: PouchDB.Core.Error[];
    };

export async function importAll(files: FileList | null): Promise<ImportResult> {
  if (files?.[0]) {
    try {
      const contents = await files[0].text();
      const results = await db.bulkDocs(JSON.parse(contents), { new_edits: false });
      const errors: PouchDB.Core.Error[] = results.filter((x) => "error" in x);
      if (errors.length > 1) {
        return {
          success: false,
          code: "BULK_ERROR",
          message: "One or more errors occured while import",
          errors: errors,
        };
      } else {
        return { success: true };
      }
    } catch (err: any) {
      return {
        success: false,
        code: "UNKNOWN_ERROR",
        message: err.toString(),
      };
    }
  } else {
    return {
      success: false,
      code: "NO_FILE",
      message: i18next.t("Data:errors.NO_FILE"),
    };
  }
}
