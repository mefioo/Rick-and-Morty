import classes from './Location.module.css';

type propsType = {
	name: string;
	type: string;
};

const defaultProps = {
	name: '',
	type: '',
};

const Location = (props: propsType) => {
	return (
		<div className={classes.location}>
			<div>
				<p>Location</p>
			</div>
			<p>{props.name}</p>
			<p>{props.type}</p>
		</div>
	);
};

Location.defaultProps = defaultProps;

export default Location;
