import classes from './EditPanel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store';
import { errorActions } from '../../slices/error-slice';
import { apiInfoActions } from '../../slices/api-info-slice';

const EditPanel = () => {
	const tableRows = useSelector((state: StoreState) => state.table.rows);
	const id = tableRows.find((item) => item.isChecked)?.id;

	const apiInfo = useSelector((state: StoreState) => state.apiInfo);
	const allCharacters = apiInfo.characters;

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

		const characterById = allCharacters.find((item) => item.id === id) || {
			status: 'Dead',
		};

		if (characterById.status === 'Dead') {
			dispatch(errorActions.setError(errorMessage));
			return;
		}

		const tableRowStatus = tableRows.find((item) => item.id === id)?.status;

		const updatedCharacters = allCharacters.map((character) =>
			character.id === id ? { ...character, status: tableRowStatus } : character
		);

		dispatch(
			apiInfoActions.setApiInfo({
				...apiInfo,
				characters: updatedCharacters,
			})
		);
	};

	const removeCharacterHandler = () => {
		const checkedCharacters = tableRows
			.filter((item) => item.isChecked)
			.map((item) => item.id);

		if (checkedCharacters.length === 0) {
			dispatch(
				errorActions.setError({
					title: 'Error while removing characters',
					code: 0,
					message: 'Please select at least one of the characters to remove it.',
				})
			);
			return;
		}

		const updatedCharacters = allCharacters.filter(
			(character) => !checkedCharacters.includes(character.id)
		);

		dispatch(
			apiInfoActions.setApiInfo({
				...apiInfo,
				info: { ...apiInfo.info, charactersNo: updatedCharacters.length },
				characters: updatedCharacters,
				pages: Math.ceil(updatedCharacters.length / 5),
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
			<button
				onClick={removeCharacterHandler}
				className={classes['button--red']}
			>
				<FontAwesomeIcon icon={faTrashCan} />
				<p>Remove characters</p>
			</button>
		</div>
	);
};

export default EditPanel;
