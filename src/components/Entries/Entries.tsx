import { EntryDto } from "../../data/entries/EntryDto";
import Entry from "./Entry";

export interface EntriesProps {
  entries: EntryDto[];
}

function Entries({ entries }: EntriesProps): JSX.Element {
  return (
    <ul>
      {entries.map((x) => (
        <li key={x._id}>
          <Entry entry={x} />
        </li>
      ))}
    </ul>
  );
}

export default Entries;
