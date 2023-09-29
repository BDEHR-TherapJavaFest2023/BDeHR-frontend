<script>
    import { onMount } from "svelte";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import "leaflet-heatmap";
    import "leaflet.heat";
    import { fly } from "svelte/transition";
    import * as d3 from "d3";
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";

    const categories = ["Users", "Doctors", "Hospitals"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May"];
    const data = [
        { month: "Jan", Users: 400, Doctors: 200, Hospitals: 100 },
        { month: "Feb", Users: 300, Doctors: 150, Hospitals: 120 },
        { month: "Mar", Users: 320, Doctors: 160, Hospitals: 110 },
        { month: "Apr", Users: 310, Doctors: 170, Hospitals: 50 },
        { month: "May", Users: 390, Doctors: 190, Hospitals: 30 },
        { month: "Jun", Users: 350, Doctors: 120, Hospitals: 60 },
        { month: "Jul", Users: 410, Doctors: 140, Hospitals: 50 },
        { month: "Aug", Users: 400, Doctors: 100, Hospitals: 20 },
    ];
    const data2 = [
        { month: "Jan", Birth: 2000, Death: 1000 },
        { month: "Feb", Birth: 1500, Death: 1200 },
        { month: "Mar", Birth: 1600, Death: 1100 },
        { month: "Apr", Birth: 1700, Death: 900 },
        { month: "May", Birth: 1900, Death: 1300 },
        { month: "Jun", Birth: 1200, Death: 1000 },
        { month: "Jul", Birth: 1400, Death: 1100 },
        { month: "Aug", Birth: 1000, Death: 500 },
    ];

    function setBarHeight(node, { category, index }) {
        onMount(() => {
            node.style.height = `${data[category][index]}px`;
        });
    }
    setTimeout(() => {
        const bars = document.querySelectorAll(".bar");
        bars.forEach((bar, index) => {
            const category = categories[index % categories.length];
            const monthIndex = Math.floor(index / categories.length);
            bar.style.height = `${data[category][monthIndex]}px`;
        });
    }, 0);

    // let hospitals = [
    //     {
    //         name: "Dhaka Medical College",
    //         latitude: 23.726,
    //         longitude: 90.3976,
    //     },
    //     {
    //         name: "Apollo Hospitals Dhaka",
    //         latitude: 23.7705,
    //         longitude: 90.3631,
    //     },
    //     {
    //         name: "Square Hospitals Ltd",
    //         latitude: 23.7392,
    //         longitude: 90.394,
    //     },
    //     {
    //         name: "Cumilla Medical College",
    //         latitude: 23.4515,
    //         longitude: 91.203,
    //     },
    //     {
    //         name: "Chittagong Medical College",
    //         latitude: 22.3593,
    //         longitude: 91.8308,
    //     },
    //     {
    //         name: "Sylhet Medical College",
    //         latitude: 24.9014962,
    //         longitude: 91.8536165,
    //     },
    //     {
    //         name: "Rajshahi Medical College",
    //         latitude: 24.372,
    //         longitude: 88.5864,
    //     },
    //     {
    //         name: "Rajshahi Medical College",
    //         latitude: 24.372,
    //         longitude: 88.5864,
    //     },
    //     {
    //         name: "Barisal Medical College",
    //         latitude: 22.6865,
    //         longitude: 90.3613,
    //     },
    //     {
    //         name: "Mymensingh Medical College",
    //         latitude: 24.7418,
    //         longitude: 90.4094,
    //     },
    //     {
    //         name: "Khulna Medical College",
    //         latitude: 22.8285,
    //         longitude: 89.5382,
    //     },
    //     {
    //         name: "Rangpur Medical College",
    //         latitude: 25.7666,
    //         longitude: 89.2338,
    //     },
    //     {
    //         name: "Bogra Medical College",
    //         latitude: 24.8279,
    //         longitude: 89.3529,
    //     },
    //     {
    //         name: "Pabne Medical College",
    //         latitude: 24.0045,
    //         longitude: 89.209,
    //     },
    //     {
    //         name: "Patuakhali Medical College",
    //         latitude: 22.3623,
    //         longitude: 90.327,
    //     },
    //     {
    //         name: "Cox's Bazar Medical College",
    //         latitude: 21.4202,
    //         longitude: 92.0149,
    //     },
    //     {
    //         name: "Noakhali Medical College",
    //         latitude: 22.9515,
    //         longitude: 91.1038,
    //     },
    //     {
    //         name: "Sirajganj Medical College",
    //         latitude: 24.4489,
    //         longitude: 89.6738,
    //     },
    //     // Add more hospitals with actual data for Bangladesh
    // ];

    $: hospitals = [];

    async function getAllLocation() {
        await fetch(serverUrl + "hospital/get-all-location")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                hospitals = [];
                for (let i = 0; i < Object.keys(data).length; i++) {
                    hospitals.push(JSON.parse(data[i]));
                }
                console.log(hospitals);

                animateValue(
                    0,
                    targetUserCount,
                    1000,
                    1537,
                    (val) => (userCount = val)
                );
                animateValue(
                    0,
                    targetHospitalCount,
                    1000,
                    1,
                    (val) => (hospitalCount = val)
                );
                animateValue(
                    0,
                    targetDoctorCount,
                    1000,
                    19,
                    (val) => (doctorCount = val)
                );
                const hospitalMap = L.map("hospital-map").setView(
                    [23.8103, 90.4125],
                    7
                );
                L.tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                        attribution: "&copy; OpenStreetMap contributors",
                    }
                ).addTo(hospitalMap);

                const customIcon = L.icon({
                    iconUrl:
                        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png",
                    iconSize: [30, 30],
                    iconAnchor: [15, 40],
                    popupAnchor: [0, -40],
                });

                hospitals.forEach((hospital) => {
                    L.marker([hospital.latitude, hospital.longitude], {
                        icon: customIcon,
                    })
                        .addTo(hospitalMap)
                        .bindPopup(
                            `<b>${hospital.name}</b><br>Lat: ${hospital.latitude}, Lon: ${hospital.longitude}`
                        )
                        .openPopup();
                });

                // Initialize Dengue Heatmap
                // const dengueMap = L.map("dengue-heatmap").setView(
                //     [23.8103, 90.4125],
                //     7
                // );
                // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                //     attribution: "&copy; OpenStreetMap contributors",
                // }).addTo(dengueMap);

                let cfg = {
                    radius: 25, // Increase if you want a larger spread for each point
                    maxOpacity: 0.8,
                    scaleRadius: true,
                    useLocalExtrema: false,
                    latField: "lat",
                    lngField: "lng",
                    valueField: "value",
                    gradient: {
                        // Define the intensity levels: 0.4, 0.6, 0.8 and 1.0
                        // Adjust these values if you want a different spread of intensity
                        0.4: "rgba(255,0,0,0.4)",
                        0.6: "rgba(255,0,0,0.6)",
                        0.8: "rgba(255,0,0,0.8)",
                        1.0: "rgba(255,0,0,1)",
                    },
                };

                // const heatmapLayer = L.heatLayer(dengueData.data, cfg);
                // dengueMap.addLayer(heatmapLayer);
            });
    }

    let dengueData = {
        max: 8,
        data: [
            { lat: 23.726, lng: 90.3976, count: 8 },
            { lat: 23.7705, lng: 90.3631, count: 8 },
            { lat: 23.7392, lng: 90.394, count: 8 },
            // Add more mock or real data points with lat, lng and count (number of cases) properties
        ],
    };
    const topAdmissions = [
        { hospital: "Dhaka Medical College", count: 500 },
        { hospital: "Sir Salimullah Medical College", count: 490 },
        { hospital: "Chittagong Medical College", count: 380 },
        { hospital: "Mymensingh Medical College", count: 370 },
        { hospital: "Sylhet Medical College", count: 250 },
        { hospital: "Ibrahim Medical College", count: 207 },
        { hospital: "Rajshahi Medical College", count: 150 },
    ];

    const topDeaths = [
        { hospital: "Rajshahi Medical College", count: 10 },
        { hospital: "Sir Salimullah Medical College", count: 9 },
        { hospital: "Cumilla Medical College", count: 6 },
        { hospital: "Dhaka Medical College", count: 5 },
        { hospital: "Rajshahi Medical College", count: 4 },
        { hospital: "Jessore Medical College", count: 2 },
        { hospital: "Sylhet Medical College", count: 2 },
    ];
    const topDiseases = [
        { Disease: "Dengue", count: 500 },
        { Disease: "Cholera", count: 490 },
        { Disease: "Tuberculosis", count: 380 },
        { Disease: "Diabetes", count: 370 },
        { Disease: "Heart Disease", count: 250 },
        { Disease: "Chronic Respiratory Diseases", count: 207 },
        { Disease: "Common cold", count: 150 },
    ];
    const topInvestigations = [
        { Investigation: "Complete Blood Bount", count: 5000 },
        { Investigation: "Dengue NS1", count: 4900 },
        { Investigation: "HbA1c", count: 3800 },
        { Investigation: "Urin Alysis", count: 3700 },
        { Investigation: "Lipid Profile", count: 2500 },
        { Investigation: "Comprehensive Metabolic Panel", count: 2070 },
        { Investigation: "TSH", count: 1500 },
    ];

    async function getCnts(){

    }

    onMount(() => {
        getReqCnt();
        getMsgCnt();
        getAllLocation();
        // Initialize Hospital Map
        const svg = d3.select("#mySvg");
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

        const x1 = d3.scaleBand().padding(0.05);

        const y = d3.scaleLinear().rangeRound([height, 0]);

        const z = d3.scaleOrdinal().range(["#ffbb78", "#98df8a", "#d62728"]);

        const keys = ["Users", "Doctors", "Hospitals"];

        x0.domain(data.map((d) => d.month));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([
            0,
            d3.max(data, (d) => d3.max(keys, (key) => d[key])),
        ]).nice();

        g.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${x0(d.month)},0)`)
            .selectAll("rect")
            .data((d) => keys.map((key) => ({ key, value: d[key] })))
            .enter()
            .append("rect")
            .attr("x", (d) => x1(d.key))
            .attr("y", height)
            .attr("width", x1.bandwidth())
            .attr("height", 0)
            .attr("fill", (d) => z(d.key))
            .transition()
            .duration(750)
            .delay((d, i) => i * 150)
            .attr("y", (d) => y(d.value))
            .attr("height", (d) => height - y(d.value));

        g.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"));

        //-----------------------------------------

        // animateValue(
        //     0,
        //     targetUserCount,
        //     1000,
        //     1537,
        //     (val) => (userCount = val)
        // );
        // animateValue(
        //     0,
        //     targetHospitalCount,
        //     1000,
        //     1,
        //     (val) => (hospitalCount = val)
        // );
        // animateValue(
        //     0,
        //     targetDoctorCount,
        //     1000,
        //     19,
        //     (val) => (doctorCount = val)
        // );
        // const hospitalMap = L.map("hospital-map").setView(
        //     [23.8103, 90.4125],
        //     7
        // );
        // L.tileLayer(
        //     "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        //     {
        //         attribution: "&copy; OpenStreetMap contributors",
        //     }
        // ).addTo(hospitalMap);

        // const customIcon = L.icon({
        //     iconUrl:
        //         "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png",
        //     iconSize: [30, 30],
        //     iconAnchor: [15, 40],
        //     popupAnchor: [0, -40],
        // });

        // hospitals.forEach((hospital) => {
        //     L.marker([hospital.latitude, hospital.longitude], {
        //         icon: customIcon,
        //     })
        //         .addTo(hospitalMap)
        //         .bindPopup(
        //             `<b>${hospital.name}</b><br>Lat: ${hospital.latitude}, Lon: ${hospital.longitude}`
        //         )
        //         .openPopup();
        // });

        // // Initialize Dengue Heatmap
        // // const dengueMap = L.map("dengue-heatmap").setView(
        // //     [23.8103, 90.4125],
        // //     7
        // // );
        // // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        // //     attribution: "&copy; OpenStreetMap contributors",
        // // }).addTo(dengueMap);

        // let cfg = {
        //     radius: 25, // Increase if you want a larger spread for each point
        //     maxOpacity: 0.8,
        //     scaleRadius: true,
        //     useLocalExtrema: false,
        //     latField: "lat",
        //     lngField: "lng",
        //     valueField: "value",
        //     gradient: {
        //         // Define the intensity levels: 0.4, 0.6, 0.8 and 1.0
        //         // Adjust these values if you want a different spread of intensity
        //         0.4: "rgba(255,0,0,0.4)",
        //         0.6: "rgba(255,0,0,0.6)",
        //         0.8: "rgba(255,0,0,0.8)",
        //         1.0: "rgba(255,0,0,1)",
        //     },
        // };
    });
    
    let userCount = 0;
    let hospitalCount = 0;
    let doctorCount = 0;
    const targetUserCount = 79000;
    const targetHospitalCount = 200;
    const targetDoctorCount = 1000;

    const animateValue = (start, end, duration, incrementStep, callback) => {
        const range = end - start;
        let current = start;
        const increment = end > start ? incrementStep : -incrementStep;
        const stepTime = Math.abs(
            Math.floor(duration / (range / incrementStep))
        );
        const timer = setInterval(function () {
            current += increment;
            if (
                (increment > 0 && current >= end) ||
                (increment < 0 && current <= end)
            ) {
                current = end;
                clearInterval(timer);
            }
            callback(current);
        }, stepTime);
    };
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
    function navigateToResearch() {
        window.location.hash = `#/adminhome/research`;
    }

    $: reqCnt=0;
    $: msgCnt=0;
    async function getReqCnt(){
        await fetch(serverUrl + "hospital-request/get-request-cnt")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let res = +data;
                reqCnt=res;
            })
    }
    async function getMsgCnt(){
        await fetch(serverUrl + "message/get-unread-cnt")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let res = +data;
                msgCnt=res;
            })
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
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li
                    class="flex items-center p-4 bg-red-400 cursor-default"
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
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToResearch}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/research.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Research Organizations
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
                                    >{msgCnt}</span
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
                                    >{reqCnt}</span
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
            <h1 class="container mx-8 text-3xl font-extrabold text-blue-600">
                Dashboard
            </h1>

            <div class="container mx-auto mb-8 p-8">
                <!-- Dashboard Stats -->
                <div class="grid grid-cols-3 gap-4">
                    <div
                        class="stat-box bg-gray-200 p-4 rounded-lg shadow-xl transition-transform transform hover:scale-90"
                    >
                        <h2 class="stat-title text-lg font-semibold">
                            Number of Users
                        </h2>
                        <div
                            class="stat-number text-blue-500 text-4xl font-bold"
                        >
                            {userCount}
                        </div>
                    </div>
                    <div
                        class="stat-box bg-gray-200 p-4 rounded-lg shadow-xl transition-transform transform hover:scale-90"
                    >
                        <h2 class="stat-title text-lg font-semibold">
                            Number of Hospitals
                        </h2>
                        <div
                            class="stat-number text-green-500 text-4xl font-bold"
                        >
                            {hospitalCount}
                        </div>
                    </div>
                    <div
                        class="stat-box bg-gray-200 p-4 rounded-lg shadow-xl transition-transform transform hover:scale-90"
                    >
                        <h2 class="stat-title text-lg font-semibold">
                            Number of Doctors
                        </h2>
                        <div
                            class="stat-number text-red-500 text-4xl font-bold"
                        >
                            {doctorCount}
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="card bordered max-w-screen-md mx-auto mt-12 p-4 shadow-xl mb-6 transition-transform transform hover:scale-110"
            >
                <h2 class="text-lg font-semibold mb-4">
                    Number of New Registration this year
                </h2>
                <h2 class="text-right mb-4">
                    <span class="inline-block w-4 h-4 mr-1 bg-orange-500" />
                    Users
                    <span class="inline-block w-4 h-4 mr-1 bg-green-500" />
                    Doctors
                    <span class="inline-block w-4 h-4 mr-1 bg-red-500" /> Hospitals
                </h2>
                <svg id="mySvg" width="700" height="400" />
            </div>

            <!-- Map Container -->
            <!-- Map Container for Hospitals -->
            <section class="bg-white shadow-xl rounded-lg p-6 mb-8 mx-4">
                <h2 class="text-xl font-semibold mb-4 text-purple-600">
                    BDeHR intigration in Bangladesh
                </h2>
                <div
                    id="hospital-map"
                    style="height: 500px;"
                    class="rounded-lg shadow-md"
                />
                <div class="text-right">
                    <button class="btn btn-outline mt-2"
                        >See All Hospitals</button
                    >
                </div>
            </section>

            <div class="flex justify-between gap-8 p-8 bg-gray-100">
                <!-- First Table: Top Patient Admissions -->
                <div class="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-2xl mb-4 font-semibold text-indigo-600">
                        Top Patient Admissions in Last 24 Hours
                    </h2>
                    <table class="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr class="text-lg text-gray-700">
                                <th class="px-4 py-2 text-left">Hospital</th>
                                <th class="px-4 py-2 text-left">Admissions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each topAdmissions as { hospital, count }}
                                <tr class="text-gray-600">
                                    <td class="px-4 py-2 border">{hospital}</td>
                                    <td class="px-4 py-2 border">{count}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <!-- Second Table: Top Deaths -->
                <div class="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-2xl mb-4 font-semibold text-red-600">
                        Top Deaths in Hospitals in Last 24 Hours
                    </h2>
                    <table class="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr class="text-lg text-gray-700">
                                <th class="px-4 py-2 text-left">Hospital</th>
                                <th class="px-4 py-2 text-left">Deaths</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each topDeaths as { hospital, count }}
                                <tr class="text-gray-600">
                                    <td class="px-4 py-2 border">{hospital}</td>
                                    <td class="px-4 py-2 border">{count}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="flex justify-between gap-8 p-8 bg-gray-100">
                <!-- First Table: Top Patient Admissions -->
                <div class="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-2xl mb-4 font-semibold text-indigo-600">
                        Top Diseases Administered in Last 24 Hours
                    </h2>
                    <table class="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr class="text-lg text-gray-700">
                                <th class="px-4 py-2 text-left">Diseases</th>
                                <th class="px-4 py-2 text-left">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each topDiseases as { Disease, count }}
                                <tr class="text-gray-600">
                                    <td class="px-4 py-2 border">{Disease}</td>
                                    <td class="px-4 py-2 border">{count}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <!-- Second Table: Top Deaths -->
                <div class="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-2xl mb-4 font-semibold text-red-600">
                        Top Investigations done in Last 24 Hours
                    </h2>
                    <table class="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr class="text-lg text-gray-700">
                                <th class="px-4 py-2 text-left"
                                    >Investigation</th
                                >
                                <th class="px-4 py-2 text-left">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each topInvestigations as { Investigation, count }}
                                <tr class="text-gray-600">
                                    <td class="px-4 py-2 border"
                                        >{Investigation}</td
                                    >
                                    <td class="px-4 py-2 border">{count}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Map Container for Dengue Heatmap -->
            <!-- <section class="bg-white shadow-xl rounded-lg p-6 mb-8 mx-4">
                <h2 class="text-xl font-semibold mb-4 text-red-600">
                    Dengue Heatmap in Bangladesh
                </h2>
                <div
                    id="dengue-heatmap"
                    style="height: 500px;"
                    class="rounded-lg shadow-md"
                />
            </section> -->
        </div>
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
    #map {
        width: 100%;
        height: 100%;
    }
    .stat-box {
        border: 1px solid #ccc;
        padding: 1rem;
        text-align: center;
    }
    .stat-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    .stat-number {
        font-size: 3rem;
        font-weight: bold;
    }
    .animate__animated.animate__fadeIn {
        animation: fadeIn ease 1.5s;
    }

    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
