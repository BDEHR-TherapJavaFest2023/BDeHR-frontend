<script>
    import ProfileTab from "./userProfile.svelte";
    import Navbardoc from "./doctorNavbar.svelte";
    import { userInfo } from "./store";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    let userData = {
        user_id: get(userInfo).userId,
        name: get(userInfo).userName,
        dob: get(userInfo).userDob,
        gender: get(userInfo).userGender,
        address: get(userInfo).userAddress,
        nid: get(userInfo).userNid,
        phone: get(userInfo).userPhone,
        email: get(userInfo).userEmail,
        userImage: get(userInfo).userPhoto,
    };

    function navigateToMedicationInfo() {
        window.location.hash = `#/user/medication`;
    }

    function navigateToTestReports() {
        window.location.hash = `#/user/report`;
    }

    onMount(() => {
        userData = {
            user_id: get(userInfo).userId,
            name: get(userInfo).userName,
            dob: get(userInfo).userDob,
            gender: get(userInfo).userGender,
            address: get(userInfo).userAddress,
            nid: get(userInfo).userNid,
            phone: get(userInfo).userPhone,
            email: get(userInfo).userEmail,
            userImage: get(userInfo).userPhoto,
        };
    });
</script>

<main class="flex mb-10">
    <div>
        <Navbardoc bind:doctorName={userData.name} />
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
                on:click={navigateToMedicationInfo}
            >
                Medication Info
            </button>
            <button
                class="btn border-black text-white bg-slate-400 hover:bg-black"
                on:click={navigateToTestReports}
            >
                Test Reports
            </button>
        </div>
        <ProfileTab bind:userData />
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
