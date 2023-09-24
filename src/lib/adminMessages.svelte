<script>
    import { onMount } from "svelte";

    let Messages = [
        {
            hospitalName: "Dhaka Medical College",
            dateTime: "2022-09-01T12:30:00Z",
            MessageBody: "We need More Covid Vaccines",
        },
        {
            hospitalName: "Cumilla Medical College",
            dateTime: "2022-09-20T09:15:00Z",
            MessageBody: "We need More Doctors",
        },
        {
            hospitalName: "Chittagong Medical College",
            dateTime: "2022-09-20T12:35:00Z",
            MessageBody: "The dengue cases are rising",
        },
        {
            hospitalName: "Rangpur Medical College",
            dateTime: "2022-09-20T09:15:00Z",
            MessageBody: "We need to organize a seminar",
        },
        // add more messages like this
    ];
    Messages.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    function navigateToDashboard() {
        window.location.hash = `#/adminhome`;
    }
    function navigateToQuery() {
        window.location.hash = `#/adminhome/query`;
    }
    function navigateToAddHospital() {
        window.location.hash = `#/adminhome/addhospital`;
    }
    function navigateToMessages() {
        window.location.hash = `#/adminhome/messages`;
    }
    function navigateToLogin() {
        window.location.hash = `#/adminlogin`;
    }
</script>

<main class="bg-gray-100 min-h-screen">
    <!-- Navbar -->

    <div class="flex">
        <!-- Sidebar -->
        <div class="w-64 h-screen bg-white shadow-md fixed z-0 py-4">
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
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToDashboard}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dashboard.svg"
                        alt="Dashboard Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Dashboard
                </li>

                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToQuery}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/analytic.svg"
                        alt="Query Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Query
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToAddHospital}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospital.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Add New Hospital
                </li>
                <li
                    class="flex items-center p-4 bg-red-400 cursor-default"
                    on:click={navigateToMessages}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/message.svg"
                        alt="Messages Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Messages
                </li>
            </ul>
        </div>

        <!-- Main Dashboard Content -->
        <div class="ml-64 w-full">
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
                                    on:click={navigateToMessages}
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
                                    on:click={navigateToAddHospital}
                                />
                                <span
                                    class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >4</span
                                >
                                <!-- Number of unread notifications -->
                            </div>

                            <!-- Logout Button -->
                            <button class="btn btn-outline btn-error" on:click={navigateToLogin}
                                >Logout</button
                            >
                        </div>
                    </div>
                </div>
            </nav>
            <h1 class="container mx-8 text-3xl font-extrabold text-blue-600">
                Messages
            </h1>
            <div class="container px-4 mt-8">
                <div class="space-y-4 overflow-y-auto max-h-[70vh]">
                    {#each Messages as { hospitalName, dateTime, MessageBody }}
                        <div class="bg-white rounded-lg shadow-md p-4">
                            <h2 class="text-xl font-semibold text-blue-600">
                                {hospitalName}
                            </h2>
                            <p class="text-sm text-gray-500">
                                {new Date(dateTime).toLocaleString()}
                            </p>
                            <div
                                class="mt-2 p-3 rounded-full bg-blue-100 inline-block"
                            >
                                <p class="text-base whitespace-pre-line">
                                    {MessageBody}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
</style>
