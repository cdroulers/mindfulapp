import { useState } from "react";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";

import { EntryDto } from "../../data/entries/EntryDto";
import groupBy from "../../shared/groupBy";
import Entry from "./Entry";
import { EntriesDependencies } from "./dependencies";

import "./Entries.styles.scss";
import MoodModal from "../MoodModal";

export type EntriesProps = {
  entries: EntryDto[];
} & EntriesDependencies;

function Entries({ entries, updateEntry, ...props }: EntriesProps): JSX.Element {
  const [t] = useTranslation("Entries");
  const [editing, setEditing] = useState<EntryDto | null>(null);
  const groupedByDate = groupBy(entries, (e) => t("timestamp", { date: e.timestamp }));

  return (
    <>
      <ul className="app-entries">
        {Array.from(groupedByDate.keys()).map((x) => (
          <li key={x}>
            <h3>{x}</h3>
            <List>
              {groupedByDate.get(x)!.map((x) => (
                <Entry key={x._id} {...props} entry={x} onEditClick={setEditing} />
              ))}
            </List>
          </li>
        ))}
      </ul>
      <MoodModal
        updating={
          editing
            ? {
                entry: editing,
                updateEntry: updateEntry,
              }
            : undefined
        }
        visible={Boolean(editing)}
        onClose={() => setEditing(null)}
      />
    </>
  );
}

export default Entries;
