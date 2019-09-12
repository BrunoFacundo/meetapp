import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    background: #000;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
        img {
            width: 35px;
        }
    }

    aside {
        display: flex;

        div {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            strong {
                color: #fff;
            }

            a {
                margin-top: 3px;
                color: #999;
            }
        }

        button {
            background: #f94d6a;
            font-weight: bold;
            color: #fff;
            padding: 0 20px;
            border: 0;
            border-radius: 4px;
            transition: background 0.2s;
            margin-left: 25px;

            &:hover {
                background: ${darken(0.03, '#f94d6a')};
            }
        }
    }
`;
