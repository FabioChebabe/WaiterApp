import React, { useMemo, useState } from 'react';
import { Board, OrdersContainer } from './styles';
import { Order } from '../../types/Order';
import OrderModal from '../Modal';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Array<Order>;
    onCancelOrder: (orderId: string) => void;
    onCangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersBoard: React.FC<OrdersBoardProps> = ({
    icon,
    title,
    orders,
    onCancelOrder,
    onCangeOrderStatus,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const handleOpenModal = (order: Order) => {
        setIsModalVisible(true);
        setSelectedOrder(order);
    };
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const handleChangeOrderStatus = async () => {
        try {
            setIsLoading(true);
            const newStatus =
                selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
            await api.patch(`/orders/${selectedOrder?._id}`, {
                status: newStatus,
            });

            toast.success(
                `Status do pedido da mesa ${selectedOrder?.table} foi alterado com sucesso!`,
            );
            onCangeOrderStatus(selectedOrder!._id, newStatus);
            handleCloseModal();
        } catch (error) {
            toast.error('Ocorreu um erro ao cancelar o pedido');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        try {
            setIsLoading(true);
            await api.delete(`/orders/${selectedOrder?._id}`);
            toast.success(
                `Pedido da mesa ${selectedOrder?.table} cancelado com sucesso!`,
            );
            onCancelOrder(selectedOrder!._id);
            handleCloseModal();
        } catch (error) {
            toast.error(
                `Ocorreu um erro ao cancelar o pedido da mesa ${selectedOrder?.table}`,
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Board>
            <OrderModal
                visible={isModalVisible}
                order={selectedOrder}
                onClose={handleCloseModal}
                isLoading={isLoading}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleChangeOrderStatus}
            />
            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>({orders.length})</span>
            </header>
            {orders.length > 0 && (
                <OrdersContainer>
                    {orders.map((order) => (
                        <button
                            type="button"
                            key={order._id}
                            onClick={() => handleOpenModal(order)}
                        >
                            <strong>Mesa {order.table}</strong>
                            <span>{order.products.length} itens</span>
                        </button>
                    ))}
                </OrdersContainer>
            )}
        </Board>
    );
};

export default OrdersBoard;
