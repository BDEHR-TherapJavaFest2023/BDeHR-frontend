<script>
    let hospitalName = "Dhaka Medical College";
    let hospitalLogo =
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dmc.png";
    let labId = "VBI2NIRD";
    let machines = [
        {
            machineName: "ECG Machine",
            companyName: "Healicom",
            model: "HE-12B",
            incorporateDate: "2018-01-15",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/ecg.jpg",
        },
        {
            machineName: "Ultrasonography Machine",
            companyName: "SIUI",
            model: "CTS 4000",
            incorporateDate: "2019-07-19",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/usg.jpg",
        },
        {
            machineName: "X-RAY Machine",
            companyName: "Triup",
            model: "TR-200B",
            incorporateDate: "2015-9-10",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/xray.jpg",
        },
        {
            machineName: "MRI Machine",
            companyName: "Philips",
            model: "1.5T",
            incorporateDate: "2020-9-29",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mri.jpg",
        },
        {
            machineName: "Bio-Chemistry Analyzer Machine",
            companyName: "ICUBIO",
            model: "iMagic 52",
            incorporateDate: "2017-9-20",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/biochemanalyzer.png",
        },
        {
            machineName: "Electrolyte Analyzer Machine",
            companyName: "Innolyte",
            model: "EA-2000B",
            incorporateDate: "2017-10-21",
            image: "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/electro.jpg",
        },
        // ... add more instruments as needed ...
    ];
    let hoveredMachine = null;
    function navigateToPatients() {
        window.location.hash = "#/labhome/labpatients";
    }
</script>

<!-- Navbar -->
<nav class="bg-blue-500 p-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
        <img
            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
            alt="Company Logo"
            class="h-10 w-auto mr-4 transition-transform transform hover:scale-125"
        />

        <h1 class="text-white text-xl font-semibold">{hospitalName}</h1>
        <a href="#/lablogin" class="btn btn-error hover:bg-red-600">Logout</a>
    </div>
</nav>

<!-- Main Content -->
<!-- Main Content -->
<main class="bg-gray-100 py-8">
    <div class="container mx-auto p-4">
        <div class="text-center mb-6">
            <img
                src={hospitalLogo}
                alt="Hospital Logo"
                class="mx-auto w-32 h-32 mb-4"
            />
            <h2 class="text-3xl font-bold mb-2">Lab:{labId}</h2>
            <button
                on:click={navigateToPatients}
                class="mb-8 px-8 py-3 rounded-full bg-blue-500 text-white font-bold transition duration-300 hover:bg-blue-600"
            >
                Patients
            </button>

            <h2 class="text-2xl font-bold">Laboratory Instruments</h2>
        </div>

        <!-- Machines Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each machines as machine}
                <div
                    class="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-xl transition-shadow duration-300"
                    on:mouseover={() => (hoveredMachine = machine)}
                    on:mouseout={() => (hoveredMachine = null)}
                >
                    <img
                        src={machine.image}
                        alt={machine.machineName}
                        class="w-full transform scale-100 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                    >
                        <div class="text-center space-y-2">
                            <h2 class="text-white font-bold">
                                {machine.machineName}
                            </h2>
                            <p class="text-white">
                                Company: {machine.companyName}
                            </p>
                            <p class="text-white">Model: {machine.model}</p>
                            <p class="text-white">
                                incorporated: {machine.incorporateDate}
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    /* Additional styles if required */
</style>
