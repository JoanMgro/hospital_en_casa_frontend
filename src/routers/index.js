import { createRouter, createWebHistory } from "vue-router";

//Se importan los componentes
//import App from '../App.vue'
import LogIn from '../views/LogIn.vue'
import HomeAuxiliarView from '../views/HomeAuxiliarView';
import HomeMedicoView from '../views/HomeMedicoView.vue';
import HomePacienteView from '../views/HomePacienteView.vue';

import CrearPaciente from '../components/CrearPaciente.vue';
import CrearMedico from '../components/CrearMedico.vue';
import ConsultarPaciente from '../components/ConsultarPaciente.vue';
import ListarPacientes from '../components/ListarPacientes.vue';
import CrearFamiliar from '../components/CrearFamiliar.vue';
import AsignarPersona from '../components/AsignarPersona.vue';
import AsignarMedico from '../components/AsignarMedico.vue';
import HomeFamiliarView from "@/views/HomeFamiliarView.vue";


//Se crea una lista de objetos ruta. especificando el componente que queremos en cada una.
const routes = [
    {path: '/', name: 'login', component: LogIn},
    {path: '/admin', name: 'admin', component: HomeAuxiliarView},
    {path: '/personal-medico', name: 'personal-medico', component: HomeMedicoView},
    {path: '/paciente', name: 'paciente', component: HomePacienteView},
    {path: '/familiar', name: 'familiar', component: HomeFamiliarView},



    {path: '/admin/creacion-paciente', name: 'crear-paciente', component: CrearPaciente},
    {path: '/admin/creacion-medico', name: 'crear-medico', component: CrearMedico},
    {path: '/admin/consultar-paciente', name: 'consultar-paciente', component: ConsultarPaciente},
    {path: '/admin/listar-pacientes', name: 'listar-pacientes', component: ListarPacientes},

    //rutas temporales
    {path: '/admin/creacion-familiar', name: 'crear-familiar', component: CrearFamiliar},

    {path: '/admin/asignar-persona', name: 'asignar-persona', component: AsignarPersona},

    {path: '/admin/asignar-medico', name: 'asignar-medico', component: AsignarMedico}



];

//Se construye el objeto router con campo history y las rutas. 
//routes: routes es lo mismo que solo routes segun ecma
const router = createRouter({
    history: createWebHistory(),
    routes

});


export default router;


