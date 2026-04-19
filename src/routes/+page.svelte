<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Skills from '$lib/components/sections/Skills.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
</script>

<svelte:head>
	<title>Amir — Software Developer</title>
	<meta name="description" content="Software Developer — I build things for the web, clean, fast, and intentional." />
</svelte:head>

<Hero />
<About />
<Skills />
<Projects />
<Contact />
