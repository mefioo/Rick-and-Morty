import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ErrorMessage.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreState } from '../../store';
import { errorActions } from '../../slices/error-slice';

const ErrorMessage = () => {
	const errorData = useSelector((state: StoreState) => state.error.errorData);
	const dispatch = useDispatch();

	const closeErrorHandler = () => {
		dispatch(errorActions.clearError());
	};

	return (
		<div className={classes.error}>
			<div className={classes.exit}>
				<FontAwesomeIcon
					onClick={closeErrorHandler}
					className={classes.icon}
					icon={faXmark}
				/>
			</div>
			<h2>{errorData.title}</h2>
			<p>{errorData.message}</p>
		</div>
	);
};

export default ErrorMessage;
