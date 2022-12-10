import { EntryDto } from "../../../data/entries/EntryDto";

import "./Entry.styles.scss";

export interface EntryProps {
  entry: EntryDto;
}

function Entry({ entry }: EntryProps): JSX.Element {
  return (
    <article className="app-entry">
      <h3>
        {entry.primaryMood}
        {entry.secondaryMoods.length > 0 && (
          <small>
            (<span>{entry.secondaryMoods[0]}</span>)
          </small>
        )}
      </h3>

      {entry.text}

      <div className="app-timestamp">
        <time dateTime={entry.timestamp}>{entry.timestamp}</time>
      </div>
    </article>
  );
}

export default Entry;
