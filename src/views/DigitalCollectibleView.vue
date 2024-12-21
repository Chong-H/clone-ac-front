<template>
    <div>
        <!-- 数字收藏品表单 -->
        <div>
            <h2>添加/发行数字收藏品</h2>
            <DigitalCollectibleForm :key="collectible.collectibleId" :collectible="collectible" confirm-button-text="添加"
                @confirm="handleCreateConfirm" />
        </div>
        <!-- 数字收藏品列表 -->
        <ul>
            <label>UserId-Name_Price lists</label>
            <li v-for="item in collectibles" :key="item.collectibleId">
                {{ item.collectibleId }} - {{ item.name }} - {{ item.price }}
                <button @click="handleEditCollectible(item)">编辑</button>
                <button @click="handleDeleteCollectible(item.collectibleId)">删除</button>
            </li>
        </ul>
        <!-- 编辑表单 -->
        <div v-if="isEditing">
            <h2>编辑数字收藏品</h2>
            <DigitalCollectibleForm :key="currentCollectible.collectibleId" :collectible="currentCollectible"
                confirm-button-text="更新" @confirm="handleEditConfirm" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { ref, onMounted, type Ref } from 'vue';
import { createCollectibleAPI, deleteCollectibleAPI, getAllCollectiblesAPI, updateCollectibleAPI } from '@/api';
import DigitalCollectibleForm from '@/components/DigitalCollectibleForm.vue';
import { addTransaction } from '@/api';
import { TransactionDto } from '@/pojo/dto/TransactionDto';
import { store } from '@/store'; 



// 初始化
const fetchCollectibles = async (): Promise<void> => {
    collectibles.value = (await getAllCollectiblesAPI()).data;
    console.log("A collectible is fetched: ", collectibles.value[0]);
};
onMounted(fetchCollectibles);


const collectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);
const collectible: Ref<DigitalCollectible> = ref(new DigitalCollectible);
async function handleCreateConfirm(collectible: DigitalCollectible | null): Promise<void> {
    if (collectible == null) {
        return;
    }

    //await createCollectibleAPI(collectible); //true
//????????????????????????????????????????????????????????????????????????
    
    let intValue     =(await  createCollectibleAPI(collectible)).data.collectibleId;




const transactionData1 = {
    buyerId: collectible==null ?999:collectible.owner,
    transactionId: null, // 显式设置为null
    sellerId: -1,
    collectibleId: intValue,
    transactionDate: null, // 显式设置为null
    ifReadByBuyer: 0,
    ifReadBySeller: 0,
    };

    if(collectible!=null){
  addTransaction(transactionData1)
    .then((responseMessage) => {
        if (responseMessage.code === 200) {
            console.log('交易添加成功:', responseMessage.data);
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







//
    collectible = new DigitalCollectible();

    fetchCollectibles();

    
    
    
};



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

async function handleEditConfirm(collectible: DigitalCollectible | null): Promise<void> {
    if (collectible != null) {
        await updateCollectibleAPI(collectible.collectibleId, collectible);
    }
    isEditing.value = false;
    fetchCollectibles();
}
</script>

<style scoped>
/* 样式代码 */
</style>
