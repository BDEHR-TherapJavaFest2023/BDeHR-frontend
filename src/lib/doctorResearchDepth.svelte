<script>
    console.log("Started doctorPatient.svelte");
    import { getContext, onMount } from "svelte";
    export let params = {};
    let introductoryText = "";
    let caseAnalysisText = "";
    let decisionsText = "";

    // let paramsContext = getContext("@@svelte-spa-router");
    // let params = paramsContext ? paramsContext.params : {};
    onMount(() => {
        introductoryText =
            localStorage.getItem(`introductory-${researchName}`) || "";
        caseAnalysisText =
            localStorage.getItem(`caseAnalysis-${researchName}`) || "";
        decisionsText = localStorage.getItem(`decisions-${researchName}`) || "";
    });
    function saveContent() {
        localStorage.setItem(`introductory-${researchName}`, introductoryText);
        localStorage.setItem(`caseAnalysis-${researchName}`, caseAnalysisText);
        localStorage.setItem(`decisions-${researchName}`, decisionsText);
    }

    console.log("Router Context:", params);

    let researchName;
    $: researchName = params.researchParticular;

    function navigateBack() {
        window.location.hash = `#/doctorhome/researches`;
    }

    // $: researchName = params.rname;
</script>

<main class="bg-gray-100 min-h-screen p-6">
    <div class="container mx-auto">
        <header class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-semibold">{researchName}</h1>
            <button on:click={navigateBack}>
                <img
                    src="https://aaitclybvvendvuswytq.supabase.co/storage/v1/object/public/BDeHR/return.png"
                    alt="Navigate Back"
                    class="w-10 h-10 hover:scale-110"
                />
            </button>
        </header>

        <section class="mb-8">
            <label class="block text-xl font-semibold mb-2">Introductory</label>
            <textarea
                bind:value={introductoryText}
                class="w-full h-32 p-4 rounded border"
            />
        </section>

        <section class="mb-8">
            <label class="block text-xl font-semibold mb-2">Case Analysis</label
            >
            <textarea
                bind:value={caseAnalysisText}
                class="w-full h-32 p-4 rounded border"
            />
        </section>

        <section class="mb-8">
            <label class="block text-xl font-semibold mb-2">Decisions</label>
            <textarea
                bind:value={decisionsText}
                class="w-full h-32 p-4 rounded border"
            />
        </section>

        <button on:click={saveContent} class="btn btn-primary">
            Save Changes
        </button>
    </div>
</main>
