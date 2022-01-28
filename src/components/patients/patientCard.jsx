import styled from "styled-components"

const PatientCardStyled = styled.div`
    background-color: ${({ type }) => type === 'pediatry' ? "#e6e9cd73" : type === 'urgency' ? "#d476b073" : "#97c4f776"};
    padding: var(--base-spacing);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: var(--base-spacing);
    width: 30em;
    & div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }
`

const PatientCard = ({ name, age, group, consultType, priority, risk }) => {
    return (
        <PatientCardStyled type={consultType}>
            <div>
                <span>Nombre: {name}</span>
                <span>Edad: {age}</span>
                <span>Grupo: {group}</span>
            </div>
            <div>
                <span>Consulta: {consultType}</span>
                <span>Prioridad: {priority}</span>
                <span>Riesgo: {risk}</span>
            </div>
        </PatientCardStyled>
    )
}

export default PatientCard