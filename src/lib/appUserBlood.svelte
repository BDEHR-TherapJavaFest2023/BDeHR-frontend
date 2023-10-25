<script>
    import { onMount } from "svelte";
    import "leaflet/dist/leaflet.css";
    import L from "leaflet";
    import "leaflet-routing-machine";
    import { serverUrl } from "./constants";

    let map;
    let nearestHospital = null;
    let selectedHospitalTodonate = null;
    let hasSubmitted = false;
    let polyline = null; // To store the direction line
    let router;

    let userLocation = { lat: null, lng: null };
    function __donate(hospitalName) {
        alert("Donating to " + hospitalName);
    }

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
        hospitals.forEach((hospital, index) => {
            const popupContent = `
        <b>${hospital.name}</b> 
        <button id="donateButton_${index}">Donate Here</button>
    `;

            const marker = L.marker([hospital.latitude, hospital.longitude], {
                icon: customIcon,
            })
                .addTo(map)
                .bindPopup(popupContent);

            marker.on("popupopen", () => {
                document
                    .getElementById(`donateButton_${index}`)
                    .addEventListener("click", () => {
                        donateToHospital(hospital.name);
                    });
            });
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

    let lastDonationDate = new Date("2023-10-10"); // Dummy date for the last donation
    let nextDonationDate = new Date(lastDonationDate);
    nextDonationDate.setMonth(lastDonationDate.getMonth() + 4);

    $: canDonate = new Date() > nextDonationDate;
    $: calculateCountdown();

    let daysLeft = 0;
    let hoursLeft = 0;
    let minutesLeft = 0;
    let secondsLeft = 0;

    function calculateCountdown() {
        const now = new Date();
        const timeDifference = nextDonationDate - now; // Difference in milliseconds

        daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        hoursLeft = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        minutesLeft = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
    }

    let donationStatus = "map"; // ['map', 'pending', 'denied', 'approved']

    function donateToHospital(hospital) {
        if (canDonate) {
            console.log(`Donating to ${hospital.name}`);
            donationStatus = "pending";

            // Simulate a request to the hospital and their response
            setTimeout(() => {
                let isApproved = Math.random() > 0.5; // just a random logic, replace with actual approval logic

                if (isApproved) {
                    donationStatus = "approved";
                    selectedHospitalTodonate = hospital;
                    alert(
                        `You have been approved for donation by ${hospital.name}. Please donate soon.`
                    );

                    // Draw route to the approved hospital
                    const approvedHospitalCoordinates = hospitals.find(
                        (h) => h.name === hospital.name
                    );
                    if (approvedHospitalCoordinates) {
                        // Remove existing router if any
                        if (router) {
                            map.removeControl(router);
                        }

                        // Create a new routing control to the approved hospital and add it to the map
                        router = L.Routing.control({
                            waypoints: [
                                L.latLng(userLocation.lat, userLocation.lng),
                                L.latLng(
                                    approvedHospitalCoordinates.latitude,
                                    approvedHospitalCoordinates.longitude
                                ),
                            ],
                            createMarker: function () {
                                return null; // Do not create marker
                            },
                            routeWhileDragging: true,
                        }).addTo(map);
                    }
                } else {
                    donationStatus = "denied";
                }
            }, 3000);
        } else {
            console.log("Can't donate now. Waiting for the 4-month interval.");
        }
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
    function navigateToDonate() {
        window.location.hash = `#/appuser/blooddonate`;
    }

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
    }

    onMount(() => {
        if (canDonate) {
            getAllLocation();
        }
        if (!canDonate) {
            calculateCountdown();
            setInterval(calculateCountdown, 1000);
        }
    });
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
            <li
                class="flex items-center p-4 bg-green-400 cursor-default rounded-3xl"
                on:click={navigateToDonate}
            >
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/blood.svg"
                    alt="Give Blood"
                    class="w-6 h-6 mr-2"
                />
                Blood Donate
            </li>
        </ul>
    </div>

    <!-- Main Dashboard Content -->
    <div class="flex-1 bg-white p-2 h-full flex-grow">
        {#if canDonate}
            {#if donationStatus === "map"}
                <h1 class="mt-10 ml-10 mb-4 text-4xl text-rose-700 font-bold">
                    Blood Requirement Map
                </h1>
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
                        on:click={findNearestHospital}
                        >Find Nearest Hospital</button
                    >
                {/if}
            {:else if donationStatus === "pending"}
                <h1 class="mt-10 ml-10 mb-4 text-4xl text-rose-700 font-bold">
                    Waiting for hospital confirmation...
                </h1>
            {:else if donationStatus === "denied"}
                <h1 class="mt-10 ml-10 mb-4 text-4xl text-rose-700 font-bold">
                    Donation denied by the hospital.
                </h1>
            {:else if donationStatus === "approved"}
                <h1 class="mt-10 ml-10 mb-4 text-4xl text-rose-700 font-bold">
                    You have been approved for donation by {selectedHospitalTodonate}.
                    Please donate soon.
                </h1>
            {/if}
        {:else}
            <div class="flex flex-col items-center justify-center min-h-screen">
                <div
                    class="flex items-center space-x-2 text-5xl text-rose-700 font-semibold mb-2"
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/blood-drop.svg"
                        class="w-12 h-12 transform transition duration-300 hover:rotate-12"
                        alt="Phone Icon"
                    />

                    Your Blood Group: O+
                </div>
                <h1 class="text-4xl font-bold mb-4">
                    You Can Donate Blood in...
                </h1>
                <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
                    <!-- Days Countdown -->
                    <div
                        class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                    >
                        <span class="countdown font-mono text-5xl"
                            >{daysLeft}</span
                        >
                        days
                    </div>
                    <!-- Hours Countdown -->
                    <div
                        class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                    >
                        <span class="countdown font-mono text-5xl"
                            >{hoursLeft}</span
                        >
                        hours
                    </div>
                    <!-- Minutes Countdown -->
                    <div
                        class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                    >
                        <span class="countdown font-mono text-5xl"
                            >{minutesLeft}</span
                        >
                        min
                    </div>
                    <!-- Seconds Countdown -->
                    <div
                        class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                    >
                        <span class="countdown font-mono text-5xl"
                            >{secondsLeft}</span
                        >
                        sec
                    </div>
                </div>
            </div>
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
