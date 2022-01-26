import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const HeaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ConsultantWrapp = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

const ConsultantHead = styled.div`
  display: flex;
  justify-content: space-between;
`

const ConsultantCardWrap = styled.div`
  display: flex;
  justify-content: space-around;
`

const ConsultantCard = styled.div`
  background-color: ${props => props.state === 'open' ? "green" : "red"};
  & span : {
    display: block;
  }
`

const PatientsWrapp = styled.div`
  display: flex;
`

const PendingPatients = styled.div`
  width: 50%;
`

const WaitingPatients = styled.div`
    width: 50%;
`

function App() {
  const [hospital, setHospital] = useState()
  const [consultants, setConsultants] = useState()
  const [pendingPatients, setPendingPatients] = useState()
  const [waitingPatients, setWaitingPatients] = useState()
  useEffect(() => {
    fetchHospitals()
  }, [])

  const fetchHospitals = async () => {
    const { data } = await axios.get('http://localhost:3000/hospital')
    setHospital(data[0])
  }

  const generatePatient = async () => {
    if(hospital && hospital.id) {
      await axios.get(`http://localhost:3000/patient/generate?hospitalId=${hospital.id}`)
      fetchConsultants()
    }
  }

  useEffect(() => {
    fetchConsultants()
  }, [hospital])

  const fetchConsultants = async () => {
    if (hospital) {
      const { data } = await axios.get(`http://localhost:3000/consultation?hospitalId=${hospital.id}`)
      setConsultants(data)
    }
  }
  useEffect(() => {
    updatePatientsList()
  }, [consultants])

  const fetchPendingPatients = async () => {
    if(hospital && hospital.id) {
      const { data } = await axios.get(`http://localhost:3000/hospital/patients?hospitalId=${hospital.id}&status=pending`)
      setPendingPatients(data)
    }
  }

  const fetchWaitingPatients = async () => {
    if(hospital && hospital.id) {
      const { data } = await axios.get(`http://localhost:3000/hospital/patients?hospitalId=${hospital.id}&status=waiting`)
      setWaitingPatients(data)
    }
  }

  const updatePatientsList = async() => {
    fetchPendingPatients()
    fetchWaitingPatients()
  }

  const attendPatients = async () => {
    await axios.get(`http://localhost:3000/hospital/attend`)
    updatePatientsList()
    fetchConsultants()
  }

  const freeConsultations = async() => {
    await axios.get(`http://localhost:3000/consultation/freeSpots`)
    fetchConsultants()
  }

  return (
    <div className="App">
      <HeaderStyled>
        <span>
          {hospital?.name}
        </span>
        <button onClick={generatePatient}>Generar paciente</button>
      </HeaderStyled>
      <ConsultantWrapp>
        <ConsultantHead>
          <span>Consultas habilitadas</span>
          <span>
            <button onClick={attendPatients}>Atender</button>
            <button onClick={freeConsultations}>Liberar</button>
          </span>
        </ConsultantHead>
        <ConsultantCardWrap>
          {consultants?.length > 0 && consultants?.map(({ id, specialistName, state, type, totalAttended }) => (
            <ConsultantCard key={`consultant_${id}`} state={state}>
              <div>{id}</div>
              <div>{specialistName}</div>
              <div>{state}</div>
              <div>{type}</div>
              <div>{totalAttended}</div>
            </ConsultantCard>
          ))}
        </ConsultantCardWrap>
      </ConsultantWrapp>
      <PatientsWrapp>
        <PendingPatients>
          <div>Pacientes pendientes</div>
          <div>
            {pendingPatients && pendingPatients.length > 0 && pendingPatients.map(patient => (
              <div key={`pendingPatient_${patient.id}`}>
                <span>Nombre: {patient.Patient.name}</span>
                <span>Edad: {patient.Patient.age}</span>
                <span>Grupo: {patient.Patient.group}</span>
                <span>Consulta: {patient.consultType}</span>
                <span>Prioridad: {patient.priority}</span>
                <span>Riesgo: {patient.risk}</span>
              </div>
            ))}
          </div>
        </PendingPatients>
        <WaitingPatients>
          <div>Pacientes en espera</div>
          <div>
            {waitingPatients && waitingPatients.length > 0 && waitingPatients.map(patient => (
              <div key={`waitingPatient_${patient.id}`}>
                <span>Nombre: {patient.Patient.name}</span>
                <span>Edad: {patient.Patient.age}</span>
                <span>Grupo: {patient.Patient.group}</span>
                <span>Consulta: {patient.consultType}</span>
                <span>Prioridad: {patient.priority}</span>
                <span>Riesgo: {patient.risk}</span>
              </div>
            ))}
          </div>
        </WaitingPatients>
      </PatientsWrapp>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
