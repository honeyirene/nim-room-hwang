import React from 'react';
import {
	Route,
	Switch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
import {
	MainComponent,
	SampleComponent,
} from './components';

interface Props {
}

// 중간단계를 한번 만들어 놓으면 나중에 뭔가 context 끼워넣기 좋다.
const RootApp: React.FC<Props> = props => {
	return <App {...props} />;
};

const App: React.FC<Props> = props => {
	return (
		<MainComponent {...props}>
			{(() => {
				return (
					<Container
						id={'app-main'}
					>
						<Switch>
							<Route
								exact={false}
								path={`/main`}
								render={_ => <SampleComponent name='샘플' />}
							/>
						</Switch>
					</Container>
				);
			})()}
		</MainComponent>
	);
};

export default RootApp;
