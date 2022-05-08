import classes from '../UI/Checkbox.module.css';
import { useDispatch } from 'react-redux';
import { tableRowActions } from '../../slices/table-row-slice';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store';

const TableHeaderCheckbox = ({
	ids,
	disabled,
}: {
	ids: number[];
	disabled: boolean;
}) => {
	const dispatch = useDispatch();
	const { rows, allChecked } = useSelector(
		(state: StoreState) => state.tableRows
	);

	const checkCheckboxHandler = () => {
		dispatch(
			tableRowActions.updateAll({
				rows: rows.map((item) => ({
					id: item.id,
					isChecked: !allChecked,
				})),
			})
		);
	};

	return (
		<input
			onChange={checkCheckboxHandler}
			disabled={disabled}
			className={classes.checkbox}
			type='checkbox'
		></input>
	);
};

export default TableHeaderCheckbox;
