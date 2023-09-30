<script>
    import { onMount } from "svelte";
    import { hospitalPatientList, hospitalInfo } from "./store";
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";
    import toast, { Toaster } from "svelte-french-toast";

    let hospital_patients = [];
    let showStatusForm = false; // eta hosse form er jonno
    let selectedStatus = "";
    let selectedDoctor = ""; // kun doctor
    let selectedLab = ""; // kun lab
    let roomNumber = ""; // Kun room
    let selectedPatientIndex = null;
    // const doctors = [
    //     "Dr. Rezaul Karim",
    //     "Dr. Shirin Akhter",
    //     "Dr. Faiza Roshni",
    // ]; // etare store theke ne somehow
    // const labs = ["Lab 12989", "Lab 2suegf", "Lab 3sdoubv"]; //etareo parle store theke ne

    async function saveStatus() {
        // if (selectedPatientIndex !== null) {
        //     let updatedPatient = { ...hospital_patients[selectedPatientIndex] };
        //     updatedPatient.Status = selectedStatus;
        //     if (selectedStatus === "Visiting Doctor") {
        //         updatedPatient.DoctorAssigned = selectedDoctor;
        //     }
        //     // ... additional logic for lab and room number

        //     hospital_patients[selectedPatientIndex] = updatedPatient;
        //     hospitalPatientList.set({ patientList: hospital_patients }); // Update the Svelte store
        // }
            
        sstatus = selectedStatus;
        if (selectedDoctor) sdoctorId = selectedDoctor;
        slabId = selectedLab;

        console.log(uid + "," + sstatus + "," + sdoctorId + "," + slabId);

        let payload = {
            id: uid,
            status: sstatus,
            doctorId: sdoctorId,
            labId: slabId,
        };
        await fetch(serverUrl + "h2p/update-patient", {
            method: "POST",
            body: JSON.stringify(payload),
        }).then((response) => {
            getPatientList();
        });

        selectedStatus = "";
        selectedDoctor = "";
        selectedLab = "";
        showStatusForm = false; // Close the status form
    }

    $: uid = 0;
    $: sstatus = "";
    $: sdoctorId = "";
    $: slabId = "";

    function openStatusForm(index, id) {
        uid = id;
        sstatus = patientList[index]["status"];
        sdoctorId = patientList[index]["doctorId"] || "";
        slabId = patientList[index]["slabId"] || "";
        console.log(uid + "," + sstatus + "," + sdoctorId + "," + slabId);
        selectedPatientIndex = index;
        showStatusForm = true;
    }

    function navigateBack() {
        window.location.hash = "#/hospitalhome";
    }
    function getStatusClass(status) {
        if (status === "Visiting Doctor") return "status-visiting";
        if (status === "Doing Diagnostics") return "status-diagnostics";
        if (status === "Admitted") return "status-admitted";
        if (status === "New") return "status-new";
        return "";
    }
    let showForm = false;
    let newPatient = {
        patientName: "",
        patientID: "",
        Status: "",
        DoctorAssigned: "",
        ContactNumber: "",
    };

    function savePatient() {
        hospital_patients = [...hospital_patients, newPatient];
        hospitalPatientList.set({ patientList: hospital_patients });

        newPatient = {
            patientName: "",
            patientID: "",
            Status: "",
            DoctorAssigned: "",
            ContactNumber: "",
        };
        showForm = false;
    }

    $: patientList = [];

    async function getPatientList() {
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        await fetch(serverUrl + "h2p/get-hospital-patient-list", {
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

    $: doctorList = [];

    async function getDoctorList() {
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        await fetch(serverUrl + "h2d/get-doctor-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                doctorList = [];
                for (let i = 0; i < Object.keys(data).length; i++) {
                    doctorList.push(JSON.parse(data[i]));
                }
                console.log(doctorList);
            });
    }

    $: labList = [];

    async function getLabList() {
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        console.log(payload);
        await fetch(serverUrl + "lab/get-lab-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                labList = data;
            });
    }

    onMount(() => {
        getPatientList();
        getDoctorList();
        getLabList();
        hospital_patients = get(hospitalPatientList).patientList;
    });
</script>

<Toaster />
<main class="min-h-screen p-8 bg-gradient-to-br from-blue-300 to-purple-300">
    <nav class="bg-white shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.png"
                alt={get(hospitalInfo).hospitalInfo["name"] + " Logo"}
                class="h-10 w-12 transition-transform transform hover:scale-125"
                on:click={navigateBack}
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{get(hospitalInfo).hospitalInfo["name"]}</span
            >
            <span>
                <a href="#/hospitalogin" class="btn btn-outline ml-auto mr-2"
                    >Logout</a
                >
            </span>
        </div>
    </nav>

    {#if showStatusForm}
        <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-black bg-opacity-50 absolute inset-0" />
            <form
                class="bg-white p-8 rounded-lg w-full max-w-md shadow-lg relative z-10"
            >
                <div class="mb-4">
                    <label
                        for="status"
                        class="block text-sm font-medium text-gray-600"
                        >Status</label
                    >
                    <select
                        id="status"
                        bind:value={selectedStatus}
                        class="mt-1 p-2 w-full border rounded-md"
                    >
                        <option value="">Select Status</option>
                        <option value="Visiting Doctor">Visiting Doctor</option>
                        <option value="Doing Diagnostics"
                            >Doing Diagnostics</option
                        >
                        <option value="Admitted">Admitted</option>
                        <option value="New">New</option>
                    </select>
                </div>

                {#if selectedStatus === "Visiting Doctor"}
                    <div class="mb-4">
                        <label
                            for="doctor"
                            class="block text-sm font-medium text-gray-600"
                            >Choose Doctor</label
                        >
                        <select
                            id="doctor"
                            bind:value={selectedDoctor}
                            class="mt-1 p-2 w-full border rounded-md"
                        >
                            {#each doctorList as doctor}
                                <option value={doctor["doctorId"]}
                                    >{doctor["name"]}</option
                                >
                            {/each}
                        </select>
                    </div>
                {:else if selectedStatus === "Doing Diagnostics"}
                    <div class="mb-4">
                        <label
                            for="lab"
                            class="block text-sm font-medium text-gray-600"
                            >Choose Lab</label
                        >
                        <select
                            id="lab"
                            bind:value={selectedLab}
                            class="mt-1 p-2 w-full border rounded-md"
                        >
                            {#each labList as lab}
                                <option value={lab["id"]}>{lab["name"]}</option>
                            {/each}
                        </select>
                    </div>
                {:else if selectedStatus === "Admitted"}
                    <!-- <div class="mb-4">
                        <label
                            for="roomNumber"
                            class="block text-sm font-medium text-gray-600"
                            >Room Number</label
                        >
                        <input
                            type="text"
                            id="roomNumber"
                            bind:value={roomNumber}
                            class="mt-1 p-2 w-full border rounded-md"
                        />
                    </div> -->
                {:else if selectedStatus === "New"}{/if}

                <div class="flex justify-end">
                    <button
                        type="button"
                        class="btn btn-primary"
                        on:click={saveStatus}>Submit</button
                    >
                </div>
            </form>
        </div>
    {/if}

    <div class="patient-list">
        {#each patientList as patient, index}
            <div class="patient-item">
                <div class="details">
                    <div class="detail-item">
                        Name: <span>{patient["patientName"]}</span>
                    </div>
                    <div class="detail-item">
                        ID: <span>{patient["id"]}</span>
                    </div>
                    <div class="detail-item">
                        Contact: <span>{patient["patientPhone"]}</span>
                    </div>
                </div>
                <div class="status {getStatusClass(patient['status'])}">
                    Status: {patient["status"]}
                </div>
                {#if patient["doctorName"]}
                    <div class="doctor">
                        Doctor Assigned: {patient["doctorName"]}
                    </div>
                {:else}
                    <div class="doctor">Doctor Assigned: Not Assigned</div>
                {/if}
                <button
                    class="btn btn-outline mt-4"
                    on:click={() => openStatusForm(index, patient["id"])}
                    >Change Status</button
                >
            </div>
        {/each}
    </div>
</main>

<style>
    .patient-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 40px 15%;
    }

    .patient-item {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .status-visiting {
        color: #3498db; /* Blue for Visiting Doctor */
        background-color: #eaf4fb;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .status-diagnostics {
        color: #f39c12; /* Orange for Doing Diagnostics */
        background-color: #fef5e5;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .status-admitted {
        color: #2ecc71; /* Green for Admitted */
        background-color: #e6f9e9;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .status-new {
        color: #ff0000; /* Green for Admitted */
        background-color: #ffe3e3;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .details {
        display: flex;
        gap: 20px;
        margin-bottom: 10px;
    }

    .detail-item {
        flex: 1;
        color: #7f8c8d;
    }

    .doctor {
        color: #2980b9; /* Assigns a blue hue to the doctor's name */
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10; /* ensure it appears above other elements */
    }

    .form-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        width: 80%;
        max-width: 600px;
    }

    .field {
        margin-bottom: 20px;
    }

    .field label {
        display: block;
        margin-bottom: 5px;
    }

    .field input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    /*
    ei 2 ta style ekkhon add korlam
    */
    /* ... existing CSS */

    .status-form-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 11; /* ensure it appears above other elements */
    }

    .status-form {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        width: 80%;
        max-width: 400px;
    }
</style>
