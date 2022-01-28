import styled from 'styled-components';

const ButtonStyled = styled.button`
    background-color: #fff;
    border: 1px solid #cccccc;
    font-size:1rem;
    text-transform: capitalize;
    padding: 5px 20px;
    border-radius:2px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #8a8a8a;
        color: #fff;
    }
`

const ButtonUi = (props) => {
    return (
        <ButtonStyled {...props}>
            {props.children}
        </ButtonStyled>
    )
}

export default ButtonUi