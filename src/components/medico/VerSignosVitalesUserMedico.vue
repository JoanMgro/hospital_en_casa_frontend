<script setup>
    import { ref, watch } from 'vue';
    import axios from 'axios'
    import DropDownPacientes from '../DropDownPacientes.vue';
    import SignosVitalesSingle from '../SignosVitalesSingle.vue';
    import FieldSugerenciaCuidado from '../FieldSugerenciaCuidado.vue';

    
    //aca recibo el emit del child dropdownpacientes ver tag del componente @response.
    const idPaciente = ref();

    //aca hago el campo que voy a llenar con lo que traiga del DB
    //y luego lo paso como props al child signosvitalessingle.

    const dataFromDB = ref({});
    const dataFromDBSugerencia = ref({});
       
    
 
    
    
    
    watch(idPaciente, async () =>{

           
        try {
    
            let response = await axios.get('https://hec2022.herokuapp.com/api/signos-vitales/');
            let responseSugerencias = await axios.get('https://hec2022.herokuapp.com/api/sugerencias/');


            let filteredData = response.data.filter(element => element.id_paciente === idPaciente.value);
            let filteredSugerencia = responseSugerencias.data.filter(element => element.id_paciente === idPaciente.value);
            
            //un obj vacio y se asigna al obj que enviamos al componente
            let emptyObj = {
                    fecha_muestra : null,
                    oximetria: null,
                    freq_cardiaca : null,
                    freq_respiratoria: null,
                    temperatura: null,
                    presion_arterial: null,
                    glicemias: null,                 
                }
            let emptySugerencia = {
                    fecha_sugerencia : null,
                    sugerencia: '',
                    id_paciente: idPaciente.value              
                }

            if(filteredData.length == 0){
                alert('No hay Signos vitales Registrados');
                          
                dataFromDB.value = emptyObj;
                dataFromDBSugerencia.value = emptySugerencia;                
             }
            else{
                //Saco el dato mas reciente y lo asigno.
                dataFromDB.value = filteredData[filteredData.length - 1];
                dataFromDB.value.fecha_muestra = dataFromDB.value.fecha_muestra.replace('T', ' ');
                let index = dataFromDB.value.fecha_muestra.indexOf(':', 14);
                console.log(index);
                dataFromDB.value.fecha_muestra = dataFromDB.value.fecha_muestra.slice(0,index);
                console.log(dataFromDB.value);
                
                if(filteredSugerencia.length == 0){
                    dataFromDBSugerencia.value = emptySugerencia;                
                }else{
                    dataFromDBSugerencia.value = filteredSugerencia[filteredSugerencia.length - 1];
                    console.log(dataFromDBSugerencia.value);
                }

            }
            
        } catch (error) {
            console.error(error);
        }
    
    
       
    });
    
    
    
    </script>
    
    <template>
        <div class="diagnostico_container">
            <div class="campo_seleccion_paciente">
                <DropDownPacientes @response="(dato) => idPaciente = dato" />
            </div>
            <div class="campo_componente_diagnostico">

                <SignosVitalesSingle :datosTabla="dataFromDB"/>
                <FieldSugerenciaCuidado :propsTextoSugerencia="dataFromDBSugerencia" />
            </div>
         
    
    
        </div>
    
    </template>
    
    <style scoped>
    

    
    </style>