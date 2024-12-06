<template>
    <form @submit.prevent="handleLogin">
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="userLoginDto.email" />
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="userLoginDto.password" />
        </div>
        <button type="submit">Login</button>
    </form>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { UserLoginDto } from '@/pojo/dto/UserLoginDto';
import { User } from '@/pojo/User';
import { userLoginAPI } from '@/api';

const userLoginDto: Ref<UserLoginDto> = ref({ email: '', password: '' } as UserLoginDto);
const user: Ref<User> = ref({} as User);

const handleLogin = async (): Promise<void> => {
    console.log("User login: ", userLoginDto.value);
    user.value = (await userLoginAPI(userLoginDto.value)).data;

    if (user.value != null) {
        alert("Login successfully!");
    } else {
        alert("Login failed!");
    }
};

</script>

<style scoped></style>