"use client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function Home() {
  const [privateKey, setPrivateKey] = React.useState("");
  const router = useRouter();
  const handleButton = () => {
    console.log(`go/${privateKey}`);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="centerDiv">
          <div className="inputBoxP">
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="demo-customized-textbox">
                Private Key
              </InputLabel>
              <BootstrapInput
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                id="demo-customized-textbox"
              />
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => router.push(`/bot?key=${privateKey}`)}
            >
              Setup Bot
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
