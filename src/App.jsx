import "./App.css";
import AppRouter from "./router";
import { MantineProvider } from "@mantine/core";
function App() {
  return (
    <MantineProvider>
      <AppRouter />
    </MantineProvider>
  );
}

export default App;
