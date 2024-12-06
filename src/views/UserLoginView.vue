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

    <li v-for="collectible in userCollectibles" :key="collectible.collectibleId">
        {{ collectible.collectibleId }} - {{ collectible.name }} - {{ collectible.description }} - {{ collectible.price
        }} - {{ collectible.status }} - {{ collectible.verificationStatus }}
    </li>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { UserLoginDto } from '@/pojo/dto/UserLoginDto';
import { User } from '@/pojo/User';
import { userLoginAPI } from '@/api';
import type { DigitalCollectible } from '@/pojo/DigitalCollectible';

const userLoginDto: Ref<UserLoginDto> = ref({ email: '', password: '' } as UserLoginDto);
const user: Ref<User> = ref({} as User);
const userCollectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);

const handleLogin = async (): Promise<void> => {
    console.log("User login: ", userLoginDto.value);
    user.value = (await userLoginAPI(userLoginDto.value)).data;

    if (user.value != null) {
        alert("Login successfully!");
        userCollectibles.value = user.value.collectibles;
    } else {
        alert("Login failed!");
    }
};

</script>

<style scoped></style>