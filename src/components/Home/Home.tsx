import { useState } from "react";
import { EntryDto, EntryCreationData } from "../../data/entries/EntryDto";
import Entries from "../Entries";
import MoodModal from "../MoodModal";
import Button from "@mui/material/Button";

import "./Home.styles.scss";
import { useTranslation } from "react-i18next";

export interface HomeProps {
  entries: EntryDto[];
  addEntry: (entry: EntryCreationData) => Promise<void>;
}

function Home({ addEntry, entries }: HomeProps): JSX.Element {
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
      <Entries entries={entries} />
      <MoodModal addEntry={addEntry} visible={addModalVisible} onClose={handleClose} />
    </section>
  );
}

export default Home;
