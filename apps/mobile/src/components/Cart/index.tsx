import { FlatList, TouchableOpacity } from 'react-native';
import {
    Actions,
    Image,
    Item,
    ProductContainer,
    ProductDetails,
    QuantityContainer,
    Summary,
    TotalContainer,
} from './styles';
import { CartItem } from '../../types/CartItem';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import Button from '../Button';
import { Product } from '../../types/product';
import OrderConfirmedModal from '../OderConfirmedModal';
import { useState } from 'react';
import { api } from '../../utils/api';

interface CartProps {
    cartItems: CartItem[];
    onAdd: (product: Product) => void;
    onRemove: (product: Product) => void;
    onConfirmOrder: () => void;
    selectedTable: string;
}

const Cart = ({
    cartItems,
    onAdd,
    onConfirmOrder,
    onRemove,
    selectedTable,
}: CartProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const total = cartItems.reduce((accumulator, cartItem) => {
        return accumulator + cartItem.quantity * cartItem.product.price;
    }, 0);

    const handleConfirmOrder = async () => {
        const payload = {
            table: selectedTable,
            products: cartItems.map((cartItem) => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity,
            })),
        };
        setIsLoading(true);
        await api.post('/orders', payload);

        setIsModalVisible(true);
        setIsLoading(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        onConfirmOrder();
    };

    return (
        <>
            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    renderItem={({ item }) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `http://192.168.0.232:3001/uploads/${item.product.imagePath}`,
                                    }}
                                />
                                <QuantityContainer>
                                    <Text size={14} color="#666">
                                        {item.quantity}x
                                    </Text>
                                </QuantityContainer>
                                <ProductDetails>
                                    <Text size={14} weight="600">
                                        {item.product.name}
                                    </Text>
                                    <Text color="#666" style={{ marginTop: 4 }}>
                                        {formatCurrency(
                                            item.product.price * item.quantity
                                        )}
                                    </Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Actions>
                                <TouchableOpacity
                                    onPress={() => onAdd(item.product)}
                                >
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ marginLeft: 24 }}
                                    onPress={() => onRemove(item.product)}
                                >
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}
            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text color="#666">Total:</Text>
                            <Text size={20} weight="600">
                                {formatCurrency(total)}
                            </Text>
                        </>
                    ) : (
                        <Text color="#999">Seu carrinho esta vazio</Text>
                    )}
                </TotalContainer>
                <Button
                    onPress={handleConfirmOrder}
                    disabled={cartItems.length === 0}
                    loading={isLoading}
                >
                    Confirmar pedido
                </Button>
            </Summary>
            <OrderConfirmedModal
                visible={isModalVisible}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Cart;
