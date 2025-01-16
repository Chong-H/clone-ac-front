<template>
    <div class="wrapper">
        <form>
            <label>owner id</label>
            <input v-model="currentCollectibleCreate.owner" type="number" placeholder="所有者ID" required />
            <label>name</label>
            <input v-model="currentCollectibleCreate.name" placeholder="名称" required />
            <label>description描述</label>
            <input v-model="currentCollectibleCreate.description" placeholder="描述" required />
            <label>price价格</label>
            <input v-model="currentCollectibleCreate.price" type="number" placeholder="价格" required />
            <label>status状态(上架商城/不上架)</label>
            <input v-model="currentCollectibleCreate.status" placeholder="状态" required />
            <label>验证状态</label>
            <input v-model="currentCollectibleCreate.verificationStatus" placeholder="验证状态" required />
            <button type="button" @click="handleEdit(false)">{{ confirmButtonText }}</button>
            <button type="button" @click="handleEdit(true)">取消</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { ref, type Ref } from 'vue';

const emit = defineEmits<{
    (event: 'confirm', collectible: DigitalCollectible | null,): void,
}>();

interface Props {
    collectible: DigitalCollectible,
    confirmButtonText?: string,
}

const {
    collectible,
    confirmButtonText = '确认',
} = defineProps<Props>();

const currentCollectibleCreate: Ref<DigitalCollectible> = ref(collectible);

function handleEdit(is_cancel: boolean): void {
    if (is_cancel) {
        emit('confirm', null);
    } else {
        emit('confirm', currentCollectibleCreate.value);
    }
}

</script>

<style scoped></style>