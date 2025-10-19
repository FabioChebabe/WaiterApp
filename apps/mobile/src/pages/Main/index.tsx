import Button from '../../components/Button';
import Categories from '../../components/Categories';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import TableModal from '../../components/TableModal';
import { useEffect, useState } from 'react';
import { CartItem } from '../../types/CartItem';
import Cart from '../../components/Cart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product } from '../../types/product';
import { ActivityIndicator } from 'react-native';

import { Empty } from '../../components/Icons/Empty';
import { Text } from '../../components/Text';
import { Category } from '../../types/Categories';
import { api } from '../../utils/api';
import {
    CategoriesContainer,
    CenteredContainer,
    Container,
    ContentContainer,
    Footer,
    MenuContainer,
} from './styles';

const Main = () => {
    const insets = useSafeAreaInsets();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const handleSaveTable = (table: string) => {
        setSelectedTable(table);
    };

    const handleResetOrder = () => {
        setSelectedTable('');
        setCartItems([]);
    };

    const handleAddToCart = (product: Product) => {
        if (!selectedTable) {
            setIsModalVisible(true);
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id,
            );

            if (itemIndex < 0) {
                return prevState.concat({ quantity: 1, product });
            }

            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];
            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1,
            };

            return newCartItems;
        });
    };

    const handleDecrementCartItem = (product: Product) => {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id,
            );

            const item = prevState[itemIndex];
            const newCartItems = [...prevState];

            if (item.quantity === 1) {
                newCartItems.splice(itemIndex, 1);

                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity - 1,
            };

            return newCartItems;
        });
    };

    const handleSelectCategory = async (categoryId: string) => {
        try {
            setIsLoadingProducts(true);
            const route = !categoryId
                ? '/products'
                : `/categories/${categoryId}/products`;
            const { data } = await api.get(route);
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);

        Promise.all([api.get('/categories'), api.get('/products')]).then(
            ([categoriesResponse, productsResponse]) => {
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
                setIsLoading(false);
            },
        );
    }, []);

    return (
        <Container>
            <Header
                selectedTable={selectedTable}
                onCancelOrder={handleResetOrder}
            />
            <ContentContainer>
                {!isLoading ? (
                    <>
                        <CategoriesContainer>
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts ? (
                            <CenteredContainer>
                                <ActivityIndicator color="#d73035" />
                            </CenteredContainer>
                        ) : products.length > 0 ? (
                            <MenuContainer>
                                <Menu
                                    onAddToCart={handleAddToCart}
                                    products={products}
                                />
                            </MenuContainer>
                        ) : (
                            <CenteredContainer>
                                <Empty />
                                <Text color="#666" style={{ marginTop: 24 }}>
                                    Nenhum produto foi encontrado
                                </Text>
                            </CenteredContainer>
                        )}
                    </>
                ) : (
                    <CenteredContainer>
                        <ActivityIndicator color="#d73035" />
                    </CenteredContainer>
                )}
            </ContentContainer>
            <Footer insetBottom={insets.bottom}>
                {!selectedTable ? (
                    <Button
                        onPress={() => setIsModalVisible(true)}
                        disabled={isLoading}
                    >
                        Novo pedido
                    </Button>
                ) : (
                    <Cart
                        cartItems={cartItems}
                        onAdd={handleAddToCart}
                        onRemove={handleDecrementCartItem}
                        onConfirmOrder={handleResetOrder}
                        selectedTable={selectedTable}
                    />
                )}
            </Footer>
            <TableModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSaveTable}
            />
        </Container>
    );
};

export default Main;
