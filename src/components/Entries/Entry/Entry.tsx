import { EntryDto, PrimaryMood } from "../../../data/entries/EntryDto";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import "./Entry.styles.scss";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export interface EntryProps {
  entry: EntryDto;
}

function Entry({ entry }: EntryProps): JSX.Element {
  const [t] = useTranslation(["Shared"]);
  const primaryMood = t(`Shared:primaryMood.${entry.primaryMood}`);
  return (
    <ListItem className="app-entry" divider>
      <ListItemAvatar>
        <Avatar>{getAvatar(entry.primaryMood)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary">
              {primaryMood}
            </Typography>
            {" — "}
            {entry.text}
          </>
        }
        secondary={<time dateTime={entry.timestamp}>{entry.timestamp}</time>}
      />
    </ListItem>
  );
}

function getAvatar(mood: PrimaryMood): JSX.Element {
  switch (mood) {
    case "good":
      return <ThumbUpAltIcon />;
    case "bad":
      return <ThumbDownAltIcon />;
    default:
      return <QuestionMarkIcon />;
  }
}

export default Entry;
