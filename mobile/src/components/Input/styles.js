import styled from 'styled-components/native';

export const TextInput = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255, 255, 255, 0.5)'
})`
    padding: 0 15px;
    height: 50px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);
    ${props => (props.error ? 'border: 1px solid red' : '')};
`;
