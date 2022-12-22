import { EntryDto } from "../../data/entries/EntryDto";
import groupBy from "../../shared/groupBy";
import Entry from "./Entry";
import List from "@mui/material/List";

import "./Entries.styles.scss";

export interface EntriesProps {
  entries: EntryDto[];
}

function Entries({ entries }: EntriesProps): JSX.Element {
  const groupedByDate = groupBy(entries, (e) => e.timestamp.toISOString().substring(0, 10));
  return (
    <ul className="app-entries">
      {Array.from(groupedByDate.keys()).map((x) => (
        <li key={x}>
          <h3>{x}</h3>
          <List>
            {groupedByDate.get(x)!.map((x) => (
              <Entry key={x._id} entry={x} />
            ))}
          </List>
        </li>
      ))}
    </ul>
  );
}

export default Entries;
