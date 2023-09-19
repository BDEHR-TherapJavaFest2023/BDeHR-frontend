<script>
    import { hospitalName } from "./hospitalstore";
    import { hospitalLogo } from "./hospitalstore";
    import { doctors } from "./hospitalstore";

    let nameHospital;
    let logoHospital;
    let authorityDoctors;
    hospitalLogo.subscribe((value) => {
        logoHospital = value;
    });
    hospitalName.subscribe((value) => {
        nameHospital = value;
    });
    doctors.subscribe((value) => {
        authorityDoctors = value;
    });
    let password = "";
    function handleLogin() {
        hospitalLogo.set(logoHospital);
        hospitalName.set(nameHospital);
        doctors.set(authorityDoctors);
        window.location.hash = "#/doctorhome/Authority";
    }
</script>

<main
    class="min-h-screen bg-gray-100 flex items-center justify-center p-5"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/greyBlur.jpg'); background-size: cover; backdrop-filter: blur(0px);"
>
    <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <!-- Hospital and Company Logos -->
        <div class="flex justify-center items-center mb-2">
            <!-- Hospital Logo -->
            <img
                src={logoHospital}
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
            <h2 class="text-2xl font-bold text-gray-700">{nameHospital}</h2>
        </div>
        <div class="text-center mb-6">
            <h2 class="font-semibold text-gray-700">Authority</h2>
        </div>

        <!-- Login Form -->
        <form on:submit|preventDefault={handleLogin}>
            <div class="mb-6">
                <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-600"
                    >Password</label
                >
                <input
                    type="password"
                    id="password"
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
