<script>
    import { onMount } from "svelte";
    import { serverUrl } from "./constants";
    import { supabase } from "./supabaseClient";

    // let hospitals = [
    //     {
    //         name: "United Hospitals Dhaka",
    //         date: "2023-09-20",
    //         Address: "Gulshan-2, Dhaka",
    //     },
    //     {
    //         name: "Popular Hospitals Dhaka",
    //         date: "2023-09-17",
    //         Address: "Dhanmondi, Dhaka",
    //     },
    //     {
    //         name: "Cumilla Tower Hospital",
    //         date: "2023-09-19",
    //         Address: "Ramghat, Cumilla",
    //     },
    //     {
    //         name: "Al Haramain Hospital Private Limited",
    //         date: "2023-09-15",
    //         Address: "Sylhet",
    //     },
    // ];

    function navigateToDashboard() {
        window.location.hash = `#/adminhome`;
    }
    function navigateToQuery() {
        window.location.hash = `#/adminhome/query`;
    }
    function navigateToAddHospital() {
        window.location.hash = `#/adminhome/addhospital`;
    }
    function navigateToMessages() {
        window.location.hash = `#/adminhome/messages`;
    }
    function navigateToLogin() {
        window.location.hash = `#/adminlogin`;
    }
    function navigateToResearch() {
        window.location.hash = `#/adminhome/research`;
    }

    async function removePhoto(id) {
        let { data: res } = await supabase.storage
            .from("hospitalPhoto")
            .remove([id]);
    }

    async function removeLogo(id) {
        let { data: res } = await supabase.storage
            .from("hospitalLogo")
            .remove([id]);
    }

    async function acceptRequest(id) {
        let payload = { id: id };
        await fetch(serverUrl + "hospital-request/accept", {
            method: "POST",
            body: JSON.stringify(payload),
        }).then((response) => {
            getRequestList();
        });
    }

    async function declineRequest(id) {
        console.log(id);
        let payload = { id: id };
        await fetch(serverUrl + "hospital-request/decline", {
            method: "POST",
            body: JSON.stringify(payload),
        }).then((response) => {
            getRequestList();
        });
        removePhoto(id);
        removeLogo(id);
    }

    $: requestList = [];

    async function getRequestList() {
        await fetch(serverUrl + "hospital-request/get-request-list")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                requestList = data;
            });
    }

    onMount(() => {
        getRequestList();
    });
</script>

<main class="bg-gray-100 min-h-screen">
    <!-- Navbar -->

    <div class="flex">
        <!-- Sidebar -->
        <div class="w-64 h-screen bg-white shadow-md fixed z-0 py-4">
            <!-- Company Logo -->
            <div class="text-center mb-10 mt-4">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                    alt="Company Logo"
                    class="w-32 mx-auto"
                />
            </div>

            <!-- Menu Items -->
            <ul class="text-base font-semibold">
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToDashboard}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dashboard.svg"
                        alt="Dashboard Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Dashboard
                </li>

                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToQuery}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/analytic.svg"
                        alt="Query Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Query
                </li>
                <li
                    class="flex items-center p-4 bg-red-400 cursor-default"
                    on:click={navigateToAddHospital}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospital.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Add New Hospital
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToResearch}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/research.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Research Organizations
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToMessages}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/message.svg"
                        alt="Messages Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Messages
                </li>
            </ul>
        </div>

        <!-- Main Dashboard Content -->
        <div class="ml-64 w-full">
            <nav class="bg-white shadow-md mb-8 z-10">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center py-4">
                        <!-- Logo Section -->
                        <div class="flex items-center">
                            <img
                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogo.png"
                                alt="Company Logo"
                                width={125}
                                height={25}
                                class="mx-0 my-0"
                            />
                        </div>

                        <!-- Notification and Logout Section -->
                        <div class="flex items-center space-x-4">
                            <!-- Message Notification -->
                            <div class="relative">
                                <img
                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
                                    alt="Message Icon"
                                    class="h-6 w-6 transition-transform transform hover:scale-150"
                                    on:click={navigateToMessages}
                                />
                                <span
                                    class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >4</span
                                >
                                <!-- Number of unread messages -->
                            </div>

                            <!-- General Notification -->
                            <div class="relative">
                                <img
                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Notification.svg"
                                    alt="Notification Icon"
                                    class="h-6 w-6 transition-transform transform hover:scale-150"
                                    on:click={navigateToAddHospital}
                                />
                                <span
                                    class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >4</span
                                >
                                <!-- Number of unread notifications -->
                            </div>

                            <!-- Logout Button -->
                            <button
                                class="btn btn-outline btn-error"
                                on:click={navigateToLogin}>Logout</button
                            >
                        </div>
                    </div>
                </div>
            </nav>
            <h1 class="container mx-8 text-3xl font-extrabold text-blue-600">
                Hospital Approval Requests
            </h1>
            <div class="container mx-auto px-4 mt-8">
                <ul>
                    {#each requestList as request}
                        <li
                            class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg mb-4"
                        >
                            <div class="flex justify-between items-center">
                                <!-- Hospital Information -->
                                <div>
                                    <h2 class="text-xl font-semibold">
                                        {request.name}
                                    </h2>
                                    <p class="text-gray-600 text-sm">
                                        {request.phone}
                                    </p>
                                    <p class="text-gray-500 text-sm">
                                        {request.address}
                                    </p>
                                </div>
                                <!-- Action Buttons -->
                                <div class="flex space-x-2">
                                    <button
                                        on:click={acceptRequest(request.id)}
                                        class="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        on:click={declineRequest(request.id)}
                                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
</style>
