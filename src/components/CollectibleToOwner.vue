<template>
    <div class="wrapper">
        <label>{{ collectible.name }}</label>
        <label>{{ collectible.owner }}</label>
        <label>{{ collectible.description }}</label>
        <label>{{ collectible.price }}</label>
        <label>{{ collectible.status }}</label>
        <button @click="emit('change-status', collectible)">change status</button>
        <label>赠送对象id</label>
        <input type="text" id="myNumber" value="123"> </input>
        <button @click="emit('send', collectible)">send</button>
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
    (event: 'change-status', collectible: DigitalCollectible): void,
    (event: 'send', collectible: DigitalCollectible): void,
    
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