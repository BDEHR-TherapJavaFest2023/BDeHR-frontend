<script>
    let hospitalId = "";
    let labId = "";
    let labPass = "";

    function handleSubmit(event) {
        event.preventDefault();
        if (hospitalId && labId && labPass) {
            // Here you can take necessary actions with the form data
            // Example: You can send this data to your backend for verification

            // For now, we're simply redirecting to the user route
            window.location.href = "#/hospitalhome";
        }
    }
</script>

<div
    class="flex items-center justify-center min-h-screen relative"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/blurblue.jpg'); background-size: cover; backdrop-filter: blur(10px);"
>
    <div class="card lg:card-side bg-ash shadow-2xl z-50">
        <figure>
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/pngtree-laboratory-utensils-for-scientific-research-image_1061390.jpg"
                alt="Album"
                class="h-full"
            />
        </figure>
        <div class="card-body flex flex-col items-center">
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                alt="Album"
                width={145}
                height={20}
                class="mt-5 mb-10 z-100"
            />
            <h5 class="text-3xl font-bold" style="color: #000000;">
                Sign In to Lab's Account
            </h5>
            <form on:submit={handleSubmit}>
                <div class="mb-2">
                    <input
                        bind:value={hospitalId}
                        type="text"
                        placeholder="Enter Hospital ID"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div class="mb-2">
                    <input
                        bind:value={labId}
                        type="text"
                        placeholder="Enter Laboratory ID"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div>
                    <input
                        bind:value={labPass}
                        type="text"
                        placeholder="Enter Password"
                        class="w-full input input-bordered max-w-xs"
                    />
                </div>
                <div>
                    <a href="#/usersignup" class="link link-hover text-black">
                        Don't Have an Account? Sign Up Here
                    </a>
                </div>

                <div class="card-actions justify-end mt-5">
                    <button
                        type="submit"
                        class="w-full btn btn-outline btn-md hover:bg-black text-black"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
