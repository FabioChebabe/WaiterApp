import Button from '../../../components/Button';
import { useAuth } from '../../../contexts/AuthProvider';
import { Text } from '../../../components/Text';
import { Container, FieldsContainer, Form } from './styles';
import { Input } from '../../../components/Input';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';

const Login = () => {
    const insets = useSafeAreaInsets();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isButtonDisabled = !email || !password;
    const passwordInputRef = React.useRef<TextInput>(null);

    return (
        <Container insets={insets}>
            <Text style={{ marginBottom: 4 }}>Bem-vindo(a) ao</Text>
            <Text weight="700" size={24}>
                Waiter
                <Text weight="400" size={24}>
                    App
                </Text>
            </Text>
            <Form>
                <FieldsContainer>
                    <Input
                        label="E-mail"
                        placeholder="Seu e-mail de acesso"
                        value={email}
                        onChangeValue={setEmail}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            passwordInputRef.current?.focus()
                        }
                    />
                    <Input
                        ref={passwordInputRef}
                        label="Senha"
                        placeholder="Informe sua senha"
                        value={password}
                        onChangeValue={setPassword}
                        secureTextEntry
                        returnKeyType="go"
                        onSubmitEditing={() => {
                            if (!isButtonDisabled) {
                                login();
                            }
                        }}
                    />
                </FieldsContainer>
                <Button onPress={login} disabled={isButtonDisabled}>
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
