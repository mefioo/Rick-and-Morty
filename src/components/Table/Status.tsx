import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCircleQuestion,
	faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import classes from './Status.module.css'

type propsType = {
	status: string;
};

const Status = (props: propsType) => {
	const [status, setStatus] = useState('Alive');

	useEffect(() => {
		setStatus(props.status);
	}, [status, props.status]);

	let icon = (
		<FontAwesomeIcon style={{ color: '#BAC6D8' }} icon={faCircleQuestion} />
	);
	if (status === 'Alive') {
		icon = (
			<FontAwesomeIcon style={{ color: '#03A99F' }} icon={faCircleCheck} />
		);
	}
	if (status === 'Dead') {
		icon = (
			<FontAwesomeIcon
				style={{ color: '#FF2626' }}
				icon={faCircleExclamation}
			/>
		);
	}

	return (
		<React.Fragment>
			{icon}
			<p style={props.status === 'unknown' ? { color: '#5F6569' } : {}}>
				{status}
			</p>
		</React.Fragment>
	);
};

export default Status;
