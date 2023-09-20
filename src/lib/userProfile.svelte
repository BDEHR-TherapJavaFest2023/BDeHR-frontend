<script>
    import { get } from "svelte/store";

    import { serverUrl } from "./constants";
    import { userInfo } from "./store";
    import { onMount } from "svelte";
    import { supabase } from "./supabaseClient";

    export let userData;
    let isEditing = false;

    function toggleEditing() {
        isEditing = !isEditing;
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userData.userImage = e.target.result;
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
        let { data: res2 } = await supabase.storage
            .from("userPhoto")
            .update(id.toString(), photo, {
                cacheControl: "0",
                upsert: true,
            });

        let { data: res3 } = await supabase.storage
            .from("userPhoto")
            .getPublicUrl(id);

        return res3;
    }

    async function uploadProfile() {
        await fetch(serverUrl + "user/update-user", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    }

    async function handleSubmit(event) {
        console.log("Form Submitted");
        const form = event.target;
        const formData = new FormData(form);

        console.log(formData.get("photo"));

        if (formData.get("photo")["name"] === "") {
            userInfo.set({
                userName: formData.get("name").toString(),
                userId: get(userInfo).userId,
                userEmail: formData.get("email").toString(),
                userNid: get(userInfo).userNid,
                userDob: get(userInfo).userDob,
                userAddress: formData.get("address").toString(),
                userGender: get(userInfo).userGender,
                userPhone: formData.get("phone").toString(),
                userPhoto: get(userInfo).userPhoto,
            });

            userData = {
                user_id: get(userInfo).userId,
                name: get(userInfo).userName,
                dob: get(userInfo).userDob,
                gender: get(userInfo).userGender,
                address: get(userInfo).userAddress,
                nid: get(userInfo).userNid,
                phone: get(userInfo).userPhone,
                email: get(userInfo).userEmail,
                userImage: get(userInfo).userPhoto,
            };

            uploadProfile();
        } else {
            await uploadPhoto(userData.user_id, formData.get("photo")).then(
                (response) => {
                    userInfo.set({
                        userName: formData.get("name").toString(),
                        userId: get(userInfo).userId,
                        userEmail: formData.get("email").toString(),
                        userNid: get(userInfo).userNid,
                        userDob: get(userInfo).userDob,
                        userAddress: formData.get("address").toString(),
                        userGender: get(userInfo).userGender,
                        userPhone: formData.get("phone").toString(),
                        userPhoto: response["publicUrl"] + "?v=" + Date.now(),
                    });

                    userData = {
                        user_id: get(userInfo).userId,
                        name: get(userInfo).userName,
                        dob: get(userInfo).userDob,
                        gender: get(userInfo).userGender,
                        address: get(userInfo).userAddress,
                        nid: get(userInfo).userNid,
                        phone: get(userInfo).userPhone,
                        email: get(userInfo).userEmail,
                        userImage: get(userInfo).userPhoto,
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
            src={userData.userImage}
            alt="User Profile"
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
                    bind:value={userData.name}
                    class="daisy-input w-full"
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="address"
                    bind:value={userData.address}
                    class="daisy-input w-full"
                    placeholder="Address"
                />
                <input
                    type="text"
                    name="phone"
                    bind:value={userData.phone}
                    class="daisy-input w-full"
                    placeholder="Phone Number"
                />
                <input
                    type="email"
                    name="email"
                    bind:value={userData.email}
                    class="daisy-input w-full"
                    placeholder="Email"
                />
            </div>
        {:else}
            <div class="space-y-4">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>User ID:</strong> {userData.user_id}</p>
                <p><strong>NID:</strong> {userData.nid}</p>

                <p><strong>Age:</strong> {calculateAge(userData.dob)}</p>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><strong>Address:</strong> {userData.address}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Email:</strong> {userData.email}</p>
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
