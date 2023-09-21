<script>
    import { onMount } from "svelte";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import "leaflet-heatmap";
    import "leaflet.heat";

    let hospitals = [
        {
            name: "Dhaka Medical College",
            latitude: 23.726,
            longitude: 90.3976,
        },
        {
            name: "Apollo Hospitals Dhaka",
            latitude: 23.7705,
            longitude: 90.3631,
        },
        {
            name: "Square Hospitals Ltd",
            latitude: 23.7392,
            longitude: 90.394,
        },
        // Add more hospitals with actual data for Bangladesh
    ];
    let dengueData = {
        max: 8,
        data: [
            { lat: 23.726, lng: 90.3976, count: 8 },
            { lat: 23.7705, lng: 90.3631, count: 8 },
            { lat: 23.7392, lng: 90.394, count: 8 },
            // Add more mock or real data points with lat, lng and count (number of cases) properties
        ],
    };

    onMount(() => {
        // Initialize Hospital Map
        animateValue(
            0,
            targetUserCount,
            3000,
            1000,
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
            10,
            (val) => (doctorCount = val)
        );
        const hospitalMap = L.map("hospital-map").setView(
            [23.8103, 90.4125],
            7
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(hospitalMap);

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
        const dengueMap = L.map("dengue-heatmap").setView(
            [23.8103, 90.4125],
            7
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(dengueMap);

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

        const heatmapLayer = L.heatLayer(dengueData.data, cfg);
        dengueMap.addLayer(heatmapLayer);
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
</script>

<main class="bg-gray-100 min-h-screen">
    <!-- Navbar -->
    <nav class="bg-white shadow-md mb-8 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogo.png"
                    alt="Company Logo"
                    class="w-165 h-20 mr-2"
                />
            </div>
            <button
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >Logout</button
            >
        </div>
    </nav>
    <div class="container mx-auto mb-8 p-8">
        <!-- Dashboard Stats -->
        <div class="grid grid-cols-3 gap-4">
            <div class="stat-box bg-gray-200 p-4 rounded-lg shadow-md">
                <h2 class="stat-title text-lg font-semibold">
                    Number of Users
                </h2>
                <div class="stat-number text-blue-500 text-4xl font-bold">
                    {userCount}
                </div>
            </div>
            <div class="stat-box bg-gray-200 p-4 rounded-lg shadow-md">
                <h2 class="stat-title text-lg font-semibold">
                    Number of Hospitals
                </h2>
                <div class="stat-number text-green-500 text-4xl font-bold">
                    {hospitalCount}
                </div>
            </div>
            <div class="stat-box bg-gray-200 p-4 rounded-lg shadow-md">
                <h2 class="stat-title text-lg font-semibold">
                    Number of Doctors
                </h2>
                <div class="stat-number text-red-500 text-4xl font-bold">
                    {doctorCount}
                </div>
            </div>
        </div>
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
    </section>

    <!-- Map Container for Dengue Heatmap -->
    <section class="bg-white shadow-xl rounded-lg p-6 mb-8 mx-4">
        <h2 class="text-xl font-semibold mb-4 text-red-600">
            Dengue Heatmap in Bangladesh
        </h2>
        <div
            id="dengue-heatmap"
            style="height: 500px;"
            class="rounded-lg shadow-md"
        />
    </section>
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
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
