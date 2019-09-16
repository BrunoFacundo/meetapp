import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    width: 100%;
    height: 64px;
    background: rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 23px;
    height: 24px;
`;
