import React, { useMemo, useState } from 'react';
import { necessaryCharacterInfoType } from '../../types/types';
import Checkbox from '../UI/Checkbox';
import classes from './TableRow.module.css';
import Location from './Location';
import Paragraphs from './Paragraphs';
import Status from './Status';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store';
import DropdownInput from './DropdownInput';

const TableRow = React.memo((data: necessaryCharacterInfoType) => {
	const [isOriginHovered, setIsOriginHovered] = useState(false);
	const isDead = useMemo(() => {
		return data.status === 'Dead';
	}, [data.status]);

	const rows = useSelector((state: StoreState) => state.table.rows);
	const isChecked = rows.find((item) => item.id === data.id)?.isChecked;
	const noCheckedRows = rows.filter((item) => item.isChecked).length;

	const originHoverHandler = () => {
		setIsOriginHovered(true);
	};

	const originHoverLeaveHandler = () => {
		setIsOriginHovered(false);
	};

	return (
		<tr
			className={!isDead ? classes.tr : `${classes.tr} ${classes['tr-dead']}`}
		>
			{data.id && (
				<React.Fragment>
					<td>
						<Checkbox id={data.id} disabled={false} />
					</td>
					<td>
						<Paragraphs
							dead={isDead}
							className={['name', 'species']}
							name={data.name}
							additionalInfo={data.species}
						/>
					</td>
					<td>
						<img alt='Avatar of the character' src={data.image}></img>
					</td>
					<td
						onMouseEnter={originHoverHandler}
						onMouseLeave={originHoverLeaveHandler}
					>
						<Paragraphs
							dead={isDead}
							className={['name', 'species']}
							name={data.origin ? data.origin.name : ''}
							additionalInfo={data.origin ? data.origin.type : ''}
						/>
						{isOriginHovered && (
							<Location name={data.location.name} type={data.location.type} />
						)}
					</td>
					<td>
						<Paragraphs
							dead={isDead}
							name={data.episode ? `${data.episode[0].name}` : ''}
							additionalInfo={
								data.episode && data.episode[1] ? `${data.episode[1].name}` : ''
							}
							className={['name', 'species-dark']}
						/>
					</td>
					<td className={classes.status}>
						{(!isChecked || data.status === 'Dead' || noCheckedRows > 1) && (
							<Status status={data.status} />
						)}
						{isChecked && data.status !== 'Dead' && noCheckedRows === 1 && (
							<DropdownInput characterStatus={data.status} id={data.id} />
						)}
					</td>
				</React.Fragment>
			)}
		</tr>
	);
});

export default TableRow;
