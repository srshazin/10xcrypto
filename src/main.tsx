import { createRoot } from "react-dom/client";
import { Root } from "./Routes/Root";
import { AppContextProvider } from "./Context/AppContext";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <Root />
  </AppContextProvider>
);
