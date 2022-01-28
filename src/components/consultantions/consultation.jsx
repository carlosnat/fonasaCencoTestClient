import styled from 'styled-components';
import ButtonUi from '../ui/button'

const ConsultantWrapp = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: var(--base-spacing);
    box-shadow: 1px 1px 1px 1px #0000004e;
    margin-top: var(--base-spacing);
    background-color: #fff;
`

const ConsultantHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--base-spacing);
  & > span {
      text-transform: uppercase;
  }
  & > span:nth-of-type(2) button {
    margin-left:10px;
  } 
  margin-bottom: var(--base-spacing);
`

const ConsultantCardWrap = styled.div`
  display: flex;
  justify-content: space-around;
`

const ConsultantCard = styled.div`
  border: 10px solid ${props => props.state === 'open' ? "#ace7ac" : "#ef9494"};
  background-color: ${({ type }) => type === 'pediatry' ? "#e6e9cd73" : type === 'urgency' ? "#d476b073" : "#97c4f776"};
  padding: var(--base-spacing);
  width: calc(var(--base-spacing)*10);
  height: calc(var(--base-spacing)*10);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div:first-of-type {
      text-transform: uppercase;
      padding-bottom: var(--base-spacing);
  }
  & > div:nth-of-type(3) {
      font-size:0.6rem;
  }
`

const MiniBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: center;
    color: #474747;
    padding: var(--base-spacing);
`

const Consultation = ({ consultations, onFree, onAttend }) => {
    return (
        <ConsultantWrapp>
            <ConsultantHead>
                <span>Consultas habilitadas</span>
                <MiniBox style={{ backgroundColor: '#97c4f776'}}>General</MiniBox>
                <MiniBox style={{ backgroundColor: '#e6e9cd73'}}>Pediatria</MiniBox>
                <MiniBox style={{ backgroundColor: '#d476b073'}}>Urgencias</MiniBox>
                <span>
                    <ButtonUi onClick={onAttend}>Atender</ButtonUi>
                    <ButtonUi onClick={onFree}>Liberar</ButtonUi>
                </span>
            </ConsultantHead>
            <ConsultantCardWrap>
                {consultations?.length > 0 && consultations.map(({ id, specialistName, state, type, totalAttended }) => (
                    <ConsultantCard key={`consultant_${id}`} state={state} type={type}>
                        <div>{type}</div>
                        <div>{specialistName}</div>
                        <div>Atendidos:{totalAttended}</div>
                    </ConsultantCard>
                ))}
            </ConsultantCardWrap>
        </ConsultantWrapp>
    )
}

export default Consultation