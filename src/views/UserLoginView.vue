<template>
    <div class="login-container">
        <div class="login-card">
            <div class="avatar-container">
                <img src="@/assets/logo.webp" alt="Logo" class="avatar">
            </div>
            <h2 class="welcome-text">Welcome Back!</h2>

            <!-- 登录表单需要改进的部分 -->
            <form v-if="!init" class="login-form">
                <div class="input-group">
                    <input type="email" id="email" v-model="userLoginDto.email" placeholder="Email"
                        class="input-field" />
                </div>
                <div class="input-group">
                    <input type="password" id="password" v-model="userLoginDto.password" placeholder="Password"
                        class="input-field" />
                </div>
                <div class="button-group">
                    <button type="button" @click="handleLogin" class="login-button">In</button>
                    <button type="button" @click="handleLogout" class="signup-button">Out</button>
                    <button type="button" @click="handleSignup" class="signup-button">Sign</button>
                </div>
            </form>

            <!-- 其他链接应该放在卡片内部 -->
            <div class="additional-links">
                <a href="/about">About Us</a>
                <a href="/user-view">Admin</a>
            </div>
        </div>

       
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
        router.push('/MyHome');
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
    alert("log out success");
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
/* 登录页面容器 - 铺满整个视口，使用粉色渐变背景 */
.login-container {
    min-height: 100vh;
    width: 100vw;
    /* 改为视口宽度 */
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ffa7d1, #ff8da1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    /* 防止水平滚动 */
}

/* 登录卡片 - 白色背景，圆角，阴影 */
.login-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    /* 圆角 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    width: 100%;
    max-width: 400px;
    /* 最大宽度 */
    text-align: center;
    /* 内容居中 */
}

/* 头像容器 */
.avatar-container {
    margin-bottom: 20px;
}

/* 头像图片 - 圆形 */
.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    /* 圆形 */
    border: 3px solid #ffa7d1;
    /* 粉色边框 */
}

/* 欢迎文字 */
.welcome-text {
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
}

/* 输入框组 */
.input-group {
    margin-bottom: 20px;
}

/* 输入框样式 */
.input-field {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 25px;
    /* 圆角输入框 */
    font-size: 16px;
    transition: border-color 0.3s;
    /* 过渡效果 */
}

/* 输入框焦点效果 */
.input-field:focus {
    outline: none;
    border-color: #ffa7d1;
    box-shadow: 0 0 5px rgba(255, 167, 209, 0.3);
}

/* 登录按钮 */
.login-button {
    width: 30%;
    padding: 12px;
    background: linear-gradient(135deg, #ffa7d1, #ff8da1);
    border: none;
    border-radius: 25px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s;
    /* 过渡效果 */
}

/* 按钮悬停效果 */
.login-button:hover {
    transform: translateY(-2px);
    /* 轻微上浮 */
}

/* 额外链接样式 */
.additional-links {
    margin-top: 20px;
}

.additional-links a {
    color: #666;
    text-decoration: none;
    margin: 0 10px;
    font-size: 14px;
    transition: color 0.3s;
}

.additional-links a:hover {
    color: #ffa7d1;
}

/* 登录表单样式 */
.login-form {
    width: 100%;
    padding: 20px;
}

.input-group {
    margin-bottom: 20px;
    text-align: left;
}

.input-field {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 16px;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
}

.input-field:focus {
    outline: none;
    border-color: #ffa7d1;
    box-shadow: 0 0 5px rgba(255, 167, 209, 0.3);
}

.button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.login-button,
.logout-button {
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-button {
    background: linear-gradient(135deg, #ffa7d1, #ff8da1);
    color: white;
}

.logout-button {
    background: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
}

.login-button:hover,
.logout-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 额外链接样式优化 */
.additional-links {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.additional-links a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
}

.additional-links a:hover {
    color: #ffa7d1;
}


.signup-button {
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
}

/* 欢迎文字样式优化 */
.welcome-text {
    color: #333;
    margin: 20px 0;
    font-size: 24px;
    font-weight: 500;
}
</style>