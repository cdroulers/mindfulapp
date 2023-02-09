import { useEffect, useState } from "react";
import { EntryDto, EntryCreationData } from "../../data/entries/EntryDto";
import { getEntries, addEntry, markBehavioralActivationAsDone } from "../../data/entries/service";
import Home, { HomeProps } from "./Home";

interface HomeContainerProps
  extends Omit<HomeProps, "entries" | "addEntry" | "markBehavioralActivationAsDone"> {}

function HomeContainer({ ...props }: HomeContainerProps) {
  const [entries, setEntries] = useState<EntryDto[] | undefined>();

  useEffect(() => {
    getEntries().then((entries) => setEntries(entries));
  }, []);

  const handleAddEntry = async (entryData: EntryCreationData, markPreviousAsDone: boolean) => {
    const { added, updated } = await addEntry(entryData, markPreviousAsDone);
    setEntries(updateEntry([added].concat(entries || []), updated));
  };

  const updateEntry = (entries: EntryDto[], updated: EntryDto | undefined): EntryDto[] => {
    const idx = entries.findIndex((x) => x._id === updated?._id);
    if (idx >= 0 && updated && entries) {
      const newEntries = entries.concat();
      newEntries[idx] = updated;
      return newEntries;
    }

    return entries;
  };

  const handleMarkEntryAsDone = async (entryId: string) => {
    const entry = await markBehavioralActivationAsDone(entryId);
    setEntries(updateEntry(entries || [], entry));
  };

  if (!entries) {
    return <div>LOADING</div>;
  }

  return (
    <Home
      entries={entries}
      addEntry={handleAddEntry}
      markBehavioralActivationAsDone={handleMarkEntryAsDone}
    />
  );
}

export default HomeContainer;
