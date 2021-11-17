import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "app/auth/services/AuthService";
import {
  MessageProvider,
  SnackbarProvider,
  SpinnerProvider,
} from "@vadiun/react-hooks";
import { Message, Snackbar, Spinner } from "@vadiun/react-components";
import { SnackbarProvider as NotiStackProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/es";
import { AppNavigation } from "app/navigation";
moment.locale("es");

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Poppins", sans-serif`,
    },
    palette: {
      primary: {
        main: "#37bdf8",
      },
      secondary: {
        main: "#37bdf8",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <NotiStackProvider>
          <SpinnerProvider component={Spinner}>
            <MessageProvider component={Message}>
              <SnackbarProvider component={Snackbar}>
                <AuthProvider>
                  <AppNavigation />
                </AuthProvider>
              </SnackbarProvider>
            </MessageProvider>
          </SpinnerProvider>
        </NotiStackProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
