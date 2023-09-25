<script>
    import { get } from "svelte/store";

    // @ts-nocheck

    import { hospitalDoctorList, hospitalInfo } from "./store";
    function navigateBack() {
        window.location.hash = "#/hospitalhome";
    }

    let groupedDoctors = {};

    // Group doctors by their specialty
    get(hospitalDoctorList).doctorList.forEach((doctor) => {
        if (!groupedDoctors[doctor.speciality]) {
            groupedDoctors[doctor.speciality] = [];
        }
        groupedDoctors[doctor.speciality].push(doctor);
    });
</script>

<main class="min-h-screen p-8 bg-gradient-to-br from-blue-300 to-purple-300">
    <nav class="bg-white shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.png"
                alt={get(hospitalInfo).hospitalName + " Logo"}
                class="h-10 w-12 transition-transform transform hover:scale-125"
                on:click={navigateBack}
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{get(hospitalInfo).hospitalName}</span
            >
            <span>
                <a href="#/hospitalogin" class="btn btn-outline ml-auto mr-2"
                    >Logout</a
                >
            </span>
        </div>
    </nav>
    <section>
        {#each Object.keys(groupedDoctors) as speciality}
            <div class="mb-8">
                <h3 class="text-3xl font-bold text-purple-600 mb-4">
                    {speciality}
                </h3>
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                    {#each groupedDoctors[speciality] as doctor}
                        <div
                            class="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-90"
                        >
                            <img
                                src={doctor.imageURL}
                                alt={doctor.doctorName}
                                class="w-32 h-32 object-cover mx-auto mb-4 rounded-full"
                            />
                            <h2
                                class="text-2xl font-bold text-purple-600 text-center"
                            >
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
                </div>
            </div>
        {/each}
    </section>
</main>
