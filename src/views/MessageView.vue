<template>
    <div>
        <div class="user-layout">
            <<div class="user-layout">
                <p> User ID: {{ store.userId }}</p>
            <!-- <ul>
                <p>User ID: {{ store.userId }}</p>
            <label>UserId-Name_Price lists</label>
            <li v-for="item in collectibles" :key="item.collectibleId">
                {{ item.collectibleId }} - {{ item.name }} - {{ item.price }}
                <button @click="handleEditCollectible(item)">购买</button>
            </li>
            </ul> -->
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@/pojo/User';
import { DigitalCollectible } from "@/pojo/DigitalCollectible";
import { ref, onMounted, type Ref } from 'vue';
import { createUserAPI, deleteUserAPI, getAllUsersAPI, getUserByIdAPI, updateUserAPI } from '@/api';
import { store } from '@/store'; 





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
