import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps {
    color?: string;
    textColor?: string;
    children: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}

const Button = ({
    children,
    onPress,
    color,
    textColor,
    disabled,
    loading,
}: ButtonProps) => {
    return (
        <Container
            color={color}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={textColor ? textColor : '#fff'} />
            ) : (
                <Text weight="600" color={textColor ? textColor : '#fff'}>
                    {children}
                </Text>
            )}
        </Container>
    );
};

export default Button;
