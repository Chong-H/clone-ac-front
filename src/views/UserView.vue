<template>
    <div>
        <!-- 用户表单 -->
        <form @submit.prevent="handleSubmitUser">
            <input v-model="user.username" placeholder="用户名" required />
            <input v-model="user.email" type="email" placeholder="邮箱" required />
            <input v-model="user.passwordHash" type="password" placeholder="密码" required />
            <button type="submit">提交</button>
        </form>
        <!-- 用户列表 -->
        <ul>
            <li v-for="user in users" :key="user.userId">
                {{ user.userId }} - {{ user.username }} - {{ user.email }}
                <button @click="handleEditUser(user)">编辑</button>
                <button @click="handleDeleteUser(user.userId)">删除</button>
            </li>
        </ul>
        <!-- 编辑表单 -->
        <div v-if="isEditing">
            <h2>编辑用户</h2>
            <form @submit.prevent="handleUpdateUser">
                <input v-model="currentUser.username" placeholder="用户名" required />
                <input v-model="currentUser.email" type="email" placeholder="邮箱" required />
                <input v-model="currentUser.passwordHash" type="password" placeholder="密码" required />
                <button type="submit">更新</button>
                <button type="button" @click="handleCancelEdit">取消</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@/pojo/User';
import { ref, onMounted, type Ref } from 'vue';
import { createUserAPI, deleteUserAPI, getAllUsersAPI, updateUserAPI } from '@/api';

const users: Ref<User[]> = ref([] as User[]);
const user: Ref<User> = ref({ username: '', email: '', passwordHash: '' } as User);
const isEditing = ref(false);
const currentUser: Ref<User> = ref({} as User);

const fetchUsers = async (): Promise<void> => {
    users.value = (await getAllUsersAPI()).data;
    console.log("A user is fetched: ", users.value[0]);
};

const handleSubmitUser = async (): Promise<void> => {
    await createUserAPI(user.value);
    fetchUsers();
};

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

onMounted(fetchUsers);
</script>

<style scoped></style>
