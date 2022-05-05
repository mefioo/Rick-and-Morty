import React from 'react';
import Checkbox from '../UI/Checkbox';
import Label from './Label';
import classes from './TableHeader.module.css';

const TableHeader = () => {
	return (
		<thead className={classes.head}>
			<tr>
				<th>
					<Checkbox />
				</th>
				<th>
					<Label name='Name' />
				</th>
				<th>
					<Label name='Avatar' />
				</th>
				<th>
					<Label name='Origin' />
				</th>
				<th>
					<Label name='Episodes' />
				</th>
				<th>
					<Label name='Status' />
				</th>
			</tr>
		</thead>
	);
};

export default TableHeader;
