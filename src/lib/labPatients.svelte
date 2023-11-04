<script>
    import { onMount } from "svelte";
    import { supabase } from "./supabaseClient";
    import { serverUrl } from "./constants";
    import { hospitalInfo, labInfo } from "./store";
    import { get } from "svelte/store";
    import toast, { Toaster } from "svelte-french-toast";
    let patients = [
        {
            ID: "1234",
            Contact_Number: "+8801792756172",
            Investigation: "X-RAY Test",
            Date: "2023-09-20",
            Time: "17:35",
        },
        {
            ID: "3592",
            Contact_Number: "+8801792756172",
            Investigation: "MRI Test",
            Date: "2023-09-20",
            Time: "15:30",
        },
        {
            ID: "3599",
            Contact_Number: "+8801798756172",
            Investigation: "ECG Test",
            Date: "2023-09-20",
            Time: "14:33",
        },
        {
            ID: "3899",
            Contact_Number: "+8801793756172",
            Investigation: "Ultrasonography Test",
            Date: "2023-09-20",
            Time: "17:37",
        },
    ];

    let uploadingFlags = {};

    async function fileUpload(file) {
        const currentTime = new Date().toISOString();
        let { data: res1 } = await supabase.storage
            .from("reports")
            .upload(`report_${currentTime}.pdf`, file);
        let { data: res2 } = supabase.storage
            .from("reports")
            .getPublicUrl(`report_${currentTime}.pdf`);
        return res2;
    }

    async function dbRow(patient, id, patientId, response) {
        let payload = {
            labId: get(labInfo).labInfo["id"],
            hospitalId: get(labInfo).labInfo["hospitalId"],
            patientId: patientId,
            hospitalName: get(hospitalInfo).hospitalInfo["name"],
            url: response["publicUrl"],
        };

        console.log(payload);

        await fetch(serverUrl + "report/add-report", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        let payload2 = {
            id: patient["id"],
            status: "Diagnosis Done",
            doctorId: patient["doctorId"],
            labId: "",
        };
        console.log(payload2);
        await fetch(serverUrl + "h2p/update-patient", {
            method: "POST",
            body: JSON.stringify(payload2),
        }).then((response) => {
            getPatientList();
        });
    }
    $: showModal = false;
    function modalCng() {
        showModal = true;
    }

    async function syncPatientList(patient, id, patientId, response) {
        await dbRow(patient, id, patientId, response).then((response) => {
            getPatientList();
            toast.success("Report Added");
            tempOk = false;
        });
    }

    async function UploadAndStuff(patient, id, patientId, file) {
        await fileUpload(file).then((response) => {
            syncPatientList(patient, id, patientId, response);
        });
    }

    async function handleFileUpload(patient, id, patientID) {
        const fileInput = document.getElementById(`file-${patientID}`);
        const file = fileInput?.files[0];
        console.log(file);
        if (file) {
            // Indicate that the file is uploading for this patient
            uploadingFlags = { ...uploadingFlags, [patientID]: true };
            tempOk = true;

            await UploadAndStuff(patient, id, patientID, file);

            try {
                // On successful upload, hide the patient's row with an effect
                // const row = document.getElementById(`row-${patientID}`);
                // row.classList.add(
                //     "opacity-0",
                //     "transform",
                //     "scale-0.95",
                //     "duration-300"
                // );
                // setTimeout(() => {
                //     row.style.display = "none";
                // }, 300);
            } catch (error) {
                console.error("Failed to upload:", error);
            } finally {
                // Whether the upload succeeded or failed, stop indicating uploading status
                uploadingFlags[patientID] = false;
            }
        }
    }
    function navigateBack() {
        window.location.hash = "#/labhome";
    }
    let tempOk = false;
    $: patientList = [];
    async function getPatientList() {
        let payload = { labId: get(labInfo).labInfo["id"] };
        await fetch(serverUrl + "h2p/get-lab-patient-list", {
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

    onMount(() => {
        getPatientList();
    });
</script>

<Toaster />
<!-- Navbar -->
<nav class="bg-blue-500 p-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.png"
            alt="Company Logo"
            class="h-10 w-auto mr-4 transition-transform transform hover:scale-125"
            on:click={navigateBack}
        />
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
            alt="Company Logo"
            class="h-12 w-auto mr-4 transition-transform transform hover:scale-125"
        />

        <a href="#/lablogin" class="btn btn-error hover:bg-red-600">Logout</a>
    </div>
</nav>

<!-- Main Content -->
<main class="bg-gray-100 py-8">
    <div class="container mx-auto p-4">
        <h2 class="text-2xl font-bold mb-6 text-center">Patients</h2>

        <!-- Patients List -->
        <div class="bg-white rounded shadow overflow-hidden">
            {#each patientList as patient}
                <div
                    class="flex items-center justify-between p-4 border-b"
                    id={`row-${patient["patientId"]}`}
                >
                    <div>
                        <div><strong>ID:</strong> {patient["id"]}</div>
                        <div>
                            <strong>Contact:</strong>
                            {patient["patientPhone"]}
                        </div>
                        <div>
                            <strong>Investigation:</strong>
                            {patient["status"]}
                        </div>
                        <div><strong>Date:</strong> {patient["admitDate"]}</div>
                    </div>
                    <div>
                        <input
                            type="file"
                            id={`file-${patient["patientId"]}`}
                            class="hidden"
                            on:change={() => modalCng()}
                        />
                        <button
                            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            on:click={() =>
                                document
                                    .getElementById(
                                        `file-${patient["patientId"]}`
                                    )
                                    .click()}>Add File</button
                        >
                    </div>
                </div>

                {#if showModal}
                    <div
                        class="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div class="bg-white p-4 rounded-lg shadow-lg w-1/3">
                            <h2 class="text-lg font-semibold mb-2">
                                Confirmation
                            </h2>
                            <p>Are you sure you want to upload this file?</p>
                            <div class="flex justify-end mt-4">
                                <button
                                    class="btn btn-error"
                                    on:click={() => (showModal = false)}
                                    >Cancel</button
                                >
                                <button
                                    class="btn btn-success ml-2"
                                    on:click={() => {
                                        handleFileUpload(
                                            patient,
                                            patient["id"],
                                            patient["patientId"]
                                        );

                                        showModal = false;
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
            {#if tempOk}
                <div
                    class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-0"
                >
                    <span class="loading loading-spinner loading-lg" />
                    <h1>Test Report is Uploading...</h1>
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
</style>
