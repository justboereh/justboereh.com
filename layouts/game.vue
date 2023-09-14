<script setup lang="ts">
const GameName = useGameName()

useHead({
	title: () => `${GameName.value ? GameName.value + ' - ' : ''} Games`,
})
</script>

<template>
	<div class="w-screen h-screen flex flex-col">
		<nav class="w-full p-2 relative flex justify-between select-none">
			<b-button
				type="text"
				icon="fluent:chevron-left-24-regular"
				href="/games"
			>
				Back
			</b-button>

			<client-only>
				<span
					class="absolute transform -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2"
				>
					{{ GameName }}
				</span>
			</client-only>
		</nav>

		<main class="flex-grow p-4 grid place-items-center">
			<slot />
		</main>
	</div>
</template>
