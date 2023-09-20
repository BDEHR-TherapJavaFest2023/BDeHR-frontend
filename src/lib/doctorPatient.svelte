<script>
    console.log("Started doctorPatient.svelte");
    import { getContext } from "svelte";
    export let params = {};

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
    $: patients = (patientsData[hospitalName] || []).sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
</script>

<main class="bg-gray-100 min-h-screen p-6">
    <h1 class="text-2xl font-semibold mb-6">Patients in {hospitalName}</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each patients as patient (patient.id)}
            <div
                class="patient-card flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                on:click={() => navigateToSpecificPatient(patient.id)}
            >
                <div class="mb-4 text-center">
                    <span class="font-medium text-xl">{patient.name}</span>
                    <span class="block text-gray-500 mt-2"
                        >ID: {patient.id}</span
                    >
                    <span class="block text-sm text-gray-400 mt-1"
                        >{new Date(patient.dateTime).toLocaleString()}</span
                    >
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
</style>
