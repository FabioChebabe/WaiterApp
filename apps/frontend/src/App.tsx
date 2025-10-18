import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Orders from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <GlobalStyles />
            <Header />
            <Orders />
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default App;
