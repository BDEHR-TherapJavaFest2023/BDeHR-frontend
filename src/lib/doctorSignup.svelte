<script>
    import { onMount } from "svelte";
    let doctorName = "";
    let doctorid = "";
    let bmdc = "";
    let dob = "";
    let address = "";
    let phoneNumber = "";
    let gender = "";
    let password = "";
    let mail = "";
    let profilePicture = null;

    let modal;

    function handleSubmit() {
        // Handle form submission here
        // You can access the form values using the above variables
        doctorid = "127SKU123MKSN"; // Replace this with your ID generation logic

        modal.classList.remove("hidden");
        console.log("Form submitted");
    }

    function copyToClipboard() {
        navigator.clipboard
            .writeText(doctorid)
            .then(() => {
                console.log("Text copied to clipboard");
            })
            .catch((err) => {
                console.error("Could not copy text: ", err);
            });
    }

    function goToLoginPage() {
        // Navigate to the login page. Adjust the URL to your requirement.
        window.location.href = "#/doctorlogin";
    }

    onMount(() => {
        modal.classList.add("hidden");
    });
</script>

<main
    class="flex justify-center items-center min-h-screen"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/orangeblur.jpg'); background-size: cover; backdrop-filter: blur(10px);"
>
    <div
        class="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-2xl"
        style="background-color: #FF9600;"
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
                    class="block text-black text-sm font-bold mb-2"
                    for="doctorName"
                >
                    Doctor Name
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="doctorName"
                    type="text"
                    placeholder="Enter Name"
                    bind:value={doctorName}
                />
            </div>

            <div class="mb-4">
                <label
                    class="block text-black text-sm font-bold mb-2"
                    for="bmdc"
                >
                    BMDC Number
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bmdc"
                    type="text"
                    placeholder="Enter BMDC Number"
                    bind:value={bmdc}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-black text-sm font-bold mb-2"
                    for="dob"
                >
                    Date of Birth
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="dob"
                    type="date"
                    placeholder="Enter Date of Birth"
                    bind:value={dob}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-black text-sm font-bold mb-2"
                    for="address"
                >
                    Address
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Enter Address"
                    bind:value={address}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-black text-sm font-bold mb-2"
                    for="phoneNumber"
                >
                    Phone Number
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phoneNumber"
                    type="text"
                    placeholder="Enter Phone Number"
                    bind:value={phoneNumber}
                />
            </div>

            <div class="mb-4">
                <label
                    class="block text-black text-sm font-bold mb-2"
                    for="mail"
                >
                    Email
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="mail"
                    type="text"
                    placeholder="Enter Email"
                    bind:value={mail}
                />
            </div>

            <div class="mb-4">
                <label class="block text-black text-sm font-bold mb-2"
                    >Gender</label
                >
                <div class="flex items-center">
                    <input
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
                    class="block text-black text-sm font-bold mb-2"
                    for="password"
                >
                    Password
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Type Password"
                    bind:value={password}
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-black text-sm font-bold mb-2"
                    for="profilePicture"
                >
                    Profile Picture
                </label>
                <input
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    bind:this={profilePicture}
                />
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="bg-slate-300 hover:bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
        </form>
    </div>
    <div bind:this={modal} class="fixed z-10 inset-0 overflow-y-auto hidden">
        <div class="flex items-end justify-center min-h-screen">
            <!-- Modal overlay that causes the blurring effect -->
            <div class="fixed inset-0 bg-gray-900 opacity-50" />

            <!-- Actual Modal -->
            <div
                class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-4 max-w-md mx-auto mt-20"
            >
                <!-- Modal Header -->
                <div
                    class="bg-green-500 text-white px-6 py-4 mb-4 rounded-t-lg"
                >
                    <h3 class="font-semibold text-xl">Signup Success</h3>
                </div>

                <!-- Modal Content -->
                <div class="mb-4 px-6 py-2">
                    <p class="text-gray-700 mb-4">
                        Congratulations on successfully signing up. Below is
                        your generated ID:
                    </p>
                    <p class="text-blue-600 font-bold">{doctorid}</p>
                </div>

                <!-- Modal Footer -->
                <div class="flex gap-4 px-6 py-4">
                    <button
                        on:click={copyToClipboard}
                        class="btn btn-outline btn-primary">Copy</button
                    >
                    <button on:click={goToLoginPage} class="btn btn-outline"
                        >Return</button
                    >
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* Add your custom styles here */
</style>
