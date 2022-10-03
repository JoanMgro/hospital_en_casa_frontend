<script setup>
    import { ref } from 'vue';
    import router from '../routers/index';
    import ActualizarPaciente from '../components/ActualizarPaciente.vue';
    import SignosVitalesInput from '../components/SignosVitalesInput.vue';
    import VerHistoriaClinicaPaciente from '@/components/verHistoriaClinicaPaciente.vue';
   
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
            alert(error.message);
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

        function actualizarMisDatos(){
            mostrarComponentes(true, false, false, false, false);

    
        }

        function registrarSignos(){

            mostrarComponentes(false, true, false, false, false);

        }

        function verHistoria(){

             mostrarComponentes(false, false, true, false, false);

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
        
        <div class="header_home_paciente">
            <div class="top_header">
                <div class="user"><span><img src="../assets/images/user_avatar.svg" alt=""></span><span>{{currentUser.nombres_paciente}}</span></div>
                <div class="header_title">Medico en Casa</div>
                <div @click="salirALogin"><span >Salir</span><span><img src="../assets/images/logout.svg" alt="log out"></span></div>
                
            </div>
            <div class="navbar_home_paciente">
                <button @click="actualizarMisDatos" class="botones_aux_view">Actualizar mis datos</button>
                <button @click="registrarSignos" class="botones_aux_view">Ingresar Signos Vitales</button>
                <button @click="verHistoria" class="botones_aux_view">Ver Historia Clinica</button>

            </div>
        </div>
        <div class="components">

        <ActualizarPaciente  v-if="isActive.showCompUno" :currentData = "currentUser"/>
        <SignosVitalesInput v-if="isActive.showCompDos" :propsCurrentUser="currentUser.cedula_paciente" />
        <VerHistoriaClinicaPaciente v-if="isActive.showCompTres" :propsId ="currentUser.cedula_paciente"/>
    

            
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
    
        .header_home_paciente{
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
    
        .navbar_home_paciente {
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
         
    </style>