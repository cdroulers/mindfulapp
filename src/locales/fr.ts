import Header from "../components/Header/fr.json";
import Home from "../components/Home/fr.json";
import MoodModal from "../components/MoodModal/fr.json";
import Entries from "../components/Entries/fr.json";
import Entry from "../components/Entries/Entry/fr.json";
import Shared from "../components/shared/fr.json";
import { getEmotionTranslation } from "../data/emotions";

const emotions = getEmotionTranslation("fr");

const fr = {
  Entries,
  Entry,
  Header,
  Home,
  MoodModal,
  Shared,
  Emotions: emotions,
};

export default fr;
