<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { serverUrl } from "./constants";
    import { labInfo,hospitalInfo } from "./store";

    let hospitalId = "";
    let labId = "";
    let labPass = "";

    async function getHospitalInfo(){
        let payload = { hospitalId:hospitalId };
        await fetch(serverUrl + "hospital/get-hospital-info", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                hospitalInfo.set({hospitalInfo:data});
            })
    }

    async function handleSubmit(event) {
        const form = event.target;
        const data = new FormData(form);

        console.log(data.get("id"));
        console.log(data.get("hospitalId"))
        console.log(data.get("password"));

        await fetch(serverUrl + "lab/login", {
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
                    labInfo.set({labInfo:data})
                    window.location.hash = `#/labhome`;
                }
            });

        form.reset();
    }
    function navigateHome() {
        window.location.hash = `#/`;
    }
</script>

<Toaster/>
<div
    class="flex items-center justify-center min-h-screen relative"
    style="background-image: url('https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/blurblue.jpg'); background-size: cover; backdrop-filter: blur(10px);"
>
    <img
        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.svg"
        alt="Notification Icon"
        class="absolute top-4 left-4 h-10 w-10 transition-transform transform hover:scale-150"
        on:click={navigateHome}
    />
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
            <form on:submit|preventDefault={handleSubmit}>
                <div class="mb-2">
                    <input
                        bind:value={hospitalId}
                        type="text"
                        name="hospitalId"
                        placeholder="Enter Hospital ID"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div class="mb-2">
                    <input
                        bind:value={labId}
                        type="text"
                        name="id"
                        placeholder="Enter Laboratory ID"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div>
                    <input
                        bind:value={labPass}
                        type="password"
                        name="password"
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
