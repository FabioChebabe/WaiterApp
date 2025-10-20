import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderCard } from '../../components/OrderCard';
import { HeaderTitle, Separator } from './styles';
import { SectionList, StyleSheet } from 'react-native';

export interface OrderList {
    title: string;
    data: Order[];
}

const Orders = () => {
    const { top } = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get('/orders')
            .then(({ data }) => {
                setOrders(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const waitingOrders = orders.filter((order) => order.status === 'WAITING');
    const inProductionOrders = orders.filter(
        (order) => order.status === 'IN_PRODUCTION',
    );
    const doneOrders = orders.filter((order) => order.status === 'DONE');

    const data = [
        {
            title: 'Fila de espera',
            data: waitingOrders,
        },
        {
            title: 'Em preparação',
            data: inProductionOrders,
        },
        {
            title: 'Pronto!',
            data: doneOrders,
        },
    ];

    return (
        <SectionList
            contentContainerStyle={styles(top).container}
            sections={data}
            renderItem={({ item }) => <OrderCard data={item} />}
            ListHeaderComponent={
                <Text weight="600" size={24}>
                    Pedidos
                </Text>
            }
            keyExtractor={(item) => item._id}
            renderSectionHeader={({ section: { title } }) => (
                <HeaderTitle weight="600" size={18} color="#666">
                    {title}
                </HeaderTitle>
            )}
            ItemSeparatorComponent={() => <Separator />}
            stickySectionHeadersEnabled={false}
        />
    );
};

const styles = (insetTop: number) =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
            paddingTop: insetTop,
            padding: 24,
        },
    });

export default Orders;
