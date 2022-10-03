<script setup>
    import { ref } from 'vue';
    import axios from 'axios'

    const listaPacientes = ref([]);
   

    async function listarLosPacientes(){
        

        try{

            let response = await axios.get('https://hec2022.herokuapp.com/api/pacientes/',
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            //console.log(response.data);
            listaPacientes.value = response.data;
            //console.log(listaPacientes.value);
                       

        }catch(err){
            console.error(err);
        }
        
    }

    (function(){ listarLosPacientes() })();




</script>

<template>
    <div class="app_listar_pacientes">

        <table class="table">
        <thead class="table_head">
            <tr class="head_row">
            <td>Nombres</td>
            <td>Apellidos</td>
            <td>Identificacion</td>
            <td>Telefono</td>
            <td>Direccion</td>
            <td> </td>
            </tr>
        </thead>
        <tbody class="body">
            <tr class="body_row" v-for="(paciente, index) in listaPacientes" :key="index">
            <td>{{paciente.nombres_paciente}}</td>
            <td>{{paciente.apellidos_paciente}}</td>
            <td>{{paciente.cedula_paciente}}</td>
            <td>{{paciente.telefono_paciente}}</td>
            <td>{{paciente.direccion}}</td>
            <td></td>
            </tr>

        </tbody>
        </table>


    </div>
    


</template>

<style scoped>

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


</style>
