import classes from './App.module.css';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import LoadingModal from './components/UI/LoadingModal';
import Table from './containers/Table';
import { useSelector } from 'react-redux';
import { StoreState } from './store';
import ErrorModal from './components/UI/ErrorModal';

function App() {
	const isLoading = useSelector((state: StoreState) => state.loading.isLoading);
	const isError = useSelector((state: StoreState) => state.error.isError);

	return (
		<div className={classes.App}>
			{isLoading && <LoadingModal />}
			{isError && <ErrorModal />}
			<Header />
			<Table />
			<Pagination />
		</div>
	);
}

export default App;
