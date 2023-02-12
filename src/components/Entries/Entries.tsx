import { useTranslation } from "react-i18next";
import List from "@mui/material/List";

import { EntryDto } from "../../data/entries/EntryDto";
import groupBy from "../../shared/groupBy";
import Entry from "./Entry";
import { EntryDependencies } from "./Entry/dependencies";

import "./Entries.styles.scss";

export type EntriesProps = {
  entries: EntryDto[];
} & EntryDependencies;

function Entries({ entries, ...props }: EntriesProps): JSX.Element {
  const [t] = useTranslation("Entries");
  const groupedByDate = groupBy(entries, (e) => t("timestamp", { date: e.timestamp }));
  return (
    <ul className="app-entries">
      {Array.from(groupedByDate.keys()).map((x) => (
        <li key={x}>
          <h3>{x}</h3>
          <List>
            {groupedByDate.get(x)!.map((x) => (
              <Entry key={x._id} entry={x} {...props} />
            ))}
          </List>
        </li>
      ))}
    </ul>
  );
}

export default Entries;
