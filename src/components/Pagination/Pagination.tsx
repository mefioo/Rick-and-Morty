import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Pagination.module.css';
import PaginationButton from './PaginationButton';
import { StoreState } from '../../store';

const definePaginationArray = (numOfPages: number, currentPage: number) => {
	if (numOfPages < 7) {
		return [...Array(numOfPages).keys()].map((item) => String(item + 1));
	}
	if (currentPage < 3 || currentPage > numOfPages - 2) {
		return [
			'1',
			'2',
			'3',
			'...',
			`${numOfPages - 2}`,
			`${numOfPages - 1}`,
			`${numOfPages}`,
		];
	}
	if (currentPage === 3) {
		return ['1', '2', '3', '4', '...', `${numOfPages - 1}`, `${numOfPages}`];
	}
	if (currentPage === numOfPages - 2) {
		return [
			'1',
			'2',
			'...',
			`${numOfPages - 3}`,
			`${numOfPages - 2}`,
			`${numOfPages - 1}`,
			`${numOfPages}`,
		];
	}
	if (currentPage > 3 && currentPage < numOfPages - 2) {
		return [
			'1',
			'...',
			`${currentPage - 1}`,
			`${currentPage}`,
			`${currentPage + 1}`,
			'...',
			`${numOfPages}`,
		];
	}
	return [];
};

const Pagination = () => {
	const pages = useSelector((state: StoreState) => state.table.rows.length);
	const currentPage = useSelector(
		(state: StoreState) => state.table.currentPage
	);
	const numOfPages = Math.ceil((pages * 4) / 20);

	const numbersToDisplay = definePaginationArray(numOfPages, currentPage);
	const content = numbersToDisplay.map((item) =>
		item !== '...' ? (
			<PaginationButton key={item} content={`${item}`} />
		) : (
			<p key={Math.random()}>...</p>
		)
	);

	return (
		<div className={classes.pagination}>
			<PaginationButton maxPage={numOfPages} key={'<'} content='<' />
			{content}
			<PaginationButton maxPage={numOfPages} key={'>'} content='>' />
		</div>
	);
};

export default Pagination;
