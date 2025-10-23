import Button from '../../../components/Button';
import { useAuth } from '../../../contexts/AuthProvider';
import { Text } from '../../../components/Text';
import { Container, FieldsContainer, Form } from './styles';
import { Input } from '../../../components/Input';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import z from 'zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Your password is too small' }),
});

type LoginFormData = z.infer<typeof schema>;

const Login = () => {
    const insets = useSafeAreaInsets();
    const { login } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
    });
    const email = useWatch({ control, name: 'email' });
    const password = useWatch({ control, name: 'password' });

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
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="E-mail"
                                placeholder="Seu e-mail de acesso"
                                value={value}
                                onChangeText={onChange}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                                error={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                ref={passwordInputRef}
                                label="Senha"
                                placeholder="Informe sua senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                                returnKeyType="go"
                                onSubmitEditing={() => {
                                    if (!isButtonDisabled) {
                                        login();
                                    }
                                }}
                                error={errors.password?.message}
                            />
                        )}
                    />
                </FieldsContainer>
                <Button
                    disabled={isButtonDisabled}
                    onPress={handleSubmit(login)}
                >
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
