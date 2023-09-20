<script>
    import { supabase } from "./supabaseClient";

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

    async function handleFileUpload(patientID) {
        const fileInput = document.getElementById(`file-${patientID}`);
        const file = fileInput?.files[0];

        if (file) {
            // Indicate that the file is uploading for this patient
            uploadingFlags = { ...uploadingFlags, [patientID]: true };

            try {
                const path = `patients/${patientID}/${file.name}`;
                const { error } = await supabase.storage
                    .from("BDeHR")
                    .upload(path, file);

                if (error) throw error;

                // On successful upload, hide the patient's row with an effect
                const row = document.getElementById(`row-${patientID}`);
                row.classList.add(
                    "opacity-0",
                    "transform",
                    "scale-0.95",
                    "duration-300"
                );
                setTimeout(() => {
                    row.style.display = "none";
                }, 300);
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
</script>

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
            {#each patients as patient (patient.ID)}
                <div
                    class="flex items-center justify-between p-4 border-b"
                    id={`row-${patient.ID}`}
                >
                    <div>
                        <div><strong>ID:</strong> {patient.ID}</div>
                        <div>
                            <strong>Contact:</strong>
                            {patient.Contact_Number}
                        </div>
                        <div>
                            <strong>Investigation:</strong>
                            {patient.Investigation}
                        </div>
                        <div><strong>Date:</strong> {patient.Date}</div>
                        <div><strong>Time:</strong> {patient.Time}</div>
                    </div>
                    <div>
                        <input
                            type="file"
                            id={`file-${patient.ID}`}
                            class="hidden"
                            on:change={() => handleFileUpload(patient.ID)}
                        />
                        <button
                            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            on:click={() =>
                                document
                                    .getElementById(`file-${patient.ID}`)
                                    .click()}>Add File</button
                        >
                        {#if uploadingFlags[patient.ID]}
                            <!-- Spinner for upload indication -->
                            <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 inline-block"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    /* Add any additional styles here */
</style>
