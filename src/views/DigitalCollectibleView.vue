<template>
    <div>
        <!-- 数字收藏品表单 -->
        <form @submit.prevent="handleSubmitCollectible">
            <input v-model="collectibleCreate.owner.userId" type="number" placeholder="所有者ID" required />
            <input v-model="collectibleCreate.name" placeholder="名称" required />
            <input v-model="collectibleCreate.description" placeholder="描述" required />
            <input v-model="collectibleCreate.price" type="number" placeholder="价格" required />
            <input v-model="collectibleCreate.status" placeholder="状态" required />
            <input v-model="collectibleCreate.verificationStatus" placeholder="验证状态" required />
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
                <input v-model="currentCollectibleCreate.owner.userId" type="number" placeholder="所有者ID" required />
                <input v-model="currentCollectibleCreate.name" placeholder="名称" required />
                <input v-model="currentCollectibleCreate.description" placeholder="描述" required />
                <input v-model="currentCollectibleCreate.price" type="number" placeholder="价格" required />
                <input v-model="currentCollectibleCreate.status" placeholder="状态" required />
                <input v-model="currentCollectibleCreate.verificationStatus" placeholder="验证状态" required />
                <button type="submit" @click="handleEdit(false)">更新</button>
                <button type="button" @click="handleEdit(true)">取消</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectibleCreate, Owner } from '@/pojo/DigitalCollectibleCreate';
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { ref, onMounted, type Ref } from 'vue';
import { createCollectibleAPI, deleteCollectibleAPI, getAllCollectiblesAPI, updateCollectibleAPI } from '@/api';
import type { User } from '@/pojo/User';

const collectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);
const collectibleCreate: Ref<DigitalCollectibleCreate> = ref(new DigitalCollectibleCreate);
const isEditing = ref(false);
const currentCollectibleCreate: Ref<DigitalCollectibleCreate> = ref(new DigitalCollectibleCreate());

const fetchCollectibles = async (): Promise<void> => {
    collectibles.value = (await getAllCollectiblesAPI()).data;
    console.log("A collectible is fetched: ", collectibles.value[0]);
};

const handleSubmitCollectible = async (): Promise<void> => {
    await createCollectibleAPI(collectibleCreate.value);
    fetchCollectibles();
};

const handleEditCollectible = (item: DigitalCollectible) => {
    isEditing.value = true;
    currentCollectibleCreate.value = { ...item, owner: { userId: item.owner } };
};

const handleUpdateCollectible = async (): Promise<void> => {
    await updateCollectibleAPI(currentCollectibleCreate.value.collectibleId, currentCollectibleCreate.value);
    isEditing.value = false;
    fetchCollectibles();
};

const handleDeleteCollectible = async (id: number): Promise<void> => {
    await deleteCollectibleAPI(id);
    fetchCollectibles();
};

const handleEdit = async (is_cancel: boolean) => {
    if (!is_cancel) {
        let response: DigitalCollectible | null = (await updateCollectibleAPI(currentCollectibleCreate.value.collectibleId, currentCollectibleCreate.value)).data;
        if (response != null) {
            alert("Collectible is updated!");
            console.log("Collectible is updated: ", response);
        } else {
            alert("Collectible is not updated!");
        }
    }

    isEditing.value = false;
    currentCollectibleCreate.value = new DigitalCollectibleCreate();
};

onMounted(fetchCollectibles);
</script>

<style scoped>
/* 样式代码 */
</style>
