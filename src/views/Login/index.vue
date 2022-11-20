<template>
  <div class="page-login">
    <login-header />
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <login-form />
      </div>
    </section>
    <login-footer />
  </div>
</template>
<script>
import LoginHeader from './components/login-header.vue'
import LoginForm from './components/login-form.vue'
import LoginFooter from './components/login-footer.vue'

export default {
  name: 'XtxLogin',
  components: {
    LoginHeader,
    LoginForm,
    LoginFooter
  }
}
</script>
<style scoped lang='less'>
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}
</style>
