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
    // let searchTerm = "";
    // $: filteredPatients = searchTerm
    //     ? patientList.filter((patient) =>
    //           patient.patientName
    //               .toLowerCase()
    //               .includes(searchTerm.toLowerCase())
    //       )
    //     : patientList;

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
        class="rounded-lg p-4 flex justify-between items-center bg-gradient-to-r from-cyan-500 to-blue-500"
    >
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/back-button-new.svg"
            class="h-10 w-12 transition-transform transform hover:scale-125"
            on:click={navigateBack}
        />

        <div class="flex items-center text-white">
            <h1 class="text-4xl font-bold mb-4">
                Patients in {hospitalName}
            </h1>
        </div>
    </header>
    <div class="w-full flex flex-row">
        <div class="w-5/6">
            <input
                type="text"
                placeholder="Type Patient Name Here"
                class="mt-3 mb-5 input input-bordered input-accent w-full"
            />
        </div>
        <div class="w-1/6 ml-2 mt-3">
            <button class="btn bg-emerald-500 hover:bg-emerald-600">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/search-new.svg"
                    class="transform transition duration-300 hover:rotate-12 hover:scale-110 mr-2"
                    alt="Search Icon"
                    width="20"
                    height="20"
                    style="vertical-align: middle;"
                />
                search
            </button>
        </div>
    </div>
    <h1 class="mb-4 mt-4 text-3xl font-bold">Patient List:</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
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
