//import { createApp } from 'vue'
import App from './App.vue'

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
//createApp(App).mount('#app')


import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
         key: 'AIzaSyCdbi5IYqf2--Ae36QNKAn3BN4Q7u7s_j0',
        libraries: "places",
    },
}).mount('#app')
