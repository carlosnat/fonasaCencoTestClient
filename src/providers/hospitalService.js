import xhrService from "./xhrService";

export const getHospitals = async() => xhrService.get('hospital')

export const topOlderWaiting = async() => xhrService.get('/hospital/older')

export const urgencySmoker = async() => xhrService.get('/hospital/urgency-smoker')