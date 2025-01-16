<template>
    <div class="wrapper">
        <label>物品id      -    交易唯一ID</label>
        <label>{{ trans.collectibleId == null?null:trans.collectibleId}}    -   {{trans.transactionId}}</label>
        <label>交易日期</label>
        <label>{{ trans.transactionDate }}</label>
        <label>卖家号码：{{ (trans.sellerId  ) }}  </label>
        <label>是否读取交易记录 {{trans.ifReadBySeller ==1?"是":"否"}}</label>
        <label>买家号码：{{ trans.buyerId }} </label>
        <label>   是否读取交易记录： {{trans.ifReadByBuyer ==1?"是":"否"}}</label>
        
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
    border: 1px solid #ddd;
    /* 边框 */
    border-radius: 8px;
    /* 圆角 */
    padding: 16px;
    /* 内边距 */
    background-color: black;
    /* 背景颜色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 阴影 */
    margin-bottom: 20px;
    /* 底部外边距 */
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid black;
    margin: 10px; */
}
</style>