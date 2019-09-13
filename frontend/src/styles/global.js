import { lighten } from 'polished';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

export default styled.createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    *:focus {
        outline: 0;
    }

    *::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    *::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${lighten(0.1, '#f94d6a')};
    }

    html,
    body,
    #root {
        height: 100%;
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

    body,
    input,
    textarea,
    button {
        font: 14px 'Roboto', sans-serif;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    button {
        cursor: pointer;
    }
`;
