import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: 25px;
`;

export const Content = styled.div`
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
                margin-top: 5px;
                color: #999;
                opacity: 0.8;

                &:hover {
                    opacity: 1;
                }
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
