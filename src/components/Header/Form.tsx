import classes from './Form.module.css';
import Input from './Input';
import DropdownInput from './DropdownInput';
import {
	faMagnifyingGlass,
	faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { SPECIES, STATUSES } from '../../constants';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store';

const Form = () => {
	const origins: { id: number; name: string; type: string }[] = useSelector(
		(state: StoreState) => state.apiInfo.locations
	);

	return (
		<form className={classes.form}>
			<Input placeholder='Search' icon={faMagnifyingGlass} />
			<DropdownInput options={SPECIES} label='Species' icon={faSortDown} />
			<DropdownInput options={origins} label='Origin' icon={faSortDown} />
			<DropdownInput
				options={STATUSES}
				select
				label='Status'
				icon={faSortDown}
			/>
		</form>
	);
};

export default Form;
