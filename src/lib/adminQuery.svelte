<script>
    import { onMount } from "svelte";
    import { Chart } from "chart.js/auto";
    //import reactive from "svelte";
    import L from "leaflet";
    import "leaflet.heat"; // for heatmap support
    import "leaflet/dist/leaflet.css";

    let selectedFilter = "";
    let yValuesBarGraph = [];
    let yValuesLineGraph = [];
    let showMap = false;
    let map;
    let heat;
    let chart;
    let chart2;
    let isChartVisible = false;
    let isLineChartVisible = false;
    let tempValue = "";
    let diseaseName = ""; // Dummy field for Disease Name
    let ageFrom = 0; // Dummy field for Age From
    let ageTo = 100; // Dummy field for Age To
    let gender = ""; // Dummy field for Gender
    const Patients = [
        {
            age: 20,
            cancer: 10,
            diabetes: 200,
            stroke: 15,
        },
        {
            age: 25,
            cancer: 29,
            diabetes: 1100,
            stroke: 98,
        },
        {
            age: 30,
            cancer: 90,
            diabetes: 1500,
            stroke: 250,
        },
        {
            age: 35,
            cancer: 200,
            diabetes: 2000,
            stroke: 300,
        },
        {
            age: 40,
            cancer: 270,
            diabetes: 2200,
            stroke: 360,
        },
        {
            age: 45,
            cancer: 300,
            diabetes: 2500,
            stroke: 400,
        },
        {
            age: 50,
            cancer: 260,
            diabetes: 2700,
            stroke: 430,
        },
        {
            age: 55,
            cancer: 270,
            diabetes: 2670,
            stroke: 400,
        },
        {
            age: 60,
            cancer: 290,
            diabetes: 2670,
            stroke: 900,
        },
    ];

    const colors = [
        { background: "rgba(255, 0, 0, 0.2)", border: "rgba(255, 0, 0, 1)" },
        { background: "rgba(0, 255, 0, 0.2)", border: "rgba(0, 255, 0, 1)" },
        { background: "rgba(0, 0, 255, 0.2)", border: "rgba(0, 0, 255, 1)" },
        {
            background: "rgba(255, 0, 255, 0.2)",
            border: "rgba(255, 0, 255, 1)",
        },
        {
            background: "rgba(0, 255, 255, 0.2)",
            border: "rgba(0, 255, 255, 1)",
        },
        {
            background: "rgba(255, 255, 0, 0.2)",
            border: "rgba(255, 255, 0, 1)",
        },
        // Add more colors as needed
    ];

    function generateBarGraph() {
        let labels = Patients.map((p) => p.age);
        let datasets = [];

        let colorIndex = 0;
        for (const field of yValuesBarGraph) {
            if (Patients[0].hasOwnProperty(field)) {
                let data = Patients.map((p) => p[field]);

                // Use the current color from the colors array, and move to the next one
                const currentColor = colors[colorIndex];
                datasets.push({
                    label: field,
                    data: data,
                    backgroundColor: currentColor.background,
                    borderColor: currentColor.border,
                    borderWidth: 1,
                });

                // Increment the color index, loop back to 0 if we go past the end of the array
                colorIndex = (colorIndex + 1) % colors.length;
            }
        }

        const ctx = document.getElementById("myBarChart").getContext("2d");
        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                },
            },
        });
    }
    function generateLineGraph() {
        let labels = Patients.map((p) => p.age);
        let datasets = [];

        // Define an array of colors to use for different datasets.

        let colorIndex = 0;
        for (const field of yValuesLineGraph) {
            if (Patients[0].hasOwnProperty(field)) {
                let data = Patients.map((p) => p[field]);

                // Use the current color from the colors array, and move to the next one
                const currentColor = colors[colorIndex];
                datasets.push({
                    label: field,
                    data: data,
                    fill: false,
                    backgroundColor: currentColor.background,
                    borderColor: currentColor.border,
                    borderWidth: 1,
                });

                // Increment the color index, loop back to 0 if we go past the end of the array
                colorIndex = (colorIndex + 1) % colors.length;
            }
        }

        const ctx = document.getElementById("myLineChart").getContext("2d");
        chart2 = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                },
            },
        });
    }

    function handleMapSubmit() {
        // Add any logic to validate or process the form data, if needed.
        showMap = true; // Set the map to be visible
        isLineChartVisible = false;
        isChartVisible = false;
        generateMap(); // Function call to generate the map
    }
    function handleBarDiagramSubmit() {
        isChartVisible = true;
        isLineChartVisible = false;
        showMap = false;
        generateBarGraph();
    }
    function handleLineDiagramSubmit() {
        isChartVisible = false;
        isLineChartVisible = true;
        showMap = false;
        generateLineGraph();
    }
    function generateMap() {
        // Initialize the map
        const map = L.map("mapId").setView([23.685, 90.3563], 7); // Set view to Bangladesh

        // Add tile layer from OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        // Loop through each hospital and plot on map
        for (const hospital of hospitals) {
            // Create a circle marker based on count
            const circle = L.circle([hospital.latitude, hospital.longitude], {
                color: "red",
                fillColor: "red",
                fillOpacity: 0.5,
                radius: Math.sqrt(hospital.count) * 500, // Radius proportional to sqrt of count
            }).addTo(map);

            // Bind popup to show hospital name and count
            circle.bindPopup(
                `<b>${hospital.name}</b><br>Count: ${hospital.count}`
            );
        }
    }

    const hospitals = [
        {
            name: "Dhaka Medical College",
            latitude: 23.726,
            longitude: 90.3976,
            count: 1200,
        },
        {
            name: "Cumilla Medical College",
            latitude: 23.4515,
            longitude: 91.203,
            count: 1010,
        },
        {
            name: "Chittagong Medical College",
            latitude: 22.3593,
            longitude: 91.8308,
            count: 120,
        },
        {
            name: "Sylhet Medical College",
            latitude: 24.9014962,
            longitude: 91.8536165,
            count: 100,
        },
        {
            name: "Rajshahi Medical College",
            latitude: 24.372,
            longitude: 88.5864,
            count: 1300,
        },
        {
            name: "Barisal Medical College",
            latitude: 22.6865,
            longitude: 90.3613,
            count: 1000,
        },
        {
            name: "Mymensingh Medical College",
            latitude: 24.7418,
            longitude: 90.4094,
            count: 750,
        },
        {
            name: "Khulna Medical College",
            latitude: 22.8285,
            longitude: 89.5382,
            count: 1500,
        },
        {
            name: "Rangpur Medical College",
            latitude: 25.7666,
            longitude: 89.2338,
            count: 90,
        },
        {
            name: "Bogra Medical College",
            latitude: 24.8279,
            longitude: 89.3529,
            count: 80,
        },
        {
            name: "Pabne Medical College",
            latitude: 24.0045,
            longitude: 89.209,
            count: 110,
        },
        {
            name: "Patuakhali Medical College",
            latitude: 22.3623,
            longitude: 90.327,
            count: 1230,
        },
        {
            name: "Cox's Bazar Medical College",
            latitude: 21.4202,
            longitude: 92.0149,
            count: 520,
        },
        {
            name: "Noakhali Medical College",
            latitude: 22.9515,
            longitude: 91.1038,
            count: 100,
        },
        {
            name: "Sirajganj Medical College",
            latitude: 24.4489,
            longitude: 89.6738,
            count: 100,
        },
    ];
    function handleEnterKey(event, targetArray) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (tempValue.trim() !== "") {
                if (targetArray === "bar") {
                    yValuesBarGraph = [...yValuesBarGraph, tempValue.trim()];
                } else if (targetArray === "line") {
                    yValuesLineGraph = [...yValuesLineGraph, tempValue.trim()];
                }
                tempValue = "";
            }
        }
        if (targetArray === "bar" && isChartVisible) {
            chart.destroy();
            generateBarGraph();
        }
        if (targetArray === "line" && isLineChartVisible) {
            chart2.destroy();
            generateLineGraph();
        }
    }
    function removeValue(index, targetArray) {
        if (targetArray === "bar") {
            yValuesBarGraph.splice(index, 1);
            yValuesBarGraph = [...yValuesBarGraph];
        } else if (targetArray === "line") {
            yValuesLineGraph.splice(index, 1);
            yValuesLineGraph = [...yValuesLineGraph];
        }
        if (targetArray === "bar" && isChartVisible) {
            chart.destroy();
            generateBarGraph();
        }
        if (targetArray === "line" && isLineChartVisible) {
            chart2.destroy();
            generateLineGraph();
        }
    }
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
                    class="flex items-center p-4 bg-red-400 cursor-default"
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
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
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
        <div class="ml-64 w-full">
            <nav class=" bg-white shadow-md mb-8 z-10">
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
                            <button class="btn btn-outline btn-error"on:click={navigateToLogin}
                                >Logout</button
                            >
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Main Dashboard Content -->
            <div class="w-full flex flex-row">
                <div class="w-3/4">
                    <h1
                        class="container mx-8 text-3xl font-extrabold text-blue-600"
                    >
                        Run Query
                    </h1>
                    {#if showMap}
                        <div class="mx-8" id="mapId" />
                    {/if}
                    {#if isChartVisible}
                        <canvas id="myBarChart" width="400" height="200" />
                    {/if}
                    {#if isLineChartVisible}
                        <canvas id="myLineChart" width="400" height="200" />
                    {/if}

                    <!-- Existing Navbar and Main Content -->
                    <!-- ... -->
                </div>
                <div
                    class="w-1/4 bg-red-400 rounded-xl shadow-md h-screen right-0 z-20"
                >
                    <div class="p-4">
                        <h2 class="text-lg font-semibold mb-4">
                            Filter Options
                        </h2>
                        <div class="relative">
                            <select
                                class="w-full bg-gray-200 p-2 rounded"
                                bind:value={selectedFilter}
                            >
                                <option disabled>Select Filter</option>
                                <option value="hitmap">Hit Map</option>
                                <option value="bargraph">Bar Graph</option>
                                <option value="linegraph">Line Graph</option>
                            </select>
                        </div>
                        {#if selectedFilter === "hitmap"}
                            <div class="mt-4">
                                <input
                                    bind:value={diseaseName}
                                    class="w-full p-2 mb-2 bg-gray-200 rounded"
                                    placeholder="Disease Name"
                                />
                                <div class="flex space-x-2">
                                    <input
                                        bind:value={ageFrom}
                                        class="w-1/2 p-2 bg-gray-200 rounded"
                                        placeholder="Age From"
                                        type="number"
                                    />
                                    <input
                                        bind:value={ageTo}
                                        class="w-1/2 p-2 bg-gray-200 rounded"
                                        placeholder="Age To"
                                        type="number"
                                    />
                                </div>
                                <select
                                    bind:value={gender}
                                    class="w-full mt-2 p-2 bg-gray-200 rounded"
                                >
                                    <option disabled>Gender</option>
                                    <option>Regardless</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                <button
                                    on:click={handleMapSubmit}
                                    class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                                    >Submit</button
                                >
                            </div>
                        {/if}

                        <!-- Bar Graph Form Fields -->
                        <!-- Bar Graph Form Fields -->
                        <!-- Bar Graph Form Fields -->
                        {#if selectedFilter === "bargraph"}
                            <div class="mt-4">
                                <input
                                    class="w-full p-2 mb-2 bg-gray-200 rounded"
                                    placeholder="X-axis"
                                />
                                <input
                                    class="w-full p-2 mb-4 bg-gray-200 rounded"
                                    placeholder="Y-axis (Press Enter to add)"
                                    bind:value={tempValue}
                                    on:keydown={(e) => handleEnterKey(e, "bar")}
                                />

                                <!-- List of Added Values -->
                                <div class="mt-2 flex flex-wrap">
                                    {#each yValuesBarGraph as value, i}
                                        <div
                                            class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
                                        >
                                            {value}
                                            <button
                                                class="ml-2 text-red-500"
                                                on:click={() =>
                                                    removeValue(i, "bar")}
                                                >x</button
                                            >
                                        </div>
                                    {/each}
                                </div>
                                <button
                                    on:click={handleBarDiagramSubmit}
                                    class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                                    >Submit</button
                                >
                            </div>
                        {/if}

                        <!-- Line Graph Form Fields -->
                        {#if selectedFilter === "linegraph"}
                            <div class="mt-4">
                                <input
                                    class="w-full p-2 mb-2 bg-gray-200 rounded"
                                    placeholder="X-axis"
                                />
                                <input
                                    class="w-full p-2 mb-4 bg-gray-200 rounded"
                                    placeholder="Y-axis (Press Enter to add)"
                                    bind:value={tempValue}
                                    on:keydown={(e) =>
                                        handleEnterKey(e, "line")}
                                />

                                <!-- List of Added Values -->
                                <div class="mt-2 flex flex-wrap">
                                    {#each yValuesLineGraph as value, i}
                                        <div
                                            class="bg-blue-200 text-blue-700 rounded-full px-4 py-1 m-1 flex items-center"
                                        >
                                            {value}
                                            <button
                                                class="ml-2 text-red-500"
                                                on:click={() =>
                                                    removeValue(i, "line")}
                                                >x</button
                                            >
                                        </div>
                                    {/each}
                                </div>
                                <button
                                    on:click={handleLineDiagramSubmit}
                                    class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                                    >Submit</button
                                >
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
    #mapId {
        height: 400px;
    }
</style>
