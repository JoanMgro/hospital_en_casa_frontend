<script setup>
    //import { ref } from 'vue';
        const propsListaSugerencias = defineProps({
            listaSugerencias : Array,
        })
    
        //const refListaSignos = ref([]);
    
        //const showTable = ref(false)
    
    
    </script>
    
    <template>
        <div class="app_listar_sugerencias">
            <div>
                <h2>Sugerencias de Cuidado</h2>
            </div>
    
            <table class="table">
            <thead class="table_head">
                <tr class="head_row">
                <td>Fecha Sugerencia</td>
                <td>Descripcion</td>
            
                </tr>
            </thead>
            <tbody class="body" >
                <tr class="body_row" v-for="(sugerencia, index) in propsListaSugerencias.listaSugerencias" :key="index">
                <td>{{sugerencia.fecha_sugerencia}}</td>
                <td>{{sugerencia.sugerencia}}</td>

                </tr>
            </tbody>
            </table>
    
    
        </div>
    
       
        
    
    
    </template>
    
    <style scoped>
    
        .app_listar_sugerencias{
            border: 1px solid #76E3D0;
            border-radius: 10px;
            width: 100%;
            height: 500px;
    
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 20px;
            padding-left: 10px;
            padding-right: 10px;
            
        }
    
        .table{
            width: 100%;
            
        }
    
        .table_head{
            font-weight: 700;
            font-size: 0.7rem;
            text-align: center;
            color: #2B7B63;
            height: 50px;
        }
    
        .body_row{
            text-align: center;
            height: 40px;
            font-size: 0.8rem;
        }
    
    
    </style>
    