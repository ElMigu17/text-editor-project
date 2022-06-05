import React from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./basico/Layout";
import Mostrador from "./Mostrador/Mostrador";
import Editor from "./Editor/Editor";

import { Provider } from 'react-redux'
import store from './store'

export default function App() {
  return (
    <Provider  store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Mostrador />} />
            <Route path="editor" element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<App />);

