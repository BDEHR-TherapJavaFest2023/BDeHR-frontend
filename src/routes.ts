import Home from './homepage.svelte';
import userLogin from './lib/userlogin.svelte';
import About from './lib/about.svelte';
import userSignUp from './lib/usersignup.svelte';

export const routes = {
    // Define your routes here
    '/': Home,
    '/about': About,
    '/userlogin': userLogin,
    '/usersignup': userSignUp,
    // Add more routes as needed
};