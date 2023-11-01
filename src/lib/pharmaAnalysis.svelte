<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let companyData = {
        name: "Incepta Pharmaceutical Company",
        image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Incepta_780647819.jpg",
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
                    class="flex items-center p-4 bg-red-400 cursor-default"
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
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToFactories}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/steel_mill.svg"
                        alt="Messages Icon"
                        class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                    />
                    Factories
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

            <div class="w-full flex flex-row">
                <div class="w-3/4">
                    <h1
                        class="container mx-8 text-3xl font-extrabold text-blue-600"
                    >
                        Analysis Result
                    </h1>
                </div>
                <div
                    class="w-1/4 bg-red-400 rounded-xl shadow-md min-h-screen right-0 z-20"
                >
                    <div class="p-4">
                        <div class="flex items-center space-x-2 mb-4 p-2">
                            <img
                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/analysis-svgrepo-com.svg"
                                class="w-10 h-10 transform transition duration-300 hover:rotate-12"
                                alt="Email Icon"
                            />
                            <p class="text-2xl font-extrabold text-blue-600">
                                Run Query
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
</style>
