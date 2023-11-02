<script>
    import { onMount } from "svelte";
    import { supabase } from "./supabaseClient";
    import { serverUrl } from "./constants";

    let Messages = [
        {
            orgName: "ICDDR,B",
            dateTime: "2022-09-01T12:30:00Z",
            MessageBody:
                "We need data for cholera last months for different age people",
        },
        {
            orgName: "Gonoshasthaya Kendra",
            dateTime: "2022-09-20T09:15:00Z",
            MessageBody: "Please provide Dengue spread throughout country",
        },
        {
            orgName: "Institute of Public Health",
            dateTime: "2022-09-20T12:35:00Z",
            MessageBody: "Provide diabetes statistics with respect to age",
        },
        {
            orgName: "Bangladesh Medical Research Council",
            dateTime: "2022-09-20T09:15:00Z",
            MessageBody: "Provide stroke data among range of age",
        },
        // add more messages like this
    ];
    Messages.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    let activeMessage = [];
    let fileInput;
    let uid = 0;

    function showModal(index, id) {
        uid = id;
        console.log(index+","+uid);
        activeMessage = messageList[index];
        const modalElement = document.getElementById("responseModal");
        modalElement.classList.remove("hidden");
    }

    function closeModal() {
        const modalElement = document.getElementById("responseModal");
        modalElement.classList.add("hidden");
    }

    function handleFileUpload() {
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            // Perform file upload operations
            console.log(`Uploading file: ${selectedFile.name}`);
        }
    }

    async function uploadData(selectedFile) {
        const currentTime = new Date().toISOString();
        let { data: res1 } = await supabase.storage
            .from("graphs")
            .upload(`graphs_${currentTime}`, selectedFile);

        let { data: res2 } = supabase.storage
            .from("graphs")
            .getPublicUrl(`graphs_${currentTime}`);
        return res2;
    }

    async function uploadResponse(selectedFile, text) {
        await uploadData(selectedFile).then((response) => {
            let payload = {
                resText: text,
                id: uid,
                url: response["publicUrl"],
            };
            // console.log(payload);
            fetch(serverUrl + "data/add-response", {
                method: "POST",
                body: JSON.stringify(payload),
            }).then((response) => {
                getMessageList();
            });
        });
    }

    let resText = "";

    async function handleSubmit() {
        // Check if any file is uploaded
        const selectedFile = fileInput?.files[0];
        if (selectedFile) {
            uploadResponse(selectedFile, resText);
            resText = "";
        } else {
            console.log("No file selected for upload.");
        }
        closeModal();
        // Perform additional form submit tasks here if needed
    }

    function navigateToDashboard() {
        window.location.hash = `#/adminhome`;
    }
    function navigateToQuery() {
        window.location.hash = `#/adminhome/query`;
    }
    function navigateToAddHospital() {
        window.location.hash = `#/adminhome/addhospital`;
    }
    function navigateToMessages() {
        window.location.hash = `#/adminhome/messages`;
    }
    function navigateToLogin() {
        window.location.hash = `#/adminlogin`;
    }
    function navigateToResearch() {
        window.location.hash = `#/adminhome/research`;
    }

    $: reqCnt = 0;
    $: msgCnt = 0;
    async function getReqCnt() {
        await fetch(serverUrl + "hospital-request/get-request-cnt")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let res = +data;
                reqCnt = res;
            });
    }

    async function getMsgCnt() {
        await fetch(serverUrl + "message/get-unread-cnt")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                let res = +data;
                msgCnt = res;
            });
    }

    $: messageList = [];

    async function getMessageList() {
        await fetch(serverUrl + "data/get-request-list")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                messageList = data || [];
                console.log(messageList);
            });
    }

    onMount(() => {
        getReqCnt();
        getMsgCnt();
        getMessageList();
    });
</script>

