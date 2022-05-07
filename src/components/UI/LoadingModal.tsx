import Overlay from './Overlay';
import classes from './LoadingModal.module.css';

const LoadingModal = () => {
	return (
		<Overlay>
			<div className={classes['lds-ring']}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</Overlay>
	);
};

export default LoadingModal;
