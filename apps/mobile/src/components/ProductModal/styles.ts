import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
    width: 100%;
    height: 200px;
`;

export const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    align-items: center;
    justify-content: center;
`;

export const ModalBody = styled.View`
    background-color: #fafafa;
    flex: 1;
    padding: 32px 24px 0;
`;

export const Header = styled.View``;

export const IngredientsContainer = styled.View`
    margin-top: 32px;
    flex: 1;
`;

export const Ingredient = styled.View`
    border: 1px solid rgba(204, 204, 204, 0.3);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 4px;
    flex-direction: row;
    align-items: center;
`;

export const Footer = styled.View`
    min-height: 110px;
    background-color: #fff;
    padding: 16px 24px;
`;

export const FooterContainer = styled(SafeAreaView)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const PriceContainer = styled.View``;
