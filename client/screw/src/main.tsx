import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <App />
      </DndProvider>
    </ChakraProvider>
  </React.StrictMode>
);
