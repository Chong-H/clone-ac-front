<template>
    <div>
        <!-- 用户表单 -->
        <form @submit.prevent="submitUser">
            <input v-model="user.username" placeholder="用户名" required />
            <input v-model="user.email" type="email" placeholder="邮箱" required />
            <input v-model="user.passwordHash" type="password" placeholder="密码" required />
            <button type="submit">提交</button>
        </form>
        <!-- 用户列表 -->
        <ul>
            <li v-for="user in users" :key="user.userId">
               {{ user.userId }} - {{ user.username }} - {{ user.email }}
               <button @click="editUser(user)">编辑</button>
               <button @click="deleteUser(user.userId)">删除</button>
            </li>
        </ul>
        <!-- 编辑表单 -->
        <div v-if="isEditing">
            <h2>编辑用户</h2>
            <form @submit.prevent="updateUserView">
                <input v-model="currentUser.username" placeholder="用户名" required />
                <input v-model="currentUser.email" type="email" placeholder="邮箱" required />
                <input v-model="currentUser.passwordHash" type="password" placeholder="密码" required />
                <button type="submit">更新</button>
                <button type="button" @click="cancelEdit">取消</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { User } from '@/pojo/User';
import { defineComponent, ref, onMounted, type Ref } from 'vue';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/api';

export default defineComponent({
    name: 'UserView',
    setup() {
        const users: Ref<User[]> = ref([] as User[]);
        const user: Ref<User> = ref({ username: '', email: '', passwordHash: '' } as User);
        const isEditing = ref(false);
        const currentUser: Ref<User> = ref({} as User);

        const fetchUsers = async (): Promise<void> => {
            users.value = (await getAllUsers()).data;
            console.log("A user is fetched: ", users.value[0]);
        };

        const submitUser = async (): Promise<void> => {
            await createUser(user.value);
            fetchUsers();
        };

        const editUser = (user: User) => {
            isEditing.value = true;
            currentUser.value = { ...user };
        };

        const updateUserView = async (): Promise<void> => {
            await updateUser(currentUser.value.userId, currentUser.value);
            isEditing.value = false;
            fetchUsers();
        };

        const deleteUserView = async (userId: number): Promise<void> => {
            await deleteUser(userId);
            fetchUsers();
        };

        const cancelEdit = () => {
            isEditing.value = false;
            currentUser.value = {} as User;
        };

        onMounted(fetchUsers);

        return { users, user, submitUser, fetchUsers, isEditing, currentUser, editUser, updateUserView, deleteUser: deleteUserView, cancelEdit };
    }
});
</script>

<style scoped></style>
