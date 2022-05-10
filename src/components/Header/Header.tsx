import EditPanel from './EditPanel';
import Form from './Form';
import classes from './Header.module.css';

const Header = () => {
	return (
		<header className={classes.header}>
			<h1>Characters</h1>
			<Form />
			<EditPanel />
		</header>
	);
};

export default Header;
