<script>
    import { get } from "svelte/store";
    import { userInfo } from "./store";
    import Navbardoc from "./doctorNavbar.svelte";
    import { onMount } from "svelte";

    let name = get(userInfo).userName;

    function navigateToProfile() {
        window.location.hash = `#/user`;
    }

    function navigateToTestReports() {
        window.location.hash = `#/user/testReport`;
    }
</script>

<main class="bg-gray-100 min-h-screen">
    <div>
        <Navbardoc bind:doctorName={name} />
    </div>

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
                Medication Info
            </button>
            <button
                class="btn border-black text-white bg-slate-400 hover:bg-black"
            
            on:click={navigateToTestReports}>
                Test Reports
            </button>
        </div>
    </div>
</main>
