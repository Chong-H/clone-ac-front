<template>
    <div>
        <div class="user-layout">
            <p> User ID: {{ store.userId }}</p>
            
        </div>
        <div  >
                <h2>账号信息</h2>
                <form @submit.prevent="handleUpdateUser">
                    <label>用户名:</label>
                    <input v-model="currentUser1.username" placeholder="用户名" required />
                    <label>邮箱:</label>
                    <input v-model="currentUser1.email" type="email" placeholder="邮箱" required />
                    <label>密码:</label>
                    <input v-model="currentUser1.passwordHash" type="password" placeholder="密码" required />
                    <button type="submit">更新</button>
                    <button type="button" @click="handleCancelEdit">取消</button>
                </form>
            </div>
            <h2>交易信息</h2>
        <div class="cards-wrapper">
            <TransactionRecordView v-for="trans in transHiss" :key="trans.transactionId ?? undefined" :trans="trans"
                @read="handleRead" @unread="handleUnread" />
        </div>

        
        <label>下面是已读的交易记录</label>
        <hr>
        <div class="cards-wrapper">
            <TransactionRecordView v-for="trans in transHiss1" :key="trans.transactionId ?? undefined"
            
        :trans="trans" @read="handleRead" @unread="handleUnread" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import { editTransaction,getAllTransactions,createUserAPI, deleteUserAPI, getAllUsersAPI, getUserByIdAPI, updateUserAPI } from '@/api';
import { store } from '@/store'; 
import { TransactionDto } from '@/pojo/dto/TransactionDto';
import TransactionRecordView from '@/components/TransactionRecordView.vue';
import { User } from '@/pojo/User';
import { reactive } from 'vue';


const init: Ref<boolean> = ref(true);
    const isEditing = ref(false);
    
    
const transHiss: Ref<TransactionDto[]> = ref([] as TransactionDto[]);
const transHiss1: Ref<TransactionDto[]> = ref([] as TransactionDto[]);
    const recipientId = ref(0);
const handleInputChange = (value: string) => {
    recipientId.value = parseInt(value, 10);
};
const currentUser: Ref<User> = ref({} as User);


const handleCancelEdit = () => {
    isEditing.value = false;
    currentUser.value = {} as User;
};

const currentUser1 = reactive({
  username: '',
  email: '',
  passwordHash: ''
});

onMounted(async () => {
    if (store.userId !== -1) {                                   
        try {
            const response = await getAllTransactions(); // 等待 Promise 解决
          // 将 Iterable 转换为数组
          transHiss.value = Array.from(response.data).filter(
                trans => ( 
                    (  trans.buyerId==store.userId&&trans.ifReadByBuyer==0 )||
                    (  trans.sellerId==store.userId&&trans.ifReadBySeller==0)
                 ) 
         ).reverse();

          transHiss1.value = Array.from(response.data).filter(trans => (      (  trans.buyerId==store.userId&&trans.ifReadByBuyer==1)|| (trans.sellerId==store.userId&&trans.ifReadBySeller==1  )         )).reverse();
        } catch (error) {
            console.error('获取所有交易记录失败:', error);
        }
    }
    init.value = false;
});


const handleUpdateUser = async (): Promise<void> => {
    currentUser.value.username=currentUser1.username;
    currentUser.value.email=currentUser1.email;
    currentUser.value.passwordHash=currentUser1.passwordHash;
  
    await updateUserAPI(store.userId, currentUser.value);
    
    alert("修改成功");
};
// async function handleRead(trans: TransactionDto): Promise<void> {
//     let status: number;
//     if (trans.ifReadByBuyer === 1) {
//         trans.ifReadByBuyer=0;
//     }
//     //editTransaction
//     await editTransaction(trans);

// }
async function handleRead(trans: TransactionDto): Promise<void> {
    try {
        let status;
        if(trans.buyerId==store.userId){
        if (trans.ifReadByBuyer == 0) {
            trans.ifReadByBuyer = 1;
        }
    }else  if(trans.sellerId==store.userId){
        if (trans.ifReadBySeller == 0) {
            trans.ifReadBySeller = 1;
        }
    }
        // 假设editTransaction是一个异步函数，需要await
        await editTransaction(trans);
      alert("成功已读消息");
    } catch (error) {
        // 错误处理逻辑
        alert("An error occurred while handling read transaction");
        console.error('An error occurred while handling unread transaction:', error);
        // 根据需要，可以在这里抛出错误或者返回错误信息
        throw error; // 或者不抛出，根据业务逻辑决定
    }
    //location.href = location.href;
}

// async function handleUnread(trans: TransactionDto): Promise<void> {

//     let status: number;
//     if (trans.ifReadByBuyer === 0) {
//         trans.ifReadByBuyer=1;
//     }

//     await editTransaction(trans);

    
// }
async function handleUnread(trans: TransactionDto): Promise<void> {
    try {
        let status;
        if(trans.buyerId==store.userId){
        if (trans.ifReadByBuyer == 1) {
            trans.ifReadByBuyer = 0;
        }
    }
    if(trans.sellerId==store.userId){
        if (trans.ifReadBySeller == 1) {
            trans.ifReadBySeller = 0;
        }
    }
        // 假设editTransaction是一个异步函数，需要await
        await editTransaction(trans);
        alert("成功设为未读");
    } catch (error) {
        // 错误处理逻辑
        alert("An error occurred while handling unread transaction");

        console.error('An error occurred while handling unread transaction:', error);
        // 根据需要，可以在这里抛出错误或者返回错误信息
        throw error; // 或者不抛出，根据业务逻辑决定
    }
    //location.href = location.href;
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
