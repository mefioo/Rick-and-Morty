import classes from './App.module.css';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import Table from './containers/Table';

function App() {
	return (
		<div className={classes.App}>
			<Header />
      <Table />
      <Pagination />
		</div>
	);
}

export default App;
