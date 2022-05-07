import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Input.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { linkActions } from '../../slices/link-slice';

const Input = ({
	placeholder,
	icon,
}: {
	placeholder: string;
	icon: IconProp;
}) => {
	const [name, setName] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			dispatch(linkActions.changeName({ name }));
		}, 700);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [name, dispatch]);

	const nameChangeHandler = (event: SyntheticEvent) => {
		const target = event.target as HTMLInputElement;
		setName(target.value);
	};

	return (
		<div className={classes['input-group']}>
			<input
				onChange={nameChangeHandler}
				type='text'
				placeholder={placeholder}
			/>
			<FontAwesomeIcon className={classes.icon} icon={icon} />
		</div>
	);
};

export default Input;
