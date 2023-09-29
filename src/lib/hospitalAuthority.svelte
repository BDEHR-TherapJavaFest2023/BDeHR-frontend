<script>
    import { onMount } from "svelte";
    import { hospitalDoctorList, hospitalInfo } from "./store";
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";
    import toast, { Toaster } from "svelte-french-toast";
    let DoctorDatas = [];

    let showModal = false;

    let doctorName = "";
    let doctorID = "";
    let speciality = "";
    let degreeInput = "";
    let degrees = [];
    let activeTab = "Doctors";
    let showModalLab = false;

    let labIDInput = "";

    function addLab() {
        labs = [...labs, { labID: labIDInput }];
        labIDInput = ""; // Reset input
        showModalLab = false; // Close the modal
    }

    function handleLabClick(labID) {
        //ami chai ekhane click korle oi id wala lab er homepage ta dekha jak
        console.log(`Clicked Lab: ${labID}`);
    }

    let uniqueSpecialities = [];
    async function removeDoctor(id) {
       console.log(id)
       let payload = {id: id}
       await fetch(serverUrl + "h2d/remove-doctor", {
            method: "POST",
            body: JSON.stringify(payload),
        })
        .then((response)=>{
            getDoctorList();
        })
    }

    function addDegree() {
        if (degreeInput.trim()) {
            degrees = [...degrees, degreeInput.trim()];
            degreeInput = "";
        }
    }
    function handleDegreeInput(event) {
        if (event.key === "Enter" && degreeInput.trim()) {
            degrees = [...degrees, degreeInput.trim()];
            degreeInput = "";
            event.preventDefault(); // Prevent form submission
        }
    }

    async function addDoctor(event) {
        const form = event.target;
        const formData = new FormData(form);
        formData.append("degree", degrees.toString());

        await fetch(serverUrl + "h2d/add-doctor", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                if (data === "0") {
                    toast.error("Please recheck doctor id");
                } else {
                    getDoctorList();
                }
            });
        
        form.reset();
        // Optionally close the modal
        showModal = false;
    }

    function submitForm() {
        // Add your form submission logic here
        console.log({ doctorName, doctorID, speciality, degrees });
    }

    $: labList = [];
    $: doctorList = [];

    async function getLabList() {
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        await fetch(serverUrl + "lab/get-lab-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                labList = data;
            });
    }

    async function getDoctorList() {
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        await fetch(serverUrl + "h2d/get-doctor-list", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                doctorList = [];
                for(let i=0;i<Object.keys(data).length;i++){
                    doctorList.push(JSON.parse(data[i]))
                }
                console.log(doctorList)
            });
    }

    let showModalMessageAdmin = false;
    let adminMessage = "";

    async function sendMessageToAdmin() {

        console.log(adminMessage);

        let payload = { text: adminMessage, sender:get(hospitalInfo).hospitalInfo["name"] };
        await fetch(serverUrl + "message/add-message", {
            method: "POST",
            body: JSON.stringify(payload),
        })
        .then(()=>{
            toast.success("Message Sent");
        })

        showModalMessageAdmin = false;
        adminMessage = ""; //abar khali kore disi
    }

    onMount(() => {
        getLabList();
        getDoctorList();

        DoctorDatas = get(hospitalDoctorList).doctorList;
        uniqueSpecialities =
            get(hospitalInfo).hospitalInfo["deptList"].split(",");  
    });
</script>

