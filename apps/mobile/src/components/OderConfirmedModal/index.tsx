import { Modal } from 'react-native';
import { Container } from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import Button from '../Button';

interface OrderConfirmedModal {
    visible: boolean;
    onClose: () => void;
}

const OrderConfirmedModal = ({ onClose, visible }: OrderConfirmedModal) => {
    return (
        <Modal visible={visible} animationType="fade">
            <Container>
                <CheckCircle />
                <Text
                    size={20}
                    weight="600"
                    color="#fff"
                    style={{ marginTop: 12, marginBottom: 4 }}
                >
                    Pedido confirmado
                </Text>
                <Text color="#fff" opacity={0.9} style={{ marginBottom: 24 }}>
                    O pedido ja entrou na fila de producao!
                </Text>
                <Button color="#fafafa" textColor="#d73035" onPress={onClose}>
                    OK
                </Button>
            </Container>
        </Modal>
    );
};

export default OrderConfirmedModal;
