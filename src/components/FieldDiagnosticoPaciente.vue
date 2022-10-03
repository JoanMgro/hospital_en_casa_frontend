<script setup>

import { ref } from 'vue';
import axios from 'axios';



//const emitDiagnostico = defineEmits(['response']);

const datoNuevoDiagnostico = ref({
    diagnostico: '',
    // fecha_diagnostico: null,
    id_paciente: null
}); 

const datoActualDiagnostico = defineProps({
    actualDiagnostico: {}
});

async function registerField(){

    // const now = new Date();
    // let nowFormated = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();

    // datoNuevoDiagnostico.value.fecha_diagnostico = nowFormated;

  
    datoNuevoDiagnostico.value.id_paciente = datoActualDiagnostico.actualDiagnostico.idPaciente;


    try {
        
        if(datoActualDiagnostico.actualDiagnostico.isRegistrar) {
            let response = await axios.post('https://hec2022.herokuapp.com/api/diagnostico/', 
                datoNuevoDiagnostico.value );
            console.log(response.data);

        } else if(datoActualDiagnostico.actualDiagnostico.isUpdate) {
            let response = await axios.get(`https://hec2022.herokuapp.com/api/diagnostico/`);
            let diagId = response.data.filter(element => element.id_paciente === datoActualDiagnostico.actualDiagnostico.idPaciente)

            response = await axios.patch(`https://hec2022.herokuapp.com/api/diagnostico/${diagId[0].id}/`, 
                         datoNuevoDiagnostico.value);
            console.log(response.data);
            

        }


    
    } catch (error) {
        console.error(error);
    }


    datoNuevoDiagnostico.value.diagnostico = '';
}

</script>

<template>
    
    <div class="campo_diagnostico_actual">
        
        <span >Diagnostico Actual: 
            {{datoActualDiagnostico.actualDiagnostico.datoEnviadoADiagnostico}}</span>
    </div>  
      
    <div class="campo_diagnostico">
        <label for="field_diagnostico">Nuevo Diagnostico: </label>
        <input id="field_diagnostico" type="text" v-model ="datoNuevoDiagnostico.diagnostico">
        
 
    </div>

    <div class="botones_diagnostico">
            <button @click="registerField" class="botones_aux_view" v-if="datoActualDiagnostico.actualDiagnostico.isRegistrar">
                Registrar Diagnostico
            </button>

            <button @click="registerField" class="botones_aux_view" v-if="datoActualDiagnostico.actualDiagnostico.isUpdate">
                Actualizar Diagnostico
            </button>
        </div>


                   
</template>

<style scoped>


</style>
