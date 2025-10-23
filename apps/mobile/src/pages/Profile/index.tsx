import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthProvider';
import { ScrollView, View } from 'react-native';
import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import React, { useState } from 'react';
import z, { email } from 'zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, ContentContainer, FormContainer, Title } from './styles';

const schema = z
    .object({
        name: z.string(),
        email: z.email({ message: 'Invalid email address' }),
        password: z.string().min(8, { message: 'Your password is too small' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Your password is too small' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // 👈 sets the error to confirmPassword field
    });

type FormData = z.infer<typeof schema>;

const Profile = () => {
    const insets = useSafeAreaInsets();
    const { logout } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
    });

    const name = useWatch({ control, name: 'name' });
    const email = useWatch({ control, name: 'email' });
    const password = useWatch({ control, name: 'password' });
    const confirmPassword = useWatch({ control, name: 'confirmPassword' });

    const isButtonDisabled = !name || !email || !password || !confirmPassword;

    return (
        <Container insets={insets}>
            <ContentContainer>
                <View>
                    <Title weight="600" size={24}>
                        Meu Perfil
                    </Title>
                    <FormContainer>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Nome"
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="E-mail"
                                    keyboardType="email-address"
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Senha"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.password?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Confirmação da Senha"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors.confirmPassword?.message}
                                />
                            )}
                        />
                    </FormContainer>
                    <Button
                        onPress={handleSubmit(() => {})}
                        disabled={isButtonDisabled}
                    >
                        Salvar alterações
                    </Button>
                </View>
                <Button onPress={logout}>Logout</Button>
            </ContentContainer>
        </Container>
    );
};

export default Profile;
