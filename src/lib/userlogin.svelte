<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { serverUrl } from "./constants";
    import { userInfo } from "./store";
    let id = "";
    let password = "";

    async function handleSubmit(event) {
        //Testing Direct Login
        // window.location.hash = `#/user`;

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
                    window.location.hash = `#/user`;
                }
            });

        form.reset();
    }
</script>

<Toaster />
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
            <form on:submit|preventDefault={handleSubmit}>
                <div>
                    <input
                        required
                        bind:value={id}
                        type="number"
                        name="id"
                        placeholder="Enter ID"
                        class="input input-bordered w-full max-w-xs mb-2"
                    />
                </div>
                <div>
                    <input
                        required
                        bind:value={password}
                        type="password"
                        name="password"
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
