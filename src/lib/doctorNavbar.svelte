<script>
    import Link from "svelte-spa-router";
    import navigate from "svelte-spa-router";

    let typingText = "";
    export let doctorName;

    // Function to simulate typing animation

    let typingIndex = 0;

    // Function to simulate typing animation
    function typeText() {
        const messages = [
            "Welcome " + doctorName,
            "Another Message to Type",
            // Add more messages here
        ];

        let currentIndex = 0;

        function typeNextMessage() {
            if (currentIndex < messages.length) {
                typingText = "";
                typingIndex = 0;
                const message = messages[currentIndex];
                const typingInterval = setInterval(() => {
                    if (typingIndex < message.length) {
                        typingText += message.charAt(typingIndex);
                        typingIndex++;
                    } else {
                        clearInterval(typingInterval);
                        setTimeout(() => {
                            eraseText(message);
                        }, 1000); // Wait for 1 second before erasing
                    }
                }, 100); // Adjust typing speed here (e.g., 100ms for faster typing)
                currentIndex++;
            } else {
                currentIndex = 0; // Restart from the beginning
                typeNextMessage();
            }
        }

        typeNextMessage(); // Start typing the first message
    }

    function eraseText(message) {
        const erasingInterval = setInterval(() => {
            if (typingIndex > 0) {
                typingText = message.slice(0, typingIndex - 1);
                typingIndex--;
            } else {
                clearInterval(erasingInterval);
                setTimeout(() => {
                    typeText();
                }, 500); // Wait for 0.5 seconds before typing the next message
            }
        }, 50); // Adjust erasing speed here (e.g., 50ms for faster erasing)
    }

    typeText(); // Start the typing animation when the page loads
</script>

<div class="navbar bg-base-100 w-full">
    <img
        src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/mainlogo.png"
        alt="pial Logo"
        width={125}
        height={25}
        class="mx-0 my-0"
    />

    <!-- About option on the left -->
    <div class="typing-text">
        <div>{typingText}</div>
    </div>
    <a href="#/doctorlogin" class="btn btn-outline ml-auto mr-2">Logout</a>
</div>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f5f8ee; /* Make the navbar transparent */
        padding: 1rem;
        position: fixed;
        left: 0;
        right: 0;
        z-index: 900;
    }

    .overlay.active {
        display: block;
    }

    /* Add hover effect for drawer links */

    @keyframes typing {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    /* Apply the animation to the text */
    .typing-text {
        display: flex;
        align-items: center; /* Center vertically */
        font-size: 26px; /* Increase font size */
        overflow: hidden; /* Hide overflowing text */
        white-space: nowrap; /* Prevent line breaks */
        margin-left: auto; /* Push text to the right */
    }

    /* Add cursor animation */
    .typing-text::after {
        content: "|"; /* Display the cursor */
        animation: blink 1s step-end infinite; /* Blinking cursor */
        margin-left: 0.2rem; /* Adjust cursor placement */
    }

    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
</style>
