<script>
    import { onMount } from "svelte";
    import { hospitalPatientList, hospitalInfo } from "./store";
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";
    import toast, { Toaster } from "svelte-french-toast";
    let donors = [
        // This is a sample donor, you can add more or fetch from your backend
        {
            name: "Nazmus Sakib",
            contact: "01911956840",
            bloodType: "O+",
            status: "Waiting for approval",
        },
        {
            name: "Saad Md Rafid Pial",
            contact: "01538946590",
            bloodType: null,
            status: "Waiting for approval",
        },
        {
            name: "Arnab Bhattacharjee",
            contact: "01835424678",
            bloodType: null,
            status: "Waiting for approval",
        },
    ];

    const bloodGroups = [
        null,
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ];

    function updateStatus(donor, newStatus) {
        const index = donors.indexOf(donor);
        donors[index].status = newStatus;

        if (newStatus === "Rejected") {
            //ekhane ami korsi. but donor er ekta field ke set ba reset kore dewa lagbe
            donors = donors.filter((d) => d !== donor);
        } else if (newStatus === "Donation Done" && donor.bloodType) {
            // Decrement the demand for the donor's blood type by 1
            const blood = bloodTypes.find((b) => b.type === donor.bloodType);
            if (blood) {
                blood.demand -= 1;
                bloodTypes = [...bloodTypes]; // Update the Svelte component
            }
            //ekhane donor er blood donation date update kora lagbe
            console.log("Donation done for", donor.name);
        }
    }

    function getColor(status) {
        switch (status) {
            case "Waiting for approval":
                return "yellow";
            case "Approved":
                return "green";
            case "Rejected":
                return "red";
            case "Arrived for Donation":
                return "blue";
            case "Testing Blood group":
                return "purple";
            case "Donation Done":
                return "gray";
            default:
                return "gray";
        }
    }

    let bloodTypes = [
        { type: "A+", demand: 0 },
        { type: "A-", demand: 0 },
        { type: "B+", demand: 0 },
        { type: "B-", demand: 0 },
        { type: "AB+", demand: 0 },
        { type: "AB-", demand: 0 },
        { type: "O+", demand: 0 },
        { type: "O-", demand: 0 },
    ];

    function increaseDemand(bloodType) {
        const blood = bloodTypes.find((b) => b.type === bloodType);
        if (blood) {
            blood.demand += 1;
            // Tell Svelte to update the component by reassigning the array
            bloodTypes = [...bloodTypes];
        }
    }

    function navigateBack() {
        window.location.hash = "#/hospitalhome";
    }
</script>

<Toaster />
<main class="min-h-screen p-8 bg-gradient-to-br from-blue-300 to-purple-300">
    <nav class="bg-white shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.png"
                alt={get(hospitalInfo).hospitalInfo["name"] + " Logo"}
                class="h-10 w-12 transition-transform transform hover:scale-125"
                on:click={navigateBack}
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{get(hospitalInfo).hospitalInfo["name"]}</span
            >
            <span>
                <a href="#/hospitalogin" class="btn btn-outline ml-auto mr-2"
                    >Logout</a
                >
            </span>
        </div>
    </nav>
    <div class="container mx-auto mt-10">
        <table
            class="w-full border-collapse table-auto border border-gray-300 rounded-lg"
        >
            <!-- Blood types -->
            <tr class="bg-purple-500 text-white">
                {#each bloodTypes as blood}
                    <th class="py-2 px-4 border">{blood.type}</th>
                {/each}
            </tr>
            <!-- Demand values -->
            <tr>
                {#each bloodTypes as blood}
                    <td class="py-2 px-4 border text-center">{blood.demand}</td>
                {/each}
            </tr>
            <!-- Buttons -->
            <tr>
                {#each bloodTypes as blood}
                    <td class="py-2 px-4 border text-center">
                        <button
                            class="btn bg-red-400 hover:bg-red-500"
                            on:click={() => increaseDemand(blood.type)}
                            >+ Add Demand</button
                        >
                    </td>
                {/each}
            </tr>
        </table>
    </div>
    <div class="mt-6">
        <h2 class="text-2xl font-bold mb-4">Donors List</h2>
        {#each donors as donor}
            <div class="bg-white shadow-md p-4 mb-4 rounded-lg">
                <h3 class="text-xl">{donor.name}</h3>
                <p>Contact No: {donor.contact}</p>
                <p>Blood Type: {donor.bloodType || "Unknown"}</p>
                <div class="mt-2">
                    <label class="block mb-2">Status:</label>
                    <select
                        bind:value={donor.status}
                        on:change={(e) => updateStatus(donor, e.target.value)}
                        class={`bg-${getColor(donor.status)}-200 p-2 rounded`}
                    >
                        <option value="Waiting for approval"
                            >Waiting for approval</option
                        >
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Arrived for Donation"
                            >Arrived for Donation</option
                        >
                        <option value="Testing Blood group"
                            >Testing Blood group</option
                        >
                        <option value="Donation Done">Donation Done</option>
                    </select>
                    {#if donor.status === "Testing Blood group"}
                        <div class="mt-2">
                            <label class="block mb-2">Assign Blood Group:</label
                            >
                            <select
                                bind:value={donor.bloodType}
                                class="p-2 rounded bg-gray-200"
                            >
                                {#each bloodGroups as group}
                                    <option value={group}
                                        >{group || "Unknown"}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
</style>
