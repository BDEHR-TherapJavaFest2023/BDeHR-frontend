<script>
    import { onMount } from "svelte";

    let Name = "ICDDR,B";
    let Address = " Mohakhali, Dhaka";
    let Phone = "+01746244928";
    let Email = "icddrb@gmail.com";
    let Logo =
        "https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/icddrb-removebg-preview%20(1).png";

    let AdminResponses = [
        {
            replyTo: "User Message 1",
            timestamp: "2023-09-20 15:00:00",
            content: ["Response 1 text", "data:image/png;base64,..."],
        },
        {
            replyTo: "User Message 2",
            timestamp: "2023-09-20 16:00:00",
            content: ["Response 2 text"],
        },
    ];

    function sendMessageToAdmin() {
        // Logic to send message to admin
    }
</script>

<nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex items-center justify-between">
        <div class="text-white text-lg font-semibold hover:scale-110">
            {Name}
        </div>

        <div class="space-x-4">
            <a href="#/researchlogin" class="text-white">Logout</a>
        </div>
    </div>
</nav>

<main class="container mx-auto my-12 p-4 flex flex-col items-center space-y-12">
    <section class="profile text-center space-y-4">
        <img
            src={Logo}
            alt="Company Logo"
            class="w-72 h-24 rounded-full mx-auto"
        />
        <p class="text-gray-700 font-semibold">{Address}</p>
        <p class="text-gray-700 font-semibold">{Phone}</p>
        <p class="text-gray-700 font-semibold">{Email}</p>
    </section>

    <section class="admin-section w-full space-y-8">
        <div class="message-box ml-5">
            <textarea
                placeholder="Enter your message here..."
                class="w-full h-32 p-2 rounded border"
            />
            <button
                on:click={sendMessageToAdmin}
                class="btn btn-outline mt-4 hover:bg-green-500"
                >Send Message to Central Administrator</button
            >
        </div>
        <h2 class="text-2xl font-semibold ml-5">Previous Admin Responses</h2>
        <ul class="list-inside pl-5 space-y-4">
            {#each AdminResponses as response}
                <li class="bg-gray-100 p-4 rounded space-y-2">
                    <div class="text-sm font-medium text-gray-600">
                        Reply to: {response.replyTo} | Timestamp: {response.timestamp}
                    </div>
                    <div class="content">
                        {#each response.content as item}
                            {#if item.startsWith("data:image")}
                                <img
                                    src={item}
                                    alt="Admin Image"
                                    class="w-32 h-32 rounded mt-2"
                                />
                            {:else}
                                <p class="text-gray-700">{item}</p>
                            {/if}
                        {/each}
                    </div>
                </li>
            {/each}
        </ul>
    </section>
</main>
