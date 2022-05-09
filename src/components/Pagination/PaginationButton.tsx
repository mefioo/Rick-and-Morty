import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './PaginationButton.module.css';
import { StoreState } from '../../store';
import { tableActions } from '../../slices/table-slice';

const PaginationButton = (props: { content: string; maxPage?: number }) => {
	const dispatch = useDispatch();

	const table = useSelector((state: StoreState) => state.table);
	const pageNo = table.currentPage;

	const className =
		String(pageNo) === props.content
			? `${classes.button} ${classes['button--current']}`
			: classes.button;

	const buttonClickHandler = (event: SyntheticEvent) => {
		const target = event.target as HTMLButtonElement;

		let usersPageChoice = pageNo;
		switch (target.value) {
			case '>':
				if (props.maxPage && pageNo + 1 <= props.maxPage) {
					usersPageChoice = pageNo + 1;
				}
				break;
			case '<':
				if (pageNo - 1 >= 1) {
					usersPageChoice = pageNo - 1;
				}
				break;
			default:
				usersPageChoice = Number(props.content);
				break;
		}

		dispatch(tableActions.unselectAllRows())

		dispatch(tableActions.updatePageNumber({ currentPage: usersPageChoice }));
	};

	return (
		<button
			type='button'
			onClick={buttonClickHandler}
			value={props.content}
			className={className}
		>
			{props.content}
		</button>
	);
};

export default PaginationButton;
