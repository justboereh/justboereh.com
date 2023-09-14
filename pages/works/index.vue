<script setup lang="ts">
const projects = [
	{
		name: 'UEC Theatres',
		type: 'personal project',
		desc: "A redesign of a movie theatres' website to fit more of the modern times.",
		img: '/img/uectheatres-homepage.png',
		buttons: [
			{
				type: 'fill',
				size: 'large',
				icon: 'fluent:open-16-regular',
				text: 'Visit Site',
				href: 'uec.justboereh.com',
				target: '_blank',
			},
			{
				type: 'text',
				size: 'large',
				icon: 'fluent:open-16-regular',
				text: 'Visit Source',
				href: '//github.com/justboereh/uec',
				target: '_blank',
			},
		],
	},
	{
		name: 'ProTax BG',
		type: '',
		desc: '',
		img: '',
		buttons: [
			{
				type: 'fill',
				size: 'large',
				icon: 'fluent:open-16-regular',
				text: 'Visit Site',
				href: 'uec.justboereh.com',
				target: '_blank',
			},
			{
				type: 'text',
				size: 'large',
				icon: 'fluent:open-16-regular',
				text: 'Visit Source',
				href: '//github.com/justboereh/uec',
				target: '_blank',
			},
		],
	},
	{
		name: '',
		type: '',
		desc: '',
		img: '',
		buttons: [
			{
				type: 'fill',
				size: 'large',
				icon: 'fluent:open-16-regular',
				text: 'Visit Site',
				href: 'uec.justboereh.com',
				target: '_blank',
			},
			{
				type: 'text',
				size: 'large',
				icon: 'fluent:open-16-regular',
				text: 'Visit Source',
				href: '//github.com/justboereh/uec',
				target: '_blank',
			},
		],
	},
]

useHead({
	title: 'My Works',
})
</script>

<template>
	<div class="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-16">
		<div
			v-for="project of projects"
			:key="project.name"
			class="bg-light-500 p-4 sm:p-8 rounded-lg grid sm:grid-cols-2 gap-4 sm:gap-8"
		>
			<div>
				<h1 class="text-4xl mb-2">{{ project.name }}</h1>
				<p class="uppercase font-bold text-black/50">{{ project.type }}</p>

				<br />

				<p>
					{{ project.desc }}
				</p>

				<br />

				<div class="flex gap-4">
					<b-button
						v-for="button of project.buttons"
						:key="button.text"
						v-bind="button"
						:type="button.type"
						:icon="button.icon"
						size="large"
					>
						{{ button.text }}
					</b-button>
				</div>
			</div>

			<img
				class="rounded-md"
				:src="project.img"
				:alt="project.name"
			/>
		</div>
	</div>
</template>
