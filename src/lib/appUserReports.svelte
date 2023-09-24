<script>
    import { onMount } from "svelte";

    let Reports = [
        {
            name: "United Hospitals Dhaka",
            date: "2023-09-20",
            fileUrl:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/1905061_report.pdf",
        },
        {
            name: "Popular Hospitals Dhaka",
            date: "2023-09-17",
            fileUrl:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/1905061_report.pdf",
        },
    ];

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
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer rounded-3xl"
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
                    class="flex items-center p-4 bg-green-400 cursor-default rounded-3xl"
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

                            <!-- Logout Button -->
                            <button
                                class="btn btn-outline btn-error"
                                on:click={navigateToLogin}>Logout</button
                            >
                        </div>
                    </div>
                </div>
            </nav>
            <h1 class="text-3xl text-green-600 font-bold mb-6">Test Reports</h1>
            <div class="space-y-6">
                {#each Reports as medication}
                    <div
                        class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg"
                    >
                        <div class="flex justify-between items-center">
                            <div class="flex-1">
                                <h2 class="text-xl font-semibold">
                                    {medication.name}
                                </h2>
                                <p class="text-gray-600 text-sm">
                                    Date: {medication.date}
                                </p>
                            </div>
                            <div class="flex-initial">
                                <a
                                    href={medication.fileUrl}
                                    target="_blank"
                                    class="btn btn-outline hover:bg-green-600"
                                >
                                    View Report
                                </a>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
</style>
