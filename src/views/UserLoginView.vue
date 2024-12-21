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
            :collectible="collectible" @change-status="handleChangeStatus" @send="handleSend" @smash="handleSmash" />
    </div>

    <form>
        <button type="button" @click="Market">Go to Market</button>
    </form>
    <form v-if="!init">
        <div>
            <label >Still Have No Account? </label>
        <a href="/Sign" class="button-style">Sign a Account</a>

        <label>About Us</label>
        <a href="/about" class="button-style">Go to About</a>

        <label>Admin?</label>
        <a href="/user-view" class="button-style">Go to Admin Page</a>
    </div>
         
    </form>
    

   

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
import { createCollectibleAPI, deleteCollectibleAPI, getAllCollectiblesAPI, updateCollectibleAPI } from '@/api';



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
        return;
    }
    //if (Response.status === 200) {
    let id = (await getSessionUserAPI()).data;
    user.value = (await getUserByIdAPI(id)).data;


    

    if (user.value != null) {
        alert("Login successfully!");
        userCollectibles.value = user.value.collectibles;
        store.userId = user.value.userId;
        // 跳转到指定的 URL
        //window.location.href = 'http://localhost:5173/Store';
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

async function Market(): Promise<void> {
    // 跳转到指定的 URL
    window.location.href ='http://localhost:5173/Store';
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


async function handleSend(collectible: DigitalCollectible): Promise<void> {
    const inputElement = document.getElementById('myNumber') as HTMLInputElement;
    const numberValue = parseInt(inputElement.value, 10); // 正确获取 value 并转换为整数
    console.log(numberValue);

    collectible.owner=numberValue;
    if (collectible != null) {
        const response =  await updateCollectibleAPI(collectible.collectibleId, collectible);
        if (response.code === 200) {
         // 更新成功
         alert("send successfully!");
        //console.log('Collectible updated successfully:', response.data);
        } else {
         // 更新失败
         alert("Failed to send!");
        //console.error('Failed to update collectible:', response.message);
        }  
         }
    
    
         
    // await updateCollectibleStatusAPI(collectible.collectibleId, status);
    // let res = await getUserByIdAPI(user.value.userId);
    // user.value = res.data;
}
handleSmash

async function handleSmash(collectible: DigitalCollectible): Promise<void> {

    if (collectible != null) {
        const response =  await deleteCollectibleAPI(collectible.collectibleId);
      
         alert("smash successfully!");
        
         }
    
}

</script>

<style scoped>
.cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}
</style>