<script setup>
    import { ref } from 'vue';
    import axios from 'axios'

    

    const datos = ref({});

    const emitIdPaciente = defineEmits(['response']);

    
    const listaPacientes = ref([]);
 


    function check(){
        console.log(datos.value);
        emitIdPaciente('response', datos.value.cedula_paciente);
    }

    async function traerPacientes(){
        try {

            let response = await axios.get('https://hec2022.herokuapp.com/api/pacientes/',
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            listaPacientes.value = response.data;
            
        } catch (error) {
            console.error(error)
            
        }
    }


    //Funcion autoejecutante, de esta manera se ejecut la funcion apenas entra en la pagina
    (function(){traerPacientes() })();



    
</script>

<template>
      
    
    <div class="container_datos_paciente">
        <div class="datos_1 datos">

            <label for="paciente">Seleccione Id Paciente</label>
            <!-- usando esta directibva v-for podemos llenar un item de selección.-->
            <select id="paciente" v-model="datos" class="campo_formularios">
                <option  v-for="(paciente, index) in listaPacientes" :key="index" :value="paciente">{{paciente.cedula_paciente}}</option>
                
            </select>
            </div>
            <div class="dato_2 datos">
                    <div >Nombres: </div>
                    <div class="campo_formularios">{{datos.nombres_paciente}} {{datos.apellidos_paciente}}</div>
            </div>

            <button class="botones_aux_view alinear_boton_abajo" @click="check">submit</button>     



    </div>
   
                   
</template>

<style scoped>

.container_datos_paciente{
    display: flex;
    align-items: center;
    gap: 20px;
}

.alinear_boton_abajo{
    align-self: flex-end;
}

</style>
