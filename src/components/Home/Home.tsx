import { Entry, EntryCreationData } from "../../data/entries/Entry";

export interface HomeProps {
  entries: Entry[];
  addEntry: (entry: EntryCreationData) => Promise<void>;
}

function Home({ addEntry, entries }: HomeProps): JSX.Element {
  return (
    <section>
      <h2>Mindfulness entries</h2>
      <ul>
        {entries.map((x) => (
          <li key={x._id}>
            {x.primaryMood} on {x.timestamp} with {x.text}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          addEntry({
            primaryMood: "good",
            secondaryMoods: ["happy"],
            text: "Loving life",
          });
        }}
      >
        Add entry
      </button>
    </section>
  );
}

export default Home;
