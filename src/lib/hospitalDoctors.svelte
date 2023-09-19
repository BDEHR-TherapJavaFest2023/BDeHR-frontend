<script>
    // @ts-nocheck

    import { doctors } from "./hospitalstore";
    import { hospitalName } from "./hospitalstore";
    let hospital_doctors = [];
    let nameHospital;
    doctors.subscribe((value) => {
        hospital_doctors = value;
    });
    hospitalName.subscribe((value) => {
        nameHospital = value;
    });
    function navigateBack() {
        window.location.hash = "#/hospitalhome";
    }
</script>

<main class="min-h-screen p-8 bg-gradient-to-br from-blue-300 to-purple-300">
    <nav class="bg-white shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.png"
                alt={nameHospital + " Logo"}
                class="h-10 w-12 transition-transform transform hover:scale-125"
                on:click={navigateBack}
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{nameHospital}</span
            >
            <span>
                <a href="#/hospitalogin" class="btn btn-outline ml-auto mr-2"
                    >Logout</a
                >
            </span>
        </div>
    </nav>
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each hospital_doctors as doctor, index}
            <div
                class="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-90"
            >
                <img
                    src={doctor.imageURL}
                    alt={doctor.doctorName}
                    class="w-32 h-32 object-cover mx-auto mb-4 rounded-full"
                />
                <h2 class="text-2xl font-bold text-purple-600 text-center">
                    {doctor.doctorName}
                </h2>
                <p class="text-gray-600 text-center font-bold">
                    {doctor.speciality}
                </p>
                <ul class="text-gray-600 text-center">
                    {#each doctor.degrees as degree}
                        <li>{degree}</li>
                    {/each}
                </ul>
            </div>
        {/each}
    </section>
</main>
