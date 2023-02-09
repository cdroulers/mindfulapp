import { useTranslation } from "react-i18next";
import List from "@mui/material/List";

import { EntryDto } from "../../data/entries/EntryDto";
import groupBy from "../../shared/groupBy";
import Entry from "./Entry";

import "./Entries.styles.scss";

export interface EntriesProps {
  entries: EntryDto[];
  markBehavioralActivationAsDone: (entryId: string) => Promise<void>;
}

function Entries({ entries, markBehavioralActivationAsDone }: EntriesProps): JSX.Element {
  const [t] = useTranslation("Entries");
  const groupedByDate = groupBy(entries, (e) => t("timestamp", { date: e.timestamp }));
  return (
    <ul className="app-entries">
      {Array.from(groupedByDate.keys()).map((x) => (
        <li key={x}>
          <h3>{x}</h3>
          <List>
            {groupedByDate.get(x)!.map((x) => (
              <Entry
                key={x._id}
                entry={x}
                markBehavioralActivationAsDone={markBehavioralActivationAsDone}
              />
            ))}
          </List>
        </li>
      ))}
    </ul>
  );
}

export default Entries;
