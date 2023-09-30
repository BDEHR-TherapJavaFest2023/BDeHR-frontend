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
        console.log(id+" "+typeof id)
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

<main class="p-4 max-w-xl mx-auto shadow-2xl">
    <div class="mb-6">
        <img
            src={doctorData.doctorImage}
            alt="doctor Profile"
            class="rounded-full w-48 h-48 mx-auto"
        />
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        {#if isEditing}
            <div class="space-y-4">
                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    on:change={handleImageUpload}
                />
                <input
                    type="text"
                    name="name"
                    bind:value={doctorData.name}
                    class="daisy-input w-full"
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="address"
                    bind:value={doctorData.address}
                    class="daisy-input w-full"
                    placeholder="Address"
                />
                <input
                    type="text"
                    name="phone"
                    bind:value={doctorData.phone}
                    class="daisy-input w-full"
                    placeholder="Phone Number"
                />
                <input
                    type="email"
                    name="email"
                    bind:value={doctorData.email}
                    class="daisy-input w-full"
                    placeholder="Email"
                />
            </div>
        {:else}
            <div class="space-y-4">
                <p><strong>Name:</strong> {doctorData.name}</p>
                <p><strong>Doctor ID:</strong> {doctorData.user_id}</p>
                <p><strong>BMDC ID:</strong> {doctorData.bmdc}</p>

                <p><strong>Age:</strong> {calculateAge(doctorData.dob)}</p>
                <p><strong>Gender:</strong> {doctorData.gender}</p>
                <p><strong>Address:</strong> {doctorData.address}</p>
                <p><strong>Phone:</strong> {doctorData.phone}</p>
                <p><strong>Email:</strong> {doctorData.email}</p>
            </div>
        {/if}

        <div class="mt-6">
            {#if isEditing}
                <div class="flex flec-col justify-around">
                    <button class="daisy-btn daisy-btn-primary" type="submit"
                        >Save Changes</button
                    >
                    <button
                        class="daisy-btn daisy-btn-primary"
                        on:click={toggleEditing}>Cancel</button
                    >
                </div>
            {:else}
                <button
                    class="daisy-btn daisy-btn-secondary"
                    on:click={toggleEditing}>Edit</button
                >
            {/if}
        </div>
    </form>
</main>

<style>
    .daisy-input {
        /* Add styles for input if necessary */
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }
    .daisy-btn {
        /* Add styles for button if necessary */
        padding: 8px 12px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
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
