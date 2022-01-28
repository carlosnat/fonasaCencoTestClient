import { useState, useEffect } from 'react'
import { attendPatients, getPatientsByStatus } from '../../providers/patientService'

const usePatients = (status) => {
    const [patients, setPatients] = useState([])
    const [free, setFree] = useState(false)

    useEffect(() => {
        async function fetchPatients() {
            if (status) {
                const { data } = await getPatientsByStatus(1, status)
                setPatients(data)
            }
        }
        fetchPatients()
    }, [free, status])

    const reloadPatients = () => {
        setFree(!free)
    }

    return { patients, setPatients, attendPatients, reloadPatients }
}

export default usePatients