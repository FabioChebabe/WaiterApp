import { SafeAreaView } from 'react-native-safe-area-context';
import { Waiter } from '../../components/Illustration/Waiter';
import { Text } from '../../components/Text';
import { Container } from './styles';

const Splash = () => {
    return (
        <Container>
            <Waiter />
            <Text
                weight="600"
                size={32}
                color="white"
                style={{ marginTop: 24 }}
            >
                Waiter
                <Text weight="400" size={32} color="white">
                    App
                </Text>
            </Text>
            <Text color="white" style={{ marginTop: 6 }}>
                O app do garçom
            </Text>
        </Container>
    );
};

export default Splash;
