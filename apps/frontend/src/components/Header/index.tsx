import logo from '../../assets/images/logo.svg';
import { Container, ContentContainer } from './styles';

const Header = () => {
    return (
        <Container>
            <ContentContainer>
                <div className="page-details">
                    <h1>Pedidos</h1>
                    <h2>Acompanhe os pedidos dos clientes </h2>
                </div>

                <img src={logo} alt="WaiterApp" />
            </ContentContainer>
        </Container>
    );
};

export default Header;
