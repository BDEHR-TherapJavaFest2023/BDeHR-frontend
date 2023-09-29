<script>
    import { onMount } from "svelte";
    import { serverUrl } from "./constants";
    import { userInfo } from "./store";
    import { get } from "svelte/store";
    import toast, { Toaster } from "svelte-french-toast";
    let currenthospitals = [
        {
            name: "United Hospitals Dhaka",
            date: "2023-09-20",
            PatientID: 234,
        },
        {
            name: "Popular Hospitals Dhaka",
            date: "2023-09-17",
            PatientID: 204,
        },
    ];
    let hospitalCode = "";

    async function handleHospitalCodeSubmit(event) {
        let id = decrypt(hospitalCode);
        console.log(id);

        let payload = { patientId: get(userInfo).userId,hospitalId: id,patientName: get(userInfo).userName,patientPhone:get(userInfo).userPhone,status:"New" };
        
        await fetch(serverUrl + "h2p/add-patient", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
                if (data == "0") {
                    toast.error("Wrong Id");
                } else {
                    toast.success("Success");
                    getEntryList();
                }
            });

        hospitalCode = "";
    }

    function navigateToLogin() {
        window.location.hash = `#/userlogin`;
    }
    function navigateToProfile() {
        window.location.hash = `#/appuser/home`;
    }
    function navigateToMedications() {
        window.location.hash = `#/appuser/medications`;
    }
    function navigateToReports() {
        window.location.hash = `#/appuser/reports`;
    }
    function navigateToFind() {
        window.location.hash = `#/appuser/find`;
    }
    function navigateToEntry() {
        window.location.hash = `#/appuser/entry`;
    }

    $: entryList = [];

    async function getEntryList() {
        let payload = { patientId: get(userInfo).userId };
        await fetch(serverUrl + "h2p/get-user-patient-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                entryList = [];
                for (let i = 0; i < Object.keys(data).length; i++) {
                    entryList.push(JSON.parse(data[i]));
                }
                console.log(entryList);
            });
    }
    //0d069a9f, 1q152n2s
    function decrypt(str) {
        let output =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let input =
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0987654321";
        let index = (x) => input.indexOf(x);
        let translate = (x) => (index(x) > -1 ? output[index(x)] : x);
        return str.split("").map(translate).join("");
    }

    onMount(() => {
        getEntryList();
    });
</script>

<Toaster/>
<nav class="bg-white shadow-lg z-10 mb-4">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
            <!-- Logo Section -->
            <div class="flex items-center">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoshrt.png"
                    alt="Company Logo"
                    width={125}
                    height={30}
                    class="mx-2 my-0"
                />
            </div>

            <!-- Notification and Logout Section -->
            <div class="flex items-center space-x-4">
                <!-- Message Notification -->

                <!-- Logout Button -->
                <button
                    class="btn btn-outline btn-error"
                    on:click={navigateToLogin}>Logout</button
                >
            </div>
        </div>
    </div>
</nav>

<main class="bg-white min-h-screen flex overflow-auto">
    <!-- Navbar -->

    <!-- Sidebar -->
    <div class="w-64 bg-white relative shadow-lg py-4">
        <!-- Menu Items -->
        <ul class="text-base font-semibold mt-1 ml-1">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToProfile}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userLogo.svg"
                    alt="Dashboard Icon"
                    class="w-6 h-6 mr-2"
                />
                Profile
            </li>
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToMedications}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pharmacy-prescription-icon.svg"
                    alt="Query Icon"
                    class="w-6 h-6 mr-2"
                />
                Medications
            </li>
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToReports}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/medical-report-icon.svg"
                    alt="Add New Hospital Icon"
                    class="w-6 h-6 mr-2"
                />
                Test Reports
            </li>
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToFind}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/location-sign.svg"
                    alt="Find a Hospital"
                    class="w-6 h-6 mr-2"
                />
                Find Hospital
            </li>
            <li
                class="flex items-center p-4 bg-green-400 cursor-default rounded-3xl"
                on:click={navigateToEntry}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospital.svg"
                    alt="Find a Hospital"
                    class="w-6 h-6 mr-2"
                />
                Hospital Entry
            </li>
        </ul>
    </div>

    <!-- Main Dashboard Content -->
    <div class="flex-1 bg-white p-2 h-full flex-grow">
        <div class="p-4 mt-10 ml-10">
            <form on:submit|preventDefault={handleHospitalCodeSubmit}>
                <label
                    for="hospitalCode"
                    class="text-2xl text-rose-700 font-bold mb-2"
                    >Enter 8-digit Hospital Code:</label
                >
                <input
                    type="text"
                    id="hospitalCode"
                    placeholder="Enter code"
                    bind:value={hospitalCode}
                    class="border rounded p-2 w-1/2"
                    maxlength="8"
                />
                <button
                    type="submit"
                    class="ml-4 bg-rose-500 text-white p-2 rounded hover:bg-rose-700"
                >
                    Submit
                </button>
            </form>
        </div>
        <div class="mb-4 p-4 mt-5 ml-10">
            <h2 class="text-4xl text-rose-700 font-bold mb-4">
                Current Hospitals
            </h2>
            <ul class="list-decimal list-inside bg-white rounded">
                {#each entryList as entry}
                    <li class="border rounded-lg my-2 hover:shadow-lg p-4">
                        <span class="text-md font-medium"
                            >{entry["hospitalName"]}</span
                        ><br />
                        <span>Date: {entry["admitDate"]}</span><br />
                        <span>Patient ID: {entry["id"]}</span>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
</style>
