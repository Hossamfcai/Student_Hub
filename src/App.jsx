import "./App.css";
import AppRouter from "./router";
import { MantineProvider } from "@mantine/core";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
function App() {
  return (
    <MantineProvider>
      <Notifications />
      <AppRouter />
    </MantineProvider>
  );
}

export default App;
