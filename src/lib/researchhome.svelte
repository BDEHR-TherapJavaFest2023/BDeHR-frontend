<script>
    import { onMount } from "svelte";
    import { serverUrl } from "./constants";
    import { orgInfo } from "./store";
    import { get } from "svelte/store";

    let Name = "ICDDR,B";
    let Address = "Mohakhali, Dhaka";
    let Phone = "+01746244928";
    let Email = "icddrb@gmail.com";
    let Logo =
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/icddrb-removebg-preview%20(1).png";

    let showPending = false;

    let userMessage = "";

    let AdminResponses = [
        {
            sent: "2023-09-19 15:00:00",
            replyTo: "User Message 1",
            timestamp: "2023-09-20 15:00:00",
            content: "Ei nao tomar bar graph",
            fileAttachment:
                "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/querypics/querypics/line_chart.png",
            status: "completed",
        },
        {
            sent: "2023-09-19 15:00:00",
            replyTo: "User Message 2",
            timestamp: "2023-09-19 14:00:00",
            content: "No attachment here",
            fileAttachment: "",
            status: "completed",
        },
        {
            sent: "2023-09-18 15:00:00",
            replyTo: "User Message 3",
            timestamp: "",
            content: "",
            fileAttachment: "",
            status: "pending",
        },
        // Add additional data as needed
    ];

    AdminResponses.sort((a, b) => a.replyTo.localeCompare(b.replyTo));

    async function sendMessageToAdmin() {
        let payload = {
            reqText: userMessage,
            sender: get(orgInfo).orgInfo["name"],
        };
        await fetch(serverUrl + "data/add-request", {
            method: "POST",
            body: JSON.stringify(payload),
        }).then((response) => {
            getMessageList();
        });

        userMessage = "";
    }

    function togglePending() {
        showPending = !showPending;
    }

    $: messageList = [];

    async function getMessageList() {
        let payload = { sender: get(orgInfo).orgInfo["name"] };
        await fetch(serverUrl + "data/get-all", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                messageList = data || [];
                console.log(messageList);
            });
    }

    onMount(() => {
        getMessageList();
    });
</script>

<!-- Main Component -->
<nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex items-center justify-between">
        <div class="text-white text-lg font-semibold hover:scale-110">
            {get(orgInfo).orgInfo["name"]}
        </div>

        <div class="space-x-4">
            <a href="#/researchlogin" class="text-white">Logout</a>
        </div>
    </div>
</nav>

<main class="container mx-auto my-12 p-4 flex flex-col items-center space-y-12">
    <section class="profile text-center space-y-4">
        <img
            src={get(orgInfo).orgInfo["photo"]}
            alt="Company Logo"
            class="w-84 h-24 rounded-full mx-auto"
        />
        <p class="text-gray-700 font-semibold">
            {get(orgInfo).orgInfo["address"]}
        </p>
        <p class="text-gray-700 font-semibold">
            {get(orgInfo).orgInfo["phone"]}
        </p>
        <p class="text-gray-700 font-semibold">
            {get(orgInfo).orgInfo["email"]}
        </p>
    </section>

    <section class="space-y-4">
        <div class="mb-8">
            <textarea
                bind:value={userMessage}
                placeholder="Enter your message..."
                class="w-full h-32 p-2 rounded border"
            />
            <button on:click={sendMessageToAdmin} class="btn btn-primary mt-4">
                Send Message to Admin
            </button>
        </div>
        <h2 class="text-3xl font-bold">Past Communications</h2>

        <button on:click={togglePending} class="btn btn-error">
            Show Pending Requests
        </button>

        <div class="grid grid-cols-2 gap-4">
            {#each messageList as message}
                <div
                    class={`border rounded p-4 ${
                        message['status'] === "pending"
                            ? "bg-yellow-200"
                            : "bg-green-200"
                    }`}
                >
                    <p><strong>Request:</strong> {message['sender']}</p>
                    <p><strong>Sent time:</strong> {message['reqTime']}</p>
                    <p><strong>Status:</strong> {message['status']}</p>
                </div>
                <div class="border rounded p-4">
                    <p><strong>Responce Time:</strong> {message['resTime'] || ""}</p>
                    <p><strong>Content:</strong> {message['resText'] || ""}</p>
                    {#if message['url']}
                        <a href={message['url']} target="_blank">
                            <img
                                class="w-6 h-6 inline hover:scale-110"
                                src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/attachments-attach.svg"
                            />
                            <h1 class="font-semibold">Find attachment</h1>
                        </a>
                    {/if}
                </div>
            {/each}
        </div>
    </section>
    {#if showPending}
        <div
            class="fixed inset-0 bg-opacity-75 bg-black flex items-center justify-center"
        >
            <div class="bg-white rounded-lg p-8">
                <button
                    on:click={togglePending}
                    class="btn btn-error absolute top-2 right-2"
                >
                    Close
                </button>
                <ul>
                    {#each messageList as message}
                        {#if message['status'] === "pending"}
                            <li class="border-b py-2">
                                <p>
                                    <strong>Reply To:</strong>
                                    {message['reqText']}
                                </p>
                                <p><strong>Sent:</strong> {message['reqTime']}</p>
                            </li>
                        {/if}
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</main>

<!-- Tailwind and DaisyUI Styling -->
<style>
    @import "https://cdn.jsdelivr.net/npm/daisyui/dist/full.css";

    .svg-icon {
        width: 20px;
        height: 20px;
        transition: transform 0.3s ease;
    }

    .svg-icon:hover {
        transform: scale(1.1);
    }
</style>
