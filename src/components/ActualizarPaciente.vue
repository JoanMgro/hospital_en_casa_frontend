<script setup>
    import { ref } from "vue";
    import axios from "axios";

    const propsHomePaciente = defineProps({
        currentData : {}
    });

      
    const datosPaciente = ref({
        user: {
            email: "",
        },
        telefono_paciente: "",
        direccion: '',
    });

    

    async function procesarNuevosDatos(){

        console.log(datosPaciente.value)


        try {
            const newObj = {
                telefono_paciente : datosPaciente.value.telefono_paciente,
                direccion : datosPaciente.value.direccion,
            }
            const newEmail = {
                email : datosPaciente.value.user.email
            }

            console.log(newEmail);
        if(newEmail.telefono_paciente != ''){
            let response = await axios.patch(
            `https://hec2022.herokuapp.com/api/pacientes/${propsHomePaciente.currentData.cedula_paciente}/`, 
            newObj,  {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            
            console.log(response.data);
            datosPaciente.value.direccion = '';
            datosPaciente.value.telefono_paciente = '';
            

        }

        } catch (error) {

            console.error(error);
            
        }

    }
    


    
    </script>
    
    <template>
      <div class="body">
        <h2>Datos Paciente</h2>
        <div>
            <div><span>Telefono actual: </span>{{propsHomePaciente.currentData.telefono_paciente}}</div>
            <div><span>Dirección actual: </span>{{propsHomePaciente.currentData.direccion}}</div>
        </div>

        <form class="form-container" @submit.prevent ="procesarNuevosDatos">
          <div class="colum-form">
            <div class="grid_fields">
            
            <label for="telefono">
                Nuevo Teléfono    
              </label>
              <input
                type="text"
                id="telefono"
                
                v-model ="datosPaciente.telefono_paciente"
                
            />

            <label for="direccion">
                Nueva dirección    
              </label>
              <input
                type="text"
                id="direccion"
                
                v-model ="datosPaciente.direccion"
                
            />
    
            </div> 
          </div>

             <input type="submit" value="Actualizar Datos"  class="botones_aux_view"/>
           
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