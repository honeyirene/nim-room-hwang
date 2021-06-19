import React, { useMemo, useState } from 'react';
import { ClientGroup } from '../../shared';

interface Props {
	name: string
}

export const SampleComponent: React.FC<Props> = props => {
	const { name } = props;

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [a, setA] = useState<string>('sample');
	const [b, setB] = useState<number>(0);

	const client = useMemo(() => {
		const group = new ClientGroup();
		return group.sample;
	}, []);

	const handleA = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const v = evt.target.value;
		setA(v);
	}

	const handleB = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const v = evt.target.valueAsNumber;
		setB(v);
	}

	const onClick = async () => {
		setIsLoading(true);
		await client.sample({ a, b });
		setIsLoading(false);
	}

	if (isLoading) {
		return <h1>loading...</h1>;
	}

	return (
		<>
			<h1>{name} sample sender</h1>
			<input
				type="string"
				onChange={handleA}
			/>
			<input
				type="number"
				onChange={handleB}
			/>

			<button
				onClick={onClick}
				title={'send'}
			/>
		</>
	);
}
