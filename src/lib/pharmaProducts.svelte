<script>
    import { onMount } from "svelte";

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
    let totalBrands = 120;
    let totalGenerics = 90;
    let totalSale = 5000;

    let displayedtotalBrands = 0;
    let displayedtotalGenerics = 0;
    let displayedtotalSale = 0;
    async function getAnimation() {
        animateValue(
            0,
            totalBrands,
            1000,
            3,
            (val) => (displayedtotalBrands = val)
        );
        animateValue(
            0,
            totalGenerics,
            1000,
            3,
            (val) => (displayedtotalGenerics = val)
        );
        animateValue(
            0,
            totalSale,
            1000,
            2200,
            (val) => (displayedtotalSale = val)
        );
    }
    const images = {
        Tablet: "https://medex.com.bd/img/dosage-forms/tablet.png",
        Injection: "https://medex.com.bd/img/dosage-forms/injection.png",
        Capsule:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/noun-pill-7773.svg",
        Syrup: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Syrup.svg",
        Ointment:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/ointment.svg",
        Eyedrop:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/eye-with-a-drop.svg",
        Suppository:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/suppository-capsule.svg",
    };
    let products = [
        /* Assuming you have an array of products */
        // Sample product
        {
            id: "1",
            name: "Napa",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Tablet",
            chemicalName: "Paracetamol",
            intensity: "10mg",
            category: "Aspirin",
            bestBefore: 10,
            indications: "indications Headache",
            pharmacology: "pharmacology Lorem ipsum",
            dosage: "5/day",
            administration: "administration Lorem Ipsum",
            interaction: "interaction Lorem Ipsum",
            sideEffects: "sideEffects Lorem Ipsum",
            precautions: "precautions Lorem Ipsum",
            storageConditions: "storageConditions Lorem Ipsum",
            numberOfUnitsSold: 1000,
        },
        {
            id: "2",
            name: "Esonix",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Capsule",
            chemicalName: "Esomeprazole",
            intensity: "10mg",
            category: "Gastric resolver",
            bestBefore: 10,
            indications: "indications Gastric paim",
            pharmacology: "pharmacology Lorem ipsum",
            dosage: "5/day",
            administration: "administration Lorem Ipsum",
            interaction: "interaction Lorem Ipsum",
            sideEffects: "sideEffects Lorem Ipsum",
            precautions: "precautions Lorem Ipsum",
            storageConditions: "storageConditions Lorem Ipsum",
            numberOfUnitsSold: 800,
        },
        {
            id: "3",
            name: "Cyclopen",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Syrup",
            chemicalName: "Cyclopenazole",
            intensity: "10mL",
            category: "Gastric resolver",
            bestBefore: 10,
            indications: "indications Gastric paim",
            pharmacology: "pharmacology Lorem ipsum",
            dosage: "5/day",
            administration: "administration Lorem Ipsum",
            interaction: "interaction Lorem Ipsum",
            sideEffects: "sideEffects Lorem Ipsum",
            precautions: "precautions Lorem Ipsum",
            storageConditions: "storageConditions Lorem Ipsum",
            numberOfUnitsSold: 800,
        },
        {
            id: "4",
            name: "fortison",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Ointment",
            chemicalName: "Cyclopenazole",
            intensity: "10mL",
            category: "Gastric resolver",
            bestBefore: 10,
            indications: "indications Gastric paim",
            pharmacology: "pharmacology Lorem ipsum",
            dosage: "5/day",
            administration: "administration Lorem Ipsum",
            interaction: "interaction Lorem Ipsum",
            sideEffects: "sideEffects Lorem Ipsum",
            precautions: "precautions Lorem Ipsum",
            storageConditions: "storageConditions Lorem Ipsum",
            numberOfUnitsSold: 800,
        },
        {
            id: "5",
            name: "Exephin",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Injection",
            chemicalName: "Exephinazole",
            intensity: "10mL",
            category: "Gastric resolver",
            bestBefore: 10,
            indications: "indications Gastric paim",
            pharmacology: "pharmacology Lorem ipsum",
            dosage: "5/day",
            administration: "administration Lorem Ipsum",
            interaction: "interaction Lorem Ipsum",
            sideEffects: "sideEffects Lorem Ipsum",
            precautions: "precautions Lorem Ipsum",
            storageConditions: "storageConditions Lorem Ipsum",
            numberOfUnitsSold: 800,
        },
        {
            id: "6",
            name: "Moxquin",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Eyedrop",
            chemicalName: "Moxquinon",
            intensity: "10mL",
            category: "Gastric resolver",
            bestBefore: 10,
            indications: "indications Gastric paim",
            pharmacology: "pharmacology Lorem ipsum",
            dosage: "5/day",
            administration: "administration Lorem Ipsum",
            interaction: "interaction Lorem Ipsum",
            sideEffects: "sideEffects Lorem Ipsum",
            precautions: "precautions Lorem Ipsum",
            storageConditions: "storageConditions Lorem Ipsum",
            numberOfUnitsSold: 800,
        },
        // Add more products...
    ];

    let expandedProductId = null;

    function toggleDetails(id) {
        expandedProductId = expandedProductId === id ? null : id;
    }

    onMount(() => {
        getAnimation();
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
                    class="flex items-center p-4 bg-red-400 cursor-default"
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
                        Product Management
                    </h1>
                    <section class="mt-6 w-full">
                        <div class="stats mx-4 shadow">
                            <div class="stat">
                                <div class="stat-figure text-primary">
                                    <img
                                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/4915541-200.svg"
                                        alt="Prescription Icon"
                                        class="w-10 h-10 transform transition duration-300 hover:rotate-12"
                                    />
                                </div>
                                <div class="stat-title">Total Brands</div>
                                <div class="stat-value text-primary">
                                    {displayedtotalBrands}
                                </div>
                                <div class="stat-desc">Authentic Brands</div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <img
                                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/noun-pill-7773.svg"
                                        alt="Prescription Icon"
                                        class="w-10 h-10 transform transition duration-300 hover:rotate-12"
                                    />
                                </div>
                                <div class="stat-title">Total Generics</div>
                                <div class="stat-value text-secondary">
                                    {displayedtotalGenerics}
                                </div>
                                <div class="stat-desc">
                                    Prescribed & Trusted
                                </div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <img
                                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dollar-circle.svg"
                                        alt="Prescription Icon"
                                        class="w-10 h-10 transform transition duration-300 hover:rotate-12"
                                    />
                                </div>
                                <div class="stat-title">Total Sale</div>
                                <div class="stat-value text-accent">
                                    {displayedtotalSale}
                                </div>
                                <div class="stat-desc">Increasing Demand</div>
                            </div>
                        </div>
                    </section>

                    <section class="w-full p-4 mt-6">
                        <!-- Product Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {#each products as product (product.id)}
                                <!-- Assuming each product has a unique ID -->
                                <div class="bg-white p-4 rounded shadow">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        class="w-full h-48 object-cover mb-4 transition-transform transform hover:scale-105"
                                    />

                                    <h2 class="text-2xl font-bold">
                                        {product.name}
                                    </h2>

                                    <div class="flex items-center">
                                        <img
                                            src={images[product.variant]}
                                            alt={product.variant}
                                            class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                                        />
                                        <p>{product.variant}</p>
                                    </div>
                                    <p>{product.chemicalName}</p>
                                    <p>{product.intensity}</p>
                                    <div class="mt-4">
                                        <button
                                            class="mr-2 btn btn-primary"
                                            on:click={() =>
                                                toggleDetails(product.id)}
                                            >View Details</button
                                        >
                                        <button
                                            class="btn bg-red-500 hover:bg-red-600"
                                            on:click={() =>
                                                toggleDetails(product.id)}
                                        >
                                            <img
                                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pencil-edit-button-svgrepo-com.svg"
                                                class="transform transition duration-300 hover:rotate-12 mr-2"
                                                alt="Edit Icon"
                                                width="20"
                                                height="20"
                                            />
                                            Edit
                                        </button>
                                    </div>

                                    <!-- Details section -->
                                    {#if expandedProductId}
                                        <div
                                            class="fixed inset-0 flex items-center justify-center z-50"
                                        >
                                            <div class="modal modal-open">
                                                <div class="modal-box">
                                                    <!-- Cross button for closing the modal -->
                                                    <button
                                                        class="btn btn-clear float-right"
                                                        on:click={() =>
                                                            (expandedProductId =
                                                                null)}
                                                    />

                                                    {#each products.filter((p) => p.id === expandedProductId) as product}
                                                        <h2
                                                            class="text-2xl font-bold mb-4"
                                                        >
                                                            {product.name}
                                                        </h2>

                                                        <!-- Fields for each detail with labels -->
                                                        <div class="space-y-4">
                                                            <label
                                                                class="label"
                                                            >
                                                                <span
                                                                    class="label-text"
                                                                    >Name</span
                                                                >
                                                                <input
                                                                    type="text"
                                                                    bind:value={product.name}
                                                                    class="input input-bordered w-full"
                                                                />
                                                            </label>
                                                            <label
                                                                class="label"
                                                            >
                                                                <span
                                                                    class="label-text"
                                                                    >Variant</span
                                                                >
                                                                <input
                                                                    type="text"
                                                                    bind:value={product.variant}
                                                                    class="input input-bordered w-full"
                                                                />
                                                            </label>
                                                            <label
                                                                class="label"
                                                            >
                                                                <span
                                                                    class="label-text"
                                                                    >Chemical
                                                                    Name</span
                                                                >
                                                                <input
                                                                    type="text"
                                                                    bind:value={product.chemicalName}
                                                                    class="input input-bordered w-full"
                                                                />
                                                            </label>
                                                            <label
                                                                class="label"
                                                            >
                                                                <span
                                                                    class="label-text"
                                                                    >Intensity</span
                                                                >
                                                                <input
                                                                    type="text"
                                                                    bind:value={product.intensity}
                                                                    class="input input-bordered w-full"
                                                                />
                                                            </label>
                                                            <label
                                                                class="label"
                                                            >
                                                                <span
                                                                    class="label-text"
                                                                    >Category</span
                                                                >
                                                                <input
                                                                    type="text"
                                                                    bind:value={product.category}
                                                                    class="input input-bordered w-full"
                                                                />
                                                            </label>
                                                            <label
                                                                class="label"
                                                            >
                                                                <span
                                                                    class="label-text"
                                                                    >Dosage</span
                                                                >
                                                                <input
                                                                    type="text"
                                                                    bind:value={product.dosage}
                                                                    class="input input-bordered w-full"
                                                                />
                                                            </label>
                                                            <label
                                                                class="label"
                                                            >
                                                                <span
                                                                    class="label-text"
                                                                    >Administration</span
                                                                >
                                                                <input
                                                                    type="text"
                                                                    bind:value={product.administration}
                                                                    class="input input-bordered w-full"
                                                                />
                                                            </label>
                                                            <!-- ... other detail fields ... -->
                                                        </div>

                                                        <div
                                                            class="modal-action mt-4"
                                                        >
                                                            <button
                                                                class="btn"
                                                                on:click={() =>
                                                                    (expandedProductId =
                                                                        null)}
                                                                >Close</button
                                                            >
                                                            <button
                                                                class="btn btn-primary"
                                                                >Save Changes</button
                                                            >
                                                        </div>
                                                    {/each}
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </section>
                </div>
                <div
                    class="w-1/4 bg-red-400 rounded-xl shadow-md min-h-screen right-0 z-20"
                >
                    <div class="p-4">
                        <div class="flex items-center space-x-2 mb-4 p-2">
                            <img
                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/filter-svgrepo-com.svg"
                                class="w-8 h-8 transform transition duration-300 hover:rotate-12"
                                alt="Email Icon"
                            />
                            <p class="text-2xl font-extrabold text-blue-600">
                                Filter Options
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .stat {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        width: 300px;
    }

    .stat-figure {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background-color: #f3f4f6; /* Light gray */
        border-radius: 50%;
    }

    .stat-title {
        font-weight: 500;
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .stat-value {
        font-size: 2em;
        font-weight: bold;
    }
</style>
