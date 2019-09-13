import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.4);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: rgba(255, 255, 255, 0.3);
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }

        img {
            width: 100%;
            height: 300px;
            border-radius: 4px;
        }

        svg {
            margin-bottom: 10px;
        }

        strong {
            font-size: 20px;
        }
    }

    input {
        display: none;
    }
`;
