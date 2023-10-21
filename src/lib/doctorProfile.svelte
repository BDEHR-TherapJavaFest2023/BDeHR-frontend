<script>
    import { get } from "svelte/store";
    import { serverUrl } from "./constants";
    import { doctorInfo } from "./store";
    import { supabase } from "./supabaseClient";

    export let doctorData;
    let isEditing = false;

    function toggleEditing() {
        isEditing = !isEditing;
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                doctorData.doctorImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    }
    async function uploadPhoto(id, photo) {
        console.log(id + " " + typeof id);
        let { data: res2 } = await supabase.storage
            .from("doctorPhoto")
            .update(id, photo, {
                cacheControl: "0",
                upsert: true,
            });

        let { data: res3 } = await supabase.storage
            .from("doctorPhoto")
            .getPublicUrl(id);

        return res3;
    }

    async function uploadProfile() {
        await fetch(serverUrl + "doctor/update-doctor", {
            method: "POST",
            body: JSON.stringify(doctorData),
        });
    }

    async function handleSubmit(event) {
        console.log("Form Submitted");
        const form = event.target;
        const formData = new FormData(form);

        console.log(formData.get("photo"));

        if (formData.get("photo")["name"] === "") {
            doctorInfo.set({
                doctorName: formData.get("name").toString(),
                doctorId: get(doctorInfo).doctorId,
                doctorEmail: formData.get("email").toString(),
                doctorBmdc: get(doctorInfo).doctorBmdc,
                doctorDob: get(doctorInfo).doctorDob,
                doctorAddress: formData.get("address").toString(),
                doctorGender: get(doctorInfo).doctorGender,
                doctorPhone: formData.get("phone").toString(),
                doctorPhoto: get(doctorInfo).doctorPhoto,
            });

            doctorData = {
                user_id: get(doctorInfo).doctorId,
                name: get(doctorInfo).doctorName,
                dob: get(doctorInfo).doctorDob,
                gender: get(doctorInfo).doctorGender,
                address: get(doctorInfo).doctorAddress,
                bmdc: get(doctorInfo).doctorBmdc,
                phone: get(doctorInfo).doctorPhone,
                email: get(doctorInfo).doctorEmail,
                doctorImage: get(doctorInfo).doctorPhoto,
            };

            uploadProfile();
        } else {
            await uploadPhoto(doctorData.user_id, formData.get("photo")).then(
                (response) => {
                    doctorInfo.set({
                        doctorName: formData.get("name").toString(),
                        doctorId: get(doctorInfo).doctorId,
                        doctorEmail: formData.get("email").toString(),
                        doctorBmdc: get(doctorInfo).doctorBmdc,
                        doctorDob: get(doctorInfo).doctorDob,
                        doctorAddress: formData.get("address").toString(),
                        doctorGender: get(doctorInfo).doctorGender,
                        doctorPhone: formData.get("phone").toString(),
                        doctorPhoto: response["publicUrl"] + "?v=" + Date.now(),
                    });

                    doctorData = {
                        user_id: get(doctorInfo).doctorId,
                        name: get(doctorInfo).doctorName,
                        dob: get(doctorInfo).doctorDob,
                        gender: get(doctorInfo).doctorGender,
                        address: get(doctorInfo).doctorAddress,
                        bmdc: get(doctorInfo).doctorBmdc,
                        phone: get(doctorInfo).doctorPhone,
                        email: get(doctorInfo).doctorEmail,
                        doctorImage: get(doctorInfo).doctorPhoto,
                    };

                    uploadProfile();
                }
            );
        }

        toggleEditing();
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <main class="p-4 max-w-4xl mx-auto shadow-2xl grid grid-cols-2 gap-4">
        {#if isEditing}
            <div>
                <div class="mb-6">
                    <img
                        src={doctorData.doctorImage}
                        alt="doctor Profile"
                        class="rounded-full w-64 h-80 mx-auto"
                    />
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        on:change={handleImageUpload}
                    />
                </div>
                <input
                    type="text"
                    name="address"
                    bind:value={doctorData.address}
                    class="daisy-input"
                    placeholder="Address"
                />
                <input
                    type="text"
                    name="phone"
                    bind:value={doctorData.phone}
                    class="daisy-input"
                    placeholder="Phone Number"
                />
                <input
                    type="email"
                    name="email"
                    bind:value={doctorData.email}
                    class="daisy-input"
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="name"
                    bind:value={doctorData.name}
                    class="daisy-input"
                    placeholder="Name"
                />
                <p><strong>Doctor ID:</strong> {doctorData.user_id}</p>
                <p><strong>BMDC ID:</strong> {doctorData.bmdc}</p>
                <p><strong>Age:</strong> {calculateAge(doctorData.dob)}</p>
                <p><strong>Gender:</strong> {doctorData.gender}</p>
            </div>
        {:else}
            <div>
                <div class="mb-6">
                    <img
                        src={doctorData.doctorImage}
                        alt="doctor Profile"
                        class="rounded-full w-80 h-96 mx-auto"
                    />
                </div>
                <div class="flex items-center space-x-2 mb-2 ml-10">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/location.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="Location Icon"
                    />
                    <p>
                        <strong>Address: </strong>
                        {doctorData.address}
                    </p>
                </div>
                <div class="flex items-center space-x-2 mb-2 ml-10">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/phone.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="Phone Icon"
                    />
                    <p>
                        <strong>Phone: </strong>
                        {doctorData.phone}
                    </p>
                </div>
                <div class="flex items-center space-x-2 mb-2 ml-10">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="Email Icon"
                    />
                    <p>
                        <strong>Email: </strong>
                        {doctorData.email}
                    </p>
                </div>
            </div>
            <div>
                <p class="text-5xl font-bold mb-3">
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/295067.svg"
                        class="transform transition duration-300 hover:rotate-12"
                        alt="title"
                        width={80}
                        height={80}
                    />
                    {doctorData.name}
                </p>
                <p class="text-3xl font-bold">
                    {calculateAge(doctorData.dob)} years | {doctorData.gender}
                </p>

                <div class="divider" />
                <p class="text-2xl font-bold mb-2">
                    <strong>Speciality: </strong>
                    Medicine
                </p>
                <p class="text-2xl font-bold mb-2">
                    <strong>Doctor ID: </strong>
                    {doctorData.user_id}
                </p>
                <p class="text-2xl font-bold">
                    <strong>BMDC ID: </strong>
                    {doctorData.bmdc}
                </p>
            </div>
        {/if}
        <div class="col-span-2 mt-6">
            {#if isEditing}
                <div class="flex justify-around">
                    <button
                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        type="submit">Save Changes</button
                    >
                    <button
                        class="daisy-btn daisy-btn-primary"
                        on:click={toggleEditing}>Cancel</button
                    >
                </div>
            {:else}
                <button
                    class="daisy-btn daisy-btn-secondary ml-10"
                    on:click={toggleEditing}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pencil-edit-button-svgrepo-com.svg"
                        class="transform transition duration-300 hover:rotate-12 mr-2"
                        alt="Edit Icon"
                        width="20"
                        height="20"
                    />
                    Edit
                </button>
            {/if}
        </div>
    </main>
</form>

<style>
    .daisy-input {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
        margin-bottom: 8px;
    }
    .daisy-btn {
        /* Add styles for button if necessary */
        padding: 8px 12px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        display: flex; /* Added this */
        align-items: center; /* Added this */
        justify-content: center; /* Optional: to center the items horizontally */
    }

    .daisy-btn-primary {
        background-color: #007bff;
        color: white;
    }
    .daisy-btn-secondary {
        background-color: #6c757d;
        color: white;
    }
</style>
