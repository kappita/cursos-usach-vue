<script setup>
const { fill } = defineProps({
	fill: String,
});

</script>
<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="1.9em" height="1.9em" viewBox="0 0 48 48">
		<path :fill="fill" stroke="black" stroke-linejoin="round" stroke-width="2.5" d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z" />
	</svg>
</template>