<main class="bg-gray-100 min-h-screen">
    <!-- Navbar -->

    <div class="flex">
        <!-- Sidebar -->
        <div class="w-64 h-screen bg-white shadow-md fixed z-0 py-4">
            <!-- Company Logo -->
            <div class="text-center mb-10 mt-4">
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogoBag.png"
                    alt="Company Logo"
                    class="w-32 mx-auto"
                />
            </div>

            <!-- Menu Items -->
            <ul class="text-base font-semibold">
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToDashboard}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/dashboard.svg"
                        alt="Dashboard Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Dashboard
                </li>

                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToQuery}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/analytic.svg"
                        alt="Query Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Query
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToAddHospital}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/hospital.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Add New Hospital
                </li>
                <li
                    class="flex items-center p-4 bg-red-400 cursor-default"
                    on:click={navigateToResearch}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/research.svg"
                        alt="Add New Hospital Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Research Organizations
                </li>
                <li
                    class="flex items-center p-4 hover:bg-gray-300 cursor-pointer"
                    on:click={navigateToMessages}
                >
                    <img
                        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/message.svg"
                        alt="Messages Icon"
                        class="w-6 h-6 mr-2"
                    />
                    Messages
                </li>
            </ul>
        </div>

        <!-- Main Dashboard Content -->
        <div class="ml-64 w-full">
            <nav class="bg-white shadow-md mb-8 z-10">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center py-4">
                        <!-- Logo Section -->
                        <div class="flex items-center">
                            <img
                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogo.png"
                                alt="Company Logo"
                                width={125}
                                height={25}
                                class="mx-0 my-0"
                            />
                        </div>

                        <!-- Notification and Logout Section -->
                        <div class="flex items-center space-x-4">
                            <!-- Message Notification -->
                            <div class="relative">
                                <img
                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/email-blue.svg"
                                    alt="Message Icon"
                                    class="h-6 w-6 transition-transform transform hover:scale-150"
                                    on:click={navigateToMessages}
                                />
                                <span
                                    class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >{msgCnt}</span
                                >
                                <!-- Number of unread messages -->
                            </div>

                            <!-- General Notification -->
                            <div class="relative">
                                <img
                                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/Notification.svg"
                                    alt="Notification Icon"
                                    class="h-6 w-6 transition-transform transform hover:scale-150"
                                    on:click={navigateToAddHospital}
                                />
                                <span
                                    class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                                    >{reqCnt}</span
                                >
                                <!-- Number of unread notifications -->
                            </div>

                            <!-- Logout Button -->
                            <button
                                class="btn btn-outline btn-error"
                                on:click={navigateToLogin}>Logout</button
                            >
                        </div>
                    </div>
                </div>
            </nav>
            <h1 class="container mx-8 text-3xl font-extrabold text-blue-600">
                Research Organization Requests
            </h1>
            <div class="container px-4 mt-8">
                <div class="space-y-4 overflow-y-auto max-h-[70vh]">
                    {#each messageList as message,index}
                        <div class="bg-white rounded-lg shadow-md p-4 relative">
                            <h2 class="text-xl font-semibold text-blue-600">
                                {message["sender"]}
                            </h2>
                            <p class="text-sm text-gray-500">
                                {message["reqTime"]}
                            </p>
                            <div
                                class="mt-2 p-3 rounded-full bg-blue-100 inline-block"
                            >
                                <p class="text-base whitespace-pre-line">
                                    {message["reqText"]}
                                </p>
                            </div>
                            <button
                                class="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                on:click={() => showModal(index, message["id"])}
                            >
                                Respond
                            </button>
                        </div>
                    {/each}
                </div>
                <div
                    id="responseModal"
                    class="fixed inset-0 flex items-center justify-center hidden"
                >
                    <div
                        class="absolute inset-0 bg-black opacity-50"
                        on:click={closeModal}
                    />
                    <div class="bg-white w-2/5 p-6 rounded-lg z-10">
                        <h2 class="text-xl font-semibold text-blue-600 mb-4">
                            Responding to: {activeMessage["sender"]}
                        </h2>
                        <form on:submit|preventDefault={handleSubmit}>
                            <div class="mb-4">
                                <label
                                    for="responseText"
                                    class="block text-sm font-medium text-gray-600"
                                    >Your Response</label
                                >
                                <textarea
                                    id="responseText"
                                    name="resText"
                                    rows="4"
                                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                    bind:value={resText}
                                    aria-label="Message"
                                />
                            </div>
                            <div class="mb-4">
                                <label
                                    for="responseFile"
                                    class="block text-sm font-medium text-gray-600"
                                    >Upload a File</label
                                >
                                <input
                                    type="file"
                                    id="responseFile"
                                    name="file"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    bind:this={fileInput}
                                    on:change={handleFileUpload}
                                />
                            </div>
                            <button type="submit" class="btn btn-accent"
                                >Send Response</button
                            >
                            <button
                                type="button"
                                class="btn btn-error"
                                on:click={closeModal}>Cancel</button
                            >
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .respond-box {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 8px;
        margin-top: 16px;
    }
    .scrollable-content {
        max-height: 400px; /* Or whatever maximum height you prefer */
        overflow-y: auto; /* Enables vertical scrolling */
        overflow-x: hidden; /* Disables horizontal scrolling */
    }
</style>
