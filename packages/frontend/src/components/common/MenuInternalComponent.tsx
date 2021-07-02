import React, {
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Menu,
	Dropdown,
	Button,
} from 'semantic-ui-react';

export const MenuInternalComponent: React.FC = props => {

	const categories = [
		'델리고',
		'티시안',
		'프로비',
		'디육',
		'허니린',
		'린카루',
	];

	return (
		<Container>
			<Menu.Item
				header
				name={'name'}
			>
				{`님룸황`}
			</Menu.Item>
			{categories.map(category => {
				return (
					<Menu.Item
						key={category}
						name={category}
						active={true}
					>
						{category.replace(/_/g, ' ')}
					</Menu.Item>
				);
			})}
		</Container>
	);
};
