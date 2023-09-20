<script>
    let doctorID = "";
    let doctorPass = "";

    function handleSubmit(event) {
        event.preventDefault();
        if (doctorID && doctorPass) {
            // Here you can take necessary actions with the form data
            // Example: You can send this data to your backend for verification

            // For now, we're simply redirecting to the user route
            window.location.href = "#/doctorhome";
        }
    }
</script>

<div
    class="flex items-center justify-center min-h-screen relative"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/orangeblur.jpg'); background-size: cover; backdrop-filter: blur(10px);"
>
    <div class="card lg:card-side bg-ash shadow-xl z-50">
        <figure>
            <img
                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/doctorLogin.jpg"
                alt="Album"
            />
        </figure>
        <div class="card-body flex flex-col items-center absolute inset-1/4">
            <h1 class="text-5xl font-bold" style="color: #000000;">BDeHR</h1>
            <h5 class="text-3xl font-bold" style="color: #000000;">
                Sign In to Doctor's Account
            </h5>
            <form on:submit={handleSubmit}>
                <div class="mb-2">
                    <input
                        bind:value={doctorID}
                        type="text"
                        placeholder="Enter Doctor ID"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div>
                    <input
                        bind:value={doctorPass}
                        type="text"
                        placeholder="Enter Password"
                        class="w-full input input-bordered max-w-xs"
                    />
                </div>
                <div>
                    <a href="#/doctorsignup" class="link link-hover text-black">
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
