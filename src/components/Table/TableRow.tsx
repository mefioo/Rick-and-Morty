import React from 'react';
import { necessaryCharacterInfoType } from '../../types/tableTypes';
import Checkbox from '../UI/Checkbox';
import classes from './TableRow.module.css'

const TableRow = (data: necessaryCharacterInfoType) => {
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
			<td>{data.name}</td>
			<td>episodes</td>
			<td>{data.status}</td>
		</tr>
	);
};

export default TableRow;
