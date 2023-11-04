<script>
  import { onMount } from "svelte";
  import { companyInfo } from "./store";
  import { get } from "svelte/store";
  import { bucketUrl, serverUrl } from "./constants";
  import { supabase } from "./supabaseClient";
  let drugData = {
    name: "",
    variant: "",
    intensity: "",
    image: null,
    imagePreview: "",
    category: "",
    chemicalName: "",
    bestBefore: "",
    indications: "",
    pharmacology: "",
    dosage: "",
    administration: "",
    interaction: "",
    sideEffects: "",
    precautions: "",
    storageConditions: "",
    numberOfUnitsSold: 0,
  };

  let currentStep = 0;

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      drugData.image = file;

      const reader = new FileReader();
      reader.onloadend = () => {
        drugData.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);

    formData.set("name", drugData.name);
    formData.set("variant", drugData.variant);
    formData.set("chemicalName", drugData.chemicalName);
    formData.set("intensity", drugData.intensity);
    formData.set("category", drugData.category);

    formData.set("bestBefore", drugData.bestBefore);
    formData.set("indications", drugData.indications);
    formData.set("pharmacology", drugData.pharmacology);
    formData.set("dosage", drugData.dosage);
    formData.set("administration", drugData.administration);

    formData.set("interaction", drugData.interaction);
    formData.set("sideEffects", drugData.sideEffects);
    formData.set("precautions", drugData.precautions);
    formData.set("storageConditions", drugData.storageConditions);
    formData.set("company", get(companyInfo).companyInfo["name"])

    await fetch(serverUrl + "drug/add-drug", {
      method: "POST",
      body: formData,
    }).then((data) => {
      let { data: res1 } = supabase.storage
        .from("drugPhoto")
        .upload(drugData.name, drugData.image, {
          cacheControl: "0",
          upsert: true,
        });

      let payload = {
        name: drugData.name,
        urlPhoto: `${bucketUrl}/drugPhoto/${drugData.name}`,
      };

      fetch(serverUrl + "drug/add-drug-photo", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    });

    currentStep = 0;
    showForm = false;
    form.reset();
    drugData = {
      name: "",
      variant: "",
      intensity: "",
      image: null,
      imagePreview: "",
      category: "",
      chemicalName: "",
      bestBefore: "",
      indications: "",
      pharmacology: "",
      dosage: "",
      administration: "",
      interaction: "",
      sideEffects: "",
      precautions: "",
      storageConditions: "",
      numberOfUnitsSold: 0,
    };
  }

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
  let showForm = false;
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
          class="flex items-center p-4 bg-red-400 cursor-default"
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
        Add New Drug
      </h1>
      <div class="container mx-8 mt-6">
        <button class="btn btn-primary" on:click={() => (showForm = !showForm)}>
          Add New Drug
        </button>

        {#if showForm}
          <form
            on:submit|preventDefault={handleSubmit}
            class="mt-8 bg-white p-8 rounded shadow-lg"
          >
            <div class="flex justify-between items-center mb-6">
              <!-- Step 1 -->
              <div
                class={`step flex flex-col items-center font-bold
                            ${
                              currentStep >= 0
                                ? "text-green-600"
                                : "text-gray-300"
                            }`}
              >
                <div class="icon-wrapper mb-2">
                  <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/information-icon.svg"
                    alt="Basic Info"
                    class="w-6 h-6"
                  />
                </div>
                Basic Information
              </div>

              <!-- Connector Line -->
              <div
                class={`connector w-1/3 h-0.5 
                            ${
                              currentStep >= 1 ? "bg-green-600" : "bg-gray-300"
                            }`}
              />

              <!-- Step 2 -->
              <div
                class={`step flex flex-col items-center font-bold
                            ${
                              currentStep >= 1
                                ? "text-green-600"
                                : "text-gray-300"
                            }`}
              >
                <div class="icon-wrapper mb-2">
                  <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/view-details-2.svg"
                    alt="Details"
                    class="w-6 h-6"
                  />
                </div>
                Details
              </div>

              <!-- Connector Line -->
              <div
                class={`connector w-1/3 h-0.5 
                            ${
                              currentStep >= 2 ? "bg-green-600" : "bg-gray-300"
                            }`}
              />

              <!-- Step 3 -->
              <div
                class={`step flex flex-col items-center font-bold
                            ${
                              currentStep >= 2
                                ? "text-green-600"
                                : "text-gray-300"
                            }`}
              >
                <div class="icon-wrapper mb-2">
                  <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/confirm-32.svg"
                    alt="Confirmation"
                    class="w-6 h-6"
                  />
                </div>
                Confirmation
              </div>
            </div>

            {#if currentStep === 0}
              <div class="step flex flex-col space-y-6">
                <div data-content="Basic Information">
                  <!-- Basic Information Fields -->
                  <div class="mb-2">
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Name</label
                    >
                    <input
                      type="text"
                      name="name"
                      bind:value={drugData.name}
                      placeholder="Enter Name"
                      class="input input-bordered w-full"
                    />
                  </div>
                  <div class="mb-2">
                    <label
                      for="variant"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Variant</label
                    >
                    <select
                      name="variant"
                      bind:value={drugData.variant}
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
                      for="intensity"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Intensity</label
                    >
                    <input
                      type="text"
                      name="intensity"
                      bind:value={drugData.intensity}
                      placeholder="Enter Intensity"
                      class="input input-bordered w-full"
                    />
                  </div>

                  <div class="mb-2">
                    <label
                      for="category"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Category</label
                    >
                    <input
                      type="text"
                      name="category"
                      bind:value={drugData.category}
                      placeholder="Enter Category"
                      class="input input-bordered w-full"
                    />
                  </div>
                  <div class="mb-2">
                    <label
                      for="chemicalName"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Chemical Name</label
                    >
                    <input
                      type="text"
                      name="chemicalName"
                      bind:value={drugData.chemicalName}
                      placeholder="Enter Chemical Name"
                      class="input input-bordered w-full"
                    />
                  </div>
                  <div class="mb-2">
                    <label
                      for="bestBefore"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Best Before</label
                    >
                    <input
                      type="number"
                      name="bestBefore"
                      bind:value={drugData.bestBefore}
                      placeholder="in weeks"
                      class="input input-bordered w-full"
                    />
                  </div>
                  <div class="mb-2">
                    <label
                      for="image"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Image</label
                    >
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      on:change={handleImageChange}
                      class="input input-bordered w-full"
                    />
                    {#if drugData.imagePreview}
                      <div class="mt-4">
                        <img
                          src={drugData.imagePreview}
                          alt="Preview"
                          class="w-36 h-36 transition-transform transform hover:scale-105"
                        />
                      </div>
                    {/if}
                  </div>
                  <button
                    type="button"
                    on:click={() => {
                      currentStep++;
                    }}
                    class="btn btn-accent"
                  >
                    Confirm & Next
                  </button>
                </div>
              </div>
            {/if}

            {#if currentStep === 1}
              <div class="flex flex-col space-y-6">
                <div data-content="Details">
                  <!-- Details Fields -->

                  <!-- Indications -->
                  <div class="mb-2">
                    <label
                      for="indications"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Indications</label
                    >
                    <textarea
                      name="indications"
                      bind:value={drugData.indications}
                      placeholder="Enter Indications"
                      class="textarea textarea-bordered w-full p-2"
                    />
                  </div>

                  <!-- Pharmacology -->
                  <div class="mb-2">
                    <label
                      for="pharmacology"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Pharmacology</label
                    >
                    <textarea
                      name="pharmacology"
                      bind:value={drugData.pharmacology}
                      placeholder="Enter Pharmacology"
                      class="textarea textarea-bordered w-full"
                    />
                  </div>

                  <!-- Dosage -->
                  <div class="mb-2">
                    <label
                      for="dosage"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Dosage</label
                    >
                    <textarea
                      name="dosage"
                      bind:value={drugData.dosage}
                      placeholder="Enter Dosage"
                      class="textarea textarea-bordered w-full"
                    />
                  </div>

                  <!-- Administration -->
                  <div class="mb-2">
                    <label
                      for="administration"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Administration</label
                    >
                    <textarea
                      name="administration"
                      bind:value={drugData.administration}
                      placeholder="Enter Administration Method"
                      class="textarea textarea-bordered w-full"
                    />
                  </div>

                  <!-- Interaction -->
                  <div class="mb-2">
                    <label
                      for="interaction"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Interaction</label
                    >
                    <textarea
                      name="interaction"
                      bind:value={drugData.interaction}
                      placeholder="Enter Drug Interactions"
                      class="textarea textarea-bordered w-full"
                    />
                  </div>

                  <!-- Side Effects -->
                  <div class="mb-2">
                    <label
                      for="sideEffects"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Side Effects</label
                    >
                    <textarea
                      name="sideEffects"
                      bind:value={drugData.sideEffects}
                      placeholder="Enter Side Effects"
                      class="textarea textarea-bordered w-full"
                    />
                  </div>

                  <!-- Precautions and Warnings -->
                  <div class="mb-2">
                    <label
                      for="precautions"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Precautions and Warnings</label
                    >
                    <textarea
                      name="precautions"
                      bind:value={drugData.precautions}
                      placeholder="Enter Precautions and Warnings"
                      class="textarea textarea-bordered w-full"
                    />
                  </div>

                  <!-- Storage Conditions -->
                  <div class="mb-2">
                    <label
                      for="storageConditions"
                      class="block text-sm font-medium text-gray-700 text-left"
                      >Storage Conditions</label
                    >
                    <textarea
                      name="storageConditions"
                      bind:value={drugData.storageConditions}
                      placeholder="Enter Storage Conditions"
                      class="textarea textarea-bordered w-full"
                    />
                  </div>

                  <div class="flex justify-between mt-4">
                    <button
                      type="button"
                      class="btn btn-error"
                      on:click={() => {
                        currentStep--;
                      }}>Previous</button
                    >
                    <button
                      type="button"
                      class="btn btn-accent mr-5"
                      on:click={() => {
                        currentStep++;
                      }}>Confirm & Next</button
                    >
                  </div>
                </div>
              </div>
            {/if}

            {#if currentStep === 2}
              <div class="steps p-4">
                <div data-content="Confirmation" class="space-y-4">
                  <!-- Confirmation -->
                  <div class="flex space-x-4">
                    <!-- Image Display -->
                    <div class="w-1/4">
                      <div class="border border-gray-300 p-2 rounded-lg shadow">
                        {#if drugData.imagePreview}
                          <img
                            src={drugData.imagePreview}
                            alt="Uploaded image"
                            class="w-full h-auto"
                          />
                        {:else}
                          <p class="text-center text-gray-500">
                            No Image Provided
                          </p>
                        {/if}
                      </div>
                    </div>

                    <!-- Info Display -->
                    <div class="w-3/4 space-y-2">
                      <p class="font-bold text-xl">Confirmation Details</p>
                      <p>
                        <span class="font-medium">Name:</span>
                        {drugData.name}
                      </p>
                      <p>
                        <span class="font-medium">Variant:</span>
                        {drugData.variant}
                      </p>
                      <p>
                        <span class="font-medium">Intensity:</span>
                        {drugData.intensity}
                      </p>
                      <p>
                        <span class="font-medium">Category:</span>
                        {drugData.category}
                      </p>
                      <p>
                        <span class="font-medium">Chemical Name:</span>
                        {drugData.chemicalName}
                      </p>
                      <p>
                        <span class="font-medium">Expire Duration:</span>
                        {drugData.bestBefore}
                      </p>
                      <p>
                        <span class="font-medium">Indication:</span>
                        {drugData.indications}
                      </p>
                      <p>
                        <span class="font-medium">Pharmacology:</span>
                        {drugData.pharmacology}
                      </p>
                      <p>
                        <span class="font-medium">Dosage:</span>
                        {drugData.dosage}
                      </p>
                      <p>
                        <span class="font-medium">Administration:</span>
                        {drugData.administration}
                      </p>
                      <p>
                        <span class="font-medium">Interaction:</span>
                        {drugData.interaction}
                      </p>
                      <p>
                        <span class="font-medium">Side Effects:</span>
                        {drugData.sideEffects}
                      </p>
                      <p>
                        <span class="font-medium">Precaution:</span>
                        {drugData.precautions}
                      </p>
                      <p>
                        <span class="font-medium">Storage Conditions:</span>
                        {drugData.storageConditions}
                      </p>
                    </div>
                  </div>

                  <div class="flex justify-end space-x-2 mr-2">
                    <button
                      type="button"
                      class="btn btn-error mr-2"
                      on:click={() => {
                        currentStep--;
                      }}>Previous</button
                    >
                    <button type="submit" class="btn btn-accent">Submit</button>
                  </div>
                </div>
              </div>
            {/if}
          </form>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  .step {
    flex: 1;
    text-align: center;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid currentColor;
  }

  .step.text-green-600 .icon-wrapper {
    background-color: #27df02;
  }

  .connector {
    align-self: center;
    background-color: #e2e8f0;
  }
</style>
