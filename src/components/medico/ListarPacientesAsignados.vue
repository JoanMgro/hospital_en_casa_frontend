<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import FormValidarId from '../FormValidarId.vue';

    let token = localStorage.getItem('token_access');
    const listaPacientes = ref([]);
    const isValidId = ref(false);

    


    async function listarLosPacientes(msg){
        isValidId.value = msg.isValid;
           

        try{

            let response = await axios.get('https://hec2022.herokuapp.com/api/pacientes/',
            {headers: {'Authorization': `Bearer ${token}`}});
            
            listaPacientes.value = response.data.filter(element =>element.id_medico === msg.id);
            if (listaPacientes.value.length == 0 && isValidId.value){
                alert("El medico no tiene pacientes asignados");

            }
                       

        }catch(err){
            console.error(err);
        }
        
    }





</script>

<template>
   
        <div class="form_validar">
            <FormValidarId @response="listarLosPacientes"/>
        </div>
   
        <div class="app_listar_pacientes" v-if="isValidId">

        <h1>Listado de pacientes</h1>

        <table class="table">
        <thead class="table_head">
            <tr class="head_row">
            <td>Nombres</td>
            <td>Apellidos</td>
            <td>Identificacion</td>
            <td>Genero</td>
            <td>Fecha de Nacimiento</td>
            <td>Telefono</td>
            <td> </td>
            </tr>
        </thead>
        <tbody class="body">
            <tr class="body_row" v-for="(paciente, index) in listaPacientes" :key="index">
            <td>{{paciente.nombres_paciente}}</td>
            <td>{{paciente.apellidos_paciente}}</td>
            <td>{{paciente.cedula_paciente}}</td>
            <td>{{paciente.genero}}</td>
            <td>{{paciente.fecha_de_nacimiento}}</td>
            <td>{{paciente.telefono_paciente}}</td>
            <td></td>
            </tr>

        </tbody>
        </table>


        </div>


    


</template>

<style scoped>

    .form_validar{

        padding-left: 50px;
        padding-right: 50px;
        
        align-self: flex-start;
        width: 100%;
    }



    .app_listar_pacientes{
        border: 1px solid #76E3D0;
        border-radius: 10px;
        width: 80%;
        height: 500px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .table{
        width: 100%;
    }

    .table_head{
        font-weight: 700;
        color: #2B7B63;
        height: 50px;
    }

    .body_row{
        height: 40px;
    }

    .components {
            
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        width: 80%;
    }


</style>
