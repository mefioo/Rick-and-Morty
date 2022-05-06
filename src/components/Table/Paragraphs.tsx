import React from 'react';
import classes from './Paragraphs.module.css';

type propsType = {
	className: string[];
	name: string;
	additionalInfo: string;
	dead?: boolean;
};

const defaultProps: propsType = {
	name: '',
	additionalInfo: '',
	className: [],
	dead: false,
};

const Paragraphs = (props: propsType) => {
	const nameStyle =
		props.name === 'unknown'
			? props.dead
				? { color: '#C6C8C9' }
				: { color: '#5F6569' }
			: props.dead
			? { color: '#5F6569' }
			: {};

	return (
		<React.Fragment>
			<p style={nameStyle} className={classes[props.className[0]]}>
				{props.name}
			</p>
			{props.additionalInfo !== '' && (
				<p
					style={props.dead ? { color: '#8C9193' } : {}}
					className={classes[props.className[1]]}
				>
					{props.additionalInfo}
				</p>
			)}
		</React.Fragment>
	);
};

Paragraphs.defaultProps = defaultProps;

export default Paragraphs;
