import React from 'react';
import classes from './Overlay.module.css';

const Overlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className={classes.overlay}>{children}</div>;
};

export default Overlay;
