<script>
    import UserProfile from "./profileinfo.svelte";
    let userData = {
        user_id: "NDLKX6781TT",
        name: "Nazmus Sakib",
        dob: "1990-01-15",
        gender: "Male",
        address: "Suhrawardy Hall, Dhaka",
        nid: "123456789",
        phone: "+8801716171819",
        email: "sakib@gmail.com",
        userImage:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    };
</script>

<main>
    <div class="navbar bg-base-100" style="background-color: #D2F3FB;">
        <div class="flex-1">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogo.png"
                alt="BDeHR Logo"
                width={125}
                height={25}
                class="mx-5 my-0"
            />
        </div>
        <div class="flex-none gap-2">
            <div class="dropdown dropdown-end">
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-15 rounded-full">
                        <img src={userData.userImage} />
                    </div>
                </label>
                <ul
                    tabindex="0"
                    class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                    <li>
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
    <UserProfile bind:userProfile={userData} />
</main>

<style>
</style>
