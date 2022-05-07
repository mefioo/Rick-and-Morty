import React from 'react';
import classes from './Checkbox.module.css';

const Checkbox = ({ id }: { id?: boolean }) => {
	return <input className={classes.checkbox} type='checkbox'></input>;
};

export default Checkbox;
