<script setup>
import { ref } from 'vue';
import axios from 'axios'

const propsUser = defineProps({
    propsCurrentUser: {},

});

const refSignosVitales = ref({
    
    oximetria: null,
    freq_respiratoria: null,
    freq_cardiaca: null,
    temperatura: null,
    presion_arterial: null,
    glicemias: null,
    id_paciente: null
});

const resetSignosVitales = {
    
    oximetria: null,
    freq_respiratoria: null,
    freq_cardiaca: null,
    temperatura: null,
    presion_arterial: null,
    glicemias: null,
    id_paciente: null
};

async function registrarSignos(){


    refSignosVitales.value.id_paciente = propsUser.propsCurrentUser;
    

    try {
        let response = await axios.post('https://hec2022.herokuapp.com/api/signos-vitales/', refSignosVitales.value);
        console.log(response.data);
        
    } catch (error) {
        console.error(error);
    }

    refSignosVitales.value = resetSignosVitales;
}

   
</script>

<template>

    <h2>Signos Vitales</h2>

    <div class="signos_vitales alineacion">
     
        <label>Oximetria :</label>
        <input class="campo_formularios" type="number" v-model="refSignosVitales.oximetria">
        
    
   
        <label>Frecuecia respiratoria:</label>
        <input class="campo_formularios" type="number" v-model="refSignosVitales.freq_respiratoria">
  
  
        <label>Frecuencia Cardiaca:</label>
        <input class="campo_formularios" type="number" v-model="refSignosVitales.freq_cardiaca">
   

        <label>Temperatura:</label>
        <input class="campo_formularios" type="number" v-model="refSignosVitales.temperatura">
   

        <label>Presion Arterial:</label>
        <input class="campo_formularios" type="number" v-model="refSignosVitales.presion_arterial">

        <label>Glicemias:</label>
        <input class="campo_formularios" type="number" v-model="refSignosVitales.glicemias">
    </div>
    <button @click="registrarSignos">Registrar signos vitales</button>
   
    
    


</template>

<style scoped>
.alineacion{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    row-gap: 10px;

}

span{
    text-align: center;
    padding-top: 5px;

}
    
</style>
