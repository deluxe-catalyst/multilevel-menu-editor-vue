import { createRouter, createWebHistory } from 'vue-router'
import calculatePath from './calculatePath';
import PageContent from '../components/PageContent/PageContent.vue';
import axiosInstance from './axios.config';

function calculateRoute(array, item){
  return {
    path: calculatePath(array, item.id),
    name: item.id,
    component: PageContent,
    props: { title: item.title, content: item.content }
  }
}

async function updateRoutes(){
  try {
      await axiosInstance
      .get('/menu')
      .then(response => {
        response.data.forEach(item => {
          routes.push(calculateRoute(response.data, item));
        })
      })
  } catch (error) {
      console.error(error);
  }
};

let routes = []
await updateRoutes()

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
export {calculateRoute};