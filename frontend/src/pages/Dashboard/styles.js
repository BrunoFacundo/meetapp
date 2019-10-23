import { darken } from 'polished';
import styled from 'styled-components';
import Loading from '~/components/Loading';

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

export const LoadingList = styled(Loading)`
    height: calc(100% - 94px);
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding: 10px 30px;
    min-height: 80px;
    border-radius: 4px;
    transition: background 0.2s;
    color: #fff;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }

    strong {
        display: flex;
        flex-direction: column;
        font-size: 14px;

        span {
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-top: 8px;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.8);

            svg {
                margin-right: 5px;
            }
        }
    }

    div {
        display: flex;
        align-items: center;

        svg {
            margin-left: 30px;
        }
    }

    & + li {
        margin-top: 10px;
    }
`;
