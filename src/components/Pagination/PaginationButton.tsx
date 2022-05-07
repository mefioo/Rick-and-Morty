import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './PaginationButton.module.css';
import { StoreState } from '../../store';
import { charactersActions } from '../../slices/characters-slice';

const PaginationButton = (props: { content: string; maxPage?: number }) => {
	const dispatch = useDispatch();

	const pageNo = useSelector(
		(state: StoreState) => state.characters.currentPage
	);
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

		dispatch(
			charactersActions.updatePageNumber({ currentPage: usersPageChoice })
		);
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
