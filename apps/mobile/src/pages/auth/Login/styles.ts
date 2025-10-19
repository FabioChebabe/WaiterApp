import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { EdgeInsets, SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface ContainerProps {
    insets: EdgeInsets;
}

export const Container = styled(KeyboardAwareScrollView).attrs<ContainerProps>(
    ({ insets }: ContainerProps) => ({
        contentContainerStyle: {
            alignItems: 'center',
            flexGrow: 1,
            paddingHorizontal: 32,
            paddingTop: 170 + insets.top,
            paddingBottom: insets.bottom,
        },
        enableOnAndroid: true,
        extraScrollHeight: 40,
    }),
)``;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-between;
    padding-top: 115px;
`;

export const FieldsContainer = styled.View`
    gap: 24px;
`;
