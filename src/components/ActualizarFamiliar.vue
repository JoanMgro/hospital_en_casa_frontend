<script setup>
    import { ref } from "vue";
    import axios from "axios";

    const propsHomeFamiliar = defineProps({
        currentData : {}
    });

      
    const datosFamiliar = ref({
        user: {
            email: "",
        },
        telefono_familiar: "",
    });

    

    async function procesarNuevosDatos(){

        console.log(datosFamiliar.value)
        // const newObj = {};
        // const newSubObj = {};
        // for (const [key, value] of Object.entries(datosFamiliar.value)){

        //     if(typeof value === 'object')
        //     {
        //         for(const [key2, value2] of Object.entries(value)){
                    
        //             if(value2 != ''){
        //             newSubObj[key2] = value2;
        //             newObj[key] = newSubObj;

        //             }

        //         }

        //     }else {
        //         if(value != ''){
        //             newObj[key] = value;
        //         }

        //     }
        //     console.log(propsHomeFamiliar.currentData.cedula_familiar);

                       
        // }

        try {
            const newObj = {
                telefono_familiar : datosFamiliar.value.telefono_familiar
            }
            const newEmail = {
                email : datosFamiliar.value.user.email
            }

            console.log(newEmail);
        if(newEmail.telefono_familiar != ''){
            let response = await axios.patch(
            `https://hec2022.herokuapp.com/api/familiares/${propsHomeFamiliar.currentData.cedula_familiar}/`, 
            newObj,  {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            
            console.log(response.data);
            datosFamiliar.value.telefono_familiar = ''; //se borra al reasignar la variable.

        }
        //por alguna razon esto no funciona. el servidor no deja conectar si se cambia el correo.
        //en nuestro caso seria mejor crear un nuevo usuario y asociarlo al paciente.
        // if(newEmail.email != ''){
        //    let response = await axios.patch(
        //     `https://hec2022.herokuapp.com/api/users/${propsHomeFamiliar.currentData.user.id}/`, newEmail);
        //     console.log(response.data);
        //     alert('Debe Salir e iniciar sesion con nuevo correo');
        // }
        

 


        } catch (error) {

            console.error(error);
            
        }

        



    }
    
    //(function(){let ybo = propsHomeFamiliar.currentData;})();


    
    </script>
    
    <template>
      <div class="body">
        <h2>Datos Familiar</h2>
        <div>
            <div><span>Telefono actual: </span>{{propsHomeFamiliar.currentData.telefono_familiar}}</div>
            <!-- <div><span>Correo actual: </span>{{propsHomeFamiliar.currentData.user.email}}</div> -->
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
                
                v-model ="datosFamiliar.telefono_familiar"
                
              />
    
             <!-- <label for="direccion">
                Nueva Direccion
              </label>
              <input type="text" id="direccion"
              v-model ="datosFamiliar.direccion"
              />  -->
    
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
    