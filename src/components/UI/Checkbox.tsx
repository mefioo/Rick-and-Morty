import { useDispatch, useSelector } from 'react-redux';
import { tableActions } from '../../slices/table-slice';
import { StoreState } from '../../store';
import classes from './Checkbox.module.css';

const Checkbox = ({ id, disabled }: { id: number; disabled: boolean }) => {
	const rows = useSelector((state: StoreState) => state.table.rows);

	const isChecked =
		rows.filter((item) => item.id === id).length > 0
			? rows.filter((item) => item.id === id)[0].isChecked
			: false;

	const dispatch = useDispatch();

	const checkCheckboxHandler = () => {
		const updatedRows = rows.map((item) =>
			item.id === id ? { id: item.id, isChecked: !item.isChecked } : item
		);
		dispatch(tableActions.updateRows({ rows: updatedRows }));
	};

	return (
		<input
			checked={isChecked}
			onChange={checkCheckboxHandler}
			disabled={disabled}
			className={classes.checkbox}
			type='checkbox'
		></input>
	);
};

export default Checkbox;
