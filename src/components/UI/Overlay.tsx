import React from 'react';
import classes from './Overlay.module.css';

const Overlay: React.FC<{ children: React.ReactNode; style?: object }> = ({
	children,
	style,
}) => {
	return (
		<div style={style} className={classes.overlay}>
			{children}
		</div>
	);
};

Overlay.defaultProps = {
	style: {},
};

export default Overlay;
