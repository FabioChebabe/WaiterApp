import { TextInput, TextInputProps } from 'react-native';
import { Text } from '../Text';
import { InputContainer, StyledTextInput } from './styles';
import { forwardRef } from 'react';

interface InputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeValue: (text: string) => void;
}

export const Input = forwardRef<TextInput, InputProps>(
    ({ label, onChangeValue, value, ...rest }, ref) => {
        return (
            <InputContainer>
                <Text size={14} color="#999999">
                    {label}
                </Text>
                <StyledTextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChangeValue}
                    placeholderTextColor="#999999"
                    {...rest}
                />
            </InputContainer>
        );
    },
);
