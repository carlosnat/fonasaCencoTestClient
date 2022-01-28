import { useEffect, useState } from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from 'uuid';
import { topOlderWaiting, urgencySmoker } from "../../providers/hospitalService"
import PatientCard from "../patients/patientCard"
import ButtonUi from "../ui/button"


const ReportStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: var(--base-spacing);
    box-shadow: 1px 1px 1px 1px #0000004e;
    margin-top: var(--base-spacing);
    background-color: #fff;
`

const RepportHead = styled.div`
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

const ReportContent = styled.div`
    display: flex;
`

const OlderReport = ({ older }) => {
    return (
        <div>
            <div>Paciente mas anciano en espera</div>
            <PatientCard
                consultType={older.priority > 4 ? 'urgency' : 'general'} g
                roup={'elder'}
                name={older.Patient.name}
                age={older.Patient.age}
                risk={older.risk}
                priority={older.priority}
            />
        </div>
    )
}

const SmokerUrgency = ({ smoker }) => {
    return (
        <div>
            <div>Paciente urgentes fumadores</div>
            {
                smoker.map(smo => (
                    <PatientCard
                        key={uuidv4()}
                        consultType={smo.priority > 4 ? 'urgency' : 'general'}
                        group={'young'}
                        name={smo.Patient.name}
                        age={smo.Patient.age}
                        risk={smo.risk}
                        priority={smo.priority}
                    />
                ))
            }
        </div>
    )
}

const TopReport = () => {
    const [older, setOlder] = useState()
    const [smoker, setSmoker] = useState()

    useEffect(() => {
        fetchReports()
    }, [])

    const fetchReports = async () => {
        const { data: older } = await topOlderWaiting()
        setOlder(older.top)
        const { data: smoke } = await urgencySmoker()
        setSmoker(smoke)
    }


    return (
        <ReportStyled>
            <RepportHead><span>Reportes:</span> <ButtonUi onClick={fetchReports}>Refrescar</ButtonUi></RepportHead>
            <ReportContent>
                { older && <OlderReport older={older} />}
                { smoker && smoker.length > 0 && <SmokerUrgency somker={smoker} />}
            </ReportContent>
        </ReportStyled>
    )
}

export default TopReport