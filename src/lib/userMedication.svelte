<script>
    import { get } from "svelte/store";
    import { userInfo } from "./store";
    import Navbardoc from "./doctorNavbar.svelte";
    import { onMount } from "svelte";

    let name = get(userInfo).userName;

    let medications = [
        {
            id: "1",
            name: "Medication 1",
            date: "2023-09-10",
            googleDriveUrl:
                "https://docs.google.com/document/d/1u7ysQh19u9yeWHlN4rguck8yw4qe1f69VYYX9vE1VDA/edit?usp=sharing",
        },
        {
            id: "2",
            name: "Medication 2",
            date: "2023-09-10",
            googleDriveUrl:
                "https://docs.google.com/document/d/1u7ysQh19u9yeWHlN4rguck8yw4qe1f69VYYX9vE1VDA/edit?usp=sharing",
        },
        {
            id: "3",
            name: "Medication 3",
            date: "2023-09-10",
            googleDriveUrl:
                "https://docs.google.com/document/d/1u7ysQh19u9yeWHlN4rguck8yw4qe1f69VYYX9vE1VDA/edit?usp=sharing",
        },
        {
            id: "4",
            name: "Medication 4",
            date: "2023-09-10",
            googleDriveUrl:
                "https://docs.google.com/document/d/1u7ysQh19u9yeWHlN4rguck8yw4qe1f69VYYX9vE1VDA/edit?usp=sharing",
        },
        {
            id: "5",
            name: "Medication 5",
            date: "2023-09-10",
            googleDriveUrl:
                "https://docs.google.com/document/d/1u7ysQh19u9yeWHlN4rguck8yw4qe1f69VYYX9vE1VDA/edit?usp=sharing",
        },
        // Add more medication items as needed
    ];

    function navigateToProfile() {
        window.location.hash = `#/user`;
    }

    function navigateToTestReports() {
        window.location.hash = `#/user/report`;
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
                on:click={navigateToTestReports}
            >
                Test Reports
            </button>
        </div>
    </div>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        style="padding-top: 10px;"
    >
        <!-- Display cards for each hospital name -->
        {#each medications as medication}
            <a
                href={medication.googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div
                    class="bg-white p-6 rounded-lg shadow-md text-center transition-colors hover:bg-gray-200
        transition-transform transform hover:scale-90 cursor-pointer"
                >
                    <div class="flex items-center justify-center space-x-4">
                        <!-- Assuming you have an icon component or library, replace with your icon of choice -->

                        <span class="text-blue-500 font-bold"
                            >{medication.name}</span
                        >
                    </div>
                </div>
            </a>
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
