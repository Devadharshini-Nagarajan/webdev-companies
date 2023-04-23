import React from "react";
import Router from "./router";
import { ConfigProvider } from "antd";

import Context from "./components/Context";
import "./App.scss";

function App() {
  return (
    <Context>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#207d96",
          },
        }}
      >
        <div className="App">
          <Router />
        </div>
      </ConfigProvider>
    </Context>
  );
}

export default App;
