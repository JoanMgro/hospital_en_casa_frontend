<script setup>
import { ref } from 'vue'
import router from '../routers/index';
import CrearPaciente from '../components/CrearPaciente.vue';
import CrearMedico from '../components/CrearMedico.vue';
import ConsultarPaciente from '../components/ConsultarPaciente.vue';
import ListarPacientes from '../components/ListarPacientes.vue';
import AsignarMedico from '@/components/AsignarMedico.vue';
import CrearFamiliar from '@/components/CrearFamiliar.vue';




    const showApp = ref({

        showPaciente: false,
        showMedic: false,
        showListarPacientes: false,
        showConsultarPaciente: false,
        showAsignarMedico: false,
        showCrearFamiliar: false
        
    });

   const isAuth = ref(false); 
    
    


    const currentUser = ref(localStorage.getItem('current-user'));
    console.log(currentUser.value);
    const saludo = ref(`Hola ${currentUser.value}, ¿qué deseas hacer hoy?`);
   


    //Esta funcion sirve como flag para mostrar el componente seleccionado. 
    //ej. click boton crear medico, flag showmedico -> true y los demas False.
    
    function resetShowApp(showMedic, showConsultarPaciente, showPaciente, showListarPacientes, showAsignarMedico, showCrearFamiliar){
        showApp.value.showMedic = showMedic;
        showApp.value.showPaciente = showPaciente;
        showApp.value.showConsultarPaciente = showConsultarPaciente;
        showApp.value.showListarPacientes = showListarPacientes;
        showApp.value.showAsignarMedico = showAsignarMedico;
        showApp.value.showCrearFamiliar = showCrearFamiliar;

    }

 

    function crearPaciente(){
       resetShowApp(false, false,true, false, false, false);
    }


    function crearMedico(){
        resetShowApp(true, false,false, false, false, false);
    }

    function consultarPaciente(){
        resetShowApp(false, true,false,false, false, false);
    }


    //funciones temporales mientras se resuelve el maquetado
    function crearFamiliar(){
        //router.push me sriver para hacer un href de manera programatica.
        // router.push({name :'crear-familiar',});
        resetShowApp(false, false,false,false, false, true);
    }



    function asignarMedico(){
        resetShowApp(false, false, false, false, true, false);

    }
    //fin seccion de funciones temporales mientras se resuelve el maquetado


    function listarPacientes(){
        //router.push me sriver para hacer un href de manera programatica.
        //router.push('/admin/listar-pacientes')

        resetShowApp(false, false, false, true, false, false);

    }


    


    function salirALogin(){
        //router.push me sriver para hacer un href de manera programatica.

        localStorage.clear();
        router.push({name:'login'});
    }

    (function verifyLogIn() {

        if(localStorage.getItem('token_access') === null || localStorage.getItem('token_refresh') === null){
            salirALogin()
        }else{
            isAuth.value= true;

        }

    })();



</script>

<template>
    <div class="body" v-if="isAuth">
        <div class="header">
            <div class="user"><span><img src="../assets/images/user_avatar.svg" alt=""></span><span>{{currentUser}}</span></div>
            <div class="header_h1"><h1>Medico en casa</h1></div>
            <div @click="salirALogin"><span >Salir</span><span><img src="../assets/images/logout.svg" alt="log out"></span></div>
        </div>
        
        <div>
            <h2>{{saludo}}</h2>
        </div>
        <div class="navbar">
            <button @click="crearPaciente" class="botones_aux_view" :class="{active: showApp.showPaciente}">Crear Paciente</button>

        
            <button @click="crearFamiliar" :class="{active: showApp.showCrearFamiliar}" >Crear Familiar</button>  
            

            <button @click="asignarMedico" :class="{active: showApp.showAsignarMedico}">Asignar Medico</button>
        

            <button @click="crearMedico" class="botones_aux_view" :class="{active: showApp.showMedic}">Crear Medico</button>
            <button @click="consultarPaciente" class="botones_aux_view" :class="{active: showApp.showConsultarPaciente}">Consultar Paciente</button>
            <button @click="listarPacientes" class="botones_aux_view" :class="{active: showApp.showListarPacientes}">Ver listado de pacientes</button>
        </div>

        <CrearPaciente v-if="showApp.showPaciente"/>

        <CrearFamiliar v-if="showApp.showCrearFamiliar" />
        
       
        <AsignarMedico v-if="showApp.showAsignarMedico" />
           
   


        <CrearMedico v-if="showApp.showMedic"/>
        <ConsultarPaciente v-if="showApp.showConsultarPaciente"/>
        <ListarPacientes v-if="showApp.showListarPacientes"/>

    </div>


</template>

<style scoped>
    .body {
        width: 100%;
        height: 97vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
    }

    .header {
        padding-top: 20px;
        padding-left: 70px;
        padding-right:50px;
        width: 100%;
        height: 110px;
        display: flex;
        background-color: var(--green-aux-main-background);

    }
    
    
    .header_h1{
        flex-grow: 1;
        text-align: center;
        
        font-weight: 700;
        font-size: 1rem;
        color: var(--white-login-inputbox-background);
    }

    .user {
        max-width: 100px;
    }

    .navbar {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
    }

</style>
