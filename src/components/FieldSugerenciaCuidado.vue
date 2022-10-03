<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    const propsSugerencia = defineProps({
        propsTextoSugerencia: {},
    })

    const sugerenciaCuidado = ref({
        fecha_sugerencia: null,
        sugerencia: '',
        id_paciente: null
    })

    const showTextArea = ref(false)



    function cambiarCampo(){
        showTextArea.value = true;

    }

    async function registrarNuevaSugerencia(){

        const now = new Date();
        let nowFormated = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();

        sugerenciaCuidado.value.fecha_sugerencia = nowFormated;
        sugerenciaCuidado.value.id_paciente = propsSugerencia.propsTextoSugerencia.id_paciente
        try {
            let responseSugerencias = await axios.post('https://hec2022.herokuapp.com/api/sugerencias/'
                                    , sugerenciaCuidado.value);
            console.log(responseSugerencias.data);
            
        } catch (error) {
            console.error(error);
        }
        sugerenciaCuidado.value.sugerencia='';
    }
   
</script>

<template>
    <div class="container_sugerencia">
        
            <h2>Sugerencia de cuidado</h2>
            <span>fecha ultima sugerencia: {{propsSugerencia.propsTextoSugerencia.fecha_sugerencia}}</span>
            <textarea v-if="showTextArea" v-model="sugerenciaCuidado.sugerencia" name="sugerencia" id="sugerencia" cols="50" rows="5">
            </textarea>
            <p @click="cambiarCampo" class="text_sugerencia" v-if="!showTextArea">
                {{propsSugerencia.propsTextoSugerencia.sugerencia}}
            </p>
        


    </div>
    
    <button @click="registrarNuevaSugerencia" :disabled="!showTextArea">Registrar Nueva Sugerencia</button>
    
   
</template>

<style scoped>

    textarea{
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid #76e3d0;
    }

    p{
        padding: 5px;
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid #76e3d0;
        width: 413px;
        height: 81px;

    }

    span{
    
    display: block;
    text-align: start;
    padding-top: 5px;
    margin-bottom: 10px;

}

    
</style>
