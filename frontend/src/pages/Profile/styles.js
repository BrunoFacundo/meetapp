import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    max-width: 950px;
    margin: 50px auto;
    padding: 0 25px;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0, 0, 0, 0.2);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        span {
            color: #f94d6a;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        hr {
            border: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            margin: 10px 0 20px;
        }

        button {
            display: flex;
            align-items: center;
            background: #f94d6a;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;
            width: fit-content;
            align-self: flex-end;
            padding: 10px 20px;
            margin-top: 5px;

            &:hover {
                background: ${darken(0.03, '#f94d6a')};
            }

            svg {
                margin-right: 5px;
            }
        }
    }
`;
