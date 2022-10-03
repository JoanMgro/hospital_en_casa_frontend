<script setup>
    import { ref } from 'vue';
    import axios from 'axios'
    import CuadroInfoPaciente from './CuadroInfoPaciente.vue';

    
    const buscarPaciente = ref({
        documento: ''
    });
    const resultadoBusqueda = ref({});


    async function consultarPaciente(){
       // console.log(buscarPaciente.value.documento)

        try{

            let response = await axios.get(`https://hec2022.herokuapp.com/api/pacientes/${buscarPaciente.value.documento}`,
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            //console.log(response.data);
            resultadoBusqueda.value= response.data;


            

        }catch(err){
            console.error(err);
        }
        

    }

</script>

<template>

    <div class="contenedor_gral">
        <h2>Busca tu paciente por el numero de documento</h2>

        <div class="form_container">
                <form class="form_paciente" @submit.prevent = 'consultarPaciente'>
                    <div class="cedula_container">
                        <label for="cedula">Numero documento</label>
                        <input type="number" id="cedula" v-model="buscarPaciente.documento" class="campo_formularios">
                    </div>                   
                    <input type="submit" value="Buscar" class="botones_aux_view button_size_125x32">
                        
                </form>
        </div>

        <div class="resultado">
          <CuadroInfoPaciente :data="resultadoBusqueda" />
        </div>



    </div>


</template>

<style scoped>

    .resultado{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 20px;
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid #76E3D0;
        border-radius: 10px;
        width: 100%;
        height: 170px;

    }



    .contenedor_gral{
        padding-top: 80px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
        width: 80%;
        height: 800px;
    }

    .form_paciente{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 50px;
    }

    .cedula_container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 100px;
        font-weight: 700;
    }



</style>
