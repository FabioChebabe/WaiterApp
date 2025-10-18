import styled from 'styled-components/native';

interface ContainerProps {
    color?: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    padding: 14px 24px;
    border-radius: 48px;
    background-color: ${({ color, disabled }) =>
        disabled ? '#999 ' : color ? color : '#d73035'};
    align-items: center;
    justify-content: center;
`;
