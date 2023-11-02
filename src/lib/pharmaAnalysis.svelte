<script>
  import { onMount } from "svelte";

  import L from "leaflet";
  import "leaflet.heat"; // for heatmap support
  import "leaflet/dist/leaflet.css";
  import { companyInfo } from "./store";
  import { get } from "svelte/store";

  let companyData = {
    name: "Incepta Pharmaceutical Company",
    image:
      "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Incepta_780647819.jpg",
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

  function generateMap() {
    // Initialize the map
    const map = L.map("mapId").setView([23.685, 90.3563], 7); // Set view to Bangladesh

    // Add tile layer from OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Loop through each hospital and plot on map
    for (const hospital of hospitalResponce) {
      // Create a circle marker based on count
      const circle = L.circle([hospital["latitude"], hospital["longitude"]], {
        color: "red",
        fillColor: "red",
        fillOpacity: 0.5,
        radius: Math.sqrt(hospital["count"]) * 500, // Radius proportional to sqrt of count
      }).addTo(map);

      // Bind popup to show hospital name and count
      circle.bindPopup(
        `<b>${hospital["name"]}</b><br>Count: ${hospital["count"]}`
      );
    }
  }

  const hospitalResponce = [
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

  let filterBrand = "";
  let filterVariant = "";
  let filterCategory = "";
  let filterChemicalName = "";
  let filterInterval;
  let showMap = false;

  function applyQuery() {
    showMap = true;
    generateMap();
  }
  function returnFromQuery() {
    showMap = false;
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
                src={get(companyInfo).companyInfo["logo"]}
                alt="Drug company Logo"
                width={125}
                height={35}
                class="mx-0 my-0"
              />
            </div>

            <div class="flex items-center text-3xl font-bold text-blue-500">
              {get(companyInfo).companyInfo["name"]}
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
          <h1 class="container mx-8 text-3xl font-extrabold text-blue-600">
            Analysis Result
          </h1>
          {#if showMap}
            <button
              class="btn btn-outline ml-8 mt-4 hover:bg-red-600 mt-2 mb-6"
              on:click={returnFromQuery}>Back</button
            >
            <h1 class="text-xl ml-8 mb-2 font-bold text-blue-600">Hitmap</h1>
            <div class="mx-8 mb-10" id="mapId" />
            <h1 class="text-xl ml-8 font-bold text-blue-600">
              Tabular Result:
            </h1>
            <div class="flex flex-col gap-8 p-8 bg-gray-100">
              <!-- First Table: Top Patient Admissions -->

              <table class="min-w-full bg-white rounded-lg">
                <thead>
                  <tr class="text-lg text-gray-700">
                    <th class="px-4 py-2 text-left text-xl font-bold"
                      >Hospital Name</th
                    >
                    <th class="px-4 py-2 text-left text-xl font-bold">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {#each hospitalResponce as { name, count }}
                    <tr class="text-gray-600">
                      <td class="px-4 py-2 border"> {name}</td>
                      <td class="px-4 py-2 border">{count}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
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
              <p class="text-2xl font-extrabold text-blue-600">Run Query</p>
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
                for="filterVariant"
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
            <div class="mb-2">
              <label
                for="filterChemicalName"
                class="block text-sm font-bold text-black text-left"
                >Generics</label
              >
              <input
                type="text"
                id="filterChemicalName"
                bind:value={filterChemicalName}
                placeholder="Enter Generics"
                class="input input-bordered w-full"
              />
            </div>
            <div class="mb-4">
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
            <div>
              <button
                class="group w-full flex justify-center py-2 px-4 mt-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                on:click={applyQuery}
              >
                Run Query
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  #mapId {
    height: 400px;
  }
</style>
