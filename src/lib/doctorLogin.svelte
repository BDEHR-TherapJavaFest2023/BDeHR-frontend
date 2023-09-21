<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { serverUrl } from "./constants";
    import { doctorInfo } from "./store";
    let doctorID = "";
    let doctorPass = "";

    async function handleSubmit(event) {
        //Testing Direct Login
        window.location.hash = `#/user`;

        const form = event.target;
        const data = new FormData(form);

        console.log(data.get("id"));
        console.log(data.get("password"));

        await fetch(serverUrl + "doctor/login", {
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
                //Login Success
                else {
                    doctorInfo.set({
                        doctorName: data["name"],
                        doctorId: data["id"],
                        doctorEmail: data["email"],
                        doctorBmdc: data["bmdc"],
                        doctorDob: data["dob"],
                        doctorAddress: data["address"],
                        doctorGender: data["gender"],
                        doctorPhone: data["phone"],
                        doctorPhoto: data["photo"],
                    });
                    window.location.hash = `#/doctorhome`;
                }
            });

        form.reset();
    }
</script>

<Toaster />
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
            <form on:submit|preventDefault={handleSubmit}>
                <div class="mb-2">
                    <input
                        required
                        bind:value={doctorID}
                        type="number"
                        name="id"
                        placeholder="Enter Doctor ID"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div>
                    <input
                        required
                        bind:value={doctorPass}
                        type="text"
                        name="password"
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