<Toaster />
<main>
    <!-- Navbar -->
    <nav class="bg-cyan-200 shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                alt={get(hospitalInfo).hospitalInfo["name"] + " Logo"}
                class="h-10 w-12 transition-transform transform hover:scale-125"
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{get(hospitalInfo).hospitalInfo["name"]} Authority</span
            >
            <span>
                <a href="#/hospitalhome" class="btn btn-outline ml-auto mr-2"
                    >Logout</a
                >
            </span>
        </div>
    </nav>

    <div class="container mx-auto mt-4 flex p-6">
        <button
            class={`text-white px-4 py-2 rounded-full ${
                activeTab === "Doctors" ? "bg-blue-500" : "bg-gray-500"
            }`}
            on:click={() => (activeTab = "Doctors")}>Doctors</button
        >
        <button
            class={`text-white px-4 py-2 rounded-full ml-4 ${
                activeTab === "Labs" ? "bg-blue-500" : "bg-gray-500"
            }`}
            on:click={() => (activeTab = "Labs")}>Laboratories</button
        >
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/message.svg"
            alt={get(hospitalInfo).hospitalInfo["name"] + " Logo"}
            class="margin h-10 w-12 transition-transform transform hover:scale-125"
            style="margin-left: auto;"
            on:click={() => (showModalMessageAdmin = true)}
        />
    </div>

    <!-- Doctor List -->
    <div class="container mx-auto mt-10 p-6 bg-white rounded shadow-2xl">
        {#if activeTab === "Doctors"}
            {#each uniqueSpecialities as specialityItem}
                <h2 class="text-xl font-semibold mb-4 text-purple-600">
                    {specialityItem}
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {#each doctorList.filter((doctor) => doctor.speciality === specialityItem) as doctor}
                        <div
                            class="flex items-center justify-between bg-gray-100 p-4 rounded shadow-2xl transition-transform transform hover:scale-105"
                        >
                            <div class="flex items-center space-x-4">
                                <img
                                    src={doctor["photo"]}
                                    alt={doctor["name"]}
                                    class="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 class="font-semibold">
                                        {doctor["name"]}
                                    </h3>
                                    <p>{doctor["degree"]}</p>
                                </div>
                            </div>
                            <button
                                class="bg-red-500 text-white p-1 rounded"
                                on:click={() => removeDoctor(doctor["id"])}
                                >Remove</button
                            >
                        </div>
                    {/each}
                </div>
            {/each}

            <button
                class="bg-green-500 text-white p-2 rounded mt-6 hover:bg-green-600"
                on:click={() => (showModal = true)}>Add Doctor</button
            >
        {:else if activeTab === "Labs"}
            <h2 class="text-xl font-semibold mb-4 text-purple-600">
                Laboratories
            </h2>
            <div class="flex flex-col space-y-2">
                {#each labList as lab}
                    <div
                        class="bg-gray-200 text-black rounded-lg m-1 px-4 py-2 hover:bg-gray-300 cursor-pointer"
                    >
                        <div>
                            Lab ID: {lab["id"]}
                        </div>
                        <div>
                            Lab Name: {lab["name"]}
                        </div>
                    </div>
                {/each}
            </div>
            <div class="mt-4">
                <input
                    type="text"
                    bind:value={labIDInput}
                    placeholder="Enter Lab ID"
                    class="border p-2 w-full rounded"
                />
                <button
                    class="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
                    on:click={addLab}>Add Lab</button
                >
            </div>
        {/if}
    </div>

    <!-- Modal -->
    {#if showModal}
        <div
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        >
            <div class="bg-white p-6 rounded shadow-none w-full max-w-md">
                <!-- Close Button -->
                <button
                    class="float-right p-2"
                    on:click={() => (showModal = false)}>&times;</button
                >

                <div
                    class="container mx-auto mt-10 p-6 bg-white rounded shadow-md max-w-md"
                >
                    <!-- Form -->
                    <form on:submit|preventDefault={addDoctor}>
                        <!-- Doctor Name -->
                        <!-- <div class="mb-4">
                            <label
                                for="doctorName"
                                class="block text-gray-700 font-medium mb-2"
                                >Doctor Name</label
                            >
                            <input
                                type="text"
                                name="name"
                                bind:value={doctorName}
                                class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div> -->

                        <!-- Doctor ID -->
                        <input
                            type="hidden"
                            name="hospitalId"
                            value={get(hospitalInfo).hospitalInfo["id"]}
                        />
                        <div class="mb-4">
                            <label
                                for="doctorID"
                                class="block text-gray-700 font-medium mb-2"
                                >Doctor ID</label
                            >
                            <input
                                type="text"
                                name="doctorId"
                                class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <!-- Speciality -->
                        <div class="mb-4">
                            <label
                                for="speciality"
                                class="block text-gray-700 font-medium mb-2"
                                >Speciality</label
                            >
                            <input
                                type="text"
                                name="speciality"
                                class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <!-- Degrees -->
                        <div class="mb-4">
                            <label for="degrees" class="block mb-2"
                                >Degrees</label
                            >
                            <input
                                type="text"
                                name="degrees"
                                on:keydown={handleDegreeInput}
                                placeholder="Enter degree and press Enter"
                                class="border p-2 w-full rounded"
                            />
                            <ul>
                                {#each degrees as degree (degree)}
                                    <li
                                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1"
                                    >
                                        {degree}
                                    </li>
                                {/each}
                            </ul>
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-4">
                            <button
                                type="submit"
                                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                >Submit</button
                            >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    {/if}
    {#if showModalLab}
        <div
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        >
            <div class="bg-white p-6 rounded w-full max-w-md">
                <button
                    class="float-right p-2"
                    on:click={() => (showModalLab = false)}>&times;</button
                >
                <form on:submit|preventDefault={addLab}>
                    <label
                        for="labID"
                        class="block text-gray-700 font-medium mb-2"
                        >Lab ID</label
                    >
                    <input
                        type="text"
                        id="labID"
                        bind:value={labIDInput}
                        class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                        >Submit</button
                    >
                </form>
            </div>
        </div>
    {/if}
    {#if showModalMessageAdmin}
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen">
                <div
                    class="bg-white rounded-lg p-8 m-2 w-full max-w-lg shadow-lg"
                >
                    <h2 class="text-2xl mb-4">Message Admin</h2>
                    <div class="space-y-4">
                        <!-- Textarea for the message -->
                        <textarea
                            class="textarea textarea-bordered w-full h-24"
                            placeholder="Your message..."
                            bind:value={adminMessage}
                        />
                        <!-- Buttons -->
                        <div class="flex justify-end space-x-4">
                            <button
                                class="btn btn-outline hover:bg-red-500"
                                on:click={() => (showModalMessageAdmin = false)}
                            >
                                Cancel
                            </button>
                            <button
                                class="btn btn-outline hover:bg-green-500"
                                on:click={sendMessageToAdmin}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
</style>
