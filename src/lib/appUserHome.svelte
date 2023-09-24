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

<main class="bg-gray-100 min-h-screen">
    <!-- Navbar -->

    <div class="flex">
        <!-- Sidebar -->
        <div class="w-64 h-screen bg-white fixed z-0 py-4">
            <!-- Company Logo -->
            <div class="text-center mb-10 mt-4">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                    alt="Company Logo"
                    class="w-32 mx-auto"
                />
            </div>

            <!-- Menu Items -->
            <ul class="text-base font-semibold">
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
        <div class="ml-64 w-full bg-white">
            <nav class="bg-white shadow-md mb-8 z-10">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center py-4">
                        <!-- Logo Section -->
                        <div class="flex items-center">
                            <img
                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogo.png"
                                alt="Company Logo"
                                width={125}
                                height={25}
                                class="mx-0 my-0"
                            />
                        </div>

                        <!-- Notification and Logout Section -->
                        <div class="flex items-center space-x-4">
                            <!-- Message Notification -->
                            <div class="relative">
                                <img
                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
                                    alt="Message Icon"
                                    class="h-6 w-6 transition-transform transform hover:scale-150"
                                />
                                <span
                                    class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >4</span
                                >
                                <!-- Number of unread messages -->
                            </div>

                            <!-- General Notification -->
                            <div class="relative">
                                <img
                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Notification.svg"
                                    alt="Notification Icon"
                                    class="h-6 w-6 transition-transform transform hover:scale-150"
                                />
                                <span
                                    class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >4</span
                                >
                                <!-- Number of unread notifications -->
                            </div>

                            <!-- Logout Button -->
                            <button
                                class="btn btn-outline btn-error"
                                on:click={navigateToLogin}>Logout</button
                            >
                        </div>
                    </div>
                </div>
            </nav>

            <div
                class="container mx-auto my-12 p-8 md:p-16 bg-white rounded-lg shadow-md"
            >
                <div
                    class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12"
                >
                    <!-- Image Upload Section -->
                    <div class="flex-none md:w-1/4 text-center">
                        <img
                            src={userData.userImage}
                            alt="User Image"
                            class="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
                        />
                        {#if editMode}
                            <label
                                for="file-upload"
                                class="cursor-pointer underline"
                                >Change Photo</label
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
                        <h1 class="text-4xl font-bold text-green-600">
                            Profile Information
                        </h1>
                        <div class="space-y-2">
                            <!-- Add fields here. For example: -->
                            <div>
                                <label class="block text-sm font-medium"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    class="form-input"
                                    bind:value={userData.name}
                                    readonly={!editMode}
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium"
                                    >{editMode ? "Date of Birth" : "Age"}</label
                                >
                                {#if editMode}
                                    <input
                                        type="date"
                                        class="form-input"
                                        bind:value={userData.dob}
                                    />
                                {:else}
                                    <span>{calculateAge(userData.dob)}</span>
                                {/if}
                            </div>
                            <div>
                                <label class="block text-sm font-medium"
                                    >Gender</label
                                >
                                <span>{userData.gender}</span>
                            </div>
                            <div>
                                <label class="block text-sm font-medium"
                                    >User ID</label
                                >
                                <span>{userData.user_id}</span>
                            </div>
                            <div>
                                <label class="block text-sm font-medium"
                                    >User NID</label
                                >
                                <span>{userData.nid}</span>
                            </div>
                            <div>
                                <label class="block text-sm font-medium"
                                    >Address</label
                                >
                                <input
                                    type="text"
                                    class="form-input"
                                    bind:value={userData.address}
                                    readonly={!editMode}
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium"
                                    >Phone</label
                                >
                                <input
                                    type="text"
                                    class="form-input"
                                    bind:value={userData.phone}
                                    readonly={!editMode}
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium"
                                    >Email</label
                                >
                                <input
                                    type="text"
                                    class="form-input"
                                    bind:value={userData.email}
                                    readonly={!editMode}
                                />
                            </div>
                            <!-- Add other fields similarly -->
                        </div>
                        <div class="flex justify-end">
                            <button
                                class="btn btn-outline hover:bg-green-600"
                                on:click={editMode
                                    ? saveChanges
                                    : toggleEditMode}
                            >
                                {editMode ? "Save" : "Edit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
</style>
