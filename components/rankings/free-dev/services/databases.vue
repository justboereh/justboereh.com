<script setup>
import Dropdown from 'primevue/dropdown'
</script>

<template>
    <div>
        <label class="block"> Service Type </label>
        <Dropdown :options="[]" editable />
    </div>
</template>
