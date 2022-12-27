import Header from "../components/Header/en.json";
import Home from "../components/Home/en.json";
import MoodModal from "../components/MoodModal/en.json";
import Entry from "../components/Entries/Entry//en.json";
import Shared from "../components/shared/en.json";
import { getEmotionTranslation } from "../data/emotions";

const emotions = getEmotionTranslation("en");

const en = {
  Entry,
  Header,
  Home,
  MoodModal,
  Shared,
  Emotions: emotions,
};

export default en;
