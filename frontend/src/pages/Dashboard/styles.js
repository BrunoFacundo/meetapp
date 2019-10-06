import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    height: calc(100% - 80px);
    padding: 50px 25px;
    overflow: auto;
`;

export const Content = styled.div`
    height: 100%;
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
        font-size: 18px;
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
        padding: 10px 20px;

        &:hover {
            background: ${darken(0.03, '#f94d6a')};
        }

        svg {
            margin-right: 5px;
        }
    }
`;

export const EmptyList = styled.div`
    height: calc(100% - 94px);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;

export const MeetupList = styled.ul`
    height: calc(100% - 94px);
    overflow: auto;
`;

export const MeetupItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.2);
    padding: 20px 30px;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }

    strong {
        opacity: ${props => (props.past ? 0.5 : 1)};
    }

    div {
        display: flex;
        align-items: center;

        span {
            opacity: ${props => (props.past ? 0.5 : 0.6)};
        }

        svg {
            margin-left: 40px;
        }
    }

    & + li {
        margin-top: 10px;
    }
`;
