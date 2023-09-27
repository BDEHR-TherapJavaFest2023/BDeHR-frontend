<script>
    import { onMount } from "svelte";
    import "leaflet/dist/leaflet.css";
    import L from "leaflet";
    import "leaflet-routing-machine";

    let map;
    let nearestHospital = null;
    let hasSubmitted = false;
    let polyline = null; // To store the direction line
    let router;

    let userLocation = { lat: null, lng: null };
    onMount(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                initializeMap();
            },
            (error) => {
                console.error("Geolocation Error:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    });

    function initializeMap() {
        map = L.map("map").setView([userLocation.lat, userLocation.lng], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
            map
        );
        //"https://www.iconarchive.com/download/i103443/paomedia/small-n-flat/map-marker.1024.png";
        const customIcon2 = L.icon({
            iconUrl:
                "https://www.iconarchive.com/download/i103443/paomedia/small-n-flat/map-marker.1024.png",
            iconSize: [40, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40],
        });

        L.marker([userLocation.lat, userLocation.lng], {
            icon: customIcon2,
        })
            .addTo(map)
            .bindPopup("You are here")
            .openPopup();

        // Place markers for hospitals
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
                .addTo(map)
                .bindPopup(hospital.name);
        });
    }

    function findNearestHospital() {
        hasSubmitted = true;
        let distances = hospitals.map((hospital) => {
            let latlng1 = L.latLng(userLocation.lat, userLocation.lng);
            let latlng2 = L.latLng(hospital.latitude, hospital.longitude);
            let d = latlng1.distanceTo(latlng2);
            return { name: hospital.name, distance: d, coordinates: latlng2 };
        });

        distances.sort((a, b) => a.distance - b.distance);
        nearestHospital = distances[0];

        // Remove existing router if any
        if (router) {
            map.removeControl(router);
        }

        // Create a new routing control and add it to the map
        router = L.Routing.control({
            waypoints: [
                L.latLng(userLocation.lat, userLocation.lng),
                L.latLng(
                    nearestHospital.coordinates.lat,
                    nearestHospital.coordinates.lng
                ),
            ],
            createMarker: function () {
                return null; // Do not create marker
            },
            routeWhileDragging: true,
        }).addTo(map);
    }

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
        {
            name: "Cumilla Medical College",
            latitude: 23.4515,
            longitude: 91.203,
        },
        {
            name: "Chittagong Medical College",
            latitude: 22.3593,
            longitude: 91.8308,
        },
        {
            name: "Sylhet Medical College",
            latitude: 24.9014962,
            longitude: 91.8536165,
        },
        {
            name: "Rajshahi Medical College",
            latitude: 24.372,
            longitude: 88.5864,
        },
        {
            name: "Rajshahi Medical College",
            latitude: 24.372,
            longitude: 88.5864,
        },
        {
            name: "Barisal Medical College",
            latitude: 22.6865,
            longitude: 90.3613,
        },
        {
            name: "Mymensingh Medical College",
            latitude: 24.7418,
            longitude: 90.4094,
        },
        {
            name: "Khulna Medical College",
            latitude: 22.8285,
            longitude: 89.5382,
        },
        {
            name: "Rangpur Medical College",
            latitude: 25.7666,
            longitude: 89.2338,
        },
        {
            name: "Bogra Medical College",
            latitude: 24.8279,
            longitude: 89.3529,
        },
        {
            name: "Pabne Medical College",
            latitude: 24.0045,
            longitude: 89.209,
        },
        {
            name: "Patuakhali Medical College",
            latitude: 22.3623,
            longitude: 90.327,
        },
        {
            name: "Cox's Bazar Medical College",
            latitude: 21.4202,
            longitude: 92.0149,
        },
        {
            name: "Noakhali Medical College",
            latitude: 22.9515,
            longitude: 91.1038,
        },
        {
            name: "Sirajganj Medical College",
            latitude: 24.4489,
            longitude: 89.6738,
        },
        // Add more hospitals with actual data for Bangladesh
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
        <ul class="text-base font-semibold mt-1 ml-1">
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
                class="flex items-center p-4 bg-green-400 cursor-default rounded-3xl"
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
        <h1 class="mt-10 ml-10 mb-4 text-4xl text-rose-700 font-bold">Map</h1>
        <div
            id="map"
            class="mt-2 ml-10 mr-8 outline-double rounded-lg h-[53vh]"
        />
        {#if hasSubmitted}
            <p class="text-3xl text-rose-700 font-bold mt-4 ml-10">
                Nearest Hospital: {nearestHospital.name}
            </p>
        {:else}
            <button
                class="btn btn-outline rounded-lg hover:bg-rose-700 mt-4 ml-10"
                on:click={findNearestHospital}>Find Nearest Hospital</button
            >
        {/if}
    </div>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
    .leaflet-routing-container {
        background-color: lightgreen !important;
    }

    .leaflet-routing-container h2,
    .leaflet-routing-container h3,
    .leaflet-routing-container ul {
        color: white !important;
    }
</style>
