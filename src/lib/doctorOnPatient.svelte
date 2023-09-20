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
        ChiefComplaints: "",
        HOillness: "",
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
        workupDiagnosis: "",
        DifferentialDiagnosis: "",
        RelativeInvestigationFindings: "",
        ConfirmatoryDiagnosis: "",
        Treatment: "",
        FollowUpAdvice: "",
        DischargePrescription: "",
        remarks: "",
    };

    function addMedication() {
        pastMedications = [...pastMedications, newMedication];
        newMedication = {
            Address: "",
            Contact: "",
            Occupation: "",
            ChiefComplaints: "",
            HOillness: "",
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
            workupDiagnosis: "",
            DifferentialDiagnosis: "",
            RelativeInvestigationFindings: "",
            ConfirmatoryDiagnosis: "",
            Treatment: "",
            FollowUpAdvice: "",
            DischargePrescription: "",
            remarks: "",
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
                class="mb-4 bg-green-400 hover:bg-green-700 text-white py-2 px-4 rounded-md"
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
                    class="bg-white p-6 rounded-md shadow-md relative w-full max-w-4xl max-h-screen overflow-y-auto my-8"
                >
                    <button
                        class="absolute top-2 right-2 text-xl"
                        on:click={() => (showModal = false)}>&times;</button
                    >
                    <h3 class="text-2xl font-bold mb-4">
                        New Medication Entry for {patientData.name}
                    </h3>

                    <form
                        on:submit|preventDefault={addMedication}
                        class="space-y-6"
                    >
                        <!-- Initial Info -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Initial Info</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
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
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Occupation</span
                                    >
                                    <input
                                        bind:value={newMedication.Occupation}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Occupational History</span
                                    >
                                    <input
                                        bind:value={newMedication.OccupationalHistory}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <!-- ... Continue with the rest ... -->
                            </div>
                        </fieldset>

                        <!-- Complaints -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Complaints</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Chief Complaints</span
                                    >
                                    <input
                                        bind:value={newMedication.ChiefComplaints}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >History of Illness</span
                                    >
                                    <input
                                        bind:value={newMedication.HOillness}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: ChiefComplaints, HOpresentillness -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- History -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >History</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Past Illness</span
                                    >
                                    <input
                                        bind:value={newMedication.PastHistory}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >History of Treatment</span
                                    >
                                    <input
                                        bind:value={newMedication.TreatmentHistory}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Status of Vaccination</span
                                    >
                                    <input
                                        bind:value={newMedication.Vaccinationhistory}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Menstrual History</span
                                    >
                                    <input
                                        bind:value={newMedication.MenstrualHistory}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: PastHistory, PastTreatment, OccupationalHistory, VaccinationStatus, MenstrualHistory -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- Examination -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Examination</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >General Examination</span
                                    >
                                    <input
                                        bind:value={newMedication.GeneralExamination}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Cardio Vascular System</span
                                    >
                                    <input
                                        bind:value={newMedication.CardioVascularSystem}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Respiratory System</span
                                    >
                                    <input
                                        bind:value={newMedication.RespiratorySystemm}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Gastro-Intestinal System</span
                                    >
                                    <input
                                        bind:value={newMedication.GastroIntestinalSystem}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Musculo-Skeletal System</span
                                    >
                                    <input
                                        bind:value={newMedication.MusculoSkeletalSystem}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Nervous System</span
                                    >
                                    <input
                                        bind:value={newMedication.NervousSystem}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: GeneralExamination, CardioVascularSystem, RespiratorySystem, GastroIntestinalSystem, MusculoSkeletalSystem, NervousSystem -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- ProvationalStage -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Provational Stage</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Work-up Diagnosis</span
                                    >
                                    <input
                                        bind:value={newMedication.workupDiagnosis}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Differential Diagnosis</span
                                    >
                                    <input
                                        bind:value={newMedication.DifferentialDiagnosis}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: WorkupDiagnosis, DifferentialDiagnosis -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- FinalDiagnosis -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Final Diagnosis</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Relative Investigations Findings</span
                                    >
                                    <input
                                        bind:value={newMedication.RelativeInvestigationFindings}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Confirmatory Diagnosis</span
                                    >
                                    <input
                                        bind:value={newMedication.ConfirmatoryDiagnosis}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: RelativeInvestigationFindings, DeterministicDiagnosis -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- Treatment -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Treatment</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Treatment</span
                                    >
                                    <input
                                        bind:value={newMedication.Treatment}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Follow up Advice</span
                                    >
                                    <input
                                        bind:value={newMedication.FollowUpAdvice}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: Treatment, FollowUpAdvice -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- Discharge -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Discharge</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Final Remarks</span
                                    >
                                    <input
                                        bind:value={newMedication.remarks}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: Remarks -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

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
