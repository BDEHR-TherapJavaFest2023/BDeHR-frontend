<script>
  import { onMount } from "svelte";
  import { serverUrl } from "./constants";
  import { companyInfo } from "./store";
  import toast, { Toaster } from "svelte-french-toast";

  let isLoading = true;
  let id = "";
  let password = "";

  onMount(() => {
    setTimeout(() => {
      isLoading = false;
    }, 1500); // Simulating an async load for the image.
  });

  async function handleLogin(event) {
    //window.location.hash = `#/hospitalhome`;
    const form = event.target;
    const data = new FormData(form);

    console.log(data.get("id"));
    console.log(data.get("password"));

    await fetch(serverUrl + "company/login", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .catch(() => null)
      .then((data) => {
        // let ret = +data;
        console.log(data);

        //Login Failed
        if (!data) {
          toast.error("Login Failed 🙁");
        }
        //Login Success
        else {
          companyInfo.set({ companyInfo: data });
          console.log(companyInfo);
          window.location.hash = `#/pharmaceuticalcompany/home`;
        }
      });

    form.reset();
  }
</script>

<Toaster/>
<div class="container">
  {#if isLoading}
    <div class="loader" />
  {:else}
    <div
      class="flex bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl transition-transform transform hover:scale-105"
    >
      <!-- Left Part - Image -->
      <div class="w-1/2 relative">
        <img
          src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/istockphoto-1166036878-612x612.jpg"
          alt="Pharmacy Image"
          class="w-full h-full object-cover rounded-l-xl"
        />
      </div>

      <!-- Right Part - Login Fields -->
      <div class="w-1/2 space-y-4 p-6">
        <!-- Company Logo -->
        <div class="mb-6">
          <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
            alt="Company Logo"
            class="w-32 mx-auto"
          />
        </div>
        <h1 class="flex flex-col items-center text-2xl font-bold">
          Sign In to Your Company
        </h1>

        <form on:submit|preventDefault={handleLogin} class="space-y-4">
          <input
            type="text"
            name="id"
            placeholder="Company ID"
            bind:value={id}
            class="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            bind:value={password}
            class="input input-bordered w-full"
            required
          />
          <button type="submit" class="btn btn-primary w-full mt-4"
            >Login</button
          >
        </form>

        <div class="flex justify-between items-center mt-4">
          <a href="#" class="text-blue-500 hover:underline">Forgot password?</a>
          <a
            href="#/pharmaceuticalcompanysignup"
            class="text-blue-500 hover:underline">Register</a
          >
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(120deg, #e0c3fc, #8ec5fc);
  }

  .loader {
    border: 8px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top: 8px solid white;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
