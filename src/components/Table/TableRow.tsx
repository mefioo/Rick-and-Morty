import React, { useMemo, useState } from 'react';
import { necessaryCharacterInfoType } from '../../types/tableTypes';
import Checkbox from '../UI/Checkbox';
import classes from './TableRow.module.css';
import Location from './Location';
import Paragraphs from './Paragraphs';
import Status from './Status';

const TableRow = React.memo((data: necessaryCharacterInfoType) => {
	const [isOriginHovered, setIsOriginHovered] = useState(false);
	const isDead = useMemo(() => {
		return data.status === 'Dead';
	}, [data.status]);

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
						<Checkbox ids={[data.id]} disabled={false} />
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
						<Status status={data.status} />
					</td>
				</React.Fragment>
			)}
		</tr>
	);
});

export default TableRow;
