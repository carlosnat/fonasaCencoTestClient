import xhrService from "./xhrService";

export const getConsultationByHospitalId = async(hospitalId) => xhrService.get(`consultation?hospitalId=${hospitalId}`)

export const freeConsultations = async(hospitalId) => xhrService.get(`consultation/freeSpots`)
