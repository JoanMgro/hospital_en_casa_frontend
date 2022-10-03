<script setup>
import { ref } from 'vue';
import router from '../routers/index';
import ListarPacientesAsignados from '@/components/medico/ListarPacientesAsignados.vue';
import VerDiagnostico from '@/components/medico/VerDiagnostico.vue';
import VerSignosVitalesUserMedico from '@/components/medico/VerSignosVitalesUserMedico.vue';
import VerHistoriaClinica from '@/components/verHistoriaClinica.vue';



    const isAuth = ref(false);

    const isActive = ref({
        showCompUno: false,
        showCompDos: false,
        showCompTres:false,
        showCompCuatro: false,
        showCompCinco: false,

    })

    const currentUser = ref({});

    try {
    currentUser.value = JSON.parse(localStorage.getItem('current-user'))[0];
    console.log(currentUser.value);
        
    } catch (error) {
        router.push({name:'login'});
        
    }



    function salirALogin(){
        localStorage.clear();
        router.push({name:'login'});
    }

    function mostrarComponentes(showCompUno, showCompDos, showCompTres, showCompCuatro, showCompCinco){
        isActive.value.showCompUno = showCompUno;
        isActive.value.showCompDos = showCompDos;
        isActive.value.showCompTres = showCompTres;
        isActive.value.showCompCuatro = showCompCuatro;
        isActive.value.showCompCinco = showCompCinco;
    }

    function listarMisPacientes(){
        mostrarComponentes(true, false, false, false, false);

    } 

    function verSignos(){
        mostrarComponentes(false, true, false, false, false);
    }

    function verHistoriaClinica(){
        mostrarComponentes(false, false, true, false, false);
    }

    function verDiagnosticos(){
        mostrarComponentes(false, false, false, true, false)
    }

    (function verifyLogIn() {

    if(localStorage.getItem('token_access') === null || localStorage.getItem('token_refresh') === null){
        salirALogin();
    }else{
        isAuth.value= true;

    }

    })();

    
   

</script>
     
<template>
    <div class="main_div" v-if="isAuth">
    
    <div class="header_home_medico">
        <div class="top_header">
            <div class="user"><span><img src="../assets/images/user_avatar.svg" alt=""></span><span>{{currentUser.nombres_medico}}</span></div>
            <div class="header_title">Medico en Casa</div>
            <div @click="salirALogin"><span >Salir</span><span><img src="../assets/images/logout.svg" alt="log out"></span></div>
            
        </div>
        <div class="navbar_home_medico">
            <button @click="listarMisPacientes" class="botones_aux_view">Ver Pacientes Asignados</button>
            <button @click="verSignos" class="botones_aux_view">Ver Signos Vitales/sugerencia</button>
            <button @click="verHistoriaClinica" class="botones_aux_view">Ver Historia Clinica</button>
            <button @click="verDiagnosticos" class="botones_aux_view">Ver Diagnostico</button>
            
        </div>
    </div>
    <div class="components">

    <ListarPacientesAsignados v-if="isActive.showCompUno" />
    <VerDiagnostico v-if="isActive.showCompCuatro" />
    <VerSignosVitalesUserMedico v-if="isActive.showCompDos" /> 
    <VerHistoriaClinica v-if="isActive.showCompTres" /> 
        
    </div>

    </div>

   
</template>
     
<style scoped>

    .components{
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;


    }

    .top_header{
        padding-top: 50px;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        display: flex;
        background-color: #2B7B63;
        height: 150px;
    }

    .main_div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        gap: 30px;
    }

    .header_home_medico{
        width: 100%;
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .header_title{
        
       
        color: #FFFFFF;
        text-align: center;
        width: 100%;
        
        font-size: 2rem;
    }

    .navbar_home_medico {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
     
</style>