import { useState, useEffect } from 'react'
import { freeConsultations, getConsultationByHospitalId } from '../../providers/consultationService'

const useConsultatios = (hospitalId) => {
    const [consultations, setConsultations] = useState()
    const [free, setFree] = useState(false)

    useEffect(() => {
        async function fetchConsultations() {
            if (hospitalId) {
                const { data } = await getConsultationByHospitalId(hospitalId)
                const sorted = data.sort(sortFunction)
                setConsultations(sorted)
            }
        }
        fetchConsultations()
    }, [free, hospitalId])

    const sortFunction = (a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0
    }

    const freeSpots = async () => {
        await freeConsultations()
        setFree(!free)
    }

    const reloadConsultations = () => {
        setFree(!free)
    }

    return { freeSpots, consultations, reloadConsultations }
}

export default useConsultatios