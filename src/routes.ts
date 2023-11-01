import Home from './homepage.svelte';
import userLogin from './lib/userlogin.svelte';
import hospitalLogin from './lib/hospitalLogin.svelte';
import HospitalSignup from './lib/hospitalSignup.svelte';
import doctorLogin from './lib/doctorLogin.svelte';
import doctorHome from './lib/doctorhome.svelte';
import hospitalHome from './lib/hospitalhome.svelte';
import hospitalPatients from './lib/hospitalPatients.svelte';
import HospitalBloodBank from './lib/hospitalBloodBank.svelte';
import hospitalDoctors from './lib/hospitalDoctors.svelte';
import dospitalAuthorityLogin from './lib/hospitalauthoritylogin.svelte'
import HospitalAuthority from './lib/hospitalAuthority.svelte';
import doctorHospital from './lib/doctorHospital.svelte';
import doctorResearch from './lib/doctorResearch.svelte';
import doctorPatient from './lib/doctorPatient.svelte';
import doctorOnPatient from './lib/doctorOnPatient.svelte';
import adminHome from './lib/adminhome.svelte';
import adminQuery from './lib/adminQuery.svelte';
import AdminAddHospital from './lib/adminAddHospital.svelte';
import AdminMessages from './lib/adminMessages.svelte';
import About from './lib/about.svelte';
import userSignUp from './lib/usersignup.svelte';
import labLogin from './lib/labLogin.svelte';
import adminLogin from './lib/adminLogin.svelte'
import labHome from './lib/labHome.svelte';
import labPatient from './lib/labPatients.svelte';
import doctorSignUp from './lib/doctorSignup.svelte';
import appUserHome from './lib/appUserHome.svelte';
import appUserEntry from './lib/appUserEntry.svelte';
import appUserFind from './lib/appUserFind.svelte';
import appUserMedications from './lib/appUserMedications.svelte';
import appUserReports from './lib/appUserReports.svelte';
import AppUserBlood from './lib/appUserBlood.svelte';
import User from './lib/user.svelte';
import UserMedication from './lib/userMedication.svelte';
import UserReport from './lib/userReport.svelte';
import adminResearch from './lib/adminResearch.svelte';
import ResearchLogin from './lib/researchLogin.svelte';
import ResearchSignUp from './lib/researchSignUp.svelte'
import ResearchHome from './lib/researchhome.svelte'
import DoctorResearchDepth from './lib/doctorResearchDepth.svelte';
import Pharmacompanylogin from './lib/pharmCompanyLogin.svelte';
import PharmaCompanyHome__SvelteComponent_ from './lib/pharmaCompanyHome.svelte';
import PharmaAddDrug__SvelteComponent_ from './lib/pharmaAddDrug.svelte';
import PharmaProducts__SvelteComponent_ from './lib/pharmaProducts.svelte';
import Pharmafactories__SvelteComponent_ from './lib/pharmafactories.svelte';

export const routes = {
    // Define your routes here
    '/': Home,
    '/about': About,
    '/userlogin': userLogin,
    '/usersignup': userSignUp,
    '/user': User,
    '/user/medication': UserMedication,
    '/user/report': UserReport,
    '/hospitalogin': hospitalLogin,
    '/hospitalsignup': HospitalSignup,
    '/doctorlogin': doctorLogin,
    '/doctorsignup': doctorSignUp,
    '/doctorhome': doctorHome,
    '/doctorhome/hospitals': doctorHospital,
    '/doctorhome/researches': doctorResearch,
    '/doctorhome/researches/:researchParticular': DoctorResearchDepth,
    '/hospitalhome': hospitalHome,
    '/hospitalhome/patients': hospitalPatients,
    '/hospitalhome/bloodbank': HospitalBloodBank,
    '/hospitalhome/doctors': hospitalDoctors,
    '/adminhome': adminHome,
    '/adminhome/query': adminQuery,
    '/adminhome/research': adminResearch,
    '/hospitalhome/authorityLogin': dospitalAuthorityLogin,
    '/doctorhome/Authority': HospitalAuthority,
    '/doctorhome/doctorPatient/:hospitalName': doctorPatient,
    '/doctorhome/doctorPatient/:hospitalName/:patientId': doctorOnPatient,
    '/lablogin': labLogin,
    '/adminlogin': adminLogin,
    '/labhome': labHome,
    '/labhome/labpatients': labPatient,
    '/adminhome/addhospital': AdminAddHospital,
    '/adminhome/messages': AdminMessages,
    '/appuser/home': appUserHome,
    '/appuser/entry': appUserEntry,
    '/appuser/find': appUserFind,
    '/appuser/medications': appUserMedications,
    '/appuser/reports': appUserReports,
    '/appuser/blooddonate': AppUserBlood,
    '/researchlogin': ResearchLogin,
    '/researchsignup': ResearchSignUp,
    '/researchOrg/home': ResearchHome,
    '/pharmaceuticalcompanylogin': Pharmacompanylogin,
    '/pharmaceuticalcompany/home': PharmaCompanyHome__SvelteComponent_,
    '/pharmaceuticalcompany/addproduct': PharmaAddDrug__SvelteComponent_,
    '/pharmaceuticalcompany/products': PharmaProducts__SvelteComponent_,
    '/pharmaceuticalcompany/factories': Pharmafactories__SvelteComponent_,
};