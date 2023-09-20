<script>
    import Footer from "./footer.svelte";
</script>

<body class="bg-gray-100">
    <header class="bg-blue-500 p-4">
        <div class="container mx-auto text-white">
            <h1 class="text-2xl font-semibold">About Us</h1>
        </div>
    </header>

    <main class="container mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
        <section class="mb-8 flex flex-wrap">
            <div class="w-full md:w-1/2 p-4">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/IMG_20230920_144002_387.jpg"
                    width="600"
                    height="600"
                    alt="About Us Image"
                    class="rounded-lg"
                />
            </div>
            <div class="w-full md:w-1/2 p-4">
                <h2 class="text-3xl font-semibold">Our Story</h2>
                <div class="mt-4">
                    <b>About BDeHR (Your Healthcare Companion)</b>

                    <p class="my-2">
                        Welcome to BDeHR, your trusted healthcare companion
                        designed to revolutionize the way you manage your
                        medical history. At BDeHR, we understand the importance
                        of seamless access to your personal health records, and
                        we are committed to making it easier than ever before.
                        Our platform brings together individuals, hospitals, and
                        healthcare providers in a unified ecosystem. Whether
                        you're a patient seeking comprehensive healthcare
                        management or a healthcare professional striving for
                        better patient care, BDeHR has you covered.
                    </p>
                    <b>What Sets Us Apart:</b>

                    <b>User-Centric Approach:</b>
                    <p class="my-2">
                        BDeHR offers a user-friendly interface that allows
                        individuals to register as patients, hospitals to
                        register as healthcare facilities, and doctors to create
                        dedicated accounts. Our intuitive platform ensures that
                        your health data is always at your fingertips.
                    </p>

                    <b>Effortless Medical History Access:</b>
                    <p class="my-2">
                        With BDeHR, accessing your medical and lab report
                        history is a breeze. When you visit a hospital or
                        consult with your doctor, you can effortlessly share
                        your past medical data, enabling healthcare providers to
                        make informed decisions promptly. Comprehensive Health
                        Records: BDeHR provides a secure and centralized
                        repository for your medical records. From prescriptions
                        and test results to treatment histories, we help you
                        maintain a complete and accurate health profile.
                    </p>

                    <b>Enhanced Patient-Doctor Collaboration:</b>
                    <p class="my-2">
                        Our platform fosters better communication between
                        patients and healthcare professionals. Doctors can
                        access your medical history in real time, ensuring
                        continuity of care and personalized treatment plans.
                    </p>

                    <b>Privacy and Security:</b>
                    <p class="my-2">
                        We prioritize the privacy and security of your data.
                        BDeHR employs advanced encryption and data protection
                        measures to keep your health information safe.
                    </p>

                    <b>Our Vision:</b>

                    <p class="my-2">
                        At BDeHR, we envision a future where managing your
                        healthcare is simple, convenient, and efficient. We
                        believe that by providing easy access to medical
                        records, we empower individuals to take control of their
                        health while promoting seamless collaboration between
                        patients, hospitals, and doctors. Join us on this
                        transformative journey toward better healthcare
                        management. BDeHR is your partner in building a
                        healthier and happier future.
                    </p>

                    <b>Contact Us:</b>

                    <p class="my-2">
                        If you have any questions or would like to learn more
                        about BDeHR, please don't hesitate to get in touch with
                        us. We're here to support you on your healthcare
                        journey. Thank you for choosing BDeHR as your healthcare
                        companion. Together, we're shaping the future of
                        healthcare management.
                    </p>
                </div>
            </div>
        </section>

        <section class="mb-8">
            <h2 class="text-3xl font-semibold">Our Team</h2>
            <div class="flex flex-wrap mt-4">
                <div class="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div class="bg-white rounded-lg shadow-md p-4">
                        <img
                            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/IMG-20230131-WA0000.jpg"
                            alt="Team Member 1"
                            class="h-48 rounded-full mx-auto mb-4"
                        />
                        <h3 class="text-lg font-semibold">Nazmus Sakib</h3>
                        <p class="text-gray-500">Founder</p>
                    </div>
                </div>
                <!-- Add more team members here -->
                <div class="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div class="bg-white rounded-lg shadow-md p-4">
                        <img
                            src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/FB_IMG_1695199255101.jpg"
                            alt="Team Member 2"
                            class="h-48 rounded-full mx-auto mb-4"
                        />
                        <h3 class="text-lg font-semibold">
                            Saad Mohammad Rafid Pial
                        </h3>
                        <p class="text-gray-500">Founder</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

<Footer/>
</body>