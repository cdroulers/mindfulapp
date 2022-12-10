import { EntryDto, EntryCreationData } from "../../data/entries/EntryDto";
import Entries from "../Entries";

import "./Home.styles.scss";

export interface HomeProps {
  entries: EntryDto[];
  addEntry: (entry: EntryCreationData) => Promise<void>;
}

function Home({ addEntry, entries }: HomeProps): JSX.Element {
  return (
    <section className="app-home">
      <h2>Mindfulness entries</h2>
      <button
        style={{ marginBottom: "0.5rem" }}
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
      <Entries entries={entries} />
    </section>
  );
}

export default Home;
