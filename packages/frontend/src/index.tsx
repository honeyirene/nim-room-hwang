import * as React from "react"
import * as ReactDOM from "react-dom"
import Counter from "./components/Counter"

// index.tsx
ReactDOM.render( 
  <React.StrictMode>
    <Counter name='react'/> 
  </React.StrictMode>,  
  document.getElementById("root")
);