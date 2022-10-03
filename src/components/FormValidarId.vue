<script setup>
    import { ref } from 'vue';
    import axios from 'axios'


   const idMedico = ref();
   const emit = defineEmits(['response']);


    async function validasMiId(){
        

        try{

            let response = await axios.get(`https://hec2022.herokuapp.com/api/medicos/${idMedico.value}`,
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            console.log(response.data);
            emit('response', {isValid : true, id : idMedico.value});
        
                       

        }catch(err){
            console.error(err);
            emit('response', false);
            alert("Medico no registrado");
            idMedico.value= null;
           
        }
        
    }


</script>

<template>
    <div class="form_container ">
        <label for="identificacion" class="label_documento">Documento:</label>
        <input type="number" name="identificacion" id="identificacion" class="campo_formularios" v-model="idMedico">
        <button @click="validasMiId" class="botones_aux_view">Validar</button>
    </div>

</template>

<style scoped>

    .form_container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
    }



</style>
