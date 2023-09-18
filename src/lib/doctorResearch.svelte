<script>
    export let research = [
        {
            title: "The Effects of XYZ on Human Health",
            publication: "Journal of Medical Research, 2021",
        },
        {
            title: "Case Study on ABC Disease",
            publication: "Health Science Journal, 2020",
        },
        // You can add more research entries to the list as needed
    ];
</script>

<section>
    <h2 class="text-2xl font-bold mb-4">Research Work</h2>
    <ul class="space-y-2">
        {#each research as entry}
            <li>
                <strong>{entry.title}</strong> - Published in:
                <i>{entry.publication}</i>
            </li>
        {/each}
    </ul>
</section>
