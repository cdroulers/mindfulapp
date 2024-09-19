import Header from "../components/Header/en.json";
import Home from "../components/Home/en.json";
import MoodModal from "../components/MoodModal/en.json";
import Entries from "../components/Entries/en.json";
import Entry from "../components/Entries/Entry/en.json";
import Shared from "../components/shared/en.json";
import Data from "../data/en.json";
import { getEmotionTranslation } from "../data/emotions";

const emotions = getEmotionTranslation("en");

const en = {
  Entries,
  Entry,
  Header,
  Home,
  MoodModal,
  Shared,
  Emotions: emotions,
  Data,
};

export default en;
