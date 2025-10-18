import { Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled(SafeAreaView).attrs(() => ({
    mode: 'padding',
    edges: ['top', 'right', 'left'],
}))`
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
    flex: 1;
    background-color: #fafafa;
`;

export const ContentContainer = styled.View`
    flex: 1;
`;

export const CenteredContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const CategoriesContainer = styled.View`
    height: 73px;
    margin-top: 32px;
`;

export const MenuContainer = styled.View`
    flex: 1;
`;

interface FooterProps {
    insetBottom: number;
}

export const Footer = styled.View<FooterProps>`
    min-height: 110px;
    background-color: #fff;
    padding: 16px 24px
        ${({ insetBottom }) => insetBottom !== 0 && `${insetBottom}px`};
    justify-content: flex-end;
`;
