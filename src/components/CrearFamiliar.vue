<script setup>
import { ref } from "vue";
import axios from "axios";
import useVuelidate from '@vuelidate/core'
import { required, email} from '@vuelidate/validators'  
import DropDownPacientesSinSubmit from "./DropDownPacientesSinSubmit.vue";


const datosFamiliar = ref({
  user: {
    email: "",
    password: "",
    tipo_usuario: "FAMILIAR",
  },
  cedula_familiar: "",
  nombres_familiar: "",
  apellidos_familiar: "",
  genero: "",
  telefono_familiar: "",
  parentesco: "",
  id_paciente: "",
});

const validations = ref({
  user: {
    email: { email },
    password: { required },
  },
  cedula_familiar: { required },
  nombres_familiar: { required },
  apellidos_familiar: { required },
  telefono_familiar: { required },
  parentesco: { required },
  id_paciente: { required },
 });

 const v$ = useVuelidate(validations,datosFamiliar)

async function procesarFamiliar() {
  console.log(datosFamiliar.value);
  const result = await v$.value.$validate();

  if (result){

  try {
    let response = await axios.post(
      "https://hec2022.herokuapp.com/api/familiares/",
      datosFamiliar.value,  {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  }
}

</script>

<template>
  <div class="body">
    <h2>Datos Familiar</h2>
    <div class="paciente-container">
      <DropDownPacientesSinSubmit @response="(dato) => datosFamiliar.id_paciente = dato"/>
    </div>
    
    <form class="form-container" @submit.prevent= 'procesarFamiliar'>
      <div class="colum-form">
        <div class="grid_fields">
          <label for="nombres">
            Nombres *
            <span v-for="error in v$.nombres_familiar.$errors" :key="error.$uid" class="mensajeError">
              Campo requerido
            </span>
          </label>
          <input
            type="text"
            id="nombres"
            v-model="datosFamiliar.nombres_familiar"
          />

          <label for="parentesco">
            Parentesco *
             <span v-for="error in v$.parentesco.$errors" :key="error.$uid" class="mensajeError">
              Campo requerido
             </span>
          </label>
          <input
            type="text"
            id="parentesco"
            v-model="datosFamiliar.parentesco"
          />

          <label for="telefono">
            Teléfono *
            <span v-for="error in v$.telefono_familiar.$errors" :key="error.$uid" class="mensajeError">
              Campo requerido
            </span>

          </label>
          <input
            type="text"
            id="telefono"
            v-model="datosFamiliar.telefono_familiar"
          />

          <label for="genero">
            Genero
          </label>
          <select id="genero" v-model="datosFamiliar.genero">
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="N/A">N/A</option>
          </select>
        </div>

        <div class="grid_fields2">
          <label for="apellidos">
            Apellidos *
            <span v-for="error in v$.apellidos_familiar.$errors" :key="error.$uid" class="mensajeError">
               Campo requerido
            </span>
          </label>
          <input
            type="text"
            id="apellidos"
            v-model="datosFamiliar.apellidos_familiar"
          />

          <label for="email">
            Correo eléctronico *
            <span v-for="error in v$.user.email.$errors" :key="error.$uid" class="mensajeError">
               Correo no valido
            </span>
          </label>
          <input type="email" id="email" v-model="datosFamiliar.user.email" />

          <label for="cedula">
            Documento número *
            <span v-for="error in v$.cedula_familiar.$errors" :key="error.$uid" class="mensajeError">
               Campo requerido
            </span>
          </label>
          <input
            type="number"
            id="cedula"
            v-model="datosFamiliar.cedula_familiar"
          />

          <label for="password">
            Clave automática *
            <span v-for="error in v$.user.password.$errors" :key="error.$uid" class="mensajeError">
               Campo requerido
            </span>
          </label>
          <input
            type="password"
            id="password"
            v-model="datosFamiliar.user.password"
          />
        </div>
      </div>
        <p class="nota">Los campos con asterisco (*) son obligatorios para crear el Familiar</p>
         <input type="submit" value="Crear"  class="botones_aux_view"/>
       
    </form>

   
  </div>
</template>


<style scoped>
.grid_fields2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  gap: 10px 10px;
  margin-left: 20px;
}

.grid_fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  gap: 10px 0px;
  margin-left: 20px;
}

.colum-form {
  display: flex;
  padding: 10px;
}

.body{
    width: 100%;
    height: 97vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
}

.paciente-container{
  width: auto;
  background-color: #b5e4dc;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
}

.form-container{
  padding: 10px;
  text-align: center;
}

.botones_aux_view{
  margin: 30px;
}

.nota{
  color: rgb(100, 97, 97);
  font-size: 10px;
  margin-top: 20px;
}

.mensajeError{
  color: red;
  font-size: 10px;
}

</style>
