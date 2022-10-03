<script setup>
//import { ref } from 'vue';
    const propsListaSignos = defineProps({
        listaSignos : Array,
    })

    //const refListaSignos = ref([]);

    //const showTable = ref(false)


</script>

<template>
    <div class="app_listar_pacientes">
        <div>
            <h2>Signos Vitales</h2>
        </div>

        <table class="table">
        <thead class="table_head">
            <tr class="head_row">
            <td>Fecha de Muestra</td>
            <td>Oximetria</td>
            <td>Temperatura</td>
            <td>Glicemias</td>
            <td>Presion Arterial</td>
            <td>Frequencia respiratoria</td>
            <td>Frequencia Cardiaca</td>
           
            </tr>
        </thead>
        <tbody class="body" >
            <tr class="body_row" v-for="(signos, index) in propsListaSignos.listaSignos" :key="index">
            <td>{{signos.fecha_muestra}}</td>
            <td>{{signos.oximetria}}</td>
            <td>{{signos.temperatura}}</td>
            <td>{{signos.glicemias}}</td>
            <td>{{signos.presion_arterial}}</td>
            <td>{{signos.freq_respiratoria}}</td>
            <td>{{signos.freq_cardiaca}}</td>
            </tr>
        </tbody>
        </table>


    </div>

   
    


</template>

<style scoped>

    .app_listar_pacientes{
        border: 1px solid #76E3D0;
        border-radius: 10px;
        width: 100%;
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
        font-size: 0.7rem;
        text-align: center;
        color: #2B7B63;
        height: 50px;
    }

    .body_row{
        text-align: center;
        height: 40px;
        font-size: 0.8rem;
    }


</style>
