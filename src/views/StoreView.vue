<template>
    <div>
        <div class="user-layout">
            <ul>
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
            <CollectibleToCustomer :key="currentCollectible.collectibleId" :collectible="currentCollectible"/>
        </div>

        
        
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { ref, onMounted, type Ref } from 'vue';
import { createCollectibleAPI, deleteCollectibleAPI, getAllCollectiblesAPI, updateCollectibleAPI } from '@/api';
import DigitalCollectibleForm from '@/components/DigitalCollectibleForm.vue';
import CollectibleToCustomer from '@/components/CollectibleToCustomer.vue';

const userCollectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);
// 初始化
const fetchCollectibles = async (): Promise<void> => {
    collectibles.value = (await getAllCollectiblesAPI()).data;
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

async function handleChangeStatus(collectible: DigitalCollectible): Promise<void> {
    // let status: string;
    // if (collectible.status === DigitalCollectibleStatus.ACTIVE) {
    //     status = DigitalCollectibleStatus.INACTIVE;
    // } else {
    //     status = DigitalCollectibleStatus.ACTIVE;
    // }
    // await updateCollectibleStatusAPI(collectible.collectibleId, status);
    // let res = await getUserByIdAPI(user.value.userId);
    // user.value = res.data;
}

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
