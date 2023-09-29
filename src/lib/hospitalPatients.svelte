<script>
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";
    import { hospitalPatientList, hospitalInfo } from "./store";
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";

    let hospital_patients = [];

    function navigateBack() {
        window.location.hash = "#/hospitalhome";
    }
    function getStatusClass(status) {
        if (status === "Visiting Doctor") return "status-visiting";
        if (status === "Doing Diagnostics") return "status-diagnostics";
        if (status === "Admitted") return "status-admitted";
        return "";
    }
    let showForm = false;
    let newPatient = {
        patientName: "",
        patientID: "",
        Status: "",
        DoctorAssigned: "",
        ContactNumber: "",
        labId:""
    };

    async function savePatient(event) {
        const form = event.target;
        const formData = new FormData(form);

        console.log(formData.get("patientId"))

        await fetch(serverUrl + "h2p/add-patient", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                if (data === "0") {
                    toast.error("Please recheck patient id");
                } else {
                    getPatientList();
                }
            });
        
        // getDoctorList();

        form.reset()
        showForm = false;
    }

    $: patientList = []

    async function getPatientList(){
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        await fetch(serverUrl + "h2p/get-hospital-patient-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                patientList = []
                for(let i=0;i<Object.keys(data).length;i++){
                    patientList.push(JSON.parse(data[i]))
                }
                console.log(patientList)
            });
    }

    onMount(() => {
        getPatientList();
    hospital_patients = get(hospitalPatientList).patientList;
    });
</script>

<Toaster/>
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

    <button
        class="bg-purple-600 text-white px-4 py-2 rounded-lg mb-5"
        on:click={() => (showForm = !showForm)}
    >
        Add Patient
    </button>

    {#if showForm}
        <div class="overlay">
            <form on:submit|preventDefault={savePatient} class="form-content">
                <div class="ml-40">
                    <h1>{get(hospitalInfo).hospitalInfo["name"]}</h1>
                </div>
                <div class="field">
                    <label for="patientName">Name:</label>
                    <input
                        bind:value={newPatient.patientName}
                        name="patientName"
                    />
                </div>
                <div class="field">
                    <label for="patientID">ID:</label>
                    <input bind:value={newPatient.patientID} name="patientId" />
                </div>

                <div class="field">
                    <label for="Status">Status:</label>
                    <input bind:value={newPatient.Status} name="status" />
                </div>
                <div class="field">
                    <label for="DoctorAssigned">Doctor to Visit:</label>
                    <input
                        bind:value={newPatient.DoctorAssigned}
                        name="doctorId"
                    />
                </div>
                <div class="field">
                    <label for="labID">Lab to Visit:</label>
                    <input bind:value={newPatient.labID} name="labId" />
                </div>
                <div class="field">
                    <label for="ContactNumber">Contact Number:</label>
                    <input
                        bind:value={newPatient.ContactNumber}
                        name="patientPhone"
                    />
                </div>
                <input type="hidden" name="hospitalId" value={get(hospitalInfo).hospitalInfo["id"]}>
                <!-- Similar structure for other fields -->
                <!-- ... -->
                <button
                    class="btn border-black text-white bg-green-400 hover:bg-green-700 mr-2"
                   type="submit"
                >
                    Save
                </button>
                <button
                    class="btn border-black text-white bg-red-400 hover:bg-red-700 mr-2"
                    on:click={() => (showForm = false)}
                >
                    Cancel
                </button>
            </form>
        </div>
    {/if}

    <div class="patient-list">
        {#each patientList as patient}
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
                <div class="status {getStatusClass(patient.Status)}">
                    Status: {patient["status"]}
                </div>
                {#if patient["doctorId"]}
                    <div class="doctor">
                        Doctor Assigned: {patient["doctorId"]}
                    </div>
                {:else}
                    <div class="doctor">Doctor Assigned: Not Assigned</div>
                {/if}
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
</style>
