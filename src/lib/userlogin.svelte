<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { serverUrl } from "./constants";
    import { userInfo } from "./store";
    let id = "";
    let password = "";

    async function handleSubmit(event) {
        //Testing Direct Login
        window.location.hash = `#/appuser/home`;

        const form = event.target;
        const data = new FormData(form);

        await fetch(serverUrl + "user/login", {
            method: "POST",
            body: data,
        })
            .then((response) => {
                return response.json();
            })
            .catch(() => null)
            .then((data) => {
                // let ret = +data;
                console.log(data);

                //Login Failed
                if (!data) {
                    toast.error("Login Failed 🙁");
                }
                //Login Failed
                else {
                    userInfo.set({
                        userName: data["name"],
                        userId: data["id"],
                        userEmail: data["email"],
                        userNid: data["nid"],
                        userDob: data["dob"],
                        userAddress: data["address"],
                        userGender: data["gender"],
                        userPhone: data["phone"],
                        userPhoto: data["photo"],
                    });
                    window.location.hash = `#/appuser/home`;
                }
            });

        form.reset();
    }
    function navigateHome() {
        window.location.hash = `#/`;
    }
</script>

<Toaster />
<section
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/greyBlur.jpg'); background-size: cover; backdrop-filter: blur(10px);"
>
    <img
        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.svg"
        alt="Notification Icon"
        class="absolute top-4 left-4 h-10 w-10 transition-transform transform hover:scale-150"
        on:click={navigateHome}
    />
    <div class="flex bg-white shadow-2xl rounded-xl overflow-hidden max-w-4xl">
        <!-- Photo on the left side of the card -->
        <div
            class="hidden md:flex md:w-2/5 lg:w-2/5 items-center justify-center p-6"
        >
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userLoginfinl.png"
                alt="User"
                class="max-w-full max-h-full object-contain"
            />
        </div>

        <!-- Previous Card Content -->
        <div class="w-full md:w-3/5 lg:w-3/5 p-8">
            <div>
                <img
                    class="mx-auto h-16 w-auto"
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                    alt="Your Logo"
                />
                <h2
                    class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    Sign in to your account
                </h2>
            </div>
            <form
                class="mt-8 space-y-6"
                on:submit|preventDefault={handleSubmit}
            >
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="userID" class="sr-only">User ID</label>
                        <input
                            required
                            bind:value={id}
                            type="number"
                            name="id"
                            placeholder="Enter ID"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            required
                            bind:value={password}
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                            for="remember_me"
                            class="ml-2 block text-sm text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>
                    <div class="text-sm">
                        <a
                            href="#/usersignup"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Don't Have an Account? Sign Up Here
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
