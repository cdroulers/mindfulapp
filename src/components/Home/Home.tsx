import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

import { EntryDto } from "../../data/entries/EntryDto";
import Entries from "../Entries";
import MoodModal from "../MoodModal";
import { EntriesDependencies } from "../Entries/dependencies";
import { AddEntryCallback } from "../MoodModal/dependencies";

import "./Home.styles.scss";

export type HomeProps = {
  entries: EntryDto[];
  addEntry: AddEntryCallback;
} & EntriesDependencies;

function Home({ addEntry, entries, ...props }: HomeProps): JSX.Element {
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
      <Entries entries={entries} {...props} />
      <MoodModal
        adding={{
          addEntry: addEntry,
          previousEntry: entries[0],
        }}
        visible={addModalVisible}
        onClose={handleClose}
      />
    </section>
  );
}

export default Home;
