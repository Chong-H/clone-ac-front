<template>
    <div>
        <div class="user-layout">
            <!-- 用户表单 -->
            <form @submit.prevent="handleSubmitUser" class="user-form">
                <label>register sector/注册页面</label>
                <input v-model="user.username" placeholder="用户名" required />

                <input v-model="user.email" type="email" placeholder="邮箱" required />
                
                <input v-model="user.passwordHash" type="password" placeholder="密码" required />
                
                <button type="submit">提交</button>
            </form>

        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@/pojo/User';
import { DigitalCollectible } from "@/pojo/DigitalCollectible";
import { ref, onMounted, type Ref } from 'vue';
import { createUserAPI, deleteUserAPI, getAllUsersAPI, getUserByIdAPI, updateUserAPI } from '@/api';

const users: Ref<User[]> = ref([] as User[]);
const user: Ref<User> = ref({ username: '', email: '', passwordHash: '' } as User);
const isEditing = ref(false);
const currentUser: Ref<User> = ref({} as User);

const userId: Ref<number> = ref(0);
const userCollectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);

const fetchUsers = async (): Promise<void> => {
    users.value = (await getAllUsersAPI()).data;
    console.log("A user is fetched: ", users.value[0]);
};

const handleSubmitUser = async (): Promise<void> => {
    try {
        alert("success");
        await createUserAPI(user.value);
        
    } catch (error) {
        //alert("falled");
        alert("falled,exist same account/邮箱");
    }
    
    fetchUsers();
    
};


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
