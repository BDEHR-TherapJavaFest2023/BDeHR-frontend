<script>
    import Navbardoc from "./doctorNavbar.svelte";
    import ProfileTab from "./doctorProfile.svelte";
    import doctorHospitals from "./doctorHospital.svelte";
    import doctorResearch from "./doctorResearch.svelte";
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
</script>

<main>
    <div>
        <Navbardoc bind:doctorName={doctorDatas.name} />
    </div>

    <div class="container">
        <!-- svelte-ignore component-name-lowercase -->
        <!-- Tabs navigation -->
        <ul
            class="mb-5 flex list-none flex-row flex-wrap border-b-2 pl-2"
            role="tablist"
            data-te-nav-ref
        >
            <li role="presentation" class="flex-auto text-center">
                <a
                    href="#/doctor/home"
                    class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    data-te-toggle="pill"
                    data-te-target="#tabs-home01"
                    data-te-nav-active
                    role="tab"
                    aria-controls="tabs-home01"
                    aria-selected="true"
                >
                    Profile
                </a>
            </li>
            <li role="presentation" class="flex-auto text-center">
                <a
                    href="#/doctor/hospitals"
                    class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    data-te-toggle="pill"
                    data-te-target="#tabs-profile01"
                    role="tab"
                    aria-controls="tabs-profile01"
                    aria-selected="false"
                >
                    Hospitals
                </a>
            </li>
            <li role="presentation" class="flex-auto text-center">
                <a
                    href="#/doctor/research"
                    class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                    data-te-toggle="pill"
                    data-te-target="#tabs-messages01"
                    role="tab"
                    aria-controls="tabs-messages01"
                    aria-selected="false"
                >
                    Research
                </a>
            </li>
        </ul>

        <!-- Tabs content -->
        <div class="mb-6">
            <div
                class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="/doctor/home"
                role="tabpanel"
                aria-labelledby="tabs-home-tab01"
                data-te-tab-active
            >
                <ProfileTab bind:doctorData={doctorDatas} />
            </div>
            <div
                class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="/doctor/hospitals"
                role="tabpanel"
                aria-labelledby="tabs-profile-tab01"
            >
                Tab 2 content
            </div>
            <div
                class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="/doctor/research"
                role="tabpanel"
                aria-labelledby="tabs-profile-tab01"
            >
                Tab 3 content
            </div>
        </div>
    </div>
</main>

<style>
    .container {
        padding-top: 145px;
    }
</style>
