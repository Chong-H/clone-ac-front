<template>
    <div class="login-container">
        

        
                <p>User ID: {{ store.userId }}</p>
                <!-- <button @click="updateUserId">Update User ID</button> -->
            <label>This is My Home</label>
            <label>下面是你自己的藏品</label>

       
        <div class="cards-wrapper">
            <CollectibleToOwner v-for="collectible in userCollectibles" :key="collectible.collectibleId"
                :collectible="collectible" @change-status="handleChangeStatus" @send="handleSend" @smash="handleSmash"
                @input-change="handleInputChange" />
        </div>

        <form>
            <button type="button" @click="Market">Go to Market</button>
        </form> 

        
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
import { addTransaction, createCollectibleAPI, deleteCollectibleAPI, getAllCollectiblesAPI, updateCollectibleAPI } from '@/api';
import { useRouter } from 'vue-router';

// 在 setup 中声明 router
const router = useRouter();
import { ref as vueRef } from 'vue';
const myComponentRef = ref(null);
const init: Ref<boolean> = ref(true);
const userLoginDto: Ref<UserLoginDto> = ref({ email: '', password: '' } as UserLoginDto);
const user: Ref<User> = ref({} as User);
const userCollectibles: Ref<DigitalCollectible[]> = ref([] as DigitalCollectible[]);

const recipientId = ref(0);
const handleInputChange = (value: string) => {
    recipientId.value = parseInt(value, 10);
};

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
    try {
        await userLoginAPI(userLoginDto.value);
    } catch (error) {
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
        router.push('/user-view');
    } else if (user.value == -1) {
        alert("Login failed!");
    }
    //alert("Login failed!");
};

async function handleSignup(): Promise<void> {
    router.push('/sign');
}


async function handleLogout(): Promise<void> {
    await logoutAPI();
    store.userId = -1;
    user.value = {} as User;
    userCollectibles.value = [];
}

async function Market(): Promise<void> {
    // 跳转到指定的 URL
    window.location.href = 'http://localhost:5173/Store';
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

    // if (inputElementRef.value) {
    // const numberValue = parseInt(inputElementRef.value.value, 10); // 获取值并转换为整数
    // console.log(numberValue); // 打印转换后的数值
    collectible.owner = recipientId.value;

    const date = new Date();
    const localDateString = date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    console.log(localDateString);
    if (collectible != null) {
        const response = await updateCollectibleAPI(collectible.collectibleId, collectible);
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
    //transaction

    const transactionData1 = {
        buyerId: collectible == null ? 999 : recipientId.value,
        transactionId: null, // 显式设置为null
        sellerId: store.userId,
        collectibleId: collectible.collectibleId,
        transactionDate: getFormattedDate(), // 显式设置为null
        ifReadByBuyer: 0,
        ifReadBySeller: 0,
    };

    if (collectible != null) {
        addTransaction(transactionData1)
            .then((responseMessage) => {
                if (responseMessage.code === 200) {
                    console.log('交易添加成功:', responseMessage.data);
                    console.log(localDateString);
                    // 处理成功逻辑
                } else {
                    console.error('交易添加失败:', responseMessage.message);
                    // 处理失败逻辑
                }
            })
            .catch((error) => {
                console.error('请求过程中发生错误:', error);
                // 处理请求错误逻辑
            });
    }

}



handleSmash

async function handleSmash(collectible: DigitalCollectible): Promise<void> {


    //transaction
    const transactionData1 = {
        buyerId: collectible == null ? 999 : -1,
        transactionId: null, // 显式设置为null
        sellerId: store.userId,
        collectibleId: collectible.collectibleId,
        transactionDate: getFormattedDate(), // 显式设置为null
        ifReadByBuyer: 0,
        ifReadBySeller: 0,
    };

    if (collectible != null) {
        addTransaction(transactionData1)
            .then((responseMessage) => {
                if (responseMessage.code === 200) {
                    console.log('交易添加成功:', responseMessage.data);
                    // 处理成功逻辑
                } else {
                    console.error('交易添加失败:', responseMessage.message);
                    // 处理失败逻辑
                }
            })
            .catch((error) => {
                console.error('请求过程中发生错误:', error);
                // 处理请求错误逻辑
            });
    }

    //
    if (collectible != null) {
        const response = await deleteCollectibleAPI(collectible.collectibleId);

        alert("smash successfully!");

    }



}

function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const localDateString = `DateIS${year}-${month}-${day}TimeIS${hours}:${minutes}:${seconds}`; return localDateString;
}
</script>




<style scoped>

.user-layout {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
}

/* @media (min-width: 768px) {
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
} */
</style>