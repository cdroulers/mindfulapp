import { useState } from "react";
import { EntryDto, EntryCreationData } from "../../data/entries/EntryDto";
import Entries from "../Entries";
import MoodModal from "../MoodModal";
import Button from "@mui/material/Button";

import "./Home.styles.scss";
import { useTranslation } from "react-i18next";

export interface HomeProps {
  entries: EntryDto[];
  addEntry: (entry: EntryCreationData, markPreviousAsDone: boolean) => Promise<void>;
  markBehavioralActivationAsDone: (entryId: string) => Promise<void>;
}

function Home({ addEntry, entries, markBehavioralActivationAsDone }: HomeProps): JSX.Element {
  const [t] = useTranslation("Home");
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

  const handleClose = () => setAddModalVisible(false);
  return (
    <section className="app-home">
      <h2>{t("header")}</h2>
      <Button
        variant="outlined"
        style={{ marginBottom: "0.5rem" }}
        onClick={() => {
          setAddModalVisible(true);
        }}>
        {t("addEntry")}
      </Button>
      <Entries entries={entries} markBehavioralActivationAsDone={markBehavioralActivationAsDone} />
      <MoodModal
        addEntry={addEntry}
        visible={addModalVisible}
        onClose={handleClose}
        previousEntry={entries[0]}
      />
    </section>
  );
}

export default Home;
