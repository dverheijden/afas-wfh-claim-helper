import React from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {
  Avatar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GitHubIcon from "@mui/icons-material/GitHub";
import { orange, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: grey[500],
    },
  },
});

function dayToNth(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function datesToString(dates: DateObject[]): string {
  return dates
    .map(
      (date) =>
        `${date.weekDay.name.toLowerCase()} ${date.month.name.toLowerCase()} ${
          date.day
        }${dayToNth(date.day)}`
    )
    .join(", ");
}

export default function App() {
  const [dates, setDates] = React.useState<DateObject[]>([]);
  const [datesString, setDatesString] = React.useState<string>("");
  const [noDays, setNoDays] = React.useState<Number>(0);

  function handleDateChange(dates: DateObject[]) {
    setDates(dates);
    setNoDays(dates.length);

    setDatesString(datesToString(dates));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component={"main"} maxWidth={"sm"}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <CalendarMonthIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            WFH Claim Helper
          </Typography>
          <Typography marginTop={1} marginBottom={3}>
            AFAS requires a very specific format for claiming your Working From
            Home allowance. So I thought that it would be a nice dev-day project
            to make a helper for making this process easier. <br />
            <br />
            Just select the days that you've worked from home and copy-paste the
            "Days Summary" to AFAS.
          </Typography>

          <Calendar
            multiple
            weekStartDayIndex={1}
            value={dates}
            onChange={handleDateChange}
            format="DD MMMM YYYY"
            sort
            plugins={[<DatePanel />]}
          />

          <TextField
            margin={"normal"}
            value={noDays}
            label={"Number of Days"}
          />
          <TextField
            fullWidth
            multiline
            margin={"normal"}
            value={datesString}
            label={"Days Summary"}
          />
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Divider>
            <Link href={"https://github.com/dverheijden/afas-wfh-claim-helper"}>
              <GitHubIcon fontSize={"large"} sx={{ color: "secondary.main" }} />
            </Link>
          </Divider>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
