<script setup lang="ts">
useHead({
	title: 'Boe Reh',
})
</script>

<template>
	<div class="hero grid place-items-center">
		<span>
			<span class="text-5xl font-bold">
				<span class="my-name"> Hello, I'm Boe Reh. </span>
				<br />
				A full-stack developer.
			</span>

			<br />

			<p class="text-2xl text-black/70">
				I mainly develop in Nuxt/Vue, but I dive into Next, Astro, Svelte.
			</p>

			<br />

			<div class="flex gap-2">
				<nuxt-link to="/contact">
					<b-button type="fill">Contact Me</b-button>
				</nuxt-link>

				<nuxt-link to="/works">
					<b-button type="text">See my works</b-button>
				</nuxt-link>
			</div>
		</span>
	</div>
</template>

<style scoped>
.hero {
	height: calc(100dvh - 7rem);
}

.my-name {
	background: linear-gradient(90deg, #b85436, #db2424);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
