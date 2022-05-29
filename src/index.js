import React from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route, createPath } from "react-router-dom";
import Layout from "./basico/Layout";
import Mostrador from "./Mostrador/Mostrador";
import Editor from "./Editor/Editor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Mostrador />} />
          <Route path="editor" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<App />);

