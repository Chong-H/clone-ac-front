<template>
    <div class="wrapper">
        <label>{{ collectible.name }}</label>
        <label>{{ collectible.owner }}</label>
        <label>{{ collectible.description }}</label>
        <label>{{ collectible.price }}</label>
        <label>{{ collectible.status }}</label>
        <button @click="emit('change-status', collectible)">change status</button>
        <label>赠送对象id</label>
        <input @input="handleInput" type="number" id="myNumber"><\label>
        <!-- <input v-model="inputElementRef" type="number" id="myNumber"> -->
        <!-- <input type="text" id="myNumber" > </input> -->
        <button @click="emit('send', collectible)">send</button>
        <button @click="emit('smash', collectible)">smash</button>
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
//import { ref } from 'vue';
import { ref, provide } from 'vue';
const inputElementRef = ref<HTMLInputElement | null>(null);



interface Props {
    collectible: DigitalCollectible,
}
const numberValue = ref(0);
const {
    collectible,
} = defineProps<Props>();

const emit = defineEmits<{
    (event: 'change-status', collectible: DigitalCollectible): void,
    (event: 'send', collectible: DigitalCollectible): void,
    (event: 'smash', collectible: DigitalCollectible): void,
    (event: 'input-change', value: string): void;
}>();

function handleInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  emit('input-change', inputElement.value);
}

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