<script setup>
    import { ref } from 'vue';
    import axios from 'axios'
    import useVuelidate from '@vuelidate/core'
    import { required, email} from '@vuelidate/validators'
    
    
    const datosPaciente = ref({
        cedula_paciente: '',
        user: {
            email: '',
            password: '',
            tipo_usuario: 'PACIENTE',
        },
        nombres_paciente: '',
        apellidos_paciente: '',
        genero: '',
        telefono_paciente: '',
        fecha_de_nacimiento: '',
        ciudad: '',
        direccion: '',
        latitud: '',
        longitud: '',
        id_medico: '',
        id_enfermero: ''
   
       });

      const validations = ref({
        cedula_paciente: { required },
        user: {
            email: { email },
            password: { required },
        },
        nombres_paciente: { required },
        apellidos_paciente: { required },
        telefono_paciente: { required },
        fecha_de_nacimiento: { required },
        ciudad: { required },
        direccion: { required },
       });

       const v$ = useVuelidate(validations,datosPaciente)


    const generos = ref([
        'M', 'F', 'N/A'
    ])
    
    
    async function procesarPaciente(){
      const result = await v$.value.$validate();

      if (result){
        try{
            let response = await axios.post('https://hec2022.herokuapp.com/api/pacientes/', 
            datosPaciente.value,  {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            console.log(response.data);
        }catch(err){
            console.error(err);
        }
      }
        
    }

</script>

<template>
  <div class="body">
    <h2>Datos Paciente</h2>

    <form class="form-container" @submit.prevent= 'procesarPaciente'>
      <div class="colum-form">
        <div class="grid_fields1">
          <label for="nombres">
            Nombres *
          <span v-for="error in v$.nombres_paciente.$errors" :key="error.$uid" class="mensajeError">
             Campo requerido
          </span>
          </label>
          <input type="text" id="nombres" v-model="datosPaciente.nombres_paciente" />

          <label for="cedula">
            Documento número *
          <span v-for="error in v$.cedula_paciente.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>
          </label>
          <input type="text" id="cedula" v-model="datosPaciente.cedula_paciente" />
        </div>

        <div class="grid_fields1">
          <label for="apellidos">
            Apellidos *
          <span v-for="error in v$.apellidos_paciente.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>  
          </label>
          <input type="text" id="apellidos" v-model="datosPaciente.apellidos_paciente" />

          <label for="nacimiento">
            Fecha de nacimiento *
          <span v-for="error in v$.fecha_de_nacimiento.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>
          </label>
          <input type="text" id="nacimiento" v-model="datosPaciente.fecha_de_nacimiento" />
        </div>
      </div>

      <div class="grid_fields">
        <label for="direccion">
          Dirección de Residencia *
          <span v-for="error in v$.direccion.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>
        </label>
        <input type="text" id="direccion" v-model="datosPaciente.direccion" />
      </div>

      <div class="colum-form">
        <div class="grid_fields2">
          <label for="latitud">
            Latitud:
          </label>
          <input type="text" id="latitud" v-model="datosPaciente.latitud" />

          <label for="ciudad">
            Ciudad *
          <span v-for="error in v$.ciudad.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>
          </label>
          <input type="text" id="ciudad" v-model="datosPaciente.ciudad" />

          <label for="telefono">
            Teléfono *
          <span v-for="error in v$.telefono_paciente.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>
          </label>
          <input type="text" id="telefono" v-model="datosPaciente.telefono_paciente" />

          <label for="password">
            Clave automática *
          <span v-for="error in v$.user.password.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>
          </label>
          <input type="password" id="password" v-model="datosPaciente.user.password"/>
        </div>

        <div class="grid_fields2">
          <label for="longitud">
            Longitud:
          </label>
          <input type="text" id="longitud" v-model="datosPaciente.Longitud" />

          <label for="email">
            Correo electrónico *
          <span v-for="error in v$.user.email.$errors" :key="error.$uid" class="mensajeError"> 
             Campo requerido
          </span>
          </label>
          <input type="email" id="email" v-model="datosPaciente.user.email" />

          <label for="genero">
            Genero 
          </label>
          <select id="genero" v-model="datosPaciente.genero">
            <option v-for="(genero, index) in generos" :key="index">
              {{ genero }}
            </option>
          </select>
        </div>
      </div>
      <p class="nota">Los campos con asterisco (*) son obligatorios para crear el paciente</p>
        <input type="submit" value="Crear" class="botones_aux_view"/>
      
    </form>
  </div>
</template>

<style scoped>


.grid_fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1, 1fr);
  gap: 10px 20px;
  margin-left: 20px;
}

.grid_fields1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 10px 20px;
  margin-left: 20px;
}

.grid_fields2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 1fr);
  gap: 10px 20px;
  margin-left: 20px;
}

.form-container{
  padding: 10px;
  text-align: center;
}

.mensajeError{
  color: red;
  font-size: 10px;
}

.nota{
  color: rgb(100, 97, 97);
  font-size: 10px;
  margin-bottom: 20px;
}

</style>
