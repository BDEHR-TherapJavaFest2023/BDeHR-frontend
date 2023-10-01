<script>
    import { format } from "d3";
    import { serverUrl } from "./constants";
    import { get } from "svelte/store";
    import { labInfo, hospitalInfo } from "./store";
    import { supabase } from "./supabaseClient";
    import { onMount } from "svelte";

    let hospitalName = "Dhaka Medical College";
    let hospitalLogo =
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dmc.png";
    let labId = "VBI2NIRD";
    let showMachineForm = false;
    let newMachine = {
        machineName: "",
        companyName: "",
        model: "",
        incorporateDate: "",
        image: "",
    };

    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => (newMachine.image = e.target.result);
        reader.readAsDataURL(file);
    }

    async function changePhoto(id, name, photo) {
        let { data: res1 } = await supabase.storage
            .from("machinePhoto")
            .upload(id + name, photo, {
                cacheControl: "0",
                upsert: true,
            });
        let { data: res2 } = await supabase.storage
            .from("machinePhoto")
            .getPublicUrl(id + name);

        return res2;
    }

    async function dbUp(id, response) {
        let payload = { id: id, url: response["publicUrl"] };

        await fetch(serverUrl + "machine/change-photo", {
            method: "POST",
            body: JSON.stringify(payload),
        }).then((response) => {
            getMachineList();
        });
    }

    async function uploadPhoto(id, name, photo) {
        await changePhoto(id, name, photo).then((response) => {
            dbUp(id, response);
        });
    }

    async function addMachine(event) {
        const form = event.target;
        const formData = new FormData(form);

        // console.log(formData.get("labId"));
        // console.log(formData.get("name"));
        // console.log(formData.get("company"));
        // console.log(formData.get("model"));
        // console.log(formData.get("iDate"));

        await fetch(serverUrl + "machine/add-machine", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                uploadPhoto(data, formData.get("name"), formData.get("photo"));
            });

        form.reset();
        showMachineForm = false;
    }

    // let machines = [
    //     {
    //         machineName: "ECG Machine",
    //         companyName: "Healicom",
    //         model: "HE-12B",
    //         incorporateDate: "2018-01-15",
    //         image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/ecg.jpg",
    //     },
    //     {
    //         machineName: "Ultrasonography Machine",
    //         companyName: "SIUI",
    //         model: "CTS 4000",
    //         incorporateDate: "2019-07-19",
    //         image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/usg.jpg",
    //     },
    //     {
    //         machineName: "X-RAY Machine",
    //         companyName: "Triup",
    //         model: "TR-200B",
    //         incorporateDate: "2015-9-10",
    //         image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/xray.jpg",
    //     },
    //     {
    //         machineName: "MRI Machine",
    //         companyName: "Philips",
    //         model: "1.5T",
    //         incorporateDate: "2020-9-29",
    //         image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mri.jpg",
    //     },
    //     {
    //         machineName: "Bio-Chemistry Analyzer Machine",
    //         companyName: "ICUBIO",
    //         model: "iMagic 52",
    //         incorporateDate: "2017-9-20",
    //         image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/biochemanalyzer.png",
    //     },
    //     {
    //         machineName: "Electrolyte Analyzer Machine",
    //         companyName: "Innolyte",
    //         model: "EA-2000B",
    //         incorporateDate: "2017-10-21",
    //         image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/electro.jpg",
    //     },
    //     // ... add more instruments as needed ...
    // ];
    let hoveredMachine = null;
    function navigateToPatients() {
        window.location.hash = "#/labhome/labpatients";
    }

    $: machineList = [];

    async function getMachineList() {
        let payload = { labId: get(labInfo).labInfo["id"] };
        await fetch(serverUrl + "machine/get-machine-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                machineList = data;
                console.log(machineList);
            });
    }

    onMount(() => {
        getMachineList();
    });
</script>

<!-- Navbar -->
<nav class="bg-blue-500 p-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
            alt="Company Logo"
            class="h-10 w-auto mr-4 transition-transform transform hover:scale-125"
        />

        <h1 class="text-white text-xl font-semibold">
            {get(hospitalInfo).hospitalInfo["name"]}
        </h1>
        <a href="#/lablogin" class="btn btn-error hover:bg-red-600">Logout</a>
    </div>
</nav>

<!-- Main Content -->
<!-- Main Content -->
<main class="bg-gray-100 py-8">
    <div class="container mx-auto p-4">
        <div class="text-center mb-6">
            <img
                src={get(hospitalInfo).hospitalInfo["logo"]}
                alt="Hospital Logo"
                class="mx-auto w-32 h-32 mb-4"
            />
            <h2 class="text-4xl font-bold mb-2">
                Lab: {get(labInfo).labInfo["name"]} | ID: {get(labInfo).labInfo[
                    "id"
                ]}
            </h2>

            <button
                on:click={navigateToPatients}
                class="mt-2 mb-8 px-8 py-3 rounded-full bg-blue-500 text-white font-bold transition duration-300 hover:bg-blue-600"
            >
                Patients
            </button>

            <h2 class="text-2xl font-bold">Laboratory Instruments</h2>
        </div>

        <!-- Machines Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each machineList as machine}
                <div
                    class="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-xl transition-shadow duration-300"
                    on:mouseover={() => (hoveredMachine = machine)}
                    on:mouseout={() => (hoveredMachine = null)}
                >
                    <img
                        src={machine["photo"]}
                        alt={machine["name"]}
                        class="w-full transform scale-100 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                    >
                        <div class="text-center space-y-2">
                            <h2 class="text-white font-bold">
                                {machine["name"]}
                            </h2>
                            <p class="text-white">
                                Company: {machine["company"]}
                            </p>
                            <p class="text-white">Model: {machine["model"]}</p>
                            <p class="text-white">
                                incorporated: {machine["idate"]}
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        {#if showMachineForm}
            <form on:submit|preventDefault={addMachine}>
                <div class="bg-white p-4 rounded-lg shadow-lg mt-8">
                    <h3 class="text-xl font-semibold mb-4">Add New Machine</h3>
                    <div class="space-y-4">
                        <input
                            type="text"
                            placeholder="Machine Name"
                            name="name"
                            bind:value={newMachine.machineName}
                            class="border p-2 w-full rounded"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            name="company"
                            bind:value={newMachine.companyName}
                            class="border p-2 w-full rounded"
                        />
                        <input
                            type="text"
                            placeholder="Model"
                            name="model"
                            bind:value={newMachine.model}
                            class="border p-2 w-full rounded"
                        />
                        <input
                            type="date"
                            placeholder="Incorporate Date"
                            name="iDate"
                            bind:value={newMachine.incorporateDate}
                            class="border p-2 w-full rounded"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            name="photo"
                            on:change={handleFileChange}
                            class="border p-2 w-full rounded"
                        />
                        <input
                            type="hidden"
                            name="labId"
                            value={get(labInfo).labInfo["id"]}
                        />
                    </div>
                    <button
                        class="bg-green-500 text-white p-2 mt-4 rounded"
                        type="submit">Add Machine</button
                    >
                </div>
            </form>
        {/if}
        <button
            class="bg-green-500 text-white p-2 rounded mt-6 hover:bg-green-600"
            on:click={() => (showMachineForm = true)}>Add Machinery</button
        >
    </div>
</main>

<style>
    /* Additional styles if required */
</style>
