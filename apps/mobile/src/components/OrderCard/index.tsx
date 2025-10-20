import { Order } from '../../types/Order';
import { mapStatusToLabel } from '../../utils/mapStatus';
import { Text } from '../Text';
import { Container, Header, ProductsContainer, Tag } from './styles';
import React from 'react';

interface OrderCardProps {
    data: Order;
}

export const OrderCard = ({ data }: OrderCardProps) => {
    return (
        <Container>
            <Header>
                <Text size={14} color="#000">
                    Mesa {data.table}
                </Text>
                <Tag status={data.status} size={12}>
                    {mapStatusToLabel[data.status]}
                </Tag>
            </Header>
            <ProductsContainer>
                {data.products.map((product) => (
                    <Text key={product._id}>
                        {product.quantity}x {product.product.name}
                    </Text>
                ))}
            </ProductsContainer>
        </Container>
    );
};
