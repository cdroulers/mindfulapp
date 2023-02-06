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
  const [t] = useTranslation(["Entry", "Shared", "Emotions"]);
  const primaryMood = t(`Shared:primaryMood.${entry.primaryMood}`);
  return (
    <ListItem className="app-entry" divider>
      <ListItemAvatar>
        <Avatar>{getAvatar(entry.primaryMood)}</Avatar>
      </ListItemAvatar>
      <section>
        <div className="mood">
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary">
            {primaryMood}
          </Typography>
          {" — "}
          {entry.secondaryMoods.length > 0 && (
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary">
                {entry.secondaryMoods
                  .map((x) => t(`Emotions:${entry.primaryMood}.${x}`))
                  .join(", ")}
              </Typography>
              {" — "}
            </>
          )}
          <span>{entry.text}</span>
          <div className="timestamp">
            <Typography
              sx={{ display: "inline" }}
              component="time"
              variant="body1"
              color="text.secondary"
              fontSize={"0.8em"}
              dateTime={entry.timestamp.toISOString()}>
              {t("timestamp", { date: entry.timestamp })}
            </Typography>
          </div>
        </div>
        {entry.behavioralActivation && (
          <div className="behavioral-activation">
            <h4>
              {t("behavioralActivation.action", { date: entry.behavioralActivation.timestamp })}
            </h4>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body1"
              color="text.secondary"
              fontSize={"0.9em"}>
              {entry.behavioralActivation.action}
            </Typography>
          </div>
        )}
      </section>
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
