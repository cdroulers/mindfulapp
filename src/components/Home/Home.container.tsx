import { useEffect, useState } from "react";
import { Entry, EntryCreationData } from "../../data/entries/Entry";
import { getEntries, addEntry } from "../../data/entries/service";
import Home, { HomeProps } from "./Home";

interface HomeContainerProps extends Omit<HomeProps, "entries" | "addEntry"> {}

function HomeContainer({ ...props }: HomeContainerProps) {
  const [entries, setEntries] = useState<Entry[] | undefined>();

  useEffect(() => {
    getEntries().then((entries) => setEntries(entries));
  }, []);

  const handleAddEntry = async (entryData: EntryCreationData) => {
    const entry = await addEntry(entryData);
    setEntries([entry].concat(entries || []));
  };

  if (!entries) {
    return <div>LOADING</div>;
  }

  return <Home entries={entries} addEntry={handleAddEntry} />;
}

export default HomeContainer;
