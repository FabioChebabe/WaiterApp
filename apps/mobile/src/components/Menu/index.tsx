import { FlatList } from 'react-native';
import { Text } from '../Text';
import {
    AddToCartButton,
    ItemSeparator,
    ProductDetails,
    ProductImage,
    ProductContainer,
} from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import ProductModal from '../ProductModal';
import { useState } from 'react';
import { Product } from '../../types/product';
import { apiUrl } from '../../constants/api';

interface MenuProps {
    onAddToCart: (product: Product) => void;
    products: Product[];
}

const Menu = ({ onAddToCart, products }: MenuProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<null | Product>(
        null,
    );

    const handleOpenModal = (product: Product) => {
        setIsModalVisible(true);
        setSelectedProduct(product);
    };

    return (
        <>
            <FlatList
                data={products}
                keyExtractor={({ _id }) => _id}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                ItemSeparatorComponent={() => <ItemSeparator />}
                renderItem={({ item: product }) => (
                    <ProductContainer onPress={() => handleOpenModal(product)}>
                        <ProductImage
                            source={{
                                uri: `${apiUrl}/uploads/${product.imagePath}`,
                            }}
                        />
                        <ProductDetails>
                            <Text weight="600">{product.name}</Text>
                            <Text
                                size={14}
                                color="#666"
                                style={{ marginVertical: 8 }}
                            >
                                {product.description}
                            </Text>
                            <Text size={14} weight="600">
                                {formatCurrency(product.price)}
                            </Text>
                        </ProductDetails>
                        <AddToCartButton onPress={() => onAddToCart(product)}>
                            <PlusCircle />
                        </AddToCartButton>
                    </ProductContainer>
                )}
            />
            <ProductModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct}
                onAddToCart={onAddToCart}
            />
        </>
    );
};

export default Menu;
