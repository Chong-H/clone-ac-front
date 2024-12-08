<template>
    <div class="wrapper">
        <label>Collectibles</label>
        <div v-for="collectible in collectibles" :key="collectible.collectibleId">
            <CollectibleToCustomer :collectible="collectible" @purchase="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import CollectibleToCustomer from '@/components/CollectibleToCustomer.vue';

interface Props {
    collectibles: DigitalCollectible[],
}

const {
    collectibles,
} = defineProps<Props>();

</script>

<style scoped></style>