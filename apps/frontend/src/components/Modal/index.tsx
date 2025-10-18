import React, { useEffect } from 'react';
import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

interface OrderModalProps {
    visible: boolean;
    order: Order | null;
    onClose: () => void;
    onCancelOrder: () => Promise<void>;
    onChangeOrderStatus: () => Promise<void>;
    isLoading: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
    visible,
    order,
    onClose,
    onCancelOrder,
    onChangeOrderStatus,
    isLoading,
}) => {
    useEffect(() => {
        const handleKeyDown = ({ key }: KeyboardEvent) => {
            if (key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    if (!visible || !order) {
        return null;
    }

    const totalAmount = order.products.reduce(
        (total, { quantity, product }) => {
            return total + product.price * quantity;
        },
        0,
    );

    return (
        <Overlay>
            <ModalBody>
                <header>
                    <strong>Mesa</strong>
                    <button type="button" onClick={onClose}>
                        <img src={closeIcon} alt="Close" />
                    </button>
                </header>

                <div className="status-container">
                    <small>Status do Pedido</small>
                    <div>
                        <span>
                            {order.status === 'WAITING' && '⏰'}
                            {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
                            {order.status === 'DONE' && '✅'}
                        </span>
                        <strong>
                            {order.status === 'WAITING' && 'Fila de espera'}
                            {order.status === 'IN_PRODUCTION' &&
                                'Em preparação'}
                            {order.status === 'DONE' && 'Pronto!'}
                        </strong>
                    </div>
                </div>
                <OrderDetails>
                    <strong>Itens</strong>
                    <div className="order-items">
                        {order.products.map(({ _id, product, quantity }) => (
                            <div className="item" key={_id}>
                                <img
                                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                                    alt="Imagem produto"
                                    width={48}
                                    height={24.43}
                                />
                                <span className="quantity">{quantity}x</span>
                                <div className="product-details">
                                    <strong>{product.name}</strong>
                                    <span>{formatCurrency(product.price)}</span>
                                </div>
                            </div>
                        ))}
                        <div className="total">
                            <span>Total</span>
                            <strong>{formatCurrency(totalAmount)}</strong>
                        </div>
                    </div>
                </OrderDetails>
                <Actions>
                    {order.status !== 'DONE' && (
                        <button
                            onClick={onChangeOrderStatus}
                            disabled={isLoading}
                            type="button"
                            className="primary"
                        >
                            <span>
                                {order.status === 'WAITING' ? '👩‍🍳' : '✅'}
                            </span>
                            <span>
                                {order.status === 'WAITING'
                                    ? 'Iniciar producao'
                                    : 'Concluir Pedido'}
                            </span>
                        </button>
                    )}

                    <button
                        onClick={onCancelOrder}
                        disabled={isLoading}
                        type="button"
                        className="secondary"
                    >
                        Cancelar pedido
                    </button>
                </Actions>
            </ModalBody>
        </Overlay>
    );
};

export default OrderModal;
