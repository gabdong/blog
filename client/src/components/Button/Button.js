import styled from 'styled-components';

const ButtonSt = styled.button`
    padding: 8px 12px;
    background-color: var(--primary-color-d);
    color: var(--primary-color-d-text);
    border-radius: var(--border-radius);
`;

function Button({text, classname}) {
    return <ButtonSt className={`${classname} buttonText`}>{text}</ButtonSt>;
}

export default Button;