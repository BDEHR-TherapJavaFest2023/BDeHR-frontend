<script>
    import Navbardoc from "./doctorNavbar.svelte";
    import ProfileTab from "./doctorProfile.svelte";
    import haspitalTab from "./doctorHospital.svelte";

    let doctorDatas = {
        doctor_id: "NDLKX6781TT",
        name: "Dr. M. Rezaul Karim",
        dob: "1990-01-15",
        gender: "Male",
        address: "Dhaka Medical College, Dhaka",
        BMDC_id: "123456789",
        phone: "+8801716171819",
        email: "Karim@gmail.com",
        userImage:
            "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/userdefault.png",
    };
    function navigateTo(url) {
        window.location.hash = url;
    }
</script>

<main class="flex mb-10">
    <div>
        <Navbardoc bind:doctorName={doctorDatas.name} />
    </div>

    <div class="container">
        <div class="flex justify-center mt-4 space-x-4">
            <button
                class="btn border-black text-white bg-black cursor-default hover:bg-black"
            >
                Profile
            </button>
            <button
                class="btn border-black text-white bg-slate-400 hover:bg-black"
                on:click={() => navigateTo("/doctorhome/hospitals")}
            >
                Hospitals
            </button>
            <button
                class="btn border-black text-white bg-slate-400 hover:bg-black"
            >
                Research
            </button>
        </div>
        <ProfileTab bind:doctorData={doctorDatas} />
    </div>
</main>

<style>
    .container {
        padding-top: 145px;
    }
    .btn {
        padding: 8px 12px;
        border: 1px solid;
        border-radius: 4px;
        transition: background-color 0.3s, color 0.3s;
    }

    .bg-darkGray {
        background-color: #bcbcbc;
    }

    button:focus {
        outline: none;
    }
</style>
