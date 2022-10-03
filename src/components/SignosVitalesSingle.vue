<script setup>

    const propsDatosTabla = defineProps({
        datosTabla: {},
    })
   
</script>

<template>

    <h2>Signos Vitales</h2>

    <div class="signos_vitales alineacion">
        <label>Fecha Muestra :</label>
        <span class="campo_formularios">{{propsDatosTabla.datosTabla.fecha_muestra}}</span> 
   
  
        <label>Oximetria :</label>
        <span class="campo_formularios">{{propsDatosTabla.datosTabla.oximetria}}</span> 
    
   
        <label>Frecuecia respiratoria:</label>
        <span class="campo_formularios">{{propsDatosTabla.datosTabla.freq_respiratoria}}</span>
  
  
        <label>Frecuencia Cardiaca:</label>
        <span class="campo_formularios">{{propsDatosTabla.datosTabla.freq_cardiaca}}</span>
   

        <label>Temperatura:</label>
        <span class="campo_formularios">{{propsDatosTabla.datosTabla.temperatura}}</span>
   

        <label>Presion Arterial:</label>
        <span class="campo_formularios">{{propsDatosTabla.datosTabla.presion_arterial}}</span>

        <label>Glicemias:</label>
        <span class="campo_formularios">{{propsDatosTabla.datosTabla.glicemias}}</span>
    </div>
   
    
    


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
