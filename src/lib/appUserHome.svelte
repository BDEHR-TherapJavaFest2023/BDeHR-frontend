<script>
    import { onMount } from "svelte";

    let userData = {
        name: "Nazmus Sakib",
        dob: "2001-5-20",
        gender: "Male",
        user_id: "19047627",
        nid: "JDH67JDYU1",
        address: "Suhrawardy Hall, Dhaka",
        phone: "+8801759636379",
        email: "sakib@gmail.com",
        userImage:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    };
    let editMode = false;
    let selectedFile;

    function toggleEditMode() {
        editMode = !editMode;
        if (!editMode) {
            // Add your code here to save the updated userData to the server
        }
    }

    function handleFileChange(event) {
        selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            userData.userImage = reader.result;
        };
        reader.readAsDataURL(selectedFile);
    }

    function saveChanges() {
        // Upload image and other changes to the server here
        toggleEditMode();
    }

    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    }

    function navigateToLogin() {
        window.location.hash = `#/userlogin`;
    }
    function navigateToProfile() {
        window.location.hash = `#/appuser/home`;
    }
    function navigateToMedications() {
        window.location.hash = `#/appuser/medications`;
    }
    function navigateToReports() {
        window.location.hash = `#/appuser/reports`;
    }
    function navigateToFind() {
        window.location.hash = `#/appuser/find`;
    }
    function navigateToEntry() {
        window.location.hash = `#/appuser/entry`;
    }
</script>

<nav class="bg-white shadow-lg z-10 mb-4">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
            <!-- Logo Section -->
            <div class="flex items-center">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoshrt.png"
                    alt="Company Logo"
                    width={125}
                    height={30}
                    class="mx-2 my-0"
                />
            </div>

            <!-- Notification and Logout Section -->
            <div class="flex items-center space-x-4">
                <!-- Message Notification -->

                <!-- Logout Button -->
                <button
                    class="btn btn-outline btn-error"
                    on:click={navigateToLogin}>Logout</button
                >
            </div>
        </div>
    </div>
</nav>

<main class="bg-white min-h-screen flex overflow-auto">
    <!-- Navbar -->

    <!-- Sidebar -->
    <div class="w-64 bg-white relative shadow-lg py-4">
        <!-- Company Logo -->

        <!-- Menu Items -->
        <ul class="text-base font-semibold mt-2 ml-1">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
                class="flex items-center p-4 bg-green-400 cursor-default rounded-3xl"
                on:click={navigateToProfile}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userLogo.svg"
                    alt="Dashboard Icon"
                    class="w-6 h-6 mr-2"
                />
                Profile
            </li>
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToMedications}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pharmacy-prescription-icon.svg"
                    alt="Query Icon"
                    class="w-6 h-6 mr-2"
                />
                Medications
            </li>
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToReports}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/medical-report-icon.svg"
                    alt="Add New Hospital Icon"
                    class="w-6 h-6 mr-2"
                />
                Test Reports
            </li>
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToFind}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/location-sign.svg"
                    alt="Find a Hospital"
                    class="w-6 h-6 mr-2"
                />
                Find Hospital
            </li>
            <li
                class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
                on:click={navigateToEntry}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospital.svg"
                    alt="Find a Hospital"
                    class="w-6 h-6 mr-2"
                />
                Hospital Entry
            </li>
        </ul>
    </div>

    <!-- Main Dashboard Content -->
    <div class="flex-1 bg-white p-2 h-full flex-grow">
        <div class="container mx-auto p-8 md:p-16 bg-white rounded-lg">
            <div
                class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12"
            >
                <!-- Image Upload Section -->
                <div class="flex-none md:w-1/4 text-center">
                    <img
                        src={userData.userImage}
                        alt="User Image"
                        class="rounded-full w-50 h-50 mx-auto mb-4 object-cover"
                    />
                    {#if editMode}
                        <label
                            for="file-upload"
                            class="cursor-pointer underline">Change Photo</label
                        >
                        <input
                            id="file-upload"
                            type="file"
                            class="hidden"
                            accept="image/*"
                            on:change={handleFileChange}
                        />
                    {/if}
                </div>
                <!-- User Info Section -->
                <div class="flex-1 space-y-4">
                    <div class="space-y-1">
                        <!-- Add fields here. For example: -->
                        <div>
                            <input
                                type="text"
                                class="form-input text-6xl text-rose-700 font-bold"
                                bind:value={userData.name}
                                readonly={!editMode}
                            />
                        </div>
                        <div>
                            {#if editMode}
                                <input
                                    type="date"
                                    class="form-input"
                                    bind:value={userData.dob}
                                />
                            {:else}
                                <span
                                    class="text-3xl text-rose-700 font-semibold"
                                    >{calculateAge(userData.dob)} years old</span
                                >
                            {/if}

                            <span class="text-3xl text-rose-700 font-semibold"
                                >| {userData.gender}</span
                            >
                        </div>

                        <div>
                            <label class="block text-sm font-medium mt-8"
                                >User ID</label
                            >
                            <span class="text-2xl font-semibold"
                                >{userData.user_id}</span
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium mt-2"
                                >User NID</label
                            >
                            <span class="text-2xl font-semibold"
                                >{userData.nid}</span
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium mt-2"
                                >Address</label
                            >
                            <input
                                type="text"
                                class="form-input text-2xl font-semibold"
                                bind:value={userData.address}
                                readonly={!editMode}
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mt-2"
                                >Phone</label
                            >
                            <input
                                type="text"
                                class="form-input text-2xl font-semibold"
                                bind:value={userData.phone}
                                readonly={!editMode}
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mt-2"
                                >Email</label
                            >
                            <input
                                type="text"
                                class="form-input text-2xl font-semibold"
                                bind:value={userData.email}
                                readonly={!editMode}
                            />
                        </div>
                        <!-- Add other fields similarly -->
                    </div>
                    <div class="flex justify-end">
                        <button
                            class="btn btn-outline hover:bg-green-600"
                            on:click={editMode ? saveChanges : toggleEditMode}
                        >
                            {editMode ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
    main {
        font-family: "Helvetica Neue", ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, "Noto Sans",
            sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
    }
</style>
