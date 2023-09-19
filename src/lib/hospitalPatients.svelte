<script>
    // @ts-nocheck

    import { patients } from "./hospitalstore";
    import { hospitalName } from "./hospitalstore";
    let hospital_patients = [];
    let nameHospital;
    patients.subscribe((value) => {
        hospital_patients = value;
    });
    hospitalName.subscribe((value) => {
        nameHospital = value;
    });
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
    };

    function savePatient() {
        hospital_patients = [...hospital_patients, newPatient];
        newPatient = {
            patientName: "",
            patientID: "",
            Status: "",
            DoctorAssigned: "",
            ContactNumber: "",
        };
        showForm = false;
    }
</script>

<main class="min-h-screen p-8 bg-gradient-to-br from-blue-300 to-purple-300">
    <nav class="bg-white shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.png"
                alt={nameHospital + " Logo"}
                class="h-10 w-12 transition-transform transform hover:scale-125"
                on:click={navigateBack}
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{nameHospital}</span
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
            <form class="form-content">
                <div class="ml-40">
                    <h1>{nameHospital}</h1>
                </div>
                <div class="field">
                    <label for="patientName">Name:</label>
                    <input
                        bind:value={newPatient.patientName}
                        id="patientName"
                    />
                </div>
                <div class="field">
                    <label for="patientID">ID:</label>
                    <input bind:value={newPatient.patientID} id="patientID" />
                </div>
                <div class="field">
                    <label for="Status">Status:</label>
                    <input bind:value={newPatient.Status} id="Status" />
                </div>
                <div class="field">
                    <label for="DoctorAssigned">Doctor to Visit:</label>
                    <input
                        bind:value={newPatient.DoctorAssigned}
                        id="DoctorAssigned"
                    />
                </div>
                <div class="field">
                    <label for="ContactNumber">Contact Number:</label>
                    <input
                        bind:value={newPatient.ContactNumber}
                        id="ContactNumber"
                    />
                </div>
                <!-- Similar structure for other fields -->
                <!-- ... -->
                <button
                    class="btn border-black text-white bg-green-400 hover:bg-green-700 mr-2"
                    on:click={savePatient}
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
        {#each hospital_patients as patient}
            <div class="patient-item">
                <div class="details">
                    <div class="detail-item">
                        Name: <span>{patient.patientName}</span>
                    </div>
                    <div class="detail-item">
                        ID: <span>{patient.patientID}</span>
                    </div>
                    <div class="detail-item">
                        Contact: <span>{patient.ContactNumber}</span>
                    </div>
                </div>
                <div class="status {getStatusClass(patient.Status)}">
                    Status: {patient.Status}
                </div>
                {#if patient.DoctorAssigned}
                    <div class="doctor">
                        Doctor Assigned: {patient.DoctorAssigned}
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
