import xhrService from "./xhrService";

export const generatePatientByHospitalId = async(hospitalId) => xhrService.get(`patient/generate?hospitalId=${hospitalId}`)

export const getPatientsByStatus = async(hospitalId, status) => xhrService.get(`hospital/patients?hospitalId=${hospitalId}&status=${status}`)

export const attendPatients = async() => xhrService.get(`hospital/attend`)