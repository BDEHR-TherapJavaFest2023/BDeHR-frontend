<script>
    import { onMount } from "svelte";
    import { getContext } from "svelte";
    import { createPDF } from "./pdfUtility";
    import { createPDF2 } from "./dischargePdf";
    import { supabase } from "./supabaseClient";
    import { serverUrl } from "./constants";

    export let params = {};

    let tabs = ["Past Diagnosis", "Past Medications", "Test Reports"];
    let selectedTab = tabs[0];

    let todayDateTime;
    function updateDateTime() {
        const now = new Date();
        todayDateTime = `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
            now.getHours()
        ).padStart(2, "0")}:${String(now.getMinutes()).padStart(
            2,
            "0"
        )}:${String(now.getSeconds()).padStart(2, "0")}`;
    }
    function saveFormData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // To get form data from local storage
    function getFormData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    }

    $: id = params.patientId
    $: patientData = {};
    $: medicationList = [];
    $: reportList = []

    async function getPatientData(){
        let payload = { id:id };
        await fetch(serverUrl + "h2p/get-patient-data", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                patientData = JSON.parse(data);
                console.log(patientData);
            });
    }

    async function getMedicationList(){

    }

    async function getReportList(){

    }

    onMount(() => {
        getPatientData();

        updateDateTime();
        setInterval(updateDateTime, 1000); // Update every second
    });

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

    let newMedication = getFormData("newMedication") || {
        Address: "",
        Contact: "",
        Occupation: "",
        MaritalStatus: "",
        ChiefComplaints: "",
        HOillness: "",
        bmi: "",
        PastHistoryMedical: "",
        PastHistorySurgical: "",
        TreatmentHistory: "",
        OccupationalHistory: "",
        SocioEconomicCondition: "",
        FamilyHistory: "",
        PersonalHistory: "",
        Inspection: "",
        Palpation: "",
        Percussion: "",
        Auscultation: "",
        Vaccinationhistory: "",
        MenstrualHistory: "",
        Height: "",
        Nutrition: "",
        Oedema: "",
        Clubbing: "",
        Thyroid: "",
        Skin: "",
        Weight: "",
        Anaemia: "",
        Lnodes: "",
        Cyanosis: "",
        Neckvein: "",
        Others: "",
        Temperature: "",
        koilonychia: "",
        Leukonychia: "",
        Pulse: "",
        BloodPressure: "",
        RespiratoryRate: "",
        Jaundice: "",
        Dehydration: "",
        CardioVascularSystem: "",
        RespiratorySystemm: "",
        GastroIntestinalSystem: "",
        MusculoSkeletalSystem: "",
        NervousSystem: "",
        workupDiagnosis: "",
        DifferentialDiagnosis: "",
        RelativeInvestigationFindings: "",
        SalientFeature: "",
        ConfirmatoryDiagnosis: "",
        Treatment: "",
        FollowUpAdvice: "",
        FollowUpDuration: "",
        DischargePrescription: "",
        remarks: "",
    };

    function handleEdit() {
        saveFormData("newMedication", newMedication);
        showModal = false;
    }

    async function handleSubmit() {
        try {
            const pdfBytes = await createPDF(newMedication);
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const link = document.createElement("a");
            const currentTime = new Date().toISOString();

            link.href = URL.createObjectURL(blob);
            link.download = `medication_${currentTime}.pdf`;
            link.click();

            let { data, error } = await supabase.storage
                .from("medications")
                .upload(`medication_${currentTime}.pdf`, pdfBytes, {
                    contentType: "application/pdf",
                });

            if (error) {
                console.error("Error uploading file:", error);
                showModal = false;
                return;
            }

            saveFormData("newMedication", newMedication);
            const fileLink = supabase.storage
                .from("medications")
                .getPublicUrl(data.Key);
            console.log(fileLink);

            const pdfBytes2 = await createPDF2(newMedication);

            ({ data, error } = await supabase.storage
                .from("discharge")
                .upload(`discharge_${currentTime}.pdf`, pdfBytes2, {
                    contentType: "application/pdf",
                }));

            if (error) {
                console.error("Error uploading file:", error);
                showModal = false;
                return;
            }

            const fileLink2 = supabase.storage
                .from("discharge")
                .getPublicUrl(data.Key);
            console.log(fileLink2);

            showModal = false;
        } catch (e) {
            console.error("An unexpected error occurred:", e);
            showModal = false;
        }
    }

    const pastDiagnosisData = [
        {
            date: "2022-05-20",
            diagnosedWith: "Cholera",
            dischargeCertLink:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/1905061_report.pdf",
        },
        {
            date: "2022-07-11",
            diagnosedWith: "Chronic Bronchitis",
            dischargeCertLink:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/1905061_report.pdf",
        },
        // Add more diagnosis records as needed
    ];

    function addMedication() {
        pastMedications = [...pastMedications, newMedication];
        newMedication = {
            Address: "",
            Contact: "",
            Occupation: "",
            MaritalStatus: "",
            ChiefComplaints: "",
            HOillness: "",
            PastHistoryMedical: "",
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
            SalientFeature: "",
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
            <p><span class="font-semibold">Name: </span>{patientData['patientName']}</p>
            <p><span class="font-semibold">Age: </span>{calculateAge(patientData['dob'])}</p>
            <p>
                <span class="font-semibold">Gender: </span>{patientData['gender']}
            </p>
            <p><span class="font-semibold">ID: </span>{id}</p>
        </div>
    </div>
    <div>
        <button
            class="mb-4 mt-4 bg-green-400 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            on:click={() => (showModal = true)}
        >
            Treatment on {todayDateTime}
        </button>
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
        {:else if selectedTab === "Past Diagnosis"}
            <table
                class="min-w-full bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300"
            >
                <thead
                    class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white"
                >
                    <tr>
                        <th class="w-1/3 py-2 px-4 text-left">Date</th>
                        <th class="w-1/3 py-2 px-4 text-left">Diagnosed With</th
                        >
                        <th class="w-1/3 py-2 px-4 text-left"
                            >Discharge Certificate</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#each pastDiagnosisData as diagnosis}
                        <tr class="bg-gray-100 hover:bg-gray-200">
                            <td class="border px-4 py-2">{diagnosis.date}</td>
                            <td class="border px-4 py-2"
                                >{diagnosis.diagnosedWith}</td
                            >
                            <td class="border px-4 py-2">
                                <a
                                    href={diagnosis.dischargeCertLink}
                                    target="_blank"
                                    class="text-blue-500 underline">View PDF</a
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
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

                    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
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
                                        >Address*</span
                                    >

                                    <input
                                        bind:value={newMedication.Address}
                                        placeholder="Write Your Address"
                                        class="w-full p-2 border rounded-md"
                                        required
                                        name="Address"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Contact*</span
                                    >
                                    <input
                                        bind:value={newMedication.Contact}
                                        placeholder="Write Phone Number"
                                        class="w-full p-2 border rounded-md"
                                        required
                                        name="Contact"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Occupation*</span
                                    >
                                    <input
                                        bind:value={newMedication.Occupation}
                                        placeholder="Write Your Current Occupation"
                                        class="w-full p-2 border rounded-md"
                                        required
                                        name="Occupaton"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Marital Status</span
                                    >
                                    <input
                                        bind:value={newMedication.MaritalStatus}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Unmarried/Married"
                                        name="MaritalStatus"
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
                                        name="ChiefComplaints"
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
                                        name="HOillness"
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
                                        >History of Past Illness (Medical
                                        History)</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.PastHistoryMedical}
                                        placeholder="Medical History"
                                        name="PastHistoryMedical"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >History of Past Illness (Surgical
                                        History)</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.PastHistorySurgical}
                                        placeholder="Surgical History"
                                        name="PastHistorySurgical"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >History of Treatment</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.TreatmentHistory}
                                        placeholder="History of Treatment / Drug History"
                                        name="TreatmentHistory"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Family History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.FamilyHistory}
                                        placeholder="Family History"
                                        name="FamilyHistory"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Personal History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.PersonalHistory}
                                        placeholder="Personal History"
                                        name="PersonalHistory"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Occupational History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.OccupationalHistory}
                                        placeholder="Occupational History"
                                        name="OccupationalHistory"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Socio-Economic Condition</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.SocioEconomicCondition}
                                        placeholder="Socio-Economic Condition"
                                        name="SocioEconomicCondition"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Immunizations History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Vaccinationhistory}
                                        placeholder="Immunizations History"
                                        name="Vaccinationhistory"
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Menstrual History</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.MenstrualHistory}
                                        placeholder="Menstrual History"
                                        name="MenstrualHistory"
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
                                        placeholder="Patient Height"
                                        name="Height"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Weight</span
                                    >
                                    <input
                                        bind:value={newMedication.Weight}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Patient Weight"
                                        name="Weight"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >BMI</span
                                    >
                                    <input
                                        bind:value={newMedication.bmi}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Approx BMI"
                                        name="bmi"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Nutrition</span
                                    >
                                    <input
                                        bind:value={newMedication.Nutrition}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Nutrition Condition"
                                        name="Nutrition"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Anaemia</span
                                    >
                                    <input
                                        bind:value={newMedication.Anaemia}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Anaemia"
                                        name="Anaemia"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Jaundice</span
                                    >
                                    <input
                                        bind:value={newMedication.Jaundice}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Jaundice"
                                        name="Jaundice"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Oedema</span
                                    >
                                    <input
                                        bind:value={newMedication.Oedema}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Oedema"
                                        name="Oedema"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Cyanosis</span
                                    >
                                    <input
                                        bind:value={newMedication.Cyanosis}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Cyanosis"
                                        name="Cyanosis"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Dehydration</span
                                    >
                                    <input
                                        bind:value={newMedication.Dehydration}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Dehydration"
                                        name="Dehydration"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Temperature</span
                                    >
                                    <input
                                        bind:value={newMedication.Temperature}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="°F"
                                        name="Temperature"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Pulse</span
                                    >
                                    <input
                                        bind:value={newMedication.Pulse}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Pulse"
                                        name="Pulse"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Blood Pressure</span
                                    >
                                    <input
                                        bind:value={newMedication.BloodPressure}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="___ mmHg / __mmHg "
                                        name="BloodPressure"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Respiratory Rate</span
                                    >
                                    <input
                                        bind:value={newMedication.RespiratoryRate}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="___/min "
                                        name="RespiratoryRate"
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Clubbing</span
                                    >
                                    <input
                                        bind:value={newMedication.Clubbing}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Clubbing"
                                        name="Clubbing"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Neckvein</span
                                    >
                                    <input
                                        bind:value={newMedication.Neckvein}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Neckvein"
                                        name="Neckvein"
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >L. Nodes</span
                                    >
                                    <input
                                        bind:value={newMedication.Lnodes}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="L. Nodes"
                                        name="Lnodes"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Thyroid</span
                                    >
                                    <input
                                        bind:value={newMedication.Thyroid}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Thyroid"
                                        name="Thyroid"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Koilonychia</span
                                    >
                                    <input
                                        bind:value={newMedication.koilonychia}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Koilonychia"
                                        name="koilonychia"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Leukonychia</span
                                    >
                                    <input
                                        bind:value={newMedication.Leukonychia}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Leukonychia"
                                        name="Leukonychia"
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Skin</span
                                    >
                                    <input
                                        bind:value={newMedication.Skin}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Skin"
                                        name="Skin"
                                    />
                                </label>

                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Others</span
                                    >
                                    <input
                                        bind:value={newMedication.Others}
                                        class="w-full p-2 border rounded-md"
                                        placeholder="Something Else to Add"
                                        name="Others"
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
                                        placeholder="Cardio Vascular System Examination Finding"
                                        name="CardioVascularSystem"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Respiratory System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.RespiratorySystemm}
                                        placeholder="Respiratory System Examination Finding"
                                        name="RespiratorySystemm"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Gastro-Intestinal System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.GastroIntestinalSystem}
                                        placeholder="Gastro-Intestinal System Examination Finding"
                                        name="GastroIntestinalSystem"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Musculo-Skeletal System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.MusculoSkeletalSystem}
                                        placeholder="Musculo-Skeletal System Examination Finding"
                                        name="MusculoSkeletalSystem"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Nervous System</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.NervousSystem}
                                        placeholder="Nervous System Examination Finding"
                                        name="NervousSystem"
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                        </fieldset>

                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <legend class="font-bold text-lg mb-4"
                                >Abdomen</legend
                            >
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Inspection</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Inspection}
                                        placeholder="Inspection"
                                        name="Inspection"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Palpation</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Palpation}
                                        placeholder="Palpation"
                                        name="Palpation"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Percussion</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Percussion}
                                        placeholder="Percussion"
                                        name="Percussion"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Auscultation</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Auscultation}
                                        placeholder="Auscultation"
                                        name="Auscultation"
                                    />
                                </label>
                            </div>
                        </fieldset>

                        <!-- ProvationalStage -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Provisional Diagnosis</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.workupDiagnosis}
                                        placeholder="Provisional Diagnosis (Separate multiple by comma)"
                                        name="workupDiagnosis"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Differential Diagnosis</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.DifferentialDiagnosis}
                                        placeholder="Differential Diagnosis (Separate multiple by comma)"
                                        name="DifferentialDiagnosis"
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: WorkupDiagnosis, DifferentialDiagnosis -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <fieldset class="p-4 border rounded-md shadow-lg">
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
                                        placeholder="Findings of Investigations"
                                        name="RelativeInvestigationFindings"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Salient Features*</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.SalientFeature}
                                        required
                                        placeholder="Salient Feature"
                                        name="SalientFeature"
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: RelativeInvestigationFindings, DeterministicDiagnosis -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- FinalDiagnosis -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Confirmatory Diagnosis*</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.ConfirmatoryDiagnosis}
                                        required
                                        placeholder="Confirmatory Diagnosis"
                                        name="ConfirmatoryDiagnosis"
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: RelativeInvestigationFindings, DeterministicDiagnosis -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <!-- Treatment -->
                        <fieldset class="p-4 border rounded-md shadow-lg">
                            <div>
                                <!-- Fields: Address, Contact, Occupation, SocioEconomicCondition, OccupationalHistory -->
                                <!-- ... Add your fields in the same format as below ... -->
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Treatment*</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.Treatment}
                                        required
                                        placeholder="Treatments"
                                        name="Treatment"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Advice</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.FollowUpAdvice}
                                        placeholder="Advices"
                                        name="FollowUpAdvice"
                                    />
                                </label>
                                <label class="block">
                                    <span class="block font-semibold mb-2"
                                        >Follow-Up After</span
                                    >
                                    <textarea
                                        class="w-full textarea textarea-bordered"
                                        bind:value={newMedication.FollowUpDuration}
                                        placeholder="__ weeks"
                                        name="FollowUpDuration"
                                    />
                                </label>

                                <!-- ... Continue with the rest ... -->
                            </div>
                            <!-- Fields: Treatment, FollowUpAdvice -->
                            <!-- ... Add your fields here ... -->
                        </fieldset>

                        <div class="flex justify-end mt-6">
                            <button
                                type="button"
                                class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                                on:click={handleEdit}
                            >
                                Submit
                            </button>
                            <button
                                type="submit"
                                class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                                >Discharge</button
                            >
                        </div>
                    </form>
                </div>
            </div>
        {/if}
    </div>
</div>
