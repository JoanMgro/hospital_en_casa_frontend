<script setup>
import { ref, watch } from 'vue';
import axios from 'axios'
import DropDownPacientes from '../DropDownPacientes.vue';
import FieldDiagnosticoPaciente from '../FieldDiagnosticoPaciente.vue';

const idPaciente = ref();

const haveItem = ref({
    isRegistrarActive: false,
    isActualizarActive: false,
    isFieldActive : false,
    isActualizarDisabled: true
});



const datoEnviado = ref({
    datoEnviadoADiagnostico:'',
    idPaciente: null,
    isRegistrar: false,
    isUpdate: false,
});




watch(idPaciente, async () =>{

    try {

        let response = await axios.get('https://hec2022.herokuapp.com/api/diagnostico/');
        let filteredData = response.data.filter(element => element.id_paciente === idPaciente.value)
        if(filteredData.length == 0){
            alert('No hay Diagnostico Registrado');
            datoEnviado.value.datoEnviadoADiagnostico = 'No hay Registro';
            datoEnviado.value.idPaciente = idPaciente.value; 
            datoEnviado.value.isRegistrar= true;
            datoEnviado.value.isUpdate= false;
            haveItem.value.isFieldActive= true;
        }
        else{
            datoEnviado.value.datoEnviadoADiagnostico = filteredData[0].diagnostico;
            datoEnviado.value.isRegistrar= false;
            datoEnviado.value.idPaciente = idPaciente.value; 
            datoEnviado.value.isUpdate= true;
            haveItem.value.isFieldActive= true;
            console.log(filteredData[0].diagnostico);
        }
        
    } catch (error) {
        console.error(error);
    }


   
});



</script>

<template>
    <div class="diagnostico_container">
        <div class="campo_seleccion_paciente">
            <DropDownPacientes @response="(dato) => idPaciente = dato" />
        </div>
        <div class="campo_componente_diagnostico">
            <FieldDiagnosticoPaciente v-if="haveItem.isFieldActive" 
            :actualDiagnostico="datoEnviado"
           /> 
            <!-- revisar esto que no me acuerdo @response -->
        </div>
     


    </div>

</template>

<style scoped>

    .diagnostico_container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

</style>