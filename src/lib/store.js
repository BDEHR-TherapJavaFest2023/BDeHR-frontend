import { persisted } from 'svelte-local-storage-store';

export const doctorInfo = persisted('doctorInfo',{doctorName:''});
export const doctorHospitalList = persisted('doctorHospitalList',{hospitalList:[]})
export const doctorResearchList = persisted('doctorResearchList',{researchList:[]})