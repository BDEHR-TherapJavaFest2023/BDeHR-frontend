import { persisted } from 'svelte-local-storage-store';

//Doctor Stores
export const doctorInfo = persisted('doctorInfo',{doctorName:''});
export const doctorHospitalList = persisted('doctorHospitalList',{hospitalList:[]})
export const doctorResearchList = persisted('doctorResearchList',{researchList:[]})

//Hospital Stores
export const hospitalPatientList = persisted('hospitalPatientList',{patientList:[]})
export const hospitalDoctorList = persisted('hospitalDoctorList',{doctorList:[]});
export const hospitalInfo = persisted('hospitalInfo',{hospitalName:'', hospitalLogo:''})
