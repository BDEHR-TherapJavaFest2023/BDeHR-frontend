<script>
    import { getContext } from "svelte";
    import { createPDF } from "./pdfUtility";
    import { supabase } from "./supabaseClient";
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
        Address: "Dhaka",
        Contact: "+880",
        Occupation: "Student",
        MaritalStatus: "Married",
        ChiefComplaints: "Headache",
        HOillness: "Growth of headache",
        PastHistory: "Migrane",
        TreatmentHistory: "Paracetamol",
        OccupationalHistory: "Tution",
        SocioEconomicCondition: "Rich",
        FamilyHistory: "Normal",
        PersonalHistory: "Ganja khay",
        Vaccinationhistory: "vaccinated properly",
        MenstrualHistory: "nil",
        Height: "normal",
        Nutrition: "normal",
        Oedema: "normal",
        Clubbing: "normal",
        Thyroid: "normal",
        Skin: "normal",
        Weight: "normal",
        Anaemia: "normal",
        Cyanosis: "normal",
        Neckvein: "normal",
        Others: "",
        Temperature: "normal",
        Pulse: "70/min",
        BloodPressure: "150/100",
        Jaundice: "normal",
        Dehydration: "normal",
        CardioVascularSystem: "Normal",
        RespiratorySystemm: "Normal",
        GastroIntestinalSystem: "Normal",
        MusculoSkeletalSystem: "Normal",
        NervousSystem: "Normal",
        workupDiagnosis: "Tumour",
        DifferentialDiagnosis: "Tumour, cancer",
        RelativeInvestigationFindings: "Cancer",
        ConfirmatoryDiagnosis: "Cancer",
        Treatment: "Inevitable death",
        FollowUpAdvice: "RIP",
        DischargePrescription: "discharged",
        remarks: "pialBoksod",
    };

    async function handleSubmit() {
        const pdfBytes = await createPDF(newMedication);

        // Convert PDF bytes to Blob
        const blob = new Blob([pdfBytes], { type: "application/pdf" });

        // Create a link element to enable download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `medication_${new Date().toISOString()}.pdf`;
        link.click(); // This triggers the download

        // Upload the PDF to Supabase after saving to local machine
        const { data, error } = await supabase.storage
            .from("medications")
            .upload(`medication_${new Date().toISOString()}.pdf`, pdfBytes, {
                contentType: "application/pdf",
            });

        if (error) {
            console.error("Error uploading file:", error);
            showModal = false;
            return;
        }

        const fileLink = supabase.storage
            .from("medications")
            .getPublicUrl(data.Key);
        console.log(fileLink);
        showModal = false;
    }

    function addMedication() {
        pastMedications = [...pastMedications, newMedication];
        newMedication = {
            Address: "",
            Contact: "",
            Occupation: "",
            MaritalStatus: "",
            ChiefComplaints: "",
            HOillness: "",
            PastHistory: "",
            TreatmentHistory: "",
            OccupationalHistory: "",
            SocioEconomicCondition: "",
            Vaccinationhistory: "",
            MenstrualHistory: "",
            Height: "normal",
            Nutrition: "normal",
            Oedema: "normal",
            Clubbing: "normal",
            Thyroid: "normal",
            Skin: "normal",
            Weight: "normal",
            Anaemia: "normal",
            Cyanosis: "normal",
            Neckvein: "normal",
            Others: "normal",
            Temperature: "normal",
            Pulse: "70/min",
            BloodPressure: "150/100",
            Jaundice: "normal",
            Dehydration: "normal",
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

                    <form on:submit={handleSubmit} class="space-y-6">
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
                                        >Marital Status</span
                                    >
                                    <input
                                        bind:value={newMedication.MaritalStatus}
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
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Chief Complaints</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        placeholder="Chief Complaints"
                                        bind:value={newMedication.ChiefComplaints}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >History of Present Illness</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        placeholder="History of Present Illness"
                                        bind:value={newMedication.HOillness}
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
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >History of Past Illness</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.PastHistory}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >History of Treatment</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.TreatmentHistory}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Family History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.FamilyHistory}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Personal History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.PersonalHistory}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Occupational History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.OccupationalHistory}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Socio-Economic Condition</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.SocioEconomicCondition}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Status of Vaccination</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Vaccinationhistory}
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Menstrual History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.MenstrualHistory}
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: PastHistory, PastTreatment, OccupationalHistory, VaccinationStatus, MenstrualHistory -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >General Examination</legend
                            >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Height</span
                                    >
                                    <input
                                        bind:value={newMedication.Height}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Weight</span
                                    >
                                    <input
                                        bind:value={newMedication.Weight}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Nutrition</span
                                    >
                                    <input
                                        bind:value={newMedication.Nutrition}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Temperature</span
                                    >
                                    <input
                                        bind:value={newMedication.Temperature}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Pulse</span
                                    >
                                    <input
                                        bind:value={newMedication.Pulse}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Blood Pressure</span
                                    >
                                    <input
                                        bind:value={newMedication.BloodPressure}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Oedema</span
                                    >
                                    <input
                                        bind:value={newMedication.Oedema}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Clubbing</span
                                    >
                                    <input
                                        bind:value={newMedication.Clubbing}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Skin</span
                                    >
                                    <input
                                        bind:value={newMedication.Skin}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Neckvein</span
                                    >
                                    <input
                                        bind:value={newMedication.Neckvein}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Anaemia</span
                                    >
                                    <input
                                        bind:value={newMedication.Anaemia}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Thyroid</span
                                    >
                                    <input
                                        bind:value={newMedication.Thyroid}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Cyanosis</span
                                    >
                                    <input
                                        bind:value={newMedication.Cyanosis}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Jaundice</span
                                    >
                                    <input
                                        bind:value={newMedication.Jaundice}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Dehydration</span
                                    >
                                    <input
                                        bind:value={newMedication.Dehydration}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Others</span
                                    >
                                    <input
                                        bind:value={newMedication.Others}
                                        class="w-full p-2 border rounded-md"
                                        required
                                    />
                                </label>
                            </div>
                        </fieldset>

                        <!-- Examination -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Systematic Examination</legend
                            >
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Cardio Vascular System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.CardioVascularSystem}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Respiratory System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.RespiratorySystemm}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Gastro-Intestinal System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.GastroIntestinalSystem}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Musculo-Skeletal System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.MusculoSkeletalSystem}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Nervous System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.NervousSystem}
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
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Work-up Diagnosis</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.workupDiagnosis}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Differential Diagnosis</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.DifferentialDiagnosis}
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
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Relative Investigations Findings</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.RelativeInvestigationFindings}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Confirmatory Diagnosis</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.ConfirmatoryDiagnosis}
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
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Treatment</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Treatment}
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Follow up Advice</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.FollowUpAdvice}
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
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.remarks}
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
