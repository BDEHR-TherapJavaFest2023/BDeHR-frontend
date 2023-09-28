<script>
    import { get } from "svelte/store";
    import { hospitalInfo } from "./store";
    import toast, { Toaster } from "svelte-french-toast";
    import { serverUrl } from "./constants";
    let password = "";

    async function handleLogin(event) {
        //window.location.hash = "#/doctorhome/Authority";
        const form = event.target;
        const data = new FormData(form);

        console.log(data.get("id"));
        console.log(data.get("authPassword"));

        await fetch(serverUrl + "hospital/auth-login", {
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
                    window.location.hash = "#/doctorhome/Authority";
                }
            });

        form.reset();
    }
    function navigateHome() {
        window.location.hash = `#/hospitalhome`;
    }
</script>

<Toaster />
<main
    class="min-h-screen bg-gray-100 flex items-center justify-center p-5"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/greyBlur.jpg'); background-size: cover; backdrop-filter: blur(0px);"
>
    <img
        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.svg"
        alt="Notification Icon"
        class="absolute top-4 left-4 h-10 w-10 transition-transform transform hover:scale-150"
        on:click={navigateHome}
    />
    <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <!-- Hospital and Company Logos -->
        <div class="flex justify-center items-center mb-2">
            <!-- Hospital Logo -->
            <img
                src={get(hospitalInfo).hospitalInfo["logo"]}
                alt="Hospital Logo"
                class="w-24 h-24 mr-6"
            />

            <!-- Company Logo -->
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                alt="Company Logo"
                class="w-20 h-20"
            />
        </div>

        <!-- Hospital Name -->
        <div class="text-center mb-2">
            <h2 class="text-2xl font-bold text-gray-700">
                {get(hospitalInfo).hospitalInfo["name"]}
            </h2>
        </div>
        <div class="text-center mb-6">
            <h2 class="font-semibold text-gray-700">Authority</h2>
        </div>

        <!-- Login Form -->
        <form on:submit|preventDefault={handleLogin}>
            <div class="mb-6">
                <input
                    type="hidden"
                    name="id"
                    value={get(hospitalInfo).hospitalInfo["id"]}
                />
                <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-600"
                    >Password</label
                >
                <input
                    type="password"
                    name="authPassword"
                    bind:value={password}
                    required
                    class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Log in
                </button>
            </div>
        </form>
    </div>
</main>
