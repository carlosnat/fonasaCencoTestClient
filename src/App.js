import './App.css';
import Hospital from './components/hospital/hospital';
import Consultation from './components/consultantions/consultation';
import Patients from './components/patients/patients';
import useConsultatios from './components/consultantions/useConsultantion';
import useHospital from './components/hospital/useHospital';
import { generatePatientByHospitalId } from './providers/patientService';
import usePatients from './components/patients/usePatients';
import TopReport from './components/report/topReport';
import { useState } from 'react';

function App() {
  const [showReports, setShowReports] = useState(false)

  const { consultations, reloadConsultations, freeSpots } = useConsultatios(1)
  const { hospital } = useHospital()
  const { patients: pendingPatients, reloadPatients: reloadPending, attendPatients } = usePatients('pending')
  const { patients: waitingPatients, reloadPatients: reloadWaiting } = usePatients('waiting')

  const generatePatient = async () => {
    const { id: hospitalId } = hospital
    if (hospitalId) {
      await generatePatientByHospitalId(hospitalId)
      setTimeout(async () => {
        await reloadConsultations()
      }, 100)
      await refresPatientsLists()
    }
  }

  const handleAttend = async () => {
    await attendPatients()
    setTimeout(async () => {
      await reloadConsultations()
    }, 100)
    await refresPatientsLists()
  }

  const refresPatientsLists = async () => {
    setTimeout(async () => {
      await reloadPending()
    }, 80)
    setTimeout(async () => {
      await reloadWaiting()
    }, 100)
  }


  return (
    <div className="App">
      <Hospital hospital={hospital} onGenerate={generatePatient} />
      <TopReport />
      <Consultation consultations={consultations} onFree={freeSpots} onAttend={handleAttend} />
      <Patients pending={pendingPatients} waiting={waitingPatients} />
    </div>
  );
}

export default App;
