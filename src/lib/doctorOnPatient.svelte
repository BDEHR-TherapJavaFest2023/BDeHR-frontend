<script>
    import { getContext } from "svelte";
    export let params = {};

    let tabs = ["Past Medications", "Test Reports"];
    let selectedTab = tabs[0];

    let patientData = {
        name: "Abir Muhtasim",
        age: 28,
        gender: "Male",
    };

    let pastMedications = [
        {
            hospitalName: "Dhaka Medical College",
            doctorName: "Dr. M. Rezaul Karim",
            date: "2023-09-20",
            fileLink:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/BDeHR.pdf",
        },
        {
            hospitalName: "Popular Hospital Limited",
            doctorName: "Dr. Shirin Akhter",
            date: "2023-08-19",
            fileLink:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/BDeHR.pdf",
        },
    ];

    let testReports = [
        {
            hospitalName: "Dhaka Medical College",
            date: "2023-09-15",
            fileLink:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/1905061_report.pdf",
        },
        {
            hospitalName: "Popular Hospital Limited",
            date: "2023-08-14",
            fileLink:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/1905061_report.pdf",
        },
    ];
    let showModal = false;

    let newMedication = {
        Address: "",
        Contact: "",
        Occupation: "",
        ChiefComplaints: [],
        PastHistory: "",
        TreatmentHistory: "",
        OccupationalHistory: "",
        SocioEconomicCondition: "",
        Vaccinationhistory: "",
        MenstrualHistory: "",
        GeneralExamination: "",
        CardioVascularSystem: "",
        RespiratorySystemm: "",
        GastroIntestinalSystem: "",
        MusculoSkeletalSystem: "",
        NervousSystem: "",
        ProvisionalDiagnosis: "",
        RelativeInvestigationFindings: "",
        DeterministicDiagnosis: "",
        Treatment: "",
        FollowUpAdvice: "",
        DischargePrescription: "",
    };

    function addMedication() {
        pastMedications = [...pastMedications, newMedication];
        newMedication = {
            Address: "",
            Contact: "",
            Occupation: "",
            ChiefComplaints: [],
            PastHistory: "",
            TreatmentHistory: "",
            OccupationalHistory: "",
            SocioEconomicCondition: "",
            Vaccinationhistory: "",
            MenstrualHistory: "",
            GeneralExamination: "",
            CardioVascularSystem: "",
            RespiratorySystemm: "",
            GastroIntestinalSystem: "",
            MusculoSkeletalSystem: "",
            NervousSystem: "",
            ProvisionalDiagnosis: "",
            RelativeInvestigationFindings: "",
            DeterministicDiagnosis: "",
            Treatment: "",
            FollowUpAdvice: "",
            DischargePrescription: "",
        };
        showModal = false;
    }
</script>

<div class="p-6 bg-gray-100 min-h-screen">
    <div class="bg-white p-6 rounded-md shadow-xl">
        <h2 class="text-2xl font-semibold mb-4">Patient Details</h2>
        <div class="grid grid-cols-2 gap-4">
            <p><span class="font-semibold">Name: </span>{patientData.name}</p>
            <p><span class="font-semibold">Age: </span>{patientData.age}</p>
            <p>
                <span class="font-semibold">Gender: </span>{patientData.gender}
            </p>
            <p><span class="font-semibold">ID: </span>{params.patientId}</p>
        </div>
    </div>

    <div class="mt-8 flex space-x-4">
        {#each tabs as tab}
            <button
                class={`py-2 px-4 rounded-md ${
                    selectedTab === tab
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                }`}
                on:click={() => (selectedTab = tab)}
            >
                {tab}
            </button>
        {/each}
    </div>

    <div class="mt-6 bg-white p-6 rounded-md shadow-xl relative">
        {#if selectedTab === "Past Medications"}
            <button
                class="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                on:click={() => (showModal = true)}
            >
                Create Medication
            </button>
            <ul>
                {#each pastMedications as { hospitalName, doctorName, date, fileLink }}
                    <li class="mb-4">
                        <p class="font-semibold">Hospital: {hospitalName}</p>
                        <p>Doctor: {doctorName}</p>
                        <p>Date: {date}</p>
                        <a
                            href={fileLink}
                            target="_blank"
                            class="text-blue-500 underline">View PDF</a
                        >
                    </li>
                {/each}
            </ul>
        {:else}
            <ul>
                {#each testReports as { hospitalName, date, fileLink }}
                    <li class="mb-4">
                        <p class="font-semibold">Hospital: {hospitalName}</p>
                        <p>Date: {date}</p>
                        <a
                            href={fileLink}
                            target="_blank"
                            class="text-blue-500 underline">View PDF</a
                        >
                    </li>
                {/each}
            </ul>
        {/if}
        {#if showModal}
            <div
                class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <div
                    class="bg-white p-6 rounded-md shadow-md relative w-full max-w-4xl"
                >
                    <button
                        class="absolute top-2 right-2 text-xl"
                        on:click={() => (showModal = false)}>&times;</button
                    >
                    <h3 class="text-xl font-semibold mb-4">
                        New Medication Entry
                    </h3>

                    <form
                        on:submit|preventDefault={addMedication}
                        class="space-y-6"
                    >
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label class="block">
                                <span class="block font-semibold mb-2"
                                    >Address</span
                                >
                                <input
                                    bind:value={newMedication.Address}
                                    class="w-full p-2 border rounded-md"
                                    required
                                />
                            </label>
                            <label class="block">
                                <span class="block font-semibold mb-2"
                                    >Contact</span
                                >
                                <input
                                    bind:value={newMedication.Contact}
                                    class="w-full p-2 border rounded-md"
                                    required
                                />
                            </label>
                            <!-- Add other short fields here in a similar pattern -->
                        </div>

                        <div>
                            <span class="block font-semibold mb-2"
                                >Chief Complaints</span
                            >
                            <textarea
                                bind:value={newMedication.ChiefComplaints}
                                class="w-full p-2 border rounded-md"
                            />
                        </div>

                        <!-- Repeat the pattern above for other longer text fields like PastHistory, TreatmentHistory, etc. -->

                        <div class="flex justify-end mt-6">
                            <button
                                type="submit"
                                class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                                >Add Medication</button
                            >
                        </div>
                    </form>
                </div>
            </div>
        {/if}
    </div>
</div>
