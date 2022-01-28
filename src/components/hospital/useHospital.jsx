import { useState, useEffect } from 'react'
import { getHospitals } from '../../providers/hospitalService'


const useHospital = () => {
    const [hospital, setHospital] = useState()

    useEffect(() => {
        fetchHospitals()
    }, [])

    const fetchHospitals = async () => {
        const { data } = await getHospitals()
        setHospital(data[0])
    }

    return {hospital, setHospital}
}

export default useHospital