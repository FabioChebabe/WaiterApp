import { TextInput, TextInputProps } from 'react-native';
import { Text } from '../Text';
import { InputContainer, StyledTextInput } from './styles';
import { forwardRef } from 'react';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
    ({ label, value, error, style, ...rest }, ref) => {
        return (
            <InputContainer style={style}>
                <Text size={14} color="#999999">
                    {label}
                </Text>
                <StyledTextInput
                    ref={ref}
                    placeholderTextColor="#999999"
                    {...rest}
                />
                {!!error && <Text color="red">{error}</Text>}
            </InputContainer>
        );
    },
);
