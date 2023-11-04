import { persisted } from 'svelte-local-storage-store';

//User Stores
export const userInfo = persisted('userInfo', { userName: '', userId: '', userEmail: '', userNid: '', userDob: '', userAddress: '', userGender: '', userPhone: '', userPhoto: '' });

//Doctor Stores
export const doctorInfo = persisted('doctorInfo', { doctorName: '', doctorId: '', doctorEmail: '', doctorBmdc: '', doctorDob: '', doctorAddress: '', doctorGender: '', doctorPhone: '', doctorPhoto: '' });
export const doctorHospitalList = persisted('doctorHospitalList', { hospitalList: [] })
export const doctorResearchList = persisted('doctorResearchList', { researchList: [] })
export const doctorHospital = persisted('doctorHospital', { hospitalId: {} ,hospitalLogo: {} })

//Hospital Stores
export const hospitalPatientList = persisted('hospitalPatientList', { patientList: [] })
export const hospitalDoctorList = persisted('hospitalDoctorList', { doctorList: [] });
export const hospitalInfo = persisted('hospitalInfo', { hospitalInfo: {} })

//Lab Stores
export const labInfo = persisted('labInfo', { labInfo: {} })

//Research Org
export const orgInfo = persisted('orgInfo', { orgInfo: {} })

//Company Info
export const companyInfo = persisted('companyIdfo', {companyInfo: {}})
