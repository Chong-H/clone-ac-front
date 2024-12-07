<template>
    <label>{{ collectible.name }}</label>
    <label>{{ collectible.owner }}</label>
    <label>{{ collectible.description }}</label>
    <label>{{ collectible.price }}</label>
    <label>{{ collectible.status }}</label>
    <button @click="emit('change-status', collectible)">change status</button>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { DigitalCollectibleStatus } from '@/utils/DigitalCollectibleStatus';

interface Props {
    collectible: DigitalCollectible,
}

const {
    collectible,
} = defineProps<Props>();

const emit = defineEmits<{
    (event: 'change-status', collectible: DigitalCollectible): void,
}>();


</script>

<style scoped></style>