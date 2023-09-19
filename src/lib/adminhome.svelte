<script>
    import { onMount } from "svelte";

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

    onMount(() => {
        const map = L.map("map").setView([23.8103, 90.4125], 7);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        // Define a custom marker icon
        const customIcon = L.icon({
            iconUrl: "/path-to-custom-marker.png",
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40],
        });

        // Add markers with custom icon for each hospital
        hospitals.forEach((hospital) => {
            L.marker([hospital.latitude, hospital.longitude], {
                icon: customIcon,
            })
                .addTo(map)
                .bindPopup(
                    `<b>${hospital.name}</b><br>Lat: ${hospital.latitude}, Lon: ${hospital.longitude}`
                )
                .openPopup();
        });
    });
</script>

<main class="bg-gray-100 min-h-screen">
    <!-- Navbar -->
    <nav class="bg-white shadow-md p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
                <img
                    src="/path-to-company-logo.png"
                    alt="Company Logo"
                    class="w-10 h-10 mr-2"
                />
                <span class="text-xl font-semibold">Company Name</span>
            </div>
            <button
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >Logout</button
            >
        </div>
    </nav>

    <!-- Map Container -->
    <section class="bg-white shadow-xl rounded-lg p-6 mb-8 mx-4">
        <h2 class="text-xl font-semibold mb-4 text-purple-600">
            Hospital Locations in Bangladesh
        </h2>
        <div id="map" style="height: 500px;" class="rounded-lg shadow-md" />
    </section>
</main>

<style>
    /* Assuming you've already set up Tailwind CSS in your project */
    #map {
        width: 100%;
        height: 100%;
    }
</style>
