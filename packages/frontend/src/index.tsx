import * as React from "react"
import * as ReactDOM from "react-dom"
import Counter from "./components/Counter"
import { SampleComponent } from "./components/sample";

// index.tsx
ReactDOM.render(
	<React.StrictMode>
		<Counter name='react' />
		<SampleComponent name='nim room hwang' />
	</React.StrictMode>,
	document.getElementById("root")
);
