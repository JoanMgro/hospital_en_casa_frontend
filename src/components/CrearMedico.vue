<script setup>
    import { ref } from 'vue';
    import axios from 'axios'
    import useVuelidate from '@vuelidate/core'
    import { required, email} from '@vuelidate/validators'

    
    const datosMedico = ref({
        user: {
            email: '',
            password: '',
            tipo_usuario: 'MEDICO',
        },
        cedula_medico: '',
        nombres_medico: '',
        apellidos_medico: '',
        telefono_medico: '',
        especialidad: '',
        registro_medico:'',
        genero:'',
    });

    const validations = ref({
        user: {
            email: { email },
            password: { required },
        },
        cedula_medico: { required },
        nombres_medico: { required },
        apellidos_medico: { required },
        telefono_medico: { required },
        especialidad: { required },
        registro_medico:{ required },
    });

    const v$ = useVuelidate(validations,datosMedico)

    const generos = ref([
        'M', 'F', 'N/A'
    ])

    function resetDatos(){
        datosMedico.value.nombres_medico = '';
        datosMedico.value.apellidos_medico = '';
        datosMedico.value.cedula_medico = '';
        datosMedico.value.registro_medico = '';
        datosMedico.value.especialidad = '';
        datosMedico.value.genero = '';
        datosMedico.value.telefono_medico = '';
        datosMedico.value.user.email = '';
        datosMedico.value.user.password = '';


    }
    
   

    async function procesarMedico(){
        console.log(datosMedico.value);
      const result = await v$.value.$validate();

      if (result){

        try{


            let response = await axios.post('https://hec2022.herokuapp.com/api/medicos/', datosMedico.value,
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            console.log(response.data);


        }catch(err){
            console.error(err);
        }
        resetDatos();
        
        }
    }



</script>

<template>
    <div class="body">
        <div class="header">
            <h1>Datos medico</h1>

        </div>
        <div class="datos">
            <div class="form_container">
                <form class="form_medico" @submit.prevent = 'procesarMedico'>
                    <div class="grid_fields">
                        <div class="nombres_container separacion_campos">
                            <label for="nombres">
                                Nombres *
                                <span v-for="error in v$.nombres_medico.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>

                            </label>
                            <input type="text" id="nombres" v-model="datosMedico.nombres_medico" class="campo_formularios">
                        </div>
                        <div class="apellidos_container separacion_campos">
                            <label for="apellidos">
                                Apellidos *
                                <span v-for="error in v$.apellidos_medico.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>
                            </label>
                            <input type="text" id="apellidos" v-model="datosMedico.apellidos_medico" class="campo_formularios">
                        </div>
                        <div class="cedula_container separacion_campos">
                            <label for="cedula">
                                Numero identificacion *
                                <span v-for="error in v$.cedula_medico.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>

                            </label>
                            <input type="number" id="cedula" v-model="datosMedico.cedula_medico" class="campo_formularios">
                        </div>
                        <div class="genero_container separacion_campos">
                            <label for="genero">
                                Genero
                            </label>
                            <select id="genero" v-model="datosMedico.genero" class="campo_formularios">
                                <option v-for="(genero, index) in generos" :key="index">{{genero}}</option>
                            </select>
                         
                        </div>
                        <div class="telefono_container separacion_campos">
                            <label for="telefono">
                                Teléfono *
                                <span v-for="error in v$.telefono_medico.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>
                            </label>
                            <input type="text" id="telefono" v-model="datosMedico.telefono_medico" class="campo_formularios">
                        </div>

                        <div class="email_container separacion_campos">
                            <label for="email">
                                Correo Electronico *
                                <span v-for="error in v$.user.email.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>
                            </label>
                            <input type="email" id="email" v-model="datosMedico.user.email" class="campo_formularios">
                        </div>
                        <div class="registro_container separacion_campos">
                            <label for="registro">
                                Tarjeta profesional *
                                <span v-for="error in v$.registro_medico.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>
                            </label>
                            <input type="number" id="registro" v-model="datosMedico.registro_medico" class="campo_formularios">
                        </div>
                        <div class="especialidad_container separacion_campos">
                            <label for="especialidad">
                                Especialidad *
                                <span v-for="error in v$.especialidad.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>
                            </label>
                            <input type="text" id="especialidad" v-model="datosMedico.especialidad" class="campo_formularios">
                        </div>
                        <div class="password_container separacion_campos">
                            <label for="password">
                                Clave automatica *
                                <span v-for="error in v$.user.password.$errors" :key="error.$uid" class="mensajeError">
                                    Campo requerido
                                </span>                                
                            </label>
                            <input type="password" id="password" v-model="datosMedico.user.password" class="campo_formularios">
                        </div>
                    </div>  
                    <p class="nota">Los campos con asterisco (*) son obligatorios para crear el médico</p>                                    
                    <input type="submit" value="Crear" class="botones_aux_view crear_size">
                   
                </form>
            </div>
        </div>
       

    </div>
   



</template>

<style scoped>

    .datos{
        height: 500px;
        padding-top: 50px;
    }

    .body {
        padding-top: 90px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .grid_fields{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(5, 1fr);
        gap: 10px 20px;
    }

    .header h1{
        color: var(--green-aux-main-background);
        font-style: normal;
        font-size: 1.5rem;

    }
    .separacion_campos{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .form_medico {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 100px;
        
    }

    .crear_size{
        width: 125px;
        height: 32px;
    }

    .nota{
  color: rgb(100, 97, 97);
  font-size: 10px;
  margin-bottom: 20px;
}

.mensajeError{
  color: red;
  font-size: 10px;
}

</style>
