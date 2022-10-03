<script setup>
    import { ref } from 'vue';
    import axios from 'axios'
    
    import CuadroInfoPaciente from './CuadroInfoPaciente.vue';
    import TablaHistorialSignos from './TablaHistorialSignos.vue';
    import TablaHistorialSugerencias from './TablaHistorialSugerencias.vue';
    
    const propsIdPaciente = defineProps({
        propsId : Number,
    }) 
    
    //aca recibo el emit del child dropdownpacientes ver tag del componente @response.
    const idPaciente = ref();

    //aca hago el campo que voy a llenar con lo que traiga del DB
    //y luego lo paso como props al child signosvitalessingle.

    const dataFromDBSignos = ref([]);
    const dataFromDBSugerencia = ref([]);
    const dataFromDBPaciente = ref({});
       
    
 
    (async function(){
        idPaciente.value = propsIdPaciente.propsId;
        console.log(propsIdPaciente.propsId);
           
        try {
            //Llamo los datos generales de la DB    
            let responsePaciente = await axios.get(`https://hec2022.herokuapp.com/api/pacientes/${idPaciente.value}/`,
            {headers: {'Authorization': `Bearer ${localStorage.getItem('token_access')}`}});
            let responseSignosVitales = await axios.get('https://hec2022.herokuapp.com/api/signos-vitales/');
            let responseSugerencias = await axios.get('https://hec2022.herokuapp.com/api/sugerencias/');

            dataFromDBPaciente.value = responsePaciente.data;
            //filtro y guardo de acuerdo a user.
            let filteredSignos = responseSignosVitales.data.filter(element => element.id_paciente === idPaciente.value);
            let filteredSugerencia = responseSugerencias.data.filter(element => element.id_paciente === idPaciente.value);
            
            
            //un array de objs vacio y se asigna al obj que enviamos al componente
            let emptySignos = [{
                    fecha_muestra : null,
                    oximetria: null,
                    freq_cardiaca : null,
                    freq_respiratoria: null,
                    temperatura: null,
                    presion_arterial: null,
                    glicemias: null,
                    id_paciente: idPaciente.value,                
                }];
            let emptySugerencia = [{
                    fecha_sugerencia : null,
                    sugerencia: '',
                    id_paciente: idPaciente.value              
                }];

            if(filteredSignos.length == 0){
                dataFromDBSignos.value = emptySignos;

            }
            else{

                filteredSignos.sort((a, b) => b.id - a.id);
                for(const item of filteredSignos){
                    item.fecha_muestra = item.fecha_muestra.replace('T', ' ');
                    let index = item.fecha_muestra.indexOf(':', 14);
                    item.fecha_muestra = item.fecha_muestra.slice(0,index);
                }
                dataFromDBSignos.value = filteredSignos;

            }


            if(filteredSugerencia.length == 0){
                dataFromDBSugerencia.value = emptySugerencia;

            }
            else{
                filteredSugerencia.sort((a, b) => b.id - a.id);
                dataFromDBSugerencia.value = filteredSugerencia;

            }


        
        } catch (error) {
            console.error(error);
        }
    
    
        console.log(idPaciente.value)
    })();
    
     
    </script>
    
    <template>
        <div class="diagnostico_container">
 
            <div class="campo_componente_info_paciente">
                <CuadroInfoPaciente :data="dataFromDBPaciente"/>

            </div>
            <div class="tablas_historia">
                    <div class="signos">
                    <TablaHistorialSignos :listaSignos="dataFromDBSignos" />

                    </div>
                <div class="sugerencias">
                    <TablaHistorialSugerencias :listaSugerencias="dataFromDBSugerencia" />
                </div>
         

            </div>
 
    
    
        </div>
    
    </template>
    
    <style scoped>

        .tablas_historia {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .campo_componente_info_paciente{
            padding: 10px;
            background-color: #FFFFFF;
            border: 1px solid #76E3D0;
            border-radius: 10px;
        }
    

    
    </style>