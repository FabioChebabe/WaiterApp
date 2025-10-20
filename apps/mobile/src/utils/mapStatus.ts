import { Order } from '../types/Order';

export const mapStatusToLabel: {
    [key in Order['status']]: string;
} = {
    DONE: 'Pronto!',
    IN_PRODUCTION: 'Em preparação',
    WAITING: 'Fila de espera',
};
