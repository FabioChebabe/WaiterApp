import styled from 'styled-components/native';
import { Text } from '../Text';
import { Order } from '../../types/Order';

export const Container = styled.View`
    padding: 24px;
    background-color: white;
    border-radius: 8px;
    gap: 24px;
`;

export const Header = styled.View`
    justify-content: space-between;
    flex-direction: row;
`;

export const ProductsContainer = styled.View`
    gap: 8px;
`;

interface TagProps {
    status: Order['status'];
}

export const Tag = styled(Text)<TagProps>`
    background-color: ${({ status }) =>
        status === 'DONE'
            ? '#30D787'
            : status === 'IN_PRODUCTION'
              ? '#D76C30'
              : '#666666'}0D;
    color: ${({ status }) =>
        status === 'DONE'
            ? '#30D787'
            : status === 'IN_PRODUCTION'
              ? '#D76C30'
              : '#666666'};
    border-radius: 4px;
    padding: 2px 6px;
`;
