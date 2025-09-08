import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"

import "./styles/main.css"

import App from "./components/App"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <Router>
    <App />
  </Router>
)
