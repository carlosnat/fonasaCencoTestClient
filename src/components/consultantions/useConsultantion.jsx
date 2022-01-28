import { useState, useEffect } from 'react'
import { freeConsultations, getConsultationByHospitalId } from '../../providers/consultationService'

const useConsultatios = (hospitalId) => {
    const [consultations, setConsultations] = useState()
    const [free, setFree] = useState(false)

    useEffect(() => {
        fetchConsultations()
    }, [free])

    const sortFunction = (a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0
    }

    const fetchConsultations = async () => {
        if (hospitalId) {
            const { data } = await getConsultationByHospitalId(hospitalId)
            const sorted = data.sort(sortFunction)
            setConsultations(sorted)
        }
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