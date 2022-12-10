import { EntryDto } from "../../data/entries/EntryDto";

import "./Entry.styles.scss";

export interface EntryProps {
  entry: EntryDto;
}

function Entry({ entry }: EntryProps): JSX.Element {
  return (
    <article className="app-entry">
      <h3>{entry.primaryMood}</h3>

      {entry.text}

      <div className="app-timestamp">({entry.timestamp})</div>
    </article>
  );
}

export default Entry;
