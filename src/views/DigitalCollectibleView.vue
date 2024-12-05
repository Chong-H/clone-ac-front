<template>
    <div>
        <!-- 数字收藏品表单 -->
        <form @submit.prevent="handleSubmitCollectible">
            <input v-model="collectible.owner.userId" type="number" placeholder="所有者ID" required />
            <input v-model="collectible.name" placeholder="名称" required />
            <input v-model="collectible.description" placeholder="描述" required />
            <input v-model="collectible.price" type="number" placeholder="价格" required />
            <input v-model="collectible.status" placeholder="状态" required />
            <input v-model="collectible.verificationStatus" placeholder="验证状态" required />
            <button type="submit">提交</button>
        </form>
        <!-- 数字收藏品列表 -->
        <ul>
            <li v-for="item in collectibles" :key="item.collectibleId">
                {{ item.collectibleId }} - {{ item.name }} - {{ item.price }}
                <button @click="handleEditCollectible(item)">编辑</button>
                <button @click="handleDeleteCollectible(item.collectibleId)">删除</button>
            </li>
        </ul>
        <!-- 编辑表单 -->
        <div v-if="isEditing">
            <h2>编辑数字收藏品</h2>
            <form @submit.prevent="handleUpdateCollectible">
                <input v-model="currentCollectible.owner.userId" type="number" placeholder="所有者ID" required />
                <input v-model="currentCollectible.name" placeholder="名称" required />
                <input v-model="currentCollectible.description" placeholder="描述" required />
                <input v-model="currentCollectible.price" type="number" placeholder="价格" required />
                <input v-model="currentCollectible.status" placeholder="状态" required />
                <input v-model="currentCollectible.verificationStatus" placeholder="验证状态" required />
                <button type="submit">更新</button>
                <button type="button" @click="handleCancelEdit">取消</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { ref, onMounted, type Ref } from 'vue';
import { createCollectibleAPI, deleteCollectibleAPI, getAllCollectiblesAPI, updateCollectibleAPI } from '@/api';

const collectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);
const collectible: Ref<DigitalCollectible> = ref({
    owner: { userId: 0 },
    name: '',
    description: '',
    price: 0,
    status: '',
    verificationStatus: ''
} as DigitalCollectible);
const isEditing = ref(false);
const currentCollectible: Ref<DigitalCollectible> = ref({} as DigitalCollectible);

const fetchCollectibles = async (): Promise<void> => {
    collectibles.value = (await getAllCollectiblesAPI()).data;
    console.log("A collectible is fetched: ", collectibles.value[0]);
};

const handleSubmitCollectible = async (): Promise<void> => {
    await createCollectibleAPI(collectible.value);
    fetchCollectibles();
};

const handleEditCollectible = (item: DigitalCollectible) => {
    isEditing.value = true;
    currentCollectible.value = { ...item };
};

const handleUpdateCollectible = async (): Promise<void> => {
    await updateCollectibleAPI(currentCollectible.value.collectibleId, currentCollectible.value);
    isEditing.value = false;
    fetchCollectibles();
};

const handleDeleteCollectible = async (id: number): Promise<void> => {
    await deleteCollectibleAPI(id);
    fetchCollectibles();
};

const handleCancelEdit = () => {
    isEditing.value = false;
    currentCollectible.value = {} as DigitalCollectible;
};

onMounted(fetchCollectibles);
</script>

<style scoped>
/* 样式代码 */
</style>
