import { EdgeInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Text } from '../../components/Text';

interface ContainerProps {
    insets: EdgeInsets;
}

export const Container = styled.ScrollView.attrs<ContainerProps>(
    ({ insets }: ContainerProps) => ({
        contentContainerStyle: {
            flexGrow: 1,
            padding: 24,
            paddingTop: insets.top + 20,
        },
    }),
)``;

export const ContentContainer = styled.View`
    justify-content: space-between;
    flex: 1;
`;

export const FormContainer = styled.View`
    gap: 8px;
    margin-bottom: 40px;
`;

export const Title = styled(Text)`
    margin-bottom: 48;
`;
