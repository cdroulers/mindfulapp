import { EntryDto } from "../../data/entries/EntryDto";
import groupBy from "../../shared/groupBy";
import Entry from "./Entry";

import "./Entries.styles.scss";

export interface EntriesProps {
  entries: EntryDto[];
}

function Entries({ entries }: EntriesProps): JSX.Element {
  const groupedByDate = groupBy(entries, (e) => e.timestamp.substring(0, 10));
  return (
    <ul className="app-entries">
      {Array.from(groupedByDate.keys()).map((x) => (
        <li key={x}>
          <h3>{x}</h3>
          <ul>
            {groupedByDate.get(x)!.map((x) => (
              <li key={x._id}>
                <Entry entry={x} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Entries;
