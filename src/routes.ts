import Home from './homepage.svelte';
import userLogin from './lib/userlogin.svelte';
import hospitalLogin from './lib/hospitalLogin.svelte';
import doctorLogin from './lib/doctorLogin.svelte';
import doctorHome from './lib/doctorhome.svelte';
import hospitalHome from './lib/hospitalhome.svelte';
import hospitalPatients from './lib/hospitalPatients.svelte';
import hospitalDoctors from './lib/hospitalDoctors.svelte';
import dospitalAuthorityLogin from './lib/hospitalauthoritylogin.svelte'
import HospitalAuthority from './lib/hospitalAuthority.svelte';
import doctorHospital from './lib/doctorHospital.svelte';
import doctorResearch from './lib/doctorResearch.svelte';
import adminHome from './lib/adminhome.svelte';
import About from './lib/about.svelte';
import userSignUp from './lib/usersignup.svelte';
import doctorSignUp from './lib/doctorSignup.svelte';
import User from './lib/user.svelte';

export const routes = {
    // Define your routes here
    '/': Home,
    '/about': About,
    '/userlogin': userLogin,
    '/usersignup': userSignUp,
    '/user': User,
    '/hospitalogin': hospitalLogin,
    '/doctorlogin': doctorLogin,
    '/doctorsignup': doctorSignUp,
    '/doctorhome': doctorHome,
    '/doctorhome/hospitals': doctorHospital,
    '/doctorhome/researches': doctorResearch,
    '/hospitalhome': hospitalHome,
    '/hospitalhome/patients': hospitalPatients,
    '/hospitalhome/doctors': hospitalDoctors,
    '/adminhome': adminHome,
    '/hospitalhome/authorityLogin': dospitalAuthorityLogin,
    '/doctorhome/Authority': HospitalAuthority,
    // Add more routes as needed
};