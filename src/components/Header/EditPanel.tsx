import React from 'react';
import classes from './EditPanel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store';
import { errorActions } from '../../slices/error-slice';
import { charactersActions } from '../../slices/characters-slice';

const EditPanel = () => {
	const tableRows = useSelector((state: StoreState) => state.tableRows.rows);
	const characters = useSelector((state: StoreState) => state.characters);
	const dispatch = useDispatch();

	const checkedNumber = tableRows.filter(
		(item) => item.isChecked === true
	).length;

	const changeStatusHandler = () => {
		const errorMessage = {
			title: 'Error while editing characters',
			code: 0,
			message:
				'Please select one of the characters with status of "unknown" or "Alive" to proceed.',
		};

		if (checkedNumber !== 1) {
			dispatch(errorActions.setError(errorMessage));
			return;
		}

		const id = tableRows.find((item) => item.isChecked)?.id;
		const character = characters.results.filter((item) => item.id === id)[0];

		if (character.status === 'Dead') {
			dispatch(errorActions.setError(errorMessage));
			return;
		}

		const tableRowStatus = tableRows.find((item) => item.id === id)?.status;

		const updatedCharacters = characters.results.map((character) =>
			character.id === id ? { ...character, status: tableRowStatus } : character
		);

		dispatch(
			charactersActions.setCharacters({
				info: characters.info,
				results: updatedCharacters,
				currentPage: characters.currentPage,
			})
		);
	};

	return (
		<div className={classes.edit}>
			{checkedNumber < 2 && (
				<button
					onClick={changeStatusHandler}
					className={classes['button--blue']}
				>
					<FontAwesomeIcon className={classes.icon} icon={faPenToSquare} />
					<p>Change status</p>
				</button>
			)}
			<button className={classes['button--red']}>
				<FontAwesomeIcon icon={faTrashCan} />
				<p>Remove characters</p>
			</button>
		</div>
	);
};

export default EditPanel;
