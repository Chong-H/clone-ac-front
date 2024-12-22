<template>
    <div>
        <div class="user-layout">
            <<div class="user-layout">
                <p> User ID: {{ store.userId }}</p>
            </div>
        </div>
        <div class="cards-wrapper">
    <TransactionRecordView v-for="trans in transHiss" :key="trans.transactionId ?? undefined"
        :trans="trans" @read="handleRead" @unread="handleUnread" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@/pojo/User';
//import { DigitalCollectible } from "@/pojo/DigitalCollectible";
import { ref, onMounted, type Ref } from 'vue';
import { createUserAPI, deleteUserAPI, getAllUsersAPI, getUserByIdAPI, updateUserAPI } from '@/api';
import { store } from '@/store'; 
import { TransactionDto } from '@/pojo/dto/TransactionDto';
import TransactionRecordView from '@/components/TransactionRecordView.vue';


const transHiss: Ref<TransactionDto[]> = ref([] as TransactionDto[]);

async function handleRead(trans: TransactionDto): Promise<void> {
    let status: number;
    if (trans.ifReadByBuyer === 1) {
        trans.ifReadByBuyer=0;
    }

}

async function handleUnread(trans: TransactionDto): Promise<void> {

    let status: number;
    if (trans.ifReadByBuyer === 0) {
        trans.ifReadByBuyer=1;
    }
    
}








</script>

<style scoped>
.user-layout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .user-layout {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .user-form,
    .query-form,
    .collectibles-list,
    .users-list,
    .edit-form {
        flex: 1 1 45%;
    }
}
</style>
