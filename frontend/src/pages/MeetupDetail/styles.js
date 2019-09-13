import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    height: calc(100% - 80px);
    padding: 50px 25px;
    overflow: auto;
`;

export const Content = styled.div`
    margin: 0 auto;
    max-width: 900px;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;

    strong {
        color: #fff;
        font-size: 20px;
    }

    div {
        display: flex;

        button + button {
            margin-left: 15px;
        }
    }
`;

export const Button = styled.button`
    display: flex;
    align-items: center;
    background: ${props => props.color};
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    width: fit-content;
    padding: 10px 20px;

    &:hover {
        background: ${props => darken(0.03, props.color)};
    }

    svg {
        margin-right: 5px;
    }
`;

export const Detail = styled.div`
    img {
        width: 100%;
        height: 300px;
        border-radius: 4px;
    }

    p {
        margin: 30px 0;
        color: #fff;
    }

    div {
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.6);

        span {
            display: flex;
            align-items: center;
            margin-right: 30px;

            svg {
                margin-right: 8px;
            }
        }
    }
`;
