<script>
    import NavbarRunning from "./doctorNavbar.svelte";
    import { doctorInfo, doctorHospitalList } from "./store";
    import { get } from "svelte/store";

    let doctor_Hospitals = [];
    let NameRunning;

    function navigateToProfile() {
        // Navigate to the Profile page
        window.location.hash = "#/doctorhome";
    }
    function navigateToResearch() {
        // Navigate to the hospitals page
        window.location.hash = "#/doctorhome/researches";
    }
    function navigateToPatients(hospitalName) {
        // Set the hospital name in a global store or send as a parameter
        // For simplicity, sending as a parameter
        console.log("Navigating to patients for hospital:", hospitalName);
        window.location.hash = `#/doctorhome/doctorPatient/${hospitalName}`;
    }
</script>

<main class="bg-gray-100 min-h-screen">
    <NavbarRunning doctorName={get(doctorInfo).doctorName} />

    <div style="padding-top: 145px;">
        <div class="flex justify-center mt-4 space-x-4">
            <button
                class="btn border-black text-white bg-slate-400 hover:bg-black"
                on:click={navigateToProfile}
            >
                Profile
            </button>
            <button
                class="btn border-black text-white bg-black cursor-default hover:bg-black"
            >
                Hospitals
            </button>
            <button
                class="btn border-black text-white bg-slate-400 hover:bg-black"
                on:click={navigateToResearch}
            >
                Research
            </button>
        </div>
    </div>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        style="padding-top: 10px;"
    >
        <!-- Display cards for each hospital name -->
        {#each get(doctorHospitalList).hospitalList as hospital, index}
            <div
                class="bg-white p-6 rounded-lg shadow-md text-center transition-colors hover:bg-gray-200
        transition-transform transform hover:scale-90 cursor-pointer"
                on:click={() => navigateToPatients(hospital)}
            >
                <div class="flex items-center justify-center space-x-4">
                    <!-- Assuming you have an icon component or library, replace with your icon of choice -->

                    <span class="text-blue-500 font-bold">{hospital}</span>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    .btn {
        padding: 8px 12px;
        border: 1px solid;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
    }

    .bg-darkGray {
        background-color: #bcbcbc;
    }

    button:focus {
        outline: none;
    }
</style>
