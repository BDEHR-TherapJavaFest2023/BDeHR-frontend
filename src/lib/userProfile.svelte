<script>
    export let userData;
    let isEditing = false;
    let uploadedImage;

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
</script>

<main class="p-4 max-w-xl mx-auto shadow-2xl">
    <div class="mb-6">
        <img
            src={userData.userImage}
            alt="User Profile"
            class="rounded-full w-48 h-48 mx-auto"
        />

        {#if isEditing}
            <div class="mt-4">
                <input
                    type="file"
                    accept="image/*"
                    on:change={handleImageUpload}
                />
            </div>
        {/if}
    </div>

    {#if isEditing}
        <div class="space-y-4">
            <input
                type="text"
                bind:value={userData.name}
                class="daisy-input w-full"
                placeholder="Name"
            />
            <input
                type="date"
                bind:value={userData.dob}
                class="daisy-input w-full"
                placeholder="Date of Birth"
            />
            <input
                type="text"
                bind:value={userData.gender}
                class="daisy-input w-full"
                placeholder="Gender"
            />
            <input
                type="text"
                bind:value={userData.address}
                class="daisy-input w-full"
                placeholder="Address"
            />
            <input
                type="text"
                bind:value={userData.phone}
                class="daisy-input w-full"
                placeholder="Phone Number"
            />
            <input
                type="email"
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
            <button class="daisy-btn daisy-btn-primary" on:click={toggleEditing}
                >Save Changes</button
            >
        {:else}
            <button
                class="daisy-btn daisy-btn-secondary"
                on:click={toggleEditing}>Edit</button
            >
        {/if}
    </div>
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
