import React from 'react';
import classes from './Paragraphs.module.css';
import ReactTooltip from 'react-tooltip';
import { TOOLTIP_CHARS } from '../../constants';

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

	const nameLength = props.name.length;

	const additionalInfoLength = props.additionalInfo
		? props.additionalInfo.length
		: 0;

	return (
		<React.Fragment>
			<p
				data-tip={nameLength > TOOLTIP_CHARS ? props.name : ''}
				style={nameStyle}
				className={classes[props.className[0]]}
			>
				{nameLength > TOOLTIP_CHARS
					? props.name.slice(0, TOOLTIP_CHARS) + '...'
					: props.name}
			</p>
			<ReactTooltip></ReactTooltip>
			{props.additionalInfo !== '' && (
				<React.Fragment>
					<p
						style={props.dead ? { color: '#8C9193' } : {}}
						className={classes[props.className[1]]}
						data-tip={
							additionalInfoLength > TOOLTIP_CHARS ? props.additionalInfo : ''
						}
					>
						{additionalInfoLength > TOOLTIP_CHARS
							? props.additionalInfo.slice(0, TOOLTIP_CHARS) + '...'
							: props.additionalInfo}
					</p>
					<ReactTooltip></ReactTooltip>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

Paragraphs.defaultProps = defaultProps;

export default Paragraphs;
