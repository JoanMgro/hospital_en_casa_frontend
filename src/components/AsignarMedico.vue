<script setup>
    import DropDownPacientesSinSubmit from '@/components/DropDownPacientesSinSubmit.vue';
    import { ref } from 'vue';
    import axios from 'axios'

    
    const datos = ref({});
    const datoIdPaciente = ref();
    
    //este arreglo vacio lo lleno con la lista que traigo de la DB.
    const listaMedicos = ref([]);

    async function asignarMedicoAPaciente(){
        console.log(datoIdPaciente.value);
        try {

            let response = await axios.patch(`https://hec2022.herokuapp.com/api/pacientes/${datoIdPaciente.value}/`, 
            {id_medico: datos.value.cedula_medico},  {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            console.log(response.data)
            
        } catch (error) {
            console.error(error)
        }


    }

    async function traerMedicos(){
        try {

            let response = await axios.get('https://hec2022.herokuapp.com/api/medicos/',
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            listaMedicos.value = response.data;
            console.log(listaMedicos.value)
            
            
        } catch (error) {
            console.error(error)
            
        }
    }


    //Funcion autoejecutante, de esta manera se ejecut la funcion apenas entra en la pagina
    (function(){traerMedicos() })();




    
</script>

<template>
      
    <div class="container_asignacion_medico">
        <h3>Datos Medico</h3>
    <div class="container_datos">
        <div class="dato_1 datos">
        
            <label for="cod_id">Seleccione Id: </label>
            <!-- usando esta directibva v-for podemos llenar un item de selección.-->
            <select id="cod_id" v-model="datos" class="campo_formularios">
                <option v-for="(medico, index) in listaMedicos" :key="index" :value="medico">{{medico.cedula_medico}}</option>
                
            </select>

        </div>
            <div class="dato_2 datos">
            <div >Nombres: </div>
            <div class="campo_formularios">{{datos.nombres_medico}} {{datos.apellidos_medico}}</div>
        </div>

        


    </div>
    <DropDownPacientesSinSubmit @response="(dato) => datoIdPaciente=dato"/>
    <button @click="asignarMedicoAPaciente">Realizar Asignacion</button>

    </div>            
</template>

<style scoped>

    .container_asignacion_medico {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .container_datos{
        display: flex;
        gap: 20px;
    }




</style>
