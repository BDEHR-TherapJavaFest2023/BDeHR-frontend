<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { supabase } from "./supabaseClient";
    import { serverUrl } from "./constants";
    import { onMount } from "svelte";
    let hospitalName = "";
    let hospitalid = "";
    let established = "";
    let numDepartments = 2;
    let departments = [];
    let labInstruments = [];
    let latitude = "";
    let longitude = "";
    let address = "";
    let phoneNumber = "";
    let password = "";
    let authPassword = "";
    let mail = "";
    let hospitalPicture = "";
    let hospitalLogo = "";

    let showModal = false;

    let tempValue = "";
    let tempValue2 = "";

    // $:{console.log(departments);console.log(labInstruments)}

    async function setCustomPhoto(id, photo) {
        let { data: res1 } = await supabase.storage
            .from("hospitalPhoto")
            .upload(id, photo, {
                cacheControl: "0",
                upsert: true,
            });

        let { data: res2 } = await supabase.storage
            .from("hospitalPhoto")
            .getPublicUrl(id);

        return res2;
    }

    async function uploadPhotoAndLogo(id, photo, logo) {
        await setCustomPhoto(id, photo).then((response) => {
            uploadCustomLogo(id, logo, response);
        });
    }

    async function setCustomLogo(id, logo) {
        let { data: res1 } = await supabase.storage
            .from("hospitalLogo")
            .upload(id, logo, {
                cacheControl: "0",
                upsert: true,
            });

        let { data: res2 } = await supabase.storage
            .from("hospitalLogo")
            .getPublicUrl(id);

        return res2;
    }

    async function uploadCustomLogo(id, logo, response1) {
        await setCustomLogo(id, logo).then((response2) => {
            let payload = { id: id, urlPhoto: response1["publicUrl"],urlLogo: response2["publicUrl"] };

            fetch(serverUrl + "hospital-request/change-photo-logo", {
                method: "POST",
                body: JSON.stringify(payload),
            });
        });
    }

    async function addLab(name, hospitalId, password){
        let payload = {name: name, hospitalId: hospitalId, password: password}
        await fetch(serverUrl + "lab/add-lab", {
            method: "POST",
            body: JSON.stringify(payload),
        })
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(hospitalid);
            toast.success("Hospital ID copied to clipboard");
        } catch (err) {
            toast.error("Failed to copy Hospital ID");
        }
    }

    function handleEnterKey(event, targetArray) {
        if (event.keyCode === 13) {
            event.preventDefault();

            if (tempValue.trim() !== "") {
                if (targetArray === "dept") {
                    departments = [...departments, tempValue.trim()];
                }
                tempValue = "";
            }
        }
    }
    function removeValue(index, targetArray) {
        if (targetArray === "dept") {
            departments.splice(index, 1);
            departments = [...departments];
        }
    }
    function handleEnterKey2(event, targetArray) {
        if (event.keyCode === 13) {
            event.preventDefault();

            if (tempValue2.trim() !== "") {
                if (targetArray === "instr") {
                    labInstruments = [...labInstruments, tempValue2.trim()];
                }
                tempValue2 = "";
            }
        }
    }
    function removeValue2(index, targetArray) {
        if (targetArray === "instr") {
            labInstruments.splice(index, 1);
            labInstruments = [...labInstruments];
        }
    }

    async function handleSubmit(event) {
        if (departments.length < numDepartments) {
            toast.error("Please add " + numDepartments + " departments");
            return;
        }
        if (departments.length > numDepartments) {
            toast.error("Please Increase your Number of Department");
            return;
        }
        if (labInstruments.length === 0) {
            toast.error("Please at least add 1 instrument");
            return;
        }

        const form = event.target;
        const formData = new FormData(form);

        formData.append("deptList", departments.toString());
        formData.append("labList", labInstruments.toString());

        // console.log(formData.get("deptList"));
        let labList = formData.get("labList").split(",");

        await fetch(serverUrl + "hospital-request/request", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);

                //Signup Failed
                if (data === "0") {
                    toast.error("Signup Failed 🙁");
                }
                //Signup Successful
                else {
                    uploadPhotoAndLogo(data, formData.get("photo"),formData.get("logo"));

                    for(let i=0;i<labList.length;i++){
                        addLab(labList[i],data,formData.get("password"))
                    }

                    hospitalid = data;
                    showModal = true;
                    // window.location.hash = `#/doctorlogin`;
                }
            });

        form.reset();
        //Fetch from db

        //window.location.hash = `#/userlogin`;
    }

