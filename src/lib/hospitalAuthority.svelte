<script>
    import { doctors } from "./hospitalstore";
    import { hospitalName } from "./hospitalstore";
    let DoctorDatas = [];
    let nameHospital;
    doctors.subscribe((value) => {
        DoctorDatas = value;
    });
    hospitalName.subscribe((value) => {
        nameHospital = value;
    });

    let showModal = false;

    let doctorName = "";
    let doctorID = "";
    let speciality = "";
    let degreeInput = "";
    let degrees = [];

    const uniqueSpecialities = [
        ...new Set(DoctorDatas.map((doctor) => doctor.speciality)),
    ];

    function addDegree() {
        if (degreeInput.trim()) {
            degrees = [...degrees, degreeInput.trim()];
            degreeInput = "";
        }
    }
    function handleDegreeInput(event) {
        if (event.key === "Enter" && degreeInput.trim()) {
            degrees = [...degrees, degreeInput.trim()];
            degreeInput = "";
            event.preventDefault(); // Prevent form submission
        }
    }

    function addDoctor(event) {
        event.preventDefault();

        const newDoctor = {
            doctorName,
            doctorID,
            speciality,
            degrees,
            imageURL:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
        };

        DoctorDatas = [...DoctorDatas, newDoctor];

        // Reset form values
        doctorName = "";
        doctorID = "";
        speciality = "";
        degrees = [];
        degreeInput = "";

        // Optionally close the modal
        showModal = false;
    }

    function submitForm() {
        // Add your form submission logic here
        console.log({ doctorName, doctorID, speciality, degrees });
    }
</script>

<main>
    <!-- Navbar -->
    <nav class="bg-cyan-200 shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                alt={nameHospital + " Logo"}
                class="h-10 w-12 transition-transform transform hover:scale-125"
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{nameHospital} Authority</span
            >
            <span>
                <a href="#/hospitalhome" class="btn btn-outline ml-auto mr-2"
                    >Logout</a
                >
            </span>
        </div>
    </nav>

    <!-- Doctor List -->
    <div class="container mx-auto mt-10 p-6 bg-white rounded shadow-2xl">
        {#each uniqueSpecialities as specialityItem}
            <h2 class="text-xl font-semibold mb-4 text-purple-600">
                {specialityItem}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {#each DoctorDatas.filter((doctor) => doctor.speciality === specialityItem) as doctor}
                    <div
                        class="flex items-center space-x-4 bg-gray-100 p-4 rounded shadow-2xl transition-transform transform hover:scale-110"
                    >
                        <img
                            src={doctor.imageURL}
                            alt={doctor.doctorName}
                            class="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h3 class="font-semibold">{doctor.doctorName}</h3>
                            <p>{doctor.degrees.join(", ")}</p>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}

        <button
            class="bg-green-500 text-white p-2 rounded mt-6"
            on:click={() => (showModal = true)}>Add Doctor</button
        >
    </div>

    <!-- Modal -->
    {#if showModal}
        <div
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        >
            <div class="bg-white p-6 rounded shadow-none w-full max-w-md">
                <!-- Close Button -->
                <button
                    class="float-right p-2"
                    on:click={() => (showModal = false)}>&times;</button
                >

                <div
                    class="container mx-auto mt-10 p-6 bg-white rounded shadow-md max-w-md"
                >
                    <!-- Form -->
                    <form on:submit={addDoctor}>
                        <!-- Doctor Name -->
                        <div class="mb-4">
                            <label
                                for="doctorName"
                                class="block text-gray-700 font-medium mb-2"
                                >Doctor Name</label
                            >
                            <input
                                type="text"
                                id="doctorName"
                                bind:value={doctorName}
                                class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <!-- Doctor ID -->
                        <div class="mb-4">
                            <label
                                for="doctorID"
                                class="block text-gray-700 font-medium mb-2"
                                >Doctor ID</label
                            >
                            <input
                                type="text"
                                id="doctorID"
                                bind:value={doctorID}
                                class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <!-- Speciality -->
                        <div class="mb-4">
                            <label
                                for="speciality"
                                class="block text-gray-700 font-medium mb-2"
                                >Speciality</label
                            >
                            <input
                                type="text"
                                id="speciality"
                                bind:value={speciality}
                                class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <!-- Degrees -->
                        <div class="mb-4">
                            <label for="degrees" class="block mb-2"
                                >Degrees</label
                            >
                            <input
                                type="text"
                                id="degrees"
                                bind:value={degreeInput}
                                on:keydown={handleDegreeInput}
                                placeholder="Enter degree and press Enter"
                                class="border p-2 w-full rounded"
                            />
                            <ul>
                                {#each degrees as degree (degree)}
                                    <li
                                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1"
                                    >
                                        {degree}
                                    </li>
                                {/each}
                            </ul>
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-4">
                            <button
                                type="submit"
                                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                >Submit</button
                            >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
</style>
