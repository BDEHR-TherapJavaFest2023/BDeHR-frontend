<script>
    import Navbardoc from "./doctorNavbar.svelte";
    import ProfileTab from "./doctorProfile.svelte";
    import navigate from "svelte-spa-router";
    import { doctorInfo,doctorHospitalList,doctorResearchList } from "./store";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    let doctorData = {
        user_id: get(doctorInfo).doctorId,
        name: get(doctorInfo).doctorName,
        dob: get(doctorInfo).doctorDob,
        gender: get(doctorInfo).doctorGender,
        address: get(doctorInfo).doctorAddress,
        bmdc: get(doctorInfo).doctorBmdc,
        phone: get(doctorInfo).doctorPhone,
        email: get(doctorInfo).doctorEmail,
        doctorImage: get(doctorInfo).doctorPhoto
    };

    let doctorHospital = [
        "Dhaka Medical College",
        "Popular Hospital Limited",
        "Holy Care Hospital & Clinic",
        "FMCR Diagonostic Center",
    ];
    let doctorResearches = [
        "Dengue on Elderly",
        "Corona Trends",
        "Common Cold on Children",
        "Renal diseases on diabetec patient",
    ];
    function navigateToHospitals() {
        // Set the doctor_id in the store
        doctorHospitalList.set({hospitalList: doctorHospital});
        doctorResearchList.set({researchList: doctorResearches});
        // Navigate to the hospitals page
        window.location.hash = "#/doctorhome/hospitals";
    }
    function navigateToResearch() {
        doctorHospitalList.set({hospitalList: doctorHospital});
        doctorResearchList.set({researchList: doctorResearches});
        // Navigate to the hospitals page
        window.location.hash = "#/doctorhome/researches";
    }

    onMount(()=>{
        doctorData = {
        user_id: get(doctorInfo).doctorId,
        name: get(doctorInfo).doctorName,
        dob: get(doctorInfo).doctorDob,
        gender: get(doctorInfo).doctorGender,
        address: get(doctorInfo).doctorAddress,
        bmdc: get(doctorInfo).doctorBmdc,
        phone: get(doctorInfo).doctorPhone,
        email: get(doctorInfo).doctorEmail,
        doctorImage: get(doctorInfo).doctorPhoto
    };
    })

</script>

<main class="flex mb-10">
    <div>
        <Navbardoc bind:doctorName={doctorData.name} />
    </div>

    <div class="container">
        <div class="flex justify-center mt-4 space-x-4">
            <button
                class="btn border-black text-white bg-black cursor-default hover:bg-black"
            >
                Profile
            </button>
            <button
                class="btn border-black text-white bg-slate-400 hover:bg-black"
                on:click={navigateToHospitals}
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
        <ProfileTab bind:doctorData={doctorData} />
    </div>
</main>

<style>
    .container {
        padding-top: 145px;
    }
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
