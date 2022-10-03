<script setup>
 import { ref, watch } from 'vue';
 import axios from 'axios';

 

 const props = defineProps({
    data : {},
 })

 const dataNombreFamiliar = ref('');
 const dataDiagnostico = ref('');


 watch(props, async () =>{
    console.log(`esto es paciente : ${props.data.nombres_paciente}`);

    try{

        let response = await axios.get(`https://hec2022.herokuapp.com/api/familiares/`, 
        {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
        console.log(response.data.filter(element => element.id_paciente === props.data.cedula_paciente));
        let dataFiltered  = response.data.filter(element => element.id_paciente === props.data.cedula_paciente);
        
        if(dataFiltered.length == 0){
            
            dataNombreFamiliar.value= 'No tiene Familiar Asignado';
        }else {
            dataNombreFamiliar.value= dataFiltered[0].nombres_familiar;
        }
        

        response = await axios.get(`https://hec2022.herokuapp.com/api/diagnostico/`);
        
        dataFiltered  = response.data.filter(element => element.id_paciente === props.data.cedula_paciente);
        
        if(dataFiltered.length == 0){
            dataDiagnostico.value= 'No tiene Diagnostico';
        }else {
            dataDiagnostico.value = dataFiltered[0].diagnostico;
        }
        console.log(dataDiagnostico.value);



    }catch(err){
        console.error(err);
    }




 } );


    
</script>

<template>
      
      <div class="grid_resultados">
                <span class="spans item_11 botones_aux_view">Diagnostico: {{dataDiagnostico}}</span>
                <span class="spans item_01">Nombres: {{props.data.nombres_paciente}} {{props.data.apellidos_paciente}}</span>
                <span class="spans item_02">Documento CC: {{props.data.cedula_paciente}}</span>
                <span class="spans item_03">Genero: {{props.data.genero}}</span>

                <span class="spans item_04">Fecha de nacimiento: {{props.data.fecha_de_nacimiento}}</span>
                <span class="spans item_05">Ciudad: {{props.data.ciudad}}</span>
                <span class="spans item_06">Direccion: {{props.data.direccion}}</span>
                

                <span class="spans item_10" >Familiar designado: {{dataNombreFamiliar}}</span>
                <span class="spans item_09">Telefono: {{props.data.telefono_paciente}}</span>

                <span class="spans item_07">Latitud: {{props.data.Latitud}}</span>
                <span class="spans item_08">Longitud: {{props.data.longitud}}</span>
                           
                
            </div>



                   
</template>

<style scoped>

.spans {
        display: block;
    }

</style>
