import React, { SyntheticEvent, useEffect, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Input.module.css';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../slices/filters-slice';
import { MultiSelect } from 'react-multi-select-component';

const DropdownInput = ({
	label,
	icon,
	select,
	options,
}: {
	label: string;
	icon: IconProp;
	select?: boolean;
	options: { id: number; name: string }[];
}) => {
	const dispatch = useDispatch();
	const [selected, setSelected] = useState(
		options.map((item) => ({ label: item.name, value: item.id }))
	);

	useEffect(() => {
		setSelected(options.map((item) => ({ label: item.name, value: item.id })));
	}, [options]);

	useEffect(() => {
		const selectedItems = selected.map((item) => ({
			id: item.value,
			name: item.label,
		}));
		if (label === 'Species') {
			dispatch(
				filtersActions.changeSpecies({
					species: selectedItems,
				})
			);
		}
		if (label === 'Origin') {
			dispatch(filtersActions.changeOrigins({ origins: selectedItems }));
		}
	}, [selected, select, dispatch, label]);

	const selectStatusHandler = (event: SyntheticEvent) => {
		const target = event.target as HTMLSelectElement;
		dispatch(filtersActions.changeStatus({ status: target.value }));
	};

	return (
		<div className={classes['input-group']}>
			{!select && (
				<MultiSelect
					options={options.map((item) => ({
						label: item.name,
						value: item.id,
					}))}
					value={selected}
					onChange={setSelected}
					labelledBy='Select'
					ArrowRenderer={() => (
						<div className='custom-arrow'>
							<FontAwesomeIcon className={classes.icon} icon={icon} />
						</div>
					)}
					ClearSelectedIcon={null}
					valueRenderer={() => {
						return label;
					}}
					disableSearch={true}
				/>
			)}
			{select && (
				<React.Fragment>
					<select defaultValue='Status' onChange={selectStatusHandler}>
						<option value='Status' disabled>
							Status
						</option>
						<option value='All'>All</option>
						<option value='Alive'>Alive</option>
						<option value='unknown'>unknown</option>
						<option value='Dead'>Dead</option>
					</select>
					<FontAwesomeIcon className={classes.icon} icon={icon} />
				</React.Fragment>
			)}
		</div>
	);
};

export default DropdownInput;
