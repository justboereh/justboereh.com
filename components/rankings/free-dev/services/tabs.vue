<script setup>
import * as Services from '@/assets/free-dev/index'
import Databases from './databases.vue'
import Functions from './functions.vue'
import TabMenu from 'primevue/tabmenu'

const ServicesOptions = Object.keys(Services)
const ServiceSelected = ref(ServicesOptions[0])
const ServicesComponents = { Databases, Functions }
</script>

<template>
    <TabMenu
        :model="ServicesOptions.map((v) => ({ label: v }))"
        @tab-change="({ index }) => (ServiceSelected = ServicesOptions[index])"
    />

    <br />

    <component :is="ServicesComponents[ServiceSelected]" />
</template>
