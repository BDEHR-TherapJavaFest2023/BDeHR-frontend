<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { supabase } from "./supabaseClient";
    import { serverUrl } from "./constants";
    let username = "";
    let nid = "";
    let dob = "";
    let address = "";
    let phoneNumber = "";
    let gender = "";
    let password = "";
    let mail = "";
    let profilePicture;

    let showModal = false;
    let userID = "";

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(userID);
            toast.success("User ID copied to clipboard");
        } catch (err) {
            toast.error("Failed to copy User ID");
        }
    }

    async function setDefaultPhoto(id) {
        let { data: res1 } = await supabase.storage
            .from("userPhoto")
            .copy("default.png", id);

        let { data: res2 } = await supabase.storage
            .from("userPhoto")
            .getPublicUrl(id);
        return res2;
    }

    async function uploadDefaultPhoto(id, photo) {
        await setDefaultPhoto(id).then((response) => {
            let payload = { id: id, url: response["publicUrl"] };

            fetch(serverUrl + "user/change-photo", {
                method: "POST",
                body: JSON.stringify(payload),
            });
        });
    }

    async function setCustomPhoto(id, photo) {
        let { data: res1 } = await supabase.storage
            .from("userPhoto")
            .copy("default.png", id);

        let { data: res2 } = await supabase.storage
            .from("userPhoto")
            .update(id, photo, {
                cacheControl: "0",
                upsert: true,
            });

        let { data: res3 } = await supabase.storage
            .from("userPhoto")
            .getPublicUrl(id);

        return res3;
    }

    async function uploadCustomPhoto(id, photo) {
        await setCustomPhoto(id, photo).then((response) => {
            let payload = { id: id, url: response["publicUrl"] };

            fetch(serverUrl + "user/change-photo", {
                method: "POST",
                body: JSON.stringify(payload),
            });
        });
    }

    async function handleSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);

        console.log(formData.get("photo")["name"]);

        await fetch(serverUrl + "user/signup", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let ret = +data;
                console.log(ret);

                //Signup Failed
                if (ret == 0) {
                    console.log("hoynai");
                    toast.error("Signup Failed 🙁");
                }
                //Signup Successful
                else {
                    console.log("hoise");
                    if (formData.get("photo")["name"] === "") {
                        uploadDefaultPhoto(data);
                    } else {
                        uploadCustomPhoto(data, formData.get("photo"));
                    }

                    userID = data;
                    showModal = true;
                    
                    //window.location.hash = `#/userlogin`;
                }
            });

        form.reset();
    }
</script>

<Toaster />
<main
    class="flex justify-center items-center min-h-screen"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/blurblue.jpg'); background-size: cover; backdrop-filter: blur(0px);"
>
    <div
        class="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        style="background-color: #B1E6F3 ;"
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
                    for="username"
                >
                    User Name<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    placeholder="User Name"
                    bind:value={username}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="nid"
                >
                    NID Number<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="nid"
                    type="text"
                    placeholder="NID Number"
                    bind:value={nid}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="dob"
                >
                    Date of Birth<span class="text-red-600">*</span>
                </label>
                <input
                    required
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    bind:value={dob}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="address"
                >
                    Address
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="address"
                    type="text"
                    placeholder="Address"
                    bind:value={address}
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
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    Email
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="text"
                    placeholder="Email"
                    bind:value={mail}
                />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                    >Gender<span class="text-red-600">*</span>
                </label>
                <div class="flex items-center">
                    <input
                        required
                        class="mr-2 leading-tight"
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        bind:group={gender}
                    />
                    <label class="text-sm" for="male">Male</label>
                    <input
                        class="mx-4 leading-tight"
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        bind:group={gender}
                    />
                    <label class="text-sm" for="female">Female</label>
                    <input
                        class="mx-4 leading-tight"
                        type="radio"
                        id="other"
                        name="gender"
                        value="other"
                        bind:group={gender}
                    />
                    <label class="text-sm" for="other">Rather Not Say</label>
                </div>
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
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    placeholder="Password"
                    bind:value={password}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="profilePicture"
                >
                    Profile Picture
                </label>
                <input
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="photo"
                    type="file"
                    accept="image/*"
                    bind:value={profilePicture}
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
                <h2 class="text-xl font-bold mb-2">Signup Successful</h2>
                <p>Your User ID: {userID}</p>
                <div class="mt-4">
                    <button
                        class="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                        on:click={copyToClipboard}>Copy</button
                    >
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                        on:click={() => (window.location.hash = `#/userlogin`)}
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
