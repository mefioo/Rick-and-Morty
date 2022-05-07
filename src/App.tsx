import classes from './App.module.css';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import LoadingModal from './components/UI/LoadingModal';
import Table from './containers/Table';
import { useSelector } from 'react-redux';
import { StoreState } from './store';

function App() {
	const isLoading = useSelector((state: StoreState) => state.loading.isLoading);

	return (
		<div className={classes.App}>
			{isLoading && <LoadingModal />}
			<Header />
			<Table />
			<Pagination />
		</div>
	);
}

export default App;
