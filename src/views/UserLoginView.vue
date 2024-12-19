<template>
    <h2> UserId : {{ user.userId }}</h2>

    <form v-if="!init">
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="userLoginDto.email" />
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="userLoginDto.password" />
        </div>
        <button type="button" @click="handleLogin">Login</button>
        <button type="button" @click="handleLogout">Logout</button>
    </form>

    <div class="cards-wrapper">
        <CollectibleToOwner v-for="collectible in userCollectibles" :key="collectible.collectibleId"
            :collectible="collectible" @change-status="handleChangeStatus" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { UserLoginDto } from '@/pojo/dto/UserLoginDto';
import { User } from '@/pojo/User';
import { userLoginAPI, updateCollectibleStatusAPI, getUserByIdAPI, getSessionUserAPI, logoutAPI } from '@/api';
import { DigitalCollectible } from '@/pojo/DigitalCollectible';
import { DigitalCollectibleStatus } from '@/utils/DigitalCollectibleStatus';
import CollectibleToOwner from '@/components/CollectibleToOwner.vue';
import { store } from '@/store';

const init: Ref<boolean> = ref(true);
const userLoginDto: Ref<UserLoginDto> = ref({ email: '', password: '' } as UserLoginDto);
const user: Ref<User> = ref({} as User);
const userCollectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);

onMounted(async () => {
    if (store.userId != -1) {
        user.value = (await getUserByIdAPI(store.userId)).data;
        userCollectibles.value = user.value.collectibles;
    }
    init.value = false;
});

const handleLogin = async (): Promise<void> => {
    console.log("User login: ", userLoginDto.value);
    //await userLoginAPI(userLoginDto.value);
    try{
        await userLoginAPI(userLoginDto.value);
    }catch (error) {
        console.error("Login error:", error);
        alert("Login failed!");
    }
    //if (Response.status === 200) {
    let id = (await getSessionUserAPI()).data;
    user.value = (await getUserByIdAPI(id)).data;


    

    if (user.value != null) {
        alert("Login successfully!");
        userCollectibles.value = user.value.collectibles;
        store.userId = user.value.userId;
        
    } else if(user.value == -1) {
        alert("Login failed!");
    }
    //alert("Login failed!");
};

async function handleLogout(): Promise<void> {
    await logoutAPI();
    store.userId = -1;
    user.value = {} as User;
    userCollectibles.value = [];
}

async function handleChangeStatus(collectible: DigitalCollectible): Promise<void> {
    let status: string;
    if (collectible.status === DigitalCollectibleStatus.ACTIVE) {
        status = DigitalCollectibleStatus.INACTIVE;
    } else {
        status = DigitalCollectibleStatus.ACTIVE;
    }
    await updateCollectibleStatusAPI(collectible.collectibleId, status);
    let res = await getUserByIdAPI(user.value.userId);
    user.value = res.data;
}

</script>

<style scoped>
.cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}
</style>