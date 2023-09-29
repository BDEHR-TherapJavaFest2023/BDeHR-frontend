<script>
    import { onMount } from "svelte";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import {
        hospitalDoctorList,
        hospitalPatientList,
        hospitalInfo,
    } from "./store";
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";

    // const data = {
    //     name: "Dhaka Medical College Hospital",
    //     hospitalID: "ABCD4321",
    //     latitude: 23.726,
    //     longitude: 90.3976,
    //     address: "Secretariat Road, Shahbagh, Dhaka",
    //     website: "https://dmc.gov.bd/",
    //     phone: "+8801759924770",
    //     email: "dmc@gmail.com",
    //     establishment: "1946",
    //     imageUrl:
    //         "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dmch.jpg",
    //     logoUrl:
    //         "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dmc.png",
    //     NumberCurrentDoctors: "2000",
    //     NumberCurrentPatient: "20,000",
    //     NumberCurrentUnit: "300",
    // };

    // let DoctorsIntro = [
    //     {
    //         doctorName: "Dr. M. Rezaul Karim",
    //         speciality: "Medicine",
    //         degrees: ["MBBS", "FCPS", "FRCS"],
    //         imageURL:
    //             "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    //     },
    //     {
    //         doctorName: "Dr. Shirin Akhter",
    //         speciality: "Gynae & Obstetrics",
    //         degrees: ["MBBS", "MCPS", "FCPS"],
    //         imageURL:
    //             "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    //     },
    //     {
    //         doctorName: "Dr. Faiza Roshni",
    //         speciality: "Surgery",
    //         degrees: ["MBBS", "FCPS", "FRCS"],
    //         imageURL:
    //             "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    //     },
    //     {
    //         doctorName: "Dr. Tasnim Ishrat Sara",
    //         speciality: "Medicine",
    //         degrees: ["MBBS", "FCPS", "FRCS"],
    //         imageURL:
    //             "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    //     },
    // ];
    // let patientsIntro = [
    //     {
    //         patientName: "Nazmus Sakib",
    //         patientID: "AB13WE8",
    //         Status: "Visiting Doctor",
    //         DoctorAssigned: "Dr M. Rezaul Karim",
    //         ContactNumber: "01759922550",
    //     },
    //     {
    //         patientName: "Saad Md. Rafid Pial",
    //         patientID: "ASC439O",
    //         Status: "Doing Diagnostics",
    //         DoctorAssigned: null,
    //         ContactNumber: "01729456209",
    //     },
    //     {
    //         patientName: "Salman Sayeed",
    //         patientID: "99WE5Q7",
    //         Status: "Admitted",
    //         DoctorAssigned: "Dr Shirin Akhter",
    //         ContactNumber: "01482956918",
    //     },
    //     {
    //         patientName: "Mahir Labib Dihan",
    //         patientID: "99RS5Q7",
    //         Status: "Visiting Doctor",
    //         DoctorAssigned: "Dr M. Rezaul Karim",
    //         ContactNumber: "01482956918",
    //     },
    //     {
    //         patientName: "Abir Muhtasim",
    //         patientID: "99RG8Q7",
    //         Status: "Visiting Doctor",
    //         DoctorAssigned: "Dr M. Rezaul Karim",
    //         ContactNumber: "01482956918",
    //     },
    //     {
    //         patientName: "Sayem Shahad",
    //         patientID: "99RS9S7",
    //         Status: "Doing Diagnostics",
    //         DoctorAssigned: null,
    //         ContactNumber: "01482956918",
    //     },
    // ];
    function navigateToHospitalDoctors() {
        // Set the doctor_id in the store
        // hospitalDoctorList.set({doctorList: DoctorsIntro});
        // hospitalInfo.set({hospitalName: data.name, hospitalLogo: data.logoUrl});

        // Navigate to the hospitals page
        window.location.hash = "#/hospitalhome/doctors";
    }
    function navigateToHospitalPatients() {
        // Set the doctor_id in the store
        // hospitalPatientList.set({patientList: patientsIntro})
        // hospitalInfo.set({hospitalName: data.name, hospitalLogo: data.logoUrl});

        // Navigate to the hospitals page
        window.location.hash = "#/hospitalhome/patients";
    }

    function navigateToHospitalAuthority() {
        // Set the doctor_id in the store
        // hospitalDoctorList.set({doctorList: DoctorsIntro});
        // hospitalInfo.set({hospitalName: data.name, hospitalLogo: data.logoUrl});

        // Navigate to the hospitals page
        window.location.hash = "#/hospitalhome/authorityLogin";
    }

    let map;

    $: doctorCnt = 0;
    $: patientCnt = 0;
    $: deptCnt = 0;

    async function getDoctorCnt() {
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        await fetch(serverUrl + "h2d/get-doctor-cnt", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let cnt = +data;
                doctorCnt = cnt;
            });
    }

    async function getPatientCnt() {
        let payload = { hospitalId: get(hospitalInfo).hospitalInfo["id"] };
        await fetch(serverUrl + "h2p/get-hospital-patient-cnt", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                // console.log(data);
                let cnt = +data;
                patientCnt = cnt;
            });
    }

    function getDeptCnt() {
        let deptList = [];
        deptList = get(hospitalInfo).hospitalInfo["deptList"].split(",");
        deptCnt = deptList.length;
    }

    $: admissionId = "";

    function admissionIdCalculation() {
        let hospitalId = get(hospitalInfo).hospitalInfo["id"];

        let input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let output = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0987654321";
        let index = (x) => input.indexOf(x);
        let translate = (x) => (index(x) > -1 ? output[index(x)] : x);
        admissionId = hospitalId.split("").map(translate).join("");

        console.log(hospitalId);
        console.log(admissionId);
    }

    onMount(async () => {
        getDoctorCnt();
        getPatientCnt();
        getDeptCnt();

        admissionIdCalculation();

        // No need for the 'require' here anymore
        const iconUrl =
            "https://www.iconarchive.com/download/i103443/paomedia/small-n-flat/map-marker.1024.png";

        const defaultIcon = L.icon({
            iconUrl,
            iconSize: [35, 35], // Default size, adjust if needed
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        L.Marker.prototype.options.icon = defaultIcon;

        // Wait for the next micro-task to ensure the DOM is fully ready
        await Promise.resolve();

        map = L.map("map").setView(
            [
                get(hospitalInfo).hospitalInfo["latitude"],
                get(hospitalInfo).hospitalInfo["longitude"],
            ],
            14
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);
        L.marker([
            get(hospitalInfo).hospitalInfo["latitude"],
            get(hospitalInfo).hospitalInfo["longitude"],
        ]).addTo(map);

        // Invalidate the map size after a short delay
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    });
</script>

<main class="min-h-screen p-8 bg-gradient-to-br from-blue-300 to-purple-300">
    <!-- Navbar -->
    <nav class="bg-white shadow-md mb-8 p-4 rounded-lg">
        <div class="container mx-auto flex justify-between items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                alt={get(hospitalInfo).hospitalInfo["name"] + " Logo"}
                class="h-10 w-12"
            />

            <span class="text-3xl font-semibold text-purple-600"
                >{get(hospitalInfo).hospitalInfo["name"]}</span
            >
            <span>
                <a href="#/hospitalogin" class="btn btn-outline ml-auto mr-2"
                    >Logout</a
                >
            </span>
        </div>
    </nav>

    <!-- Header -->
    <section class="bg-white shadow-2xl rounded-lg overflow-hidden mb-8 p-8">
        <div class="flex flex-wrap -mx-4">
            <div class="w-full md:w-1/2 px-4">
                <img
                    src={get(hospitalInfo).hospitalInfo["photo"]}
                    alt={get(hospitalInfo).hospitalInfo["name"]}
                    class="w-full h-full object-cover rounded-lg shadow-md"
                />
            </div>
            <div class="w-full md:w-1/2 px-4 pt-6 md:pt-0 mt-2">
                <img
                    src={get(hospitalInfo).hospitalInfo["logo"]}
                    alt={get(hospitalInfo).hospitalInfo["name"]}
                    class="h-15 w-20"
                />
                <h1 class="text-4xl font-bold mb-2 text-purple-600">
                    {get(hospitalInfo).hospitalInfo["name"]}
                </h1>
                <h1 class="text-2xl font-bold mb-5 text-purple-600">
                    {get(hospitalInfo).hospitalInfo["address"]}
                </h1>
                <div>
                    <strong class="text-gray-700">Hospital ID:</strong>
                    <span class="ml-2"
                        >{get(hospitalInfo).hospitalInfo["id"]}</span
                    >
                </div>
                <div>
                    <strong class="text-gray-700">Established:</strong>
                    <span class="ml-2"
                        >{get(hospitalInfo).hospitalInfo["dob"]}</span
                    >
                </div>
                <div>
                    <strong class="text-gray-700">Current Doctors:</strong>
                    <span class="ml-2">{doctorCnt}</span>
                </div>
                <div>
                    <strong class="text-gray-700">Current Patients:</strong>
                    <span class="ml-2">{patientCnt}</span>
                </div>
                <div>
                    <strong class="text-gray-700">Number of Departments:</strong
                    >
                    <span class="ml-2">{deptCnt}</span>
                </div>
                <div>
                    <strong class="text-gray-700">Admission Id:</strong>
                    <span class="ml-2">{admissionId}</span>
                </div>
                <div class="mt-2">
                    <button
                        class="btn border-black text-white bg-violet-500 hover:bg-violet-900 mr-2"
                        on:click={navigateToHospitalDoctors}
                    >
                        Doctors
                    </button>
                    <button
                        class="btn border-black text-white bg-violet-500 hover:bg-violet-900 mr-2"
                        on:click={navigateToHospitalPatients}
                    >
                        Patients
                    </button>
                    <button
                        class="btn border-black text-white bg-rose-500 hover:bg-rose-900"
                        on:click={navigateToHospitalAuthority}
                    >
                        Authority
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Map -->
    <section class="bg-white shadow-2xl rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-purple-600">Location</h2>
        <div id="map" class="rounded-lg shadow-md" />
    </section>

    <!-- Contact -->
    <section class="bg-white shadow-2xl rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-purple-600">Contact</h2>
        <ul>
            <li class="flex items-start space-x-2">
                <strong>Phone:</strong>
                <a
                    href={"tel:" + get(hospitalInfo).hospitalInfo["phone"]}
                    class="text-blue-500 hover:underline"
                    >{get(hospitalInfo).hospitalInfo["phone"]}</a
                >
            </li>
            <li class="flex items-start space-x-2 mt-2">
                <strong>Email:</strong>
                <a
                    href={"mailto:" + get(hospitalInfo).hospitalInfo["email"]}
                    class="text-blue-500 hover:underline"
                    >{get(hospitalInfo).hospitalInfo["email"]}</a
                >
            </li>
            <!-- <li class="mt-2">
                <strong>Website:</strong>
                <a
                    href={data.website}
                    target="_blank"
                    class="text-blue-500 hover:underline">{data.website}</a
                >
            </li> -->
        </ul>
    </section>
</main>

<style>
    /* Assuming you've already set up Tailwind in your project */
    #map {
        width: 100%;
        height: 300px;
    }
</style>
