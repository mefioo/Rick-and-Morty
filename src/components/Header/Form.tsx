import React from 'react';
import classes from './Form.module.css';
import Input from './Input';
import ButtonInput from './ButtonInput';
import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
	return (
		<form className={classes.form}>
			<Input placeholder='Search' icon={faMagnifyingGlass} />
			<ButtonInput placeholder='Species' icon={faSortDown} />
			<ButtonInput placeholder='Origin' icon={faSortDown} />
			<ButtonInput placeholder='Status' icon={faSortDown} />
		</form>
	);
};

export default Form;
