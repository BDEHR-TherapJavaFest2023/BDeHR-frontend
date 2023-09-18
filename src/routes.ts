import Home from './homepage.svelte';
import userLogin from './lib/userlogin.svelte';
import hospitalLogin from './lib/hospitalLogin.svelte';
import doctorLogin from './lib/doctorLogin.svelte';
import doctorHome from './lib/doctorhome.svelte';
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
    '/doctor/home': doctorHome,
    // Add more routes as needed
};