<script>
    let id = "";
    let password = "";

    async function handleSubmit(event) {
        event.preventDefault();
        if (id && password) {
            // Here you can take necessary actions with the form data
            // Example: You can send this data to your backend for verification

            // For now, we're simply redirecting to the user route
            window.location.href = "#/user";
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen relative">
    <div class="card lg:card-side bg-ash shadow-xl z-50">
        <figure>
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/loginCard4.jpg"
                alt="Album"
            />
        </figure>
        <div class="card-body flex flex-col items-center absolute inset-0">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                alt="Album"
                width={145}
                height={20}
                class="mt-5 mb-10 z-100"
            />
            <h5 class="text-3xl font-bold" style="color: #FFFFFF;">
                Sign In to your Account
            </h5>
            <form on:submit={handleSubmit}>
                <div>
                    <input
                        bind:value={id}
                        type="text"
                        placeholder="Enter ID"
                        class="input input-bordered w-full max-w-xs mb-2"
                    />
                </div>
                <div>
                    <input
                        bind:value={password}
                        type="password"
                        placeholder="Enter Password"
                        class="w-full input input-bordered w-full max-w-xs"
                    />
                </div>
                <div>
                    <a href="#/usersignup" class="link link-hover text-white">
                        Don't Have an Account? Sign Up Here
                    </a>
                </div>

                <div class="card-actions justify-end mt-5">
                    <button
                        type="submit"
                        class="w-full btn btn-outline btn-md hover:bg-red-500 text-white"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