</script>

<Toaster />
<main
    class="flex justify-center items-center min-h-screen"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/blurGreen.jpg'); background-size: cover; backdrop-filter: blur(0px);"
>
    <div
        class="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        style="background-color: #8BFD6C ;"
    >
        <div class="flex justify-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogo.png"
                alt="Album"
                width={145}
                height={20}
            />
        </div>
        <h2 class="text-2xl text-center font-bold mb-4">Sign Up</h2>
        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="hospitalName"
                >
                    Hospital Name<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    placeholder="Enter Hospital's Name"
                    bind:value={hospitalName}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="established"
                >
                    Established<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="dob"
                    type="text"
                    placeholder="Enter Year of Establishment"
                    bind:value={established}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="numDepartments"
                >
                    Number of Departments<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="numDept"
                    type="number"
                    placeholder="How many departments in your hospital?"
                    bind:value={numDepartments}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="departments"
                >
                    Departments<span class="text-red-600">*</span>
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Departments(Press Enter for multiple)"
                    bind:value={tempValue}
                    on:keydown={(e) => handleEnterKey(e, "dept")}
                />

                <!-- List of Added Values -->
                <div class="mt-2 flex flex-wrap">
                    {#each departments as value, i}
                        <div
                            class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
                        >
                            {value}
                            <button
                                class="ml-2 text-red-500"
                                on:click={() => removeValue(i, "dept")}
                                >x</button
                            >
                        </div>
                    {/each}
                </div>
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="labInstruments"
                >
                    Lab Instruments<span class="text-red-600">*</span>
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Lab Machinaries(Press Enter for multiple)"
                    bind:value={tempValue2}
                    on:keydown={(e) => handleEnterKey2(e, "instr")}
                />

                <!-- List of Added Values -->
                <div class="mt-2 flex flex-wrap">
                    {#each labInstruments as value, i}
                        <div
                            class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
                        >
                            {value}
                            <button
                                class="ml-2 text-red-500"
                                on:click={() => removeValue2(i, "instr")}
                                >x</button
                            >
                        </div>
                    {/each}
                </div>
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="address"
                >
                    Address<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                    bind:value={address}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="latitude"
                >
                    Latitude<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="latitude"
                    type="text"
                    placeholder="Enter latitude"
                    bind:value={latitude}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="longitude"
                >
                    Longitude<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="longitude"
                    type="text"
                    placeholder="Enter longitude"
                    bind:value={longitude}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="phoneNumber"
                >
                    Phone Number<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="phone"
                    type="number"
                    placeholder="Phone Number"
                    bind:value={phoneNumber}
                />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="mail"
                >
                    Email<span class="text-red-600">*</span>
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="text"
                    placeholder="Email"
                    bind:value={mail}
                />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password"
                >
                    Password
                    <span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    placeholder="Password"
                    bind:value={password}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="authPassword"
                >
                    Authority Password<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="authPassword"
                    type="authPassword"
                    placeholder="Authority Password"
                    bind:value={authPassword}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="hospitalPicture"
                >
                    Hospital Picture<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="photo"
                    type="file"
                    accept="image/*"
                    bind:value={hospitalPicture}
                />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="hospitalLogo"
                >
                    Hospital Logo<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="logo"
                    type="file"
                    accept="image/*"
                    bind:value={hospitalLogo}
                />
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
        </form>
    </div>
    {#if showModal}
        <div
            class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        >
            <div class="bg-white p-4 rounded shadow-md">
                <h2 class="text-2xl bg-yellow-400 font-bold mb-2">
                    Signup Successful
                </h2>
                <p>Your Hospital ID: {hospitalid}</p>
                <div class="mt-4">
                    <button
                        class="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                        on:click={copyToClipboard}>Copy</button
                    >
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                        on:click={() =>
                            (window.location.hash = `#/hospitalogin`)}
                        >Return</button
                    >
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    /* Add your custom styles here */
</style>
