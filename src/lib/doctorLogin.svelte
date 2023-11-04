<script>
    import { onMount } from "svelte";
    import toast, { Toaster } from "svelte-french-toast";
    import { serverUrl } from "./constants";
    import { doctorInfo } from "./store";
    let doctorID = "";
    let doctorPass = "";
    let isLoading = true;

    async function handleSubmit(event) {
        //Testing Direct Login
        // window.location.hash = `#/doctorhome`;

        const form = event.target;
        const data = new FormData(form);

        console.log(data.get("id"));
        console.log(data.get("password"));

        await fetch(serverUrl + "doctor/login", {
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
                    doctorInfo.set({
                        doctorName: data["name"],
                        doctorId: data["id"],
                        doctorEmail: data["email"],
                        doctorBmdc: data["bmdc"],
                        doctorDob: data["dob"],
                        doctorAddress: data["address"],
                        doctorGender: data["gender"],
                        doctorPhone: data["phone"],
                        doctorPhoto: data["photo"],
                    });
                    window.location.hash = `#/doctorhome`;
                }
            });

        form.reset();
    }
    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 1500); // Simulating an async load for the image.
    });
    function navigateHome() {
        window.location.hash = `#/`;
    }
</script>

<Toaster />
<main class="container">
    {#if isLoading}
        <div class="loader mr-2" />
        <div>
            <h1 class="text-3xl font-bold">Loading...</h1>
        </div>
    {:else}
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/back-button-new.svg"
            alt="Notification Icon"
            class="absolute top-4 left-4 h-10 w-10 transition-transform transform hover:scale-125"
            on:click={navigateHome}
        />
        <div class="flex items-center justify-center min-h-screen relative">
            <div class="card lg:card-side bg-ash shadow-xl z-50">
                <figure>
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/doctorLogin.jpg"
                        alt="Album"
                    />
                </figure>
                <div
                    class="card-body flex flex-col items-center absolute inset-1/4"
                >
                    <div class="flex items-center space-x-2 mb-4 mt-4">
                        <img
                            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/medicine-wellness-icon.svg"
                            class="w-12 h-12 transform transition duration-300 hover:rotate-12 hover:scale-110"
                            alt="Email Icon"
                        />
                        <p class="text-5xl font-bold">BDeHR</p>
                    </div>
                    <h5 class="text-3xl font-bold" style="color: #000000;">
                        Sign In to Doctor's Account
                    </h5>
                    <form on:submit|preventDefault={handleSubmit}>
                        <div class="mb-2">
                            <input
                                required
                                bind:value={doctorID}
                                type="text"
                                name="id"
                                placeholder="Enter Doctor ID"
                                class="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div>
                            <input
                                required
                                bind:value={doctorPass}
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                class="w-full input input-bordered max-w-xs"
                            />
                        </div>
                        <div>
                            <a
                                href="#/doctorsignup"
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
        </div>
    {/if}
</main>

<style>
    .loader {
        border: 6px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top: 8px solid white;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
    }
    .container {
        min-height: 100vh;
        min-width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(120deg, #fdcc52, #fec026);
    }
</style>
