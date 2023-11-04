<script>
    let hospitalId = "";
    let hospitalPass = "";
    import { hospitalInfo } from "./store";
    import { serverUrl } from "./constants";
    import toast, { Toaster } from "svelte-french-toast";
    import { onMount } from "svelte";

    let isLoading = true;
    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 1500); // Simulating an async load for the image.
    });

    async function handleSubmit(event) {
        //window.location.hash = `#/hospitalhome`;
        const form = event.target;
        const data = new FormData(form);

        console.log(data.get("id"));
        console.log(data.get("password"));

        await fetch(serverUrl + "hospital/login", {
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
                    hospitalInfo.set({ hospitalInfo: data });
                    console.log(hospitalInfo);
                    window.location.hash = `#/hospitalhome`;
                }
            });

        form.reset();
    }
    function navigateHome() {
        window.location.hash = `#/`;
    }
</script>

<Toaster />
<div
    class="flex items-center justify-center min-h-screen relative"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/blurblue.jpg'); background-size: cover; backdrop-filter: blur(10px);"
>
    <img
        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/back-button-new.svg"
        alt="Notification Icon"
        class="absolute top-4 left-4 h-10 w-10 transition-transform transform hover:scale-150"
        on:click={navigateHome}
    />
    {#if isLoading}
        <div class="loader mr-2" />
        <div>
            <h1 class="text-3xl font-bold">Loading Hospital...</h1>
        </div>
    {:else}
        <div class="card lg:card-side bg-ash shadow-xl z-50">
            <figure>
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospitalLogin.jpg"
                    alt="Album"
                />
            </figure>
            <div class="card-body flex flex-col items-center absolute inset-0">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                    alt="Album"
                    width={145}
                    height={20}
                    class="mt-5 mb-2 z-100"
                />
                <div>
                    <div class="flex flex-col items-center space-x-2 mb-2">
                        <img
                            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/health-and-safety-color-icon.svg"
                            class="w-16 h-16 transform transition duration-300 hover:-rotate-12 hover:scale-110"
                            alt="Email Icon"
                        />
                    </div>
                    <h2
                        class="mt-2 text-center text-3xl font-extrabold text-gray-900"
                    >
                        Sign in to Hospital
                    </h2>
                </div>

                <form on:submit|preventDefault={handleSubmit}>
                    <div class="mb-2">
                        <input
                            required
                            bind:value={hospitalId}
                            type="text"
                            name="id"
                            placeholder="Enter Hospital ID"
                            class="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div>
                        <input
                            required
                            bind:value={hospitalPass}
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            class="w-full input input-bordered max-w-xs"
                        />
                    </div>
                    <div>
                        <a
                            href="#/hospitalsignup"
                            class="link link-hover text-black"
                        >
                            Don't Have an Account? Sign Up Here
                        </a>
                    </div>

                    <div class="card-actions justify-end mt-5">
                        <button
                            type="submit"
                            class="w-full btn btn-outline btn-md hover:bg-black text-black"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    {/if}
</div>

<style>
    .loader {
        border: 8px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top: 8px solid white;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
    }
</style>
