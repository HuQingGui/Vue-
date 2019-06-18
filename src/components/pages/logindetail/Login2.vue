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
        <div class="login_input">
            <input v-model="password" type="text" placeholder="请输入密码"/>
            <a href="">忘记密码?</a>
        </div>
        <div class="btn" @click="_loginTo">确定</div>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import loginTo from 'Api/login'
export default {
    data(){
        return {
            password : ''
        }
    },
    methods: {
        ...mapActions(['getPassword']),
        goBack(){
            this.$router.go(-1)
        },
        _loginTo(){
            this.getPassword(this.password)
            loginTo(this.getMembers,this.getPasswords).then(res => {
                if (res.data.code == 200) {
                    let data = res.data
                    Cookies.set('wangyiId',data.profile.userId)
                    this.$router.push('/mine')
                    }else if(res.data.code == 502){
                        console.log('密码错误')
                    }else if(res.data.code == 400){
                        console.log('请输入正确格式账号或密码')
                    }
            })
        }
        
    },
    computed : {
        ...mapGetters( ['getPasswords'] ),
        ...mapGetters( ['getMembers'] )
    },
    mounted(){
        if(!this.getMembers){
            alert('请输入账号')
            this.$router.go(-1)
        }
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
    .login_input{
        width: 90%;
        height: 0.44rem;
        border-bottom: 0.02rem solid #ccc;
        margin: 0.4rem auto;
        display: flex;
        position: relative;
        input{
            height: 100%;
            height: 0.42rem;
            border: 0;
            outline: 0;
            width: 70%;
        }
        a{
            position: absolute;
            right: 0;
            font-size: 0.14rem;
            text-decoration: none;
            height: 0.44rem;
            line-height: 0.44rem;
        }
    }
    .btn{
        width: 90%;
        height: 0.44rem;
        background: #ff3a3a;
        text-align: center;
        line-height: 0.44rem;
        margin: 0 auto;
        border-radius: 0.2rem;
        font-size: 0.18rem;
        color: #fff;
    }
}
</style>

