<script setup>
  import LogInForm from '../components/LogInForm.vue';
  (function (){
    localStorage.clear();
  })()

</script>

<template>
  
  <div class="main_div_login_view">

    <header>
      <img src="../assets/images/login_hero.svg" alt="Medicos">
      <h1>Te damos la bienvenida a médico en casa</h1>
    </header>

    <main class="main_login_form_container">
             
      <LogInForm/>
      <div class="footer_msg"><span>si no estas registrado por favor contacta tu entidad medica</span></div>
        
        
    </main>
    
  </div>
</template>

<style scoped>


.main_div_login_view {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--green-login-background);
  
  }

  header {
    text-align: center;
    margin: 10px 10px 50px 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;

  }

  .main_login_form_container {
    padding-top: 30px;;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 300px;
  }

  .div_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;

  }

  .login_boxes{
    width: var(--login-input-width);
    height: var(--login-input-height);
    border-radius: var(--login-input-radio);
    background-color: var(--white-login-inputbox-background);
    border: none;
    text-align: center;
  }

  .login_button{
    margin-top: 20px;
    width: 125px;
    height: 32px;
    background-color: var(--white-login-inputbox-background);
    border-radius: 10px;
    border: none;
  }

  .label_style{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  .footer_msg{
    margin-top: 60px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
</style>
