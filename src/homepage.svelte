<script>
    import Navbar from "./lib/navbarlanding.svelte";
    import Footer from "./lib/footer.svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let animateCard = false;
    let isHovered = false;
    let isHoveredDoctor = false;
    let isHoveredHospital = false;
    let isHoveredLab = false;
    let isHoveredAdmin = false;

    function toggleHover() {
        isHovered = !isHovered;
    }

    function toggleHoverDoctor() {
        isHoveredDoctor = !isHoveredDoctor;
    }
    function toggleHoverHospital() {
        isHoveredHospital = !isHoveredHospital;
    }
    function toggleHoverLab() {
        isHoveredLab = !isHoveredLab;
    }
    function toggleHoverAdmin() {
        isHoveredAdmin = !isHoveredAdmin;
    }

    // Function to handle intersection
    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCard = true;
            }
        });
    }

    // Create an Intersection Observer
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Function to initialize the Intersection Observer
    function initIntersectionObserver() {
        const cardElement = document.getElementById("animated-card");
        if (cardElement) {
            observer.observe(cardElement);
        }
    }

    let activeSlide = 0;

    // Define an array of image URLs
    const images = [
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/admin__1_-removebg-preview.png",
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userBegin-transformed-removebg%20(1).png",
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Doctor_module.png",
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospital-removebg-preview.png",
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/labbegin-removebg-preview.png",
    ];

    function nextSlide() {
        console.log("Next Slide function called");
        activeSlide = (activeSlide + 1) % images.length;
    }

    function prevSlide() {
        console.log("Prev Slide function called");
        activeSlide = (activeSlide - 1 + images.length) % images.length;
    }

    // Start observing when the component is mounted
    //onMount(initIntersectionObserver);

    async function test() {
        await fetch("https://bdehr-backend.onrender.com/test")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
            });
    }

    onMount(() => {
        //console.log("Here");
        initIntersectionObserver();
        test();
    });
</script>

