<template>
    <div class="wrapper">
        <!-- <label>商品</label> -->
        <label>商品:    {{ collectible.name }}</label>
        <label>物主id:    {{ collectible.owner }}</label>
        <label>描述:    {{ collectible.description }}</label>
        <label>价格:    {{ collectible.price }}</label>
        <button @click="emit('purchase', collectible)">purchase</button>
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';

interface Props {
    collectible: DigitalCollectible,
}

const {
    collectible,
} = defineProps<Props>();

const emit = defineEmits<{
    (event: 'purchase', collectible: DigitalCollectible): void,
}>();
</script>


<style scoped>
/* label竖置 */
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid black;
    margin: 10px;
}
</style>