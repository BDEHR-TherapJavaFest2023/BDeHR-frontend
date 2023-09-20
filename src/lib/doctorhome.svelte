<script>
    import Navbardoc from "./doctorNavbar.svelte";
    import ProfileTab from "./doctorProfile.svelte";
    import navigate from "svelte-spa-router";
    import { doctorInfo,doctorHospitalList,doctorResearchList } from "./store";
    import { get } from "svelte/store";

    let doctorDatas = {
        doctor_id: "NDLKX6781TT",
        name: "Dr. M. Rezaul Karim",
        dob: "1990-01-15",
        gender: "Male",
        address: "Dhaka Medical College, Dhaka",
        BMDC_id: "123456789",
        phone: "+8801716171819",
        email: "Karim@gmail.com",
        userImage:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    };
    let doctorHospital = [
        "Dhaka Medical College",
        "Popular Hospital Limited",
        "Holy Care Hospital & Clinic",
        "FMCR Diagonostic Center",
    ];
    let doctorResearches = [
        "Dengue on Elderly",
        "Why Pial is Boksod",
        "Common Cold on Children",
        "Renal diseases on diabetec patient",
    ];
    function navigateToHospitals() {
        // Set the doctor_id in the store
        doctorInfo.set({doctorName:doctorDatas.name});
        doctorHospitalList.set({hospitalList: doctorHospital});
        doctorResearchList.set({researchList: doctorResearches});
        // Navigate to the hospitals page
        window.location.hash = "#/doctorhome/hospitals";
    }
    function navigateToResearch() {
        doctorInfo.set({doctorName:doctorDatas.name});
        doctorHospitalList.set({hospitalList: doctorHospital});
        doctorResearchList.set({researchList: doctorResearches});
        // Navigate to the hospitals page
        window.location.hash = "#/doctorhome/researches";
    }
</script>

<main class="flex mb-10">
    <div>
        <Navbardoc bind:doctorName={doctorDatas.name} />
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
        <ProfileTab bind:doctorData={doctorDatas} />
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
