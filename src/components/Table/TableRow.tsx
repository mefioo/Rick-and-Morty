import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCircleQuestion,
	faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { necessaryCharacterInfoType } from '../../types/tableTypes';
import Checkbox from '../UI/Checkbox';
import classes from './TableRow.module.css';

let styleColor = { color: '#BAC6D8' };

const TableRow = (data: necessaryCharacterInfoType) => {
	let icon = <FontAwesomeIcon style={styleColor} icon={faCircleQuestion} />;
	if (data.status === 'Alive') {
		styleColor = { color: '#03A99F' };
		icon = <FontAwesomeIcon style={styleColor} icon={faCircleCheck} />;
	}
	if (data.status === 'Dead') {
		styleColor = { color: '#FF2626' };
		icon = <FontAwesomeIcon style={styleColor} icon={faCircleExclamation} />;
	}

	return (
		<tr className={classes.tr}>
			<td>
				<Checkbox />
			</td>
			<td>
				<p className={classes.name}>{data.name}</p>
				<p className={classes.species}>{data.species}</p>
			</td>
			<td>
				<img src={data.image}></img>
			</td>
			<td>
				<p className={classes['origin-name']}>
					{data.origin ? data.origin.name : ''}
				</p>
				<p className={classes['origin-type']}>{data.origin.type}</p>
			</td>
			<td>episodes</td>
			<td className={classes.status}>
				{icon}
				<p>{data.status}</p>
			</td>
		</tr>
	);
};

export default TableRow;
