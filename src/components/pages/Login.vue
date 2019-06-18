<template>
    <div class="login">
        <div class="login_ico">
            <img src="~Img/icon.png"/>
        </div>
        <div class="phone_box">
            <router-link tag="div" to="/login1" class="phone_login">
                手机号登录
            </router-link>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    background: #db2c1f;
    position: relative;
    overflow: hidden;
    flex: 1;
    .login_ico{
        width: 100%;
        height:2rem;
        img{
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            margin-top: 1.5rem;

        }
    }
    .phone_box{
        width: 2.6rem;
        margin: 0 auto;
       .phone_login{
        width: 2.6rem;
        height: 0.5rem;
        border-radius: 0.2rem;
        background: #fff;
        font-size: 0.15rem;
        color: #ff1818;
        text-align: center;
        line-height: 0.5rem;
        bottom: 1.3rem;
        font-weight: bold;
        display: inline-block;
        }
    }
}
</style>

