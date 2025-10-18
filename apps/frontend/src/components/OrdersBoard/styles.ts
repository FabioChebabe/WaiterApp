import styled from 'styled-components';

export const Board = styled.div`
    flex: 1;
    padding: 16px;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > header {
        padding: 8px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;

export const OrdersContainer = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    width: 100%;

    button {
        border: 1px solid rgba(204, 204, 204, 0.4);
        background-color: #fff;
        height: 128px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;

        strong {
            font-weight: 500;
        }

        span {
            font-size: 14px;
            color: #666;
        }

        & + button {
            margin-top: 24px;
        }
    }
`;
