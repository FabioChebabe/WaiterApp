import { useEffect, useMemo, useState } from 'react';
import { Order } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';
import { toast } from 'react-toastify';

const Orders = () => {
    const [orders, setOrders] = useState<Array<Order>>([]);

    useEffect(() => {
        api.get('/orders').then(({ data }) => {
            setOrders(data);
        });
    }, []);

    useEffect(() => {
        const socket = socketIo('http://localhost:3001', {
            transports: ['websocket'],
        });

        socket.on('orders@new', (order: Order) => {
            setOrders((prevState) => prevState.concat(order));
            toast.success(`Novo pedido recebido na mesa ${order.table}!`);
        });
    }, []);

    const waitingOrders = orders.filter((order) => order.status === 'WAITING');
    const inProductionOrders = orders.filter(
        (order) => order.status === 'IN_PRODUCTION',
    );
    const doneOrders = orders.filter((order) => order.status === 'DONE');

    const handleCancelOrder = (orderId: string) => {
        setOrders((prevState) =>
            prevState.filter((order) => order._id !== orderId),
        );
    };

    const handleOrderStatusChange = (
        orderId: string,
        status: Order['status'],
    ) => {
        setOrders((prevState) =>
            prevState.map((order) =>
                order._id === orderId
                    ? {
                          ...order,
                          status: status,
                      }
                    : order,
            ),
        );
    };

    return (
        <Container>
            <OrdersBoard
                icon="⏰"
                title="Fila de espera"
                orders={waitingOrders}
                onCancelOrder={handleCancelOrder}
                onCangeOrderStatus={handleOrderStatusChange}
            />
            <OrdersBoard
                icon="👩‍🍳"
                title="Em preparação"
                orders={inProductionOrders}
                onCancelOrder={handleCancelOrder}
                onCangeOrderStatus={handleOrderStatusChange}
            />
            <OrdersBoard
                icon="✅"
                title="Pronto!"
                orders={doneOrders}
                onCancelOrder={handleCancelOrder}
                onCangeOrderStatus={handleOrderStatusChange}
            />
        </Container>
    );
};

export default Orders;
