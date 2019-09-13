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

    form {
        display: flex;
        flex-direction: column;

        input,
        textarea {
            background: rgba(0, 0, 0, 0.2);
            border: 0;
            border-radius: 4px;
            height: 44px;
            color: #fff;
            padding: 0 15px;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        textarea {
            height: 150px;
            padding: 15px;
            resize: none;
        }

        span {
            color: #f94d6a;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }
    }
`;

export const AddButton = styled.button`
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
    padding: 10px 20px;
    align-self: flex-end;

    &:hover {
        background: ${darken(0.03, '#f94d6a')};
    }

    svg {
        margin-right: 5px;
    }
`;
