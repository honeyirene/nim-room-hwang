import React from 'react'
import ReactDOM from 'react-dom'
import {
	HashRouter,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import App from './App';
import Counter from './components/Counter'
import { SampleComponent } from './components/sample';

// // index.tsx
// ReactDOM.render(
// 	<React.StrictMode>
// 		<Counter name='react' />
// 		<SampleComponent name='nim room hwang' />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

function main() {
	const defaultPath = `/main`;
	ReactDOM.render(
		<HashRouter>
			<Switch>
				<Route
					path={`/main`}
					render={props => <App {...props.match.params} />}
				/>
				<Route
					render={() => <Redirect to={defaultPath} />}
				/>
			</Switch>
		</HashRouter>,
		document.getElementById('root'));
}
main();
