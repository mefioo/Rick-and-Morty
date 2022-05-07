import React from 'react';
import classes from './Form.module.css';
import Input from './Input';
import DropdownInput from './DropdownInput';
import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
	return (
		<form className={classes.form}>
			<Input placeholder='Search' icon={faMagnifyingGlass} />
			<DropdownInput placeholder='Species' icon={faSortDown} />
			<DropdownInput placeholder='Origin' icon={faSortDown} />
			<DropdownInput select placeholder='Status' icon={faSortDown} />
		</form>
	);
};

export default Form;
