import Overlay from './Overlay';
import ErrorMessage from './ErrorMessage';

const ErrorModal = () => {
	return (
		<Overlay style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
			<ErrorMessage />
		</Overlay>
	);
};

export default ErrorModal;
