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
        {
            id: "7",
            name: "Osartil",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Tablet",
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
            numberOfUnitsSold: 900,
        },
        {
            id: "8",
            name: "Pantonix",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Untitled-removebg-preview%20(2).png",
            variant: "Tablet",
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
            numberOfUnitsSold: 1800,
        },
        // Add more products...
    ];

    let expandedProductId = null;
    let expandedViewProductId = null;
    let showDeleteModal = false;
    let confirmedDeleteId = null;

    let showConfirmationModal = false;
    let tempProduct = null; // Temporary storage for the product being edited
    let displayEditModoal = false;

    function saveChanges() {
        showConfirmationModal = true;
        displayEditModoal = false;
    }

    function confirmSave() {
        const index = products.findIndex((p) => p.id === expandedProductId);
        products[index] = { ...tempProduct };
        showConfirmationModal = false;
        expandedProductId = null;
        tempProduct = null;
    }

    function cancelSave() {
        showConfirmationModal = false;
        displayEditModoal = true;
    }

    function closeEdit() {
        expandedProductId = null;
        displayEditModoal = false;
    }

    function toggleDetails(id) {
        if (expandedProductId === id) {
            expandedProductId = null;
            tempProduct = null; // Clear tempProduct when closing the modal
        } else {
            displayEditModoal = true;
            expandedProductId = id;
            const product = products.find((p) => p.id === id);
            tempProduct = { ...product }; // Create a copy of the product when opening the modal
        }
    }

    function toggleDetailsView(id) {
        expandedViewProductId = expandedViewProductId === id ? null : id;
    }
    function deleteProduct(productId) {
        //ekhane delete er badbaki logic implement korte hobe
        products = products.filter((product) => product.id !== productId);
    }

    //Filter part
    let filterBrand = null;
    let filterCategory = null;
    let filterVariant = null;
    let filterLowerSale = 0;
    let filterUpperSale = 9999999;
    let filterInterval;
    let filterSortDirection = "Ascending";
    let filterApplied = false;

    let filteredProducts;

    function applyFilters() {
        filteredProducts = products;
        filteredProducts = products.filter((product) => {
            // If filterBrand is not null or empty, check if the product name matches it. Otherwise, return true.
            let matchesBrand =
                !filterBrand ||
                product.name.toLowerCase().includes(filterBrand.toLowerCase());

            let matchesVariant =
                !filterVariant ||
                product.variant
                    .toLowerCase()
                    .includes(filterVariant.toLowerCase());

            // If filterCategory is not null or empty, check if the product category matches it. Otherwise, return true.
            let matchesCategory =
                !filterCategory ||
                product.category
                    .toLowerCase()
                    .includes(filterCategory.toLowerCase());

            // If filterLowerSale is not null, check if the product's numberOfUnitsSold is greater than or equal to filterLowerSale. Otherwise, return true.
            let matchesLowerSale =
                filterLowerSale == null ||
                product.numberOfUnitsSold >= filterLowerSale;

            // If filterUpperSale is not null and not the default value, check if the product's numberOfUnitsSold is less than or equal to filterUpperSale. Otherwise, return true.
            let matchesUpperSale =
                filterUpperSale == null ||
                filterUpperSale === 9999999 ||
                product.numberOfUnitsSold <= filterUpperSale;

            return (
                matchesBrand &&
                matchesCategory &&
                matchesVariant &&
                matchesLowerSale &&
                matchesUpperSale
            );
        });

        if (filterSortDirection === "Ascending") {
            filteredProducts.sort(
                (a, b) => a.numberOfUnitsSold - b.numberOfUnitsSold
            );
        } else if (filterSortDirection === "Descending") {
            filteredProducts.sort(
                (a, b) => b.numberOfUnitsSold - a.numberOfUnitsSold
            );
        }
        filterApplied = true;
    }
    function resetView() {
        filterApplied = false;
        filteredProducts = []; // Clear filtered products
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

                    {#if !filterApplied}
                        <section class="w-full p-4 mt-6">
                            <!-- Product Grid -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {#each products as product (product.id)}
                                    <!-- Assuming each product has a unique ID -->
                                    <div class="bg-white p-4 rounded shadow">
                                        <button
                                            class="btn bg-red-400 hover:bg-red-500"
                                            on:click={() => {
                                                confirmedDeleteId = product.id;
                                                showDeleteModal = true;
                                            }}
                                        >
                                            <img
                                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/rubbish-bin.svg"
                                                class="text-right transform transition duration-300 hover:rotate-12"
                                                alt="Edit Icon"
                                                width="20"
                                                height="20"
                                                style="vertical-align: middle;"
                                            />
                                        </button>
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
                                        <div
                                            class="mt-5"
                                            style="display: flex; align-items: center;"
                                        >
                                            <button
                                                class="mr-2 btn btn-primary"
                                                on:click={() =>
                                                    toggleDetailsView(
                                                        product.id
                                                    )}>View Details</button
                                            >
                                            <button
                                                class="btn bg-lime-400 hover:bg-lime-500"
                                                on:click={() =>
                                                    toggleDetails(product.id)}
                                            >
                                                <img
                                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pencil-edit-button-svgrepo-com.svg"
                                                    class="transform transition duration-300 hover:rotate-12 mr-2"
                                                    alt="Edit Icon"
                                                    width="20"
                                                    height="20"
                                                    style="vertical-align: middle;"
                                                />
                                                Edit
                                            </button>
                                        </div>

                                        {#if expandedViewProductId}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50"
                                            >
                                                <div class="modal modal-open">
                                                    <div
                                                        class="modal-box custom-modal-width relative"
                                                    >
                                                        <!-- relative positioning for the modal-box -->
                                                        <!-- Product Image - Floating to the upper right corner with a frame -->
                                                        {#each products.filter((p) => p.id === expandedViewProductId) as product}
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                class="absolute top-4 right-4 w-40 h-30 object-cover border-2 border-gray-300 rounded shadow-md transition-transform transform hover:scale-105"
                                                            />

                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <p
                                                                    class="text-2xl font-bold mb-4 text-blue-600 mr-2"
                                                                >
                                                                    {product.name}
                                                                </p>
                                                                <img
                                                                    src={images[
                                                                        product
                                                                            .variant
                                                                    ]}
                                                                    alt={product.variant}
                                                                    class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                                                                />
                                                            </div>

                                                            <div
                                                                class="space-y-4"
                                                            >
                                                                <!-- Displaying the details with improved styling -->
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Variant:</span
                                                                    >
                                                                    {product.variant}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Chemical
                                                                        Name:</span
                                                                    >
                                                                    {product.chemicalName}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Intensity:</span
                                                                    >
                                                                    {product.intensity}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Category:</span
                                                                    >
                                                                    {product.category}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Best
                                                                        Before:</span
                                                                    >
                                                                    {product.bestBefore}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Indications:</span
                                                                    >
                                                                    {product.indications}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Pharmacology:</span
                                                                    >
                                                                    {product.pharmacology}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Dosage:</span
                                                                    >
                                                                    {product.dosage}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Administration:</span
                                                                    >
                                                                    {product.administration}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Interaction:</span
                                                                    >
                                                                    {product.interaction}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Side
                                                                        Effects:</span
                                                                    >
                                                                    {product.sideEffects}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Precautions:</span
                                                                    >
                                                                    {product.precautions}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Storage
                                                                        Conditions:</span
                                                                    >
                                                                    {product.storageConditions}
                                                                </p>
                                                                <!-- ... other detail fields ... -->
                                                            </div>
                                                            <div
                                                                class="modal-action mt-4"
                                                            >
                                                                <button
                                                                    class="btn btn-secondary"
                                                                    on:click={() =>
                                                                        (expandedViewProductId =
                                                                            null)}
                                                                    >Close</button
                                                                >
                                                            </div>
                                                        {/each}
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
                                        {#if showDeleteModal}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-0"
                                            >
                                                <div
                                                    class="bg-white p-6 rounded-md shadow-lg"
                                                >
                                                    <h3
                                                        class="text-xl font-bold mb-4"
                                                    >
                                                        Confirm Deletion
                                                    </h3>
                                                    <p>
                                                        Are you sure you want to
                                                        delete this product?
                                                    </p>
                                                    <div
                                                        class="mt-4 flex justify-end space-x-4"
                                                    >
                                                        <button
                                                            class="btn btn-secondary"
                                                            on:click={() =>
                                                                (showDeleteModal = false)}
                                                            >Cancel</button
                                                        >
                                                        <button
                                                            class="btn btn-danger"
                                                            on:click={() => {
                                                                deleteProduct(
                                                                    confirmedDeleteId
                                                                );
                                                                showDeleteModal = false;
                                                            }}>Confirm</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}

                                        <!-- Details section -->
                                        {#if displayEditModoal}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50"
                                            >
                                                <div class="modal modal-open">
                                                    <div class="modal-box">
                                                        <form
                                                            on:submit|preventDefault={saveChanges}
                                                        >
                                                            <button
                                                                class="btn btn-clear float-right text-2xl font-bold"
                                                                on:click={closeEdit}
                                                                >X</button
                                                            >
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <p
                                                                    class="text-2xl font-bold mb-4 text-blue-600 mr-2"
                                                                >
                                                                    {tempProduct.name}
                                                                </p>
                                                                <img
                                                                    src={images[
                                                                        tempProduct
                                                                            .variant
                                                                    ]}
                                                                    alt={tempProduct.variant}
                                                                    class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                                                                />
                                                            </div>

                                                            <!-- Fields for each detail with labels -->

                                                            <!-- ... Your input fields go here ... -->
                                                            <div
                                                                class="space-y-4"
                                                            >
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="name"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Name</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        bind:value={tempProduct.name}
                                                                        placeholder="Enter Name"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>

                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="variant"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Variant</label
                                                                    >
                                                                    <select
                                                                        bind:value={tempProduct.variant}
                                                                        class="select select-bordered w-full"
                                                                        placeholder="Choose Variant"
                                                                    >
                                                                        <option
                                                                            disabled="disabled"
                                                                            selected="selected"
                                                                            >Choose
                                                                            a
                                                                            variant</option
                                                                        >
                                                                        <option
                                                                            value="Tablet"
                                                                            >Tablet</option
                                                                        >
                                                                        <option
                                                                            value="Capsule"
                                                                            >Capsule</option
                                                                        >
                                                                        <option
                                                                            value="Injection"
                                                                            >Injection</option
                                                                        >
                                                                        <option
                                                                            value="Syrup"
                                                                            >Syrup</option
                                                                        >
                                                                        <option
                                                                            value="Ointment"
                                                                            >Ointment</option
                                                                        >
                                                                        <option
                                                                            value="Eyedrop"
                                                                            >Eyedrop</option
                                                                        >
                                                                        <option
                                                                            value="Suppository"
                                                                            >Suppository</option
                                                                        >
                                                                        <!-- ... -->
                                                                    </select>
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="chemicalName"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Chemical
                                                                        Name</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="chemicalName"
                                                                        bind:value={tempProduct.chemicalName}
                                                                        placeholder="Enter Chemical Name"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="intensity"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Intensity</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="intensity"
                                                                        bind:value={tempProduct.intensity}
                                                                        placeholder="Enter Intensity"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="category"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Category</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="category"
                                                                        bind:value={tempProduct.category}
                                                                        placeholder="Enter Category"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="image"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Image</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="image"
                                                                        bind:value={tempProduct.image}
                                                                        placeholder="Enter Image URL"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="bestBefore"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Best
                                                                        Before</label
                                                                    >
                                                                    <input
                                                                        type="number"
                                                                        id="bestBefore"
                                                                        bind:value={tempProduct.bestBefore}
                                                                        placeholder="in weeks"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="indications"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Indications</label
                                                                    >
                                                                    <textarea
                                                                        id="indications"
                                                                        bind:value={tempProduct.indications}
                                                                        placeholder="Enter Indications"
                                                                        class="textarea textarea-bordered w-full p-2"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="pharmacology"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Pharmacology</label
                                                                    >
                                                                    <textarea
                                                                        id="pharmacology"
                                                                        bind:value={tempProduct.pharmacology}
                                                                        placeholder="Enter Pharmacology"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="dosage"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Dosage</label
                                                                    >
                                                                    <textarea
                                                                        id="dosage"
                                                                        bind:value={tempProduct.dosage}
                                                                        placeholder="Enter Dosage"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Administration -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="administration"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Administration</label
                                                                    >
                                                                    <textarea
                                                                        id="administration"
                                                                        bind:value={tempProduct.administration}
                                                                        placeholder="Enter Administration Method"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Interaction -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="interaction"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Interaction</label
                                                                    >
                                                                    <textarea
                                                                        id="interaction"
                                                                        bind:value={tempProduct.interaction}
                                                                        placeholder="Enter Drug Interactions"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Side Effects -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="sideEffects"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Side
                                                                        Effects</label
                                                                    >
                                                                    <textarea
                                                                        id="sideEffects"
                                                                        bind:value={tempProduct.sideEffects}
                                                                        placeholder="Enter Side Effects"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Precautions and Warnings -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="precautions"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Precautions
                                                                        and
                                                                        Warnings</label
                                                                    >
                                                                    <textarea
                                                                        id="precautions"
                                                                        bind:value={tempProduct.precautions}
                                                                        placeholder="Enter Precautions and Warnings"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Storage Conditions -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="storageConditions"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Storage
                                                                        Conditions</label
                                                                    >
                                                                    <textarea
                                                                        id="storageConditions"
                                                                        bind:value={tempProduct.storageConditions}
                                                                        placeholder="Enter Storage Conditions"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- ... other detail fields ... -->
                                                            </div>

                                                            <div
                                                                class="modal-action mt-4"
                                                            >
                                                                <button
                                                                    class="btn"
                                                                    type="button"
                                                                    on:click={closeEdit}
                                                                    >Cancel</button
                                                                >
                                                                <button
                                                                    class="btn btn-primary"
                                                                    type="submit"
                                                                    >Save
                                                                    Changes</button
                                                                >
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}

                                        {#if showConfirmationModal}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-0"
                                            >
                                                <div
                                                    class="bg-white p-6 rounded-md shadow-lg"
                                                >
                                                    <h2
                                                        class="text-xl font-bold mb-4"
                                                    >
                                                        Confirm Changes
                                                    </h2>
                                                    <p>
                                                        Do you really want to
                                                        save the changes?
                                                    </p>
                                                    <div
                                                        class="modal-action mt-4"
                                                    >
                                                        <button
                                                            class="btn btn-secondary"
                                                            on:click={cancelSave}
                                                            >Cancel</button
                                                        >
                                                        <button
                                                            class="btn btn-danger"
                                                            on:click={confirmSave}
                                                            >Confirm</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
                                    </div>
                                {/each}
                            </div>
                        </section>
                    {/if}
                    {#if filterApplied && filteredProducts.length > 0}
                        <section class="w-full p-4 mt-6">
                            <button
                                on:click={resetView}
                                class="px-4 py-2 mb-4 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                                >Back</button
                            >
                            <!-- Product Grid -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {#each filteredProducts as product (product.id)}
                                    <!-- Assuming each product has a unique ID -->
                                    <div class="bg-white p-4 rounded shadow">
                                        <button
                                            class="btn bg-red-400 hover:bg-red-500"
                                            on:click={() => {
                                                confirmedDeleteId = product.id;
                                                showDeleteModal = true;
                                            }}
                                        >
                                            <img
                                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/rubbish-bin.svg"
                                                class="text-right transform transition duration-300 hover:rotate-12"
                                                alt="Edit Icon"
                                                width="20"
                                                height="20"
                                                style="vertical-align: middle;"
                                            />
                                        </button>
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
                                        <div
                                            class="mt-5"
                                            style="display: flex; align-items: center;"
                                        >
                                            <button
                                                class="mr-2 btn btn-primary"
                                                on:click={() =>
                                                    toggleDetailsView(
                                                        product.id
                                                    )}>View Details</button
                                            >
                                            <button
                                                class="btn bg-lime-400 hover:bg-lime-500"
                                                on:click={() =>
                                                    toggleDetails(product.id)}
                                            >
                                                <img
                                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pencil-edit-button-svgrepo-com.svg"
                                                    class="transform transition duration-300 hover:rotate-12 mr-2"
                                                    alt="Edit Icon"
                                                    width="20"
                                                    height="20"
                                                    style="vertical-align: middle;"
                                                />
                                                Edit
                                            </button>
                                        </div>

                                        {#if expandedViewProductId}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50"
                                            >
                                                <div class="modal modal-open">
                                                    <div
                                                        class="modal-box custom-modal-width relative"
                                                    >
                                                        <!-- relative positioning for the modal-box -->
                                                        <!-- Product Image - Floating to the upper right corner with a frame -->
                                                        {#each filteredProducts.filter((p) => p.id === expandedViewProductId) as product}
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                class="absolute top-4 right-4 w-40 h-30 object-cover border-2 border-gray-300 rounded shadow-md transition-transform transform hover:scale-105"
                                                            />

                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <p
                                                                    class="text-2xl font-bold mb-4 text-blue-600 mr-2"
                                                                >
                                                                    {product.name}
                                                                </p>
                                                                <img
                                                                    src={images[
                                                                        product
                                                                            .variant
                                                                    ]}
                                                                    alt={product.variant}
                                                                    class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                                                                />
                                                            </div>

                                                            <div
                                                                class="space-y-4"
                                                            >
                                                                <!-- Displaying the details with improved styling -->
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Variant:</span
                                                                    >
                                                                    {product.variant}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Chemical
                                                                        Name:</span
                                                                    >
                                                                    {product.chemicalName}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Intensity:</span
                                                                    >
                                                                    {product.intensity}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Category:</span
                                                                    >
                                                                    {product.category}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Best
                                                                        Before:</span
                                                                    >
                                                                    {product.bestBefore}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Indications:</span
                                                                    >
                                                                    {product.indications}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Pharmacology:</span
                                                                    >
                                                                    {product.pharmacology}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Dosage:</span
                                                                    >
                                                                    {product.dosage}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Administration:</span
                                                                    >
                                                                    {product.administration}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Interaction:</span
                                                                    >
                                                                    {product.interaction}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Side
                                                                        Effects:</span
                                                                    >
                                                                    {product.sideEffects}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Precautions:</span
                                                                    >
                                                                    {product.precautions}
                                                                </p>
                                                                <p>
                                                                    <span
                                                                        class="font-bold text-gray-600"
                                                                        >Storage
                                                                        Conditions:</span
                                                                    >
                                                                    {product.storageConditions}
                                                                </p>
                                                                <!-- ... other detail fields ... -->
                                                            </div>
                                                            <div
                                                                class="modal-action mt-4"
                                                            >
                                                                <button
                                                                    class="btn btn-secondary"
                                                                    on:click={() =>
                                                                        (expandedViewProductId =
                                                                            null)}
                                                                    >Close</button
                                                                >
                                                            </div>
                                                        {/each}
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
                                        {#if showDeleteModal}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-0"
                                            >
                                                <div
                                                    class="bg-white p-6 rounded-md shadow-lg"
                                                >
                                                    <h3
                                                        class="text-xl font-bold mb-4"
                                                    >
                                                        Confirm Deletion
                                                    </h3>
                                                    <p>
                                                        Are you sure you want to
                                                        delete this product?
                                                    </p>
                                                    <div
                                                        class="mt-4 flex justify-end space-x-4"
                                                    >
                                                        <button
                                                            class="btn btn-secondary"
                                                            on:click={() =>
                                                                (showDeleteModal = false)}
                                                            >Cancel</button
                                                        >
                                                        <button
                                                            class="btn btn-danger"
                                                            on:click={() => {
                                                                deleteProduct(
                                                                    confirmedDeleteId
                                                                );
                                                                showDeleteModal = false;
                                                            }}>Confirm</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}

                                        <!-- Details section -->
                                        {#if displayEditModoal}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50"
                                            >
                                                <div class="modal modal-open">
                                                    <div class="modal-box">
                                                        <form
                                                            on:submit|preventDefault={saveChanges}
                                                        >
                                                            <button
                                                                class="btn btn-clear float-right text-2xl font-bold"
                                                                on:click={closeEdit}
                                                                >X</button
                                                            >
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <p
                                                                    class="text-2xl font-bold mb-4 text-blue-600 mr-2"
                                                                >
                                                                    {tempProduct.name}
                                                                </p>
                                                                <img
                                                                    src={images[
                                                                        tempProduct
                                                                            .variant
                                                                    ]}
                                                                    alt={tempProduct.variant}
                                                                    class="w-6 h-6 mr-2 transform transition duration-300 hover:rotate-12"
                                                                />
                                                            </div>

                                                            <!-- Fields for each detail with labels -->

                                                            <!-- ... Your input fields go here ... -->
                                                            <div
                                                                class="space-y-4"
                                                            >
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="name"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Name</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        bind:value={tempProduct.name}
                                                                        placeholder="Enter Name"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>

                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="variant"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Variant</label
                                                                    >
                                                                    <select
                                                                        bind:value={tempProduct.variant}
                                                                        class="select select-bordered w-full"
                                                                        placeholder="Choose Variant"
                                                                    >
                                                                        <option
                                                                            disabled="disabled"
                                                                            selected="selected"
                                                                            >Choose
                                                                            a
                                                                            variant</option
                                                                        >
                                                                        <option
                                                                            value="Tablet"
                                                                            >Tablet</option
                                                                        >
                                                                        <option
                                                                            value="Capsule"
                                                                            >Capsule</option
                                                                        >
                                                                        <option
                                                                            value="Injection"
                                                                            >Injection</option
                                                                        >
                                                                        <option
                                                                            value="Syrup"
                                                                            >Syrup</option
                                                                        >
                                                                        <option
                                                                            value="Ointment"
                                                                            >Ointment</option
                                                                        >
                                                                        <option
                                                                            value="Eyedrop"
                                                                            >Eyedrop</option
                                                                        >
                                                                        <option
                                                                            value="Suppository"
                                                                            >Suppository</option
                                                                        >
                                                                        <!-- ... -->
                                                                    </select>
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="chemicalName"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Chemical
                                                                        Name</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="chemicalName"
                                                                        bind:value={tempProduct.chemicalName}
                                                                        placeholder="Enter Chemical Name"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="intensity"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Intensity</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="intensity"
                                                                        bind:value={tempProduct.intensity}
                                                                        placeholder="Enter Intensity"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="category"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Category</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="category"
                                                                        bind:value={tempProduct.category}
                                                                        placeholder="Enter Category"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="image"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Image</label
                                                                    >
                                                                    <input
                                                                        type="text"
                                                                        id="image"
                                                                        bind:value={tempProduct.image}
                                                                        placeholder="Enter Image URL"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="bestBefore"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Best
                                                                        Before</label
                                                                    >
                                                                    <input
                                                                        type="number"
                                                                        id="bestBefore"
                                                                        bind:value={tempProduct.bestBefore}
                                                                        placeholder="in weeks"
                                                                        class="input input-bordered w-full"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="indications"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Indications</label
                                                                    >
                                                                    <textarea
                                                                        id="indications"
                                                                        bind:value={tempProduct.indications}
                                                                        placeholder="Enter Indications"
                                                                        class="textarea textarea-bordered w-full p-2"
                                                                    />
                                                                </div>
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="pharmacology"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Pharmacology</label
                                                                    >
                                                                    <textarea
                                                                        id="pharmacology"
                                                                        bind:value={tempProduct.pharmacology}
                                                                        placeholder="Enter Pharmacology"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="dosage"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Dosage</label
                                                                    >
                                                                    <textarea
                                                                        id="dosage"
                                                                        bind:value={tempProduct.dosage}
                                                                        placeholder="Enter Dosage"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Administration -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="administration"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Administration</label
                                                                    >
                                                                    <textarea
                                                                        id="administration"
                                                                        bind:value={tempProduct.administration}
                                                                        placeholder="Enter Administration Method"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Interaction -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="interaction"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Interaction</label
                                                                    >
                                                                    <textarea
                                                                        id="interaction"
                                                                        bind:value={tempProduct.interaction}
                                                                        placeholder="Enter Drug Interactions"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Side Effects -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="sideEffects"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Side
                                                                        Effects</label
                                                                    >
                                                                    <textarea
                                                                        id="sideEffects"
                                                                        bind:value={tempProduct.sideEffects}
                                                                        placeholder="Enter Side Effects"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Precautions and Warnings -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="precautions"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Precautions
                                                                        and
                                                                        Warnings</label
                                                                    >
                                                                    <textarea
                                                                        id="precautions"
                                                                        bind:value={tempProduct.precautions}
                                                                        placeholder="Enter Precautions and Warnings"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- Storage Conditions -->
                                                                <div
                                                                    class="mb-2"
                                                                >
                                                                    <label
                                                                        for="storageConditions"
                                                                        class="block text-sm font-medium text-gray-700 text-left"
                                                                        >Storage
                                                                        Conditions</label
                                                                    >
                                                                    <textarea
                                                                        id="storageConditions"
                                                                        bind:value={tempProduct.storageConditions}
                                                                        placeholder="Enter Storage Conditions"
                                                                        class="textarea textarea-bordered w-full"
                                                                    />
                                                                </div>

                                                                <!-- ... other detail fields ... -->
                                                            </div>

                                                            <div
                                                                class="modal-action mt-4"
                                                            >
                                                                <button
                                                                    class="btn"
                                                                    type="button"
                                                                    on:click={closeEdit}
                                                                    >Cancel</button
                                                                >
                                                                <button
                                                                    class="btn btn-primary"
                                                                    type="submit"
                                                                    >Save
                                                                    Changes</button
                                                                >
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}

                                        {#if showConfirmationModal}
                                            <div
                                                class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-0"
                                            >
                                                <div
                                                    class="bg-white p-6 rounded-md shadow-lg"
                                                >
                                                    <h2
                                                        class="text-xl font-bold mb-4"
                                                    >
                                                        Confirm Changes
                                                    </h2>
                                                    <p>
                                                        Do you really want to
                                                        save the changes?
                                                    </p>
                                                    <div
                                                        class="modal-action mt-4"
                                                    >
                                                        <button
                                                            class="btn btn-secondary"
                                                            on:click={cancelSave}
                                                            >Cancel</button
                                                        >
                                                        <button
                                                            class="btn btn-danger"
                                                            on:click={confirmSave}
                                                            >Confirm</button
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
                                    </div>
                                {/each}
                            </div>
                        </section>
                    {:else if filterApplied}
                        <section class="w-full p-4 mt-6">
                            <button
                                on:click={resetView}
                                class="px-4 py-2 p-4 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                                >Back</button
                            >
                            <div class="p-4 mt-4 bg-white shadow-md rounded-xl">
                                <p class="text-2xl text-red-500 font-bold">
                                    Sorry. No product match the given filters
                                </p>
                            </div>
                        </section>
                    {/if}
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
                        <div class="mb-2">
                            <label
                                for="filterBrand"
                                class="block text-sm font-bold text-black text-left"
                                >Brand</label
                            >
                            <input
                                type="text"
                                id="filterBrand"
                                bind:value={filterBrand}
                                placeholder="Enter Brand Name"
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div class="mb-2">
                            <label
                                for="filterBrand"
                                class="block text-sm font-bold text-black text-left"
                                >Variant</label
                            >
                            <select
                                bind:value={filterVariant}
                                class="select select-bordered w-full"
                                placeholder="Choose Variant"
                            >
                                <option disabled="disabled" selected="selected"
                                    >Choose a variant</option
                                >
                                <option value="Tablet">Tablet</option>
                                <option value="Capsule">Capsule</option>
                                <option value="Injection">Injection</option>
                                <option value="Syrup">Syrup</option>
                                <option value="Ointment">Ointment</option>
                                <option value="Eyedrop">Eyedrop</option>
                                <option value="Suppository">Suppository</option>
                                <!-- ... -->
                            </select>
                        </div>
                        <div class="mb-2">
                            <label
                                for="category"
                                class="block text-sm font-bold text-black text-left"
                                >Category</label
                            >
                            <input
                                type="text"
                                id="category"
                                bind:value={filterCategory}
                                placeholder="Enter Category"
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div class="flex mb-2 space-x-4">
                            <!-- Lower Sale Bound -->
                            <div class="w-1/2">
                                <label
                                    for="lowerSale"
                                    class="block text-sm font-bold text-black text-left"
                                    >Lower Sale Bound</label
                                >
                                <input
                                    type="number"
                                    id="lowerSale"
                                    bind:value={filterLowerSale}
                                    placeholder="Lower Sale Bound"
                                    class="input input-bordered w-full"
                                />
                            </div>

                            <!-- Upper Sale Bound -->
                            <div class="w-1/2">
                                <label
                                    for="upperSale"
                                    class="block text-sm font-bold text-black text-left"
                                    >Upper Sale Bound</label
                                >
                                <input
                                    type="number"
                                    id="upperSale"
                                    bind:value={filterUpperSale}
                                    placeholder="Upper Sale Bound"
                                    class="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div class="mb-2">
                            <label
                                for="filterInterval"
                                class="block text-sm font-bold text-black text-left"
                                >Interval</label
                            >
                            <input
                                type="number"
                                id="filterInterval"
                                bind:value={filterInterval}
                                placeholder="For Last __weeks"
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div class="mb-4">
                            <label
                                for="variant"
                                class="block text-sm font-bold text-black text-left"
                                >Sorting Direction</label
                            >
                            <select
                                bind:value={filterSortDirection}
                                class="select select-bordered w-full"
                                placeholder="Choose Sort Direction"
                            >
                                <option disabled="disabled" selected="selected"
                                    >Choose Sorting Option</option
                                >
                                <option value="Ascending"
                                    >Ascending Order</option
                                >
                                <option value="Descending"
                                    >Descending Order</option
                                >
                            </select>
                        </div>
                        <div>
                            <button
                                class="group w-full flex justify-center py-2 px-4 mt-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                on:click={applyFilters}
                            >
                                Apply Filters
                            </button>
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
    .custom-modal-width {
        width: 75vw;
    }
</style>
