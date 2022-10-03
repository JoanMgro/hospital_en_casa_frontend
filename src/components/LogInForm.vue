<script setup>
    import { ref } from 'vue';
    import axios from 'axios'
    import jwt_decode from 'jwt-decode'
    import router from '../routers/index.js'
    
  

    const loginData = ref({ 
        email: '',
        password: ''
    })
    
    async function logInProcess(){

      

      try {
        console.log(loginData.value);
        let response = await axios.post('https://hec2022.herokuapp.com/api/login/', loginData.value);
        console.log(response.data);
        

        //Guardando en localStorage
        localStorage.setItem('token_access', response.data.access);
        localStorage.setItem('token_refresh', response.data.refresh);
        let token = localStorage.getItem('token_access');
        let userId = jwt_decode(token).user_id.toString();
        //localStorage.setItem('userId', userId);

        //Verificando que si se guardo.
        console.log(localStorage.getItem('token_access'));
        
        //recordar que el ingreso del api esta en alloany.. por lo tanto no se envia el Bearer
        //en este request.

        //Consulta sin token.
       // response = await axios.get(`https://hec2022.herokuapp.com/api/users/${userId}`);

        response = await axios.get(`https://hec2022.herokuapp.com/api/users/${userId}`,
                  {headers: {'Authorization': `Bearer ${token}`}});

        localStorage.setItem('tipo_usuario', response.data.tipo_usuario);

        //Despues de validar el login se pregunta a la base de datos que tipo de usuario es
        //es el que se logueo y de acuerdo a este se rutea hacia su app.

        console.log(localStorage.getItem('tipo_usuario'));

        if(localStorage.getItem('tipo_usuario') == 'AUXILIAR'){
          localStorage.setItem('current-user', response.data.email);
          router.push('/admin');

        }
        else if(localStorage.getItem('tipo_usuario') == 'MEDICO'){

          //cargar los datos del medico
          response = await axios.get('https://hec2022.herokuapp.com/api/medicos/',
          {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
          

          //aca filtramos la lista medico para obtener el que es.
          const userProfile = response.data.filter(item => item.user.id.toString() === userId);
          localStorage.setItem('current-user', JSON.stringify(userProfile));
          

          //fin cargar los datos del medico
                  
          router.push('/personal-medico');

        }
        else if(localStorage.getItem('tipo_usuario') == 'PACIENTE'){
          //cargar los datos del paciente
          response = await axios.get('https://hec2022.herokuapp.com/api/pacientes/',
          {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
          

          //a
          const userProfile = response.data.filter(item => item.user.id.toString() === userId);
          localStorage.setItem('current-user', JSON.stringify(userProfile));
          

          //fin cargar los datos del familiar
            router.push('/paciente');
        }

        else if(localStorage.getItem('tipo_usuario') == 'FAMILIAR'){
          
          //cargar los datos del familiar
          response = await axios.get('https://hec2022.herokuapp.com/api/familiares/',
          {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
          

          //aca filtramos la lista familiar para obtener el que es.
          const userProfile = response.data.filter(item => item.user.id.toString() === userId);
          localStorage.setItem('current-user', JSON.stringify(userProfile));
          

          //fin cargar los datos del familiar


            router.push('/familiar');
        }

  

        


        

      }catch (er) {
        
        console.error(er)
        
      }

           
    }

        


</script>

<template>
  
    <main class="form_container">
      <div class="div_form" action="">
        <label for="user-email" class="label_style">Ingresa tu usuario</label>
        <input v-model="loginData.email" id="user-email"  class="login_boxes">
        <label for="user-password" class="label_style"> Ingresa tu password</label>
        <input v-model="loginData.password" type="password" id="user-password" class="login_boxes">
        <button @click="logInProcess" class="login_button">Ingresar</button>
              
      </div>
      
    </main>
    

</template>

<style scoped>




  .form_container {
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
    margin-top: 100px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
</style>
