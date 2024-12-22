<template>
    <div class="wrapper">
        <label>{{ trans.collectibleId }}</label>
        <label>{{ trans.transactionDate }}</label>
        <label>{{ trans.sellerId }}</label>
        <label>{{ trans.buyerId }}</label>
        <button @click="emit('read', trans)">知道了</button>
        <button @click="emit('unread', trans)">设为未读</button>
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { TransactionDto } from '@/pojo/dto/TransactionDto';

interface Props {
    trans: TransactionDto,
}

const {
    trans,
} = defineProps<Props>();

const emit = defineEmits<{
    (event: 'read', trans: TransactionDto): void,
    (event: 'unread', trans: TransactionDto): void,
    
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