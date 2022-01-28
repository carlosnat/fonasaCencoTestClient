import styled from 'styled-components';
import ButtonUi from '../ui/button'

const HeaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--base-spacing);
  text-transform: uppercase;
  box-shadow: 1px 1px 1px 1px #0000004e;
  background-color: #fff;
`;


const Hospital = ({ onGenerate, hospital }) => {
    return (
        <HeaderStyled>
            <span>
                {hospital?.name}
            </span>
            <span>
                <ButtonUi onClick={onGenerate}>
                    Generar paciente
                </ButtonUi>
            </span>
        </HeaderStyled>
    )
}

export default Hospital