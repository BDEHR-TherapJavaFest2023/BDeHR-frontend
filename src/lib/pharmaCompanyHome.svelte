<script>
  import { onMount } from "svelte";
  import { companyInfo } from "./store";
  import { Chart } from "chart.js/auto";
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

  let numberOfTimesPrescribed = 1234; // Dummy hehe
  let totalDemand = 6000; //dummy hehe
  let totalSale = 567890; // Dummy eheh
  let growthPercentage = 15;

  let lastMonthnumberOfTimesPrescribed = 870;
  let lastMonthtotalDemand = 5000; //dummy hehe
  let lastMonthtotalSale = 457890; // Dummy eheh
  let lastMonthgrowthPercentage = 18;

  let displayedNumberOfTimesPrescribed = 0;
  let displayedTotalDemand = 0;
  let displayedTotalSale = 0;
  let displayedGrowthPercentage = 0;

  let changenumberOfTimesPrescribed =
    100 *
    ((numberOfTimesPrescribed - lastMonthnumberOfTimesPrescribed) /
      lastMonthnumberOfTimesPrescribed);

  let changetotalDemand =
    100 * ((totalDemand - lastMonthtotalDemand) / lastMonthtotalDemand); //dummy hehe
  let changetotalSale =
    100 * ((totalSale - lastMonthtotalSale) / lastMonthtotalSale); // Dummy eheh
  let changegrowthPercentage =
    100 *
    ((growthPercentage - lastMonthgrowthPercentage) /
      lastMonthgrowthPercentage);

  const animateValue = (start, end, duration, incrementStep, callback) => {
    const range = end - start;
    let current = start;
    const increment = end > start ? incrementStep : -incrementStep;
    const stepTime = Math.abs(Math.floor(duration / (range / incrementStep)));
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

  let ctx1, ctx2, salesChart, prescribedChart;

  async function getAnimation() {
    animateValue(
      0,
      numberOfTimesPrescribed,
      1000,
      99,
      (val) => (displayedNumberOfTimesPrescribed = val)
    );
    animateValue(
      0,
      totalDemand,
      1000,
      100,
      (val) => (displayedTotalDemand = val)
    );
    animateValue(0, totalSale, 1000, 2200, (val) => (displayedTotalSale = val));
    animateValue(
      0,
      growthPercentage,
      1000,
      1,
      (val) => (displayedGrowthPercentage = val)
    );
  }
  //ei data gula query kore ana lagbe somehow
  let salesData = [
    { month: "May", sales: 50000 },
    { month: "Jun", sales: 55000 },
    { month: "Jul", sales: 51000 },
    { month: "Aug", sales: 60000 },
    { month: "Sep", sales: 62000 },
    { month: "Oct", sales: 61000 },
  ];
  let prescriptionData = [
    { month: "May", prescribed: 45000 },
    { month: "Jun", prescribed: 48000 },
    { month: "Jul", prescribed: 46000 },
    { month: "Aug", prescribed: 52000 },
    { month: "Sep", prescribed: 53000 },
    { month: "Oct", prescribed: 54000 },
  ];

  //Tablet: https://medex.com.bd/img/dosage-forms/tablet.png
  //Injection: https://medex.com.bd/img/dosage-forms/injection.png
  //Capsule: https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/noun-pill-7773.svg
  //Syrup: https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Syrup.svg
  //Ointment: https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/ointment.svg
  //Eyedrop: https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/eye-with-a-drop.svg
  //suppository: https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/suppository-capsule.svg
  const images = {
    Tablet: "https://medex.com.bd/img/dosage-forms/tablet.png",
    Injection: "https://medex.com.bd/img/dosage-forms/injection.png",
    Capsule:
      "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/noun-pill-7773.svg",
    Syrup:
      "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Syrup.svg",
    Ointment:
      "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/ointment.svg",
    Eyedrop:
      "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/eye-with-a-drop.svg",
    Suppository:
      "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/suppository-capsule.svg",
  };
  function getImage(variant) {
    return images[variant];
  }
  const topProductsLastMonth = [
    { name: "Pantonix", Variant: "Tablet", count: 500 },
    { name: "Montair", Variant: "Tablet", count: 490 },
    { name: "Osartil", Variant: "Tablet", count: 380 },
    { name: "Maxsulin", Variant: "Injection", count: 370 },
    { name: "Cefaclav", Variant: "Tablet", count: 250 },
    { name: "Esonix", Variant: "Capsule", count: 207 },
    { name: "Cyclopen", Variant: "Syrup", count: 150 },
  ];

  const topBrands = [
    { name: "Pantonix", Variant: "Tablet" },
    { name: "Exephin", Variant: "Injection" },
    { name: "Esonix", Variant: "Capsule" },
    { name: "Cyclopen", Variant: "Syrup" },
    { name: "Fortison", Variant: "Ointment" },
    { name: "Moxquin", Variant: "Eyedrop" },
    { name: "mifepristone", Variant: "Suppository" },
  ];

  function createCharts() {
    // Sales data
    ctx1 = document.getElementById("salesChart").getContext("2d");
    salesChart = new Chart(ctx1, {
      type: "line",
      data: {
        labels: salesData.map((d) => d.month),
        datasets: [
          {
            label: "Sales Over Last 6 Months",
            data: salesData.map((d) => d.sales),
            borderColor: "#3498db",
            borderWidth: 2.5,
            fill: false,
            pointBackgroundColor: "#3498db",
            pointBorderColor: "#3498db",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Prescribed data
    ctx2 = document.getElementById("prescribedChart").getContext("2d");
    prescribedChart = new Chart(ctx2, {
      type: "line",
      data: {
        labels: prescriptionData.map((d) => d.month),
        datasets: [
          {
            label: "Prescribed Over Last 6 Months",
            data: prescriptionData.map((d) => d.prescribed),
            borderColor: "#e74c3c",
            borderWidth: 2.5,
            fill: false,
            pointBackgroundColor: "#e74c3c",
            pointBorderColor: "#e74c3c",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  onMount(() => {
    getAnimation();
    createCharts();
  });
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
      <h1 class="container mx-8 text-3xl font-extrabold text-blue-600">
        Dashboard
      </h1>
      <section class="container mx-8 mt-6">
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-primary">
              <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pharmacy-prescription-icon.svg"
                alt="Prescription Icon"
                class="w-10 h-10 transform transition duration-300 hover:rotate-12"
              />
            </div>
            <div class="stat-title">Total Prescribed Unit</div>
            <div class="stat-value text-primary">
              {displayedNumberOfTimesPrescribed}
            </div>
            <div class="stat-desc">
              {#if changenumberOfTimesPrescribed > 0}
                {changenumberOfTimesPrescribed.toFixed(1)}% more prescribed last
                month
              {:else if changenumberOfTimesPrescribed < 0}
                {(-1 * changenumberOfTimesPrescribed).toFixed(1)}% less
                prescribed last month
              {/if}
            </div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pills-tablets-icon.svg"
                alt="Prescription Icon"
                class="w-10 h-10 transform transition duration-300 hover:rotate-12"
              />
            </div>
            <div class="stat-title">Total Demand Unit</div>
            <div class="stat-value text-secondary">
              {displayedTotalDemand}
            </div>
            <div class="stat-desc">
              {#if changetotalDemand > 0}
                {changetotalDemand.toFixed(1)}% more demand than last month
              {:else if changetotalDemand < 0}
                {(-1 * changetotalDemand).toFixed(1)}% less demand than last
                month
              {/if}
            </div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/bangladeshi-taka-sign_1.svg"
                alt="Prescription Icon"
                class="w-10 h-10 transform transition duration-300 hover:rotate-12"
              />
            </div>
            <div class="stat-title">Total Sale</div>
            <div class="stat-value text-accent">
              {displayedTotalSale}
            </div>
            <div class="stat-desc">
              {#if changetotalSale > 0}
                {changetotalSale.toFixed(1)}% more sale than last month
              {:else if changetotalSale < 0}
                {(-1 * changetotalSale).toFixed(1)}% less sale than last month
              {/if}
            </div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/triangle-sharp.svg"
                alt="Prescription Icon"
                class="w-10 h-10 transform transition duration-300 hover:rotate-12"
              />
            </div>
            <div class="stat-title">Percentage</div>
            <div class="stat-value text-green-600">
              {displayedGrowthPercentage}%
            </div>
            <div class="stat-desc">
              {#if changegrowthPercentage > 0}
                {changegrowthPercentage.toFixed(1)}% more growth than last month
              {:else if changegrowthPercentage < 0}
                {(-1 * changegrowthPercentage).toFixed(1)}% less growth than
                last month
              {/if}
            </div>
          </div>
        </div>
      </section>

      <div class="flex space-x-6 mt-6 mx-8">
        <!-- Sales Chart Box -->
        <div class="box flex-1">
          <div class="flex items-center space-x-2 mb-2 ml-10">
            <img
              src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mobile-clinic-truck-icon.svg"
              class="w-12 h-12 transform transition duration-300 hover:rotate-12"
              alt="Email Icon"
            />
            <p class="text-2xl font-bold text-blue-600">
              Sales Over Last 6 months
            </p>
          </div>
          <canvas id="salesChart" width="350" height="200" />
        </div>

        <!-- Prescription Chart Box -->
        <div class="box flex-1">
          <div class="flex items-center space-x-2 mb-2 ml-10">
            <img
              src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/prescription-icon.svg"
              class="w-12 h-12 transform transition duration-300 hover:rotate-12"
              alt="Email Icon"
            />
            <p class="text-2xl font-bold text-blue-600">
              Prescribed Over Last 6 months
            </p>
          </div>
          <canvas id="prescribedChart" width="350" height="200" />
        </div>
      </div>
      <div class="flex justify-between gap-8 p-8 bg-gray-100">
        <!-- First Table: Top Patient Admissions -->
        <div
          class="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-x-auto mr-4"
        >
          <div class="flex items-center space-x-2 mb-4">
            <img
              src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dollar-circle.svg"
              class="w-12 h-12 transform transition duration-300 hover:rotate-12"
              alt="Email Icon"
            />
            <p class="text-2xl font-bold text-blue-600">
              Top Sale in Last Month
            </p>
          </div>
          <table class="min-w-full bg-white rounded-lg">
            <thead>
              <tr class="text-lg text-gray-700">
                <th class="px-4 py-2 text-left">Brand</th>
                <th class="px-4 py-2 text-left">Sale Unit</th>
              </tr>
            </thead>
            <tbody>
              {#each topProductsLastMonth as { name, Variant, count }}
                <tr class="text-gray-600">
                  <td class="px-4 py-2 border"
                    ><img
                      src={getImage(Variant)}
                      alt={"variant"}
                      class="inline-block mr-2 w-5 h-5 transform transition duration-300 hover:rotate-12"
                    />
                    {name}</td
                  >
                  <td class="px-4 py-2 border">{count}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Second Table: Top Deaths -->
        <div
          class="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-x-auto ml-4"
        >
          <div class="flex items-center space-x-2 mb-4">
            <img
              src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/4915541-200.svg"
              class="w-12 h-12 transform transition duration-300 hover:rotate-12"
              alt="Email Icon"
            />
            <p class="text-2xl font-bold text-red-600">Top Brands</p>
          </div>
          <table class="min-w-full bg-white rounded-lg">
            <thead>
              <tr class="text-lg text-gray-700">
                <th class="px-4 py-2 text-left">Brand</th>
                <th class="px-4 py-2 text-left">Variant</th>
              </tr>
            </thead>
            <tbody>
              {#each topBrands as { name, Variant }}
                <tr class="text-gray-600">
                  <td class="px-4 py-2 border"
                    ><img
                      src={getImage(Variant)}
                      alt={"variant"}
                      class="inline-block mr-2 w-5 h-5 transform transition duration-300 hover:rotate-12"
                    />{name}</td
                  >
                  <td class="px-4 py-2 border">{Variant}</td>
                </tr>
              {/each}
            </tbody>
          </table>
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
    font-size: 1.5em;
    font-weight: bold;
  }

  .box {
    background-color: #fff;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .flex {
    display: flex;
    flex-wrap: wrap; /* Allow items to wrap to next line */
  }

  .chart-box {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    padding: 5px;
    background-color: #fff;
  }

  .grid line {
    stroke: #f1f1f1;
    stroke-dasharray: 1, 3;
  }

  canvas {
    max-width: 100%;
  }
</style>
