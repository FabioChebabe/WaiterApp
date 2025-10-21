import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthProvider';
import { ScrollView, View } from 'react-native';
import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { useState } from 'react';

const Profile = () => {
    const insets = useSafeAreaInsets();
    const { logout } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isButtonDisabled = !name || !email || !password || !confirmPassword;

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                padding: 24,
                paddingTop: insets.top + 20,
            }}
        >
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <Text weight="600" size={24} style={{ marginBottom: 48 }}>
                        Meu Perfil
                    </Text>
                    <Input label="Nome" value={name} onChangeValue={setName} />
                    <Input
                        label="E-mail"
                        keyboardType="email-address"
                        value={email}
                        onChangeValue={setEmail}
                    />
                    <Input
                        label="Senha"
                        secureTextEntry
                        value={password}
                        onChangeValue={setPassword}
                    />
                    <Input
                        label="Confirmação da Senha"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeValue={setConfirmPassword}
                        style={{ marginBottom: 40 }}
                    />
                    <Button onPress={logout} disabled={isButtonDisabled}>
                        Salvar alterações
                    </Button>
                </View>
                <Button onPress={logout}>Logout</Button>
            </View>
        </ScrollView>
    );
};

export default Profile;
