<template>
    <div class="login">
        <div class="head">
            <div class="back" @click="goBack">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="text">
                手机号登录
            </div>
        </div>
        <div class="msg">
            注意:未注册手机号登陆后将自动注册账号
        </div>
        <div class="enter">
            <div class="phone_left">+86</div>
            <input v-model="phone"  type="text" placeholder="请输入手机号">
        </div>
        <div @click="getPhone">
            <div class="next">
                下一步
            </div>   
        </div>
        
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
    data(){
        return{
            phone:''
        }
    },
    created(){
       
    },
    methods: {
        ...mapActions(['getMember']),
        goBack(){
            this.$router.go(-1)
        },
        getPhone(){
            this.getMember(this.phone)
            this.$router.push('/login2')
        }
    },
    computed : {
        ...mapGetters( ['getMembers'] )
    }
}
</script>

<style lang="scss" scoped>
    .login{
        .head{
        width: 90%;
        height: 0.44rem;
        display: flex;
        margin: 0 auto;
        .back{
            width: 0.3rem;
            height: 0.44rem;
            line-height: 0.44rem;
            text-align: center;
            display: flex;
            i{
                font-weight: bold;
            }
        }
        .text{
            font-size: 0.16rem;
            line-height: 0.44rem;
            font-weight: bold;
            }
        }
        width: 100%;
        height: 100%;
        position: relative;
        .msg{
            height: 1rem;
            width: 90%;
            font-size: 0.15rem;
            color: #dcdcdc;
            line-height: 1rem;
            margin: 0 auto;
        }
        .enter{
            width: 90%;
            margin: 0 auto;
            border-bottom: 0.02rem solid #e4e4e4;
            height: 0.4rem;
            line-height: 0.4rem;
            display: flex;
            .phone_left{
                width: 0.4rem;
                height: 0.4rem;
                font-size: 0.18rem;
                line-height: 0.4rem;
            }
            input{
                width: 100%;
                outline: 0;
                height: 0.38rem;
                display: block;
                line-height: 0.4rem;;
                border: 0;
                font-size: 0.18rem; 
                font-family: "Microsoft soft";
                caret-color:red;//光标颜色
                text-indent: 0.1rem;
            }

        }
        .next{
            width: 80%;
            height: 0.44rem;
            background: #ff3a3a;
            color: #fff;
            text-align: center;
            line-height: 0.44rem;
            border-radius: 0.2rem;
            font-size: 0.2rem;
            margin: 0 auto;
            position: absolute;
            bottom: 1rem;
            left: 50%;
            margin-left: -40%;
        }
    }
</style>

