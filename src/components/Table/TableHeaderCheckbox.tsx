import classes from '../UI/Checkbox.module.css';
import { useDispatch } from 'react-redux';
import { tableActions } from '../../slices/table-slice';
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
	const { rows, allChecked, currentPage } = useSelector(
		(state: StoreState) => state.table
	);

	const checkCheckboxHandler = () => {
		const firstIndex = currentPage * 5 - 5;
		const lastIndex = currentPage * 5;
		const updatedRows = rows.map((item, index) =>
			index >= firstIndex && index < lastIndex
				? { ...item, isChecked: !allChecked }
				: item
		);
		dispatch(
			tableActions.updateAll({
				rows: updatedRows,
			})
		);
	};

	return (
		<input
			onChange={checkCheckboxHandler}
			disabled={disabled}
			className={classes.checkbox}
			type='checkbox'
			checked={allChecked}
		></input>
	);
};

export default TableHeaderCheckbox;
