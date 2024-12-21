<template>
    <div>
        <div class="user-layout">
            <!-- 用户表单
            <form @submit.prevent="handleSubmitUser" class="user-form">
                <label>register sector/注册页面</label>
                <input v-model="user.username" placeholder="用户名" required />

                <input v-model="user.email" type="email" placeholder="邮箱" required />
                
                <input v-model="user.passwordHash" type="password" placeholder="密码" required />
                
                <button type="submit">提交</button>
            </form> -->

            <!-- 查询用户拥有的藏品 -->
            <form @submit.prevent="handleQueryUserCollectibles" class="query-form">
                <label>数字藏品查询页面</label>
                <label>请输入查询帐号id</label>
                <input v-model="userId" type="number" placeholder="用户ID" required />
                <button type="submit">查询</button>
            </form>
            <!-- 藏品列表 -->
            <ul class="collectibles-list">
                <label>藏品展示</label>
                <li v-for="item in userCollectibles" :key="item.collectibleId">
                    {{ item.collectibleId }} - {{ item.name }} - {{ item.price }}
                </li>
            </ul>
            <!-- 用户列表 -->
            <ul class="users-list">
                <label>账号管理:用户id-名字-邮箱</label>
                <li v-for="user in users" :key="user.userId">
                    {{ user.userId }} - {{ user.username }} - {{ user.email }}
                    <button @click="handleEditUser(user)">编辑</button>
                    <button @click="handleDeleteUser(user.userId)">删除</button>
                </li>
                
            </ul>
            <!-- 编辑表单 -->
            <div v-if="isEditing" class="edit-form">
                <h2>编辑用户</h2>
                <form @submit.prevent="handleUpdateUser">
                    <label>用户名:</label>
                    <input v-model="currentUser.username" placeholder="用户名" required />
                    <label>邮箱:</label>
                    <input v-model="currentUser.email" type="email" placeholder="邮箱" required />
                    <label>密码:</label>
                    <input v-model="currentUser.passwordHash" type="password" placeholder="密码" required />
                    <button type="submit">更新</button>
                    <button type="button" @click="handleCancelEdit">取消</button>
                </form>
            </div>
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

// const handleSubmitUser = async (): Promise<void> => {
//     await createUserAPI(user.value);
//     fetchUsers();
// };

const handleEditUser = (user: User) => {
    isEditing.value = true;
    currentUser.value = { ...user };
};

const handleUpdateUser = async (): Promise<void> => {
    await updateUserAPI(currentUser.value.userId, currentUser.value);
    isEditing.value = false;
    fetchUsers();
};

const handleDeleteUser = async (userId: number): Promise<void> => {
    await deleteUserAPI(userId);
    fetchUsers();
};

const handleCancelEdit = () => {
    isEditing.value = false;
    currentUser.value = {} as User;
};

const handleQueryUserCollectibles = async (): Promise<void> => {
    const user: User = (await getUserByIdAPI(userId.value)).data as User;
    userCollectibles.value=[];
    userCollectibles.value = [...user.collectibles];
    if(userCollectibles.value==null){ }//
};

onMounted(fetchUsers);
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
