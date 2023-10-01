<script>
    console.log("Started doctorPatient.svelte");
    import { getContext, onMount } from "svelte";
    export let params = {};
    import { doctorInfo, doctorHospital } from "./store";
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";

    // let paramsContext = getContext("@@svelte-spa-router");
    // let params = paramsContext ? paramsContext.params : {};

    console.log("Router Context:", params);

    let hospitalName;
    let patients = []; // You'd fetch this list based on the hospitalName, typically from an API or store
    // Dummy data for patients
    let patientsData = {
        "Dhaka Medical College": [
            {
                name: "Nazmus Sakib",
                id: "123",
                dateTime: "2023-09-20T15:00:00",
            },
            {
                name: "Saad Md Rafid Pial",
                id: "124",
                dateTime: "2023-09-19T12:30:00",
            },
            {
                name: "Salman Sayeed",
                id: "223",
                dateTime: "2023-09-20T14:00:00",
            },
            {
                name: "Abir Muhtasim",
                id: "323",
                dateTime: "2023-09-20T18:00:00",
            },
        ],
        "Popular Hospital Limited": [
            {
                name: "Mahir Labib Dihan",
                id: "129",
                dateTime: "2023-09-20T15:00:00",
            },
            {
                name: "Souvik Ghosh",
                id: "124",
                dateTime: "2023-09-19T12:30:00",
            },
        ],
        "Holy Care Hospital & Clinic": [
            {
                name: "Mahir Labib Dihan",
                id: "129",
                dateTime: "2023-09-20T15:00:00",
            },
            {
                name: "Souvik Ghosh",
                id: "124",
                dateTime: "2023-09-19T12:30:00",
            },
        ],
        "FMCR Diagonostic Center": [
            {
                name: "Mahir Labib Dihan",
                id: "129",
                dateTime: "2023-09-20T15:00:00",
            },
            {
                name: "Souvik Ghosh",
                id: "124",
                dateTime: "2023-09-19T12:30:00",
            },
        ],
    };

    function navigateToSpecificPatient(patientId) {
        // Set the hospital name in a global store or send as a parameter
        // For simplicity, sending as a parameter
        console.log("Navigating to patients for hospital:", hospitalName);
        window.location.hash = `#/doctorhome/doctorPatient/${hospitalName}/${patientId}`;
    }

    $: hospitalName = params.hospitalName;
    $: patientList = [];

    async function getPatientList() {
        let payload = {
            doctorId: get(doctorInfo).doctorId,
            hospitalId: get(doctorHospital).hospitalId,
        };
        await fetch(serverUrl + "h2p/get-doctor-patient-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                patientList = [];
                for (let i = 0; i < Object.keys(data).length; i++) {
                    patientList.push(JSON.parse(data[i]));
                }
                console.log(patientList);
            });
    }

    function navigateBack() {
        window.location.hash = `#/doctorhome/hospitals`;
    }

    onMount(() => {
        getPatientList();
    });
</script>

<main class="bg-gray-100 min-h-screen p-6">
    <header
        class="bg-blue-400 rounded-lg p-4 flex justify-between items-center"
    >
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.svg"
            class="h-10 w-12 transition-transform transform hover:scale-125"
            on:click={navigateBack}
        />
        <div class="text-white">
            <h1 class="text-4xl font-semibold mb-4">
                Patients in {hospitalName}
            </h1>
        </div>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each patientList as patient (patient.id)}
            <div
                class="patient-card flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                on:click={() => navigateToSpecificPatient(patient["id"])}
            >
                <div class="mb-4 text-center">
                    <span class="font-medium text-xl"
                        >{patient["patientName"]}</span
                    >
                    <span class="block text-gray-500 mt-2"
                        >ID: {patient["id"]}</span
                    >
                    <span class="block text-sm text-gray-400 mt-1"
                        >{patient["admitDate"]}</span
                    >
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
</style>
