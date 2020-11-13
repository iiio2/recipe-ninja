import Vue from 'vue';
import VueRouter from 'vue-router'; 
import Index from './components/Index.vue'; 
import RecipeForm from './components/RecipeForm.vue'; 
import UpdateRecipe from './components/UpdateRecipe.vue'; 

Vue.use(VueRouter); 

export default new VueRouter({
    mode:'history', 
    routes:[
        {path:'/', component: Index, name:'Index'},
        {path:'/add-recipe', component: RecipeForm, name:'RecipeForm'},
        {path:'/edit-recipe/:recipe_slug', component:UpdateRecipe, name:'UpdateRecipe'}
    ]
})