<main>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Flowchart Component -->
    <section
        class="py-20 mb-20"
        style="background-color: #ffffff ; color: black; padding: 1.5rem; z-index: 10;"
    >
        <div class="max-w-screen-xl mx-auto mt-48">
            <div class="flex items-center space-x-24">
                <div class="flex flex-col w-1/2">
                    <div class="flex flex-col space-y-4">
                        <h1 class="text-6xl font-bold font-heading">
                            Rethink your healthcare facilities with BDeHR
                        </h1>

                        <p class="text-1xl">
                            The BDeHR ecosystem is designed to help you manage
                            your medical records. Empower yourself by accesing
                            all your records at once in a way you have never
                            seen before. Ensure better healthcare by proper
                            monitoring.
                        </p>
                    </div>
                    <div class="flex mt-12 space-x-3">
                        <button class="w-2/3 btn btn-outline"
                            >Get Started</button
                        >
                    </div>
                </div>
                <div class="relative w-1/2">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hero-image-desktop.png"
                        class="w-full h-full"
                        alt="Hero"
                    />
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hero-image-mobile.png"
                        class="absolute -bottom-4 -left-3"
                        alt="Hero"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="card lg:card-side bg-[#F4F4F4] p-4 flex">
        <div class="w-1/2 card-body" style="background-color: #F4F4F4;">
            <h1 class="text-4xl font-bold font-heading">Our Services</h1>
            <p class="text-2xl font-semibold mb-2">
                You take care of your health and let us take care of everything
                else
            </p>
            <div class="flex mt-4 mb-2 space-x-3">
                <!-- Adjust the margin-top here -->
                <a
                    href="#/adminlogin"
                    class="w-2/3 flex items-center btn btn-outline text-2xl font-bold hover:bg-slate-400 h-16"
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/2942813.png"
                        alt="Admin"
                        class="mr-2"
                        height={50}
                        width={50}
                    /> Administrator
                </a>
            </div>
            <div class="flex mt-4 mb-2 space-x-3">
                <!-- Adjust the margin-top here -->
                <a
                    href="#/userlogin"
                    class="w-2/3 flex items-center btn btn-outline text-2xl font-bold hover:bg-slate-400 h-16"
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userLogo.svg"
                        alt="Admin"
                        class="mr-2"
                        height={50}
                        width={50}
                    /> User
                </a>
            </div>
            <div class="flex mt-4 mb-2 space-x-3">
                <!-- Adjust the margin-top here -->
                <a
                    href="#/doctorlogin"
                    class="w-2/3 flex items-center btn btn-outline text-2xl font-bold hover:bg-slate-400 h-16"
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/3481061.png"
                        alt="Admin"
                        class="mr-2"
                        height={50}
                        width={50}
                    />

                    Doctor</a
                >
            </div>
            <div class="flex mt-4 mb-2 space-x-3">
                <!-- Adjust the margin-top here -->
                <a
                    href="#/hospitalogin"
                    class="w-2/3 flex items-center btn btn-outline text-2xl font-bold hover:bg-slate-400 h-16"
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospitalManagement.png"
                        alt="Admin"
                        class="mr-2"
                        height={50}
                        width={50}
                    />Hospital</a
                >
            </div>
            <div class="flex mt-4 mb-2 space-x-3">
                <!-- Adjust the margin-top here -->
                <a
                    href="#/lablogin"
                    class="w-2/3 flex items-center btn btn-outline text-2xl font-bold hover:bg-slate-400 h-16"
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/lab.png"
                        alt="Admin"
                        class="mr-2"
                        height={50}
                        width={50}
                    />
                    Laboratory</a
                >
            </div>
        </div>

        <div class="w-1/2 relative carousel">
            {#each images as image, i (i)}
                <div
                    id={"slide" + i}
                    class="carousel-item w-full transition-opacity"
                    class:active={i === activeSlide}
                    in:fade={{ duration: 500 }}
                    out:fade={{ duration: 500 }}
                >
                    <img src={image} class="w-full mt-14" alt="Slide Image" />
                </div>
            {/each}
            <div
                class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
                <button class="btn btn-circle" on:click={prevSlide}>❮</button>
                <button class="btn btn-circle" on:click={nextSlide}>❯</button>
            </div>
        </div>
    </div>

    <section class="py-20 max-w-screen-lg mx-auto">
        <div class="flex flex-col justify-center text-center">
            <div class="flex flex-col space-y-3">
                <h2 class="text-4xl font-bold font-heading">
                    All-in-one platform
                </h2>
                <p>A complete healthcare environment in your hand</p>
            </div>
            <div class="flex justify-center mt-12 space-x-8">
                <a
                    href="#/bdehr/videodemo"
                    class="w-1/5 flex items-center btn btn-outline text-2xl font-bold hover:bg-blue-600 rounded-xl"
                >
                    Get Demo
                </a>
                <a
                    href="#/userlogin"
                    class="w-1/5 flex items-center btn btn-outline text-2xl font-bold hover:bg-blue-600 rounded-xl"
                >
                    Login
                </a>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-12 mt-20">
            <div
                class="flex flex-col p-4 space-y-3 hover:shadow-xl transition duration-300 cursor-pointer"
            >
                <div class="flex space-x-3">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/medical-report-icon.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="title"
                        width={25}
                        height={25}
                    />
                    <h5 class="font-bold font-heading">Access</h5>
                </div>
                <p>
                    Access your reports and Medication history anytime, anywhere
                </p>
            </div>
            <div
                class="flex flex-col p-4 space-y-3 hover:shadow-xl transition duration-300 cursor-pointer"
            >
                <div class="flex space-x-3">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/location.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="title"
                    />
                    <h5 class="font-bold font-heading">Locate</h5>
                </div>
                <p>
                    Arrive faster at nearby hospital with help of our
                    interactive map
                </p>
            </div>

            <div
                class="flex flex-col p-4 space-y-3 hover:shadow-xl transition duration-300 cursor-pointer"
            >
                <div class="flex space-x-3">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospitalmanage.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="title"
                        height={25}
                        width={25}
                    />
                    <h5 class="font-bold font-heading">Management</h5>
                </div>
                <p>
                    Management between Hospital, doctor and Patient is efficient
                    and faster
                </p>
            </div>
            <div
                class="flex flex-col p-4 space-y-3 hover:shadow-xl transition duration-300 cursor-pointer"
            >
                <div class="flex space-x-3">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/upload.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="title"
                    />
                    <h5 class="font-bold font-heading">Upload</h5>
                </div>
                <p>
                    Your Test reports and medications are uploaded in your
                    account
                </p>
            </div>
            <div
                class="flex flex-col p-4 space-y-3 hover:shadow-xl transition duration-300 cursor-pointer"
            >
                <div class="flex space-x-3">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/device.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="title"
                    />
                    <h5 class="font-bold font-heading">Accessible</h5>
                </div>
                <p>Easy to get into system & manage your information</p>
            </div>
            <div
                class="flex flex-col p-4 space-y-3 hover:shadow-xl transition duration-300 cursor-pointer"
            >
                <div class="flex space-x-3">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/analytic.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="title"
                    />
                    <h5 class="font-bold font-heading">Analysis</h5>
                </div>
                <p>Better national healthcare analysis by thorough query</p>
            </div>
        </div>
    </section>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="card lg:card-side bg-base-100 flex"
        on:mouseenter={toggleHover}
        on:mouseleave={toggleHover}
    >
        <div
            class="card-body flex flex-col justify-center w-1/2 {isHovered
                ? 'animate-left-to-right'
                : ''}"
        >
            <h5 class="text-6xl font-bold mt-20" style="color: #8000FF;">
                User Module
            </h5>
            <h5 class="text-3xl font-bold" style="color: #8000FF;">
                You are in Charge
            </h5>
            <p class="text-2xl" style="color: #000000;">
                You have your medical records all to yourself.
                <br />
                Access your health data instantly anytime, anywhere.
                <br />
                Organize your files & authorize access to your files.
            </p>
            <a
                href="#/userlogin"
                class="w-2/3 btn btn-outline hover:bg-violet-500">Get Started</a
            >
        </div>

        <figure
            class="w-1/2 relative"
            style="background: #FFB0F6; height: 500px;"
        >
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userfinl-removebg-preview.png"
                alt="User"
                class="absolute top-0 left-0 w-full h-full object-contain object-center {isHovered
                    ? 'animate-right-to-left'
                    : ''}"
            />
        </figure>
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="card lg:card-side bg-base-100 flex"
        on:mouseenter={toggleHoverDoctor}
        on:mouseleave={toggleHoverDoctor}
    >
        <figure
            class="w-1/2 relative"
            style="background: #FED391; height: 500px;"
        >
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/OO6PT80-removebg-preview.png"
                alt="User"
                class="absolute top-0 left-0 w-full h-full object-contain object-center {isHoveredDoctor
                    ? 'animate-right-to-left'
                    : ''}"
            />
        </figure>
        <div
            class="card-body flex flex-col justify-center w-1/2 {isHoveredDoctor
                ? 'animate-left-to-right'
                : ''}"
        >
            <h5 class="text-6xl font-bold mt-20" style="color: #FF7903;">
                Doctor Module
            </h5>
            <h5 class="text-3xl font-bold" style="color: #FF7903;">
                Easily Ensure Effective Treatment
            </h5>
            <p class="text-2xl" style="color: #000000;">
                Access patient's medical records.
                <br />
                Give Proper investigations
                <br />
                Provide treatment considering every details
            </p>
            <a
                href="#/doctorlogin"
                class="w-2/3 btn btn-outline hover:bg-orange-400">Get Started</a
            >
        </div>
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="card lg:card-side bg-base-100 flex"
        on:mouseenter={toggleHoverHospital}
        on:mouseleave={toggleHoverHospital}
    >
        <div
            class="card-body flex flex-col justify-center w-1/2 {isHoveredHospital
                ? 'animate-left-to-right'
                : ''}"
        >
            <h5 class="text-6xl font-bold mt-20" style="color: #00AFFF;">
                Hospital Module
            </h5>
            <h5 class="text-3xl font-bold" style="color: #00AFFF;">
                Ensure one stop service point for patient
            </h5>
            <p class="text-2xl" style="color: #000000;">
                Systematic flow of patient management
                <br />
                Synchronize activities between Admin, Doctors & Labs
                <br />
                From hospital door to getting clearnace, fulfill the requirements
                of a patient.
                <br />
                Organize your files & authorize access to your files.
            </p>
            <a
                href="#/hospitalogin"
                class="w-2/3 btn btn-outline hover:bg-sky-600">Get Started</a
            >
        </div>

        <figure
            class="w-1/2 relative"
            style="background: #cdedec; height: 500px;"
        >
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/istockphoto-973278536-612x612.jpg"
                alt="User"
                class="absolute top-0 left-0 w-full h-full object-contain object-center {isHoveredHospital
                    ? 'animate-right-to-left'
                    : ''}"
            />
        </figure>
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="card lg:card-side bg-base-100 flex"
        on:mouseenter={toggleHoverLab}
        on:mouseleave={toggleHoverLab}
    >
        <figure
            class="w-1/2 relative"
            style="background: #fee6e6; height: 500px;"
        >
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/labbegin-removebg-preview%20(1).png"
                alt="User"
                class="absolute top-0 left-0 w-full h-full object-contain object-center {isHoveredLab
                    ? 'animate-right-to-left'
                    : ''}"
            />
        </figure>
        <div
            class="card-body flex flex-col justify-center w-1/2 {isHoveredLab
                ? 'animate-left-to-right'
                : ''}"
        >
            <h5 class="text-6xl font-bold mt-20 text-rose-700">Lab Module</h5>
            <h5 class="text-3xl font-bold text-rose-700">
                Insert Lab reports in patients records
            </h5>
            <p class="text-2xl text-rose-700">
                Systematically sorted patient list
                <br />
                Insert Lab report & fasten treatment
                <br />
                Lab Instrument information visualize
            </p>

            <a href="#/lablogin" class="w-2/3 btn btn-outline hover:bg-rose-600"
                >Get Started</a
            >
        </div>
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="card lg:card-side bg-base-100 flex"
        on:mouseenter={toggleHoverAdmin}
        on:mouseleave={toggleHoverAdmin}
    >
        <div
            class="card-body flex flex-col justify-center w-1/2 {isHoveredAdmin
                ? 'animate-left-to-right'
                : ''}"
        >
            <h5 class="text-6xl font-bold mt-20" style="color: #1FB401;">
                Admin Module
            </h5>
            <h5 class="text-3xl font-bold" style="color: #1FB401;">
                Central Control Point
            </h5>
            <p class="text-2xl" style="color: #1FB401;">
                Patient Database management
                <br />
                Doctor Registration & validation
                <br />
                Hospital data report management
                <br />
                Data analysis & action
            </p>
            <a
                href="#/adminlogin"
                class="w-2/3 btn btn-outline hover:bg-green-600">Get Started</a
            >
        </div>

        <figure
            class="w-1/2 relative"
            style="background: #B0FFB3; height: 500px;"
        >
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview.png"
                alt="User"
                class="absolute top-0 left-0 w-full h-full object-contain object-center {isHoveredAdmin
                    ? 'animate-right-to-left'
                    : ''}"
            />
        </figure>
    </div>

    <Footer />
</main>

<style>
    /* Add your global styles here */

    @keyframes fade-left {
        0% {
            opacity: 0;
            transform: translateX(-50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fade-right {
        0% {
            opacity: 0;
            transform: translateX(50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animate-left-to-right {
        animation: fade-left 1s ease forwards;
    }

    .animate-right-to-left {
        animation: fade-right 1s ease forwards;
    }

    .carousel-item {
        display: none;
    }

    .carousel-item.active {
        display: block;
    }
</style>
