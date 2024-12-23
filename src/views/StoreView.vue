<template>
    <div>
        <div class="user-layout">
            <ul>
                <p>User ID: {{ store.userId }}</p>
                <!-- <button @click="updateUserId">Update User ID</button> -->
            <label>UserId-Name_Price lists</label>
            <li v-for="item in collectibles" :key="item.collectibleId">
                {{ item.collectibleId }} - {{ item.name }} - {{ item.price }}
                <button @click="handleEditCollectible(item)">购买</button>
                <!-- <button @click="handleDeleteCollectible(item.collectibleId)">删除</button> -->
            </li>
            </ul>
        </div>
        <!-- 编辑表单 -->
        <div v-if="isEditing">
            <h2>购买数字收藏品</h2>
            <CollectibleToCustomer :key="currentCollectible.collectibleId" :collectible="currentCollectible"
              @purchase="handlePurchase"/>
        </div>


        
    </div>
</template>

<script setup lang="ts">

import { User } from '@/pojo/User';
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { ref, onMounted, type Ref } from 'vue';
import { addTransaction,createCollectibleAPI, deleteCollectibleAPI, getAllCollectiblesAPI, updateCollectibleAPI } from '@/api';
import DigitalCollectibleForm from '@/components/DigitalCollectibleForm.vue';
import CollectibleToCustomer from '@/components/CollectibleToCustomer.vue';
import { store } from '@/store'; 


// 初始化
const fetchCollectibles = async (): Promise<void> => {
    collectibles.value = ((await getAllCollectiblesAPI()).data).filter(collectible => ((collectible.status=="active")));
    console.log("A collectible is fetched: ", collectibles.value[0]);
};
onMounted(fetchCollectibles);

// 创建
const collectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);
const collectible: Ref<DigitalCollectible> = ref(new DigitalCollectible);
async function handleCreateConfirm(collectible: DigitalCollectible | null): Promise<void> {
    if (collectible == null) {
        return;
    }
    await createCollectibleAPI(collectible);
    collectible = new DigitalCollectible();
    fetchCollectibles();
}
// 编辑
const isEditing = ref(false);
const currentCollectible: Ref<DigitalCollectible> = ref(new DigitalCollectible());

const handleEditCollectible = (item: DigitalCollectible) => {
    currentCollectible.value = { ...item };
    isEditing.value = true;
};

const handleDeleteCollectible = async (id: number): Promise<void> => {
    await deleteCollectibleAPI(id);
    fetchCollectibles();
};

//传递参数过来


async function handlePurchase(collectible: DigitalCollectible): Promise<void> {//处理购买
    if(collectible.owner==store.userId){
        alert("不能买自己的");
        return;
    }
    if(store.userId==-1){
        alert("Log In First!");
        return;

    }
    const newOwnerId = store.userId ;
    collectible.owner=newOwnerId;


    console.log(getFormattedDate());
    const transactionData1 = {
    buyerId: collectible==null ?999:store.userId,
    transactionId: null, // 显式设置为null
    sellerId: collectible.owner,
    collectibleId: collectible.collectibleId,
    transactionDate: getFormattedDate(), // 显式设置为null
    
    ifReadByBuyer: 0,
    ifReadBySeller: 0,
    };


    if (collectible != null) {
        const response =  await updateCollectibleAPI(collectible.collectibleId, collectible);
        if (response.code === 200) {
         // 更新成功
         alert("Collectible updated successfully!");
        //console.log('Collectible updated successfully:', response.data);

            
        

    if(collectible!=null){
  addTransaction(transactionData1)
    .then((responseMessage) => {
        if (responseMessage.code === 200) {
            console.log('交易添加成功:', responseMessage.data);
            console.log(getFormattedDate());
            // 处理成功逻辑
        } else {
            console.error('交易添加失败:', responseMessage.message);
            // 处理失败逻辑
        }
    })
    .catch((error) => {
        console.error('请求过程中发生错误:', error);
        // 处理请求错误逻辑
    });
    }

        } else {
         // 更新失败
         alert("Failed to update collectible!");
        //console.error('Failed to update collectible:', response.message);
        }  
         }
    
    isEditing.value = false;
    fetchCollectibles();
}

async function handleEditConfirm(collectible: DigitalCollectible | null): Promise<void> {
    if (collectible != null) {
        await updateCollectibleAPI(collectible.collectibleId, collectible);
    }
    isEditing.value = false;
    fetchCollectibles();
}


function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
 
const localDateString = `DateIS${year}-${month}-${day}TimeIS${hours}:${minutes}:${seconds}`;
  return localDateString;
}
</script>

<style scoped>
/* 样式代码 */
</style>
