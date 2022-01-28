import styled from 'styled-components';
import PatientCard from './patientCard';
import { v4 as uuidv4 } from 'uuid';

const PatientsWrapp = styled.div`
    display: flex;
    padding: var(--base-spacing);
    padding-top: calc(var(--base-spacing)*3);
    margin-top: var(--base-spacing);
    box-shadow: 1px 1px 1px 1px #0000004e;
    background-color: #fff;
`

const PatientsLists = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    & > div:first-of-type {
        text-transform: uppercase;
    }
`

const Divider = styled.div`
    width: 1px;
    background-color: #d5d5d5;
`

const BuildCard = (patient) => {
    const { Patient: { name, age, group }, consultType, priority, risk } = patient
    return (
        < PatientCard
            key={uuidv4()}
            name={name}
            age={age}
            group={group}
            consultType={consultType}
            priority={priority}
            risk={risk}
        />)
}

const Patients = ({ pending, waiting }) => {
    return (
        <PatientsWrapp>
            <PatientsLists>
                <div>Pacientes pendientes {pending.length ? `: ${pending.length}` : ''}</div>
                <div>
                    {
                        pending && pending.length > 0 && pending.map(patient => BuildCard(patient))
                    }
                </div>
            </PatientsLists>
            <Divider />
            <PatientsLists>
                <div>Pacientes en espera {waiting.length ? `: ${waiting.length}` : ''}</div>
                <div>
                    {waiting && waiting.length > 0 && waiting.map(patient => BuildCard(patient))}
                </div>
            </PatientsLists>
        </PatientsWrapp>
    )
}

export default Patients