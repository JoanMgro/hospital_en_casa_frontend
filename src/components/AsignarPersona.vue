<script setup>
    import { ref } from 'vue';
    import axios from 'axios'

    const datos = ref({
        id_paciente:'',
      


    });
   
    const listaPacientes = ref([]);

    function check(){
        console.log(datos.value);


    }

    async function traerPacientes(){
        try {

            let response = await axios.get('https://hec2022.herokuapp.com/api/pacientes/');
            listaPacientes.value = response.data;
            
        } catch (error) {
            console.error(error)
            
        }
    }


    //Funcion autoejecutante, de esta manera se ejecut la funcion apenas entra en la pagina
    (function(){traerPacientes() })();



    
</script>

<template>
      
<h1>hello</h1>

    <label for="paciente">Elegir Paciente</label>

    <!-- usando esta directibva v-for podemos llenar un item de selección.-->
    <select id="paciente" v-model="datos.id_paciente">
        <option v-for="(paciente, index) in listaPacientes" :key="index">{{paciente.cedula_paciente}} {{paciente.nombres_paciente}} {{paciente.apellidos_paciente}}</option>
    </select>
    <button @click="check">submit</button>

                   
</template>

<style scoped>


</style>
