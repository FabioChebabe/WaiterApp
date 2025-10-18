import styled from 'styled-components';

export const Container = styled.header`
    padding: 16 px;
    background-color: #d73035;
    display: flex;
    justify-content: center;
`;

export const ContentContainer = styled.div`
    width: 100%;
    max-width: 1216px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .page-details {
        h1 {
            color: #fff;
            font-size: 32px;
            margin-bottom: 6px;
        }

        h2 {
            color: #fff;
            font-weight: 400;
            font-size: 16px;
            opacity: 0.9;
        }
    }
`;
