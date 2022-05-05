import React from 'react';
import classes from './Form.module.css';
import Input from './Input';
import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
	return (
		<form className={classes.form}>
			<Input placeholder='Search' icon={faMagnifyingGlass} />
			<Input placeholder='Species' icon={faSortDown} />
			<Input placeholder='Origin' icon={faSortDown} />
			<Input placeholder='Status' icon={faSortDown} />
		</form>
	);
};

export default Form;
