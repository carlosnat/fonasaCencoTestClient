import { useState, useEffect, useCallback } from 'react'
import { attendPatients, getPatientsByStatus } from '../../providers/patientService'

const usePatients = (status) => {
    const [patients, setPatients] = useState([])
    const [free, setFree] = useState(false)

    useEffect(() => {
        fetchPatients()
    }, [free])

    const fetchPatients = useCallback(async () => {
        if(status) {
            const { data } = await getPatientsByStatus(1, status)
            setPatients(data)
        }
    }, [])

    const reloadPatients = () => { 
        setFree(!free)
    }

    return {patients, setPatients, attendPatients, reloadPatients}
}

export default usePatients