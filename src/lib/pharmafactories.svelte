<script>
    import { onMount } from "svelte";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";

    let map;

    let companyData = {
        name: "Incepta Pharmaceutical Company",
        image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Incepta_780647819.jpg",
        factoryAddress: "Zirabo, Ashulia, Dhaka",
        factoryAbout:
            "Incepta Pharmaceuticals Ltd. is a leading pharmaceutical company in Bangladesh. Established in the year 1999, the company has come a long way in achieving its goal of becoming a top-class manufacturer of pharmaceutical finished products.",
        phone: "+880 1234 567890",
        email: "info@inceptapharma.com",
        factoryImage:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/06.jpg",
        factoryLatitude: 23.911889,
        factoryLongitude: 90.303,
    };

    function navigateToDashboard() {
        window.location.hash = `#/pharmaceuticalcompany/home`;
    }
    function navigateToAnalysis() {
        window.location.hash = `#/pharmaceuticalcompany/analysis`;
    }
    function navigateToAddProduct() {
        window.location.hash = `#/pharmaceuticalcompany/addproduct`;
    }
    function navigateToSeeAllProducts() {
        window.location.hash = `#/pharmaceuticalcompany/products`;
    }
    function navigateToFactories() {
        window.location.hash = `#/pharmaceuticalcompany/factories`;
    }
    function navigateToLogin() {
        window.location.hash = `#/pharmaceuticalcompanylogin`;
    }

    onMount(async () => {
        // No need for the 'require' here anymore
        const iconUrl =
            "https://www.iconarchive.com/download/i103443/paomedia/small-n-flat/map-marker.1024.png";

        const defaultIcon = L.icon({
            iconUrl,
            iconSize: [35, 35], // Default size, adjust if needed
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        L.Marker.prototype.options.icon = defaultIcon;

        // Wait for the next micro-task to ensure the DOM is fully ready
        await Promise.resolve();

        map = L.map("map").setView(
            [companyData.factoryLatitude, companyData.factoryLongitude],
            14
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
        L.marker([
            companyData.factoryLatitude,
            companyData.factoryLongitude,
        ]).addTo(map);

        // Invalidate the map size after a short delay
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    });
</script>

<main class="bg-gray-100 min-h-screen">
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
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToDashboard}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/home-icon-silhouette.svg?t=2023-10-31T11%3A19%3A51.499Z"
                        alt="Dashboard Icon"
                        class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                    />
                    Homepage
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToAnalysis}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/analytic.svg"
                        alt="Query Icon"
                        class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                    />
                    Analysis
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToSeeAllProducts}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/medical-drugs.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                    />
                    Products
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToAddProduct}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/plus-medical.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                    />
                    Add Product
                </li>
                <li
                    class="flex items-center p-4 bg-red-400 cursor-default"
                    on:click={navigateToFactories}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/steel_mill.svg"
                        alt="Messages Icon"
                        class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                    />
                    Factory
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
                                src={companyData.image}
                                alt="Drug company Logo"
                                width={125}
                                height={35}
                                class="mx-0 my-0"
                            />
                        </div>

                        <div
                            class="flex items-center text-3xl font-bold text-blue-500"
                        >
                            {companyData.name}
                        </div>

                        <div class="flex items-center space-x-4">
                            <button
                                class="btn btn-outline btn-error"
                                on:click={navigateToLogin}>Logout</button
                            >
                        </div>
                    </div>
                </div>
            </nav>

            <div class="mx-8 mb-8">
                <img
                    src={companyData.factoryImage}
                    alt={companyData.name}
                    class="rounded-lg shadow-md w-full h-96 object-cover"
                />
            </div>

            <!-- About Us -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8 mx-8">
                <h2 class="text-2xl font-extrabold text-blue-600 mb-4">
                    About Us
                </h2>
                <p>{companyData.factoryAbout}</p>
            </div>

            <h1 class="text-2xl text-blue-600 font-bold mb-2 mx-8">Map</h1>
            <div id="map" class="rounded-lg shadow-md mx-8 mb-4" />

            <!-- Location and Contact Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mx-8">
                <!-- Location -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center space-x-2 mb-4">
                        <img
                            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/location.svg"
                            class="w-8 h-8 transform transition duration-300 hover:rotate-12"
                            alt="Email Icon"
                        />
                        <p class="text-xl font-bold text-blue-600">Location</p>
                    </div>
                    <p>{companyData.factoryAddress}</p>
                </div>

                <!-- Contact Information -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-bold text-blue-600 mb-4">
                        Contact Us
                    </h2>
                    <div class="flex items-center space-x-2 mb-2">
                        <img
                            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
                            class="transform transition duration-300 hover:rotate-12"
                            alt="Phone Icon"
                        />
                        <p>
                            <strong>Phone: </strong>
                            {companyData.phone}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2 mb-2">
                        <img
                            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
                            class="transform transition duration-300 hover:rotate-12"
                            alt="Phone Icon"
                        />
                        <p>
                            <strong>Email: </strong>
                            {companyData.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    #map {
        height: 300px;
    }
</style>
