<template>
    <div class="container">
        <router-link tag="button" class="btn btn-info mb-4"
        to="/">
            Home
        </router-link>
        <form @submit.prevent="addRecipe">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" class="form-control" v-model="title" />
            </div>
            
            <div class="form-group">
                <div :key="index" v-for="(ing, index) in ingredients">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" class="form-control" v-model="ingredients[index]" />
                <p @click="deleteIngredient(index)" class="text-danger">X</p>
                </div>
            </div>

            <div class="form-group">
                <label for="ingredients">Ingredients</label>
                <input @keydown.tab.prevent="addIngredient" type="text" name="ingredients" class="form-control" v-model="ingredient" />
                <p>Press <strong>tab</strong> to add the ingredients</p>
            </div>
            <input type="submit" class="btn btn-light my-3" value="Add Recipe" :disabled="showButton" /> 
        </form>
    </div>
</template>

<script>

import db from '../firebase'; 
import slugify from "slugify"; 

export default {
    name:'RecipeForm',
    data(){
        return {
            title:'', 
            ingredient:'',
            ingredients:[],
            slug:'',
            showButton:false, 
        }
    }, 
    methods:{
        addIngredient(){
            if(this.ingredient.length == 0){
                return;
            }
            this.ingredients.push(this.ingredient); 
            this.ingredient = ''; 
        },
        addRecipe(){ 
            if(this.title.length == 0 || this.ingredients.length == 0){
                return; 
            }
            this.showButton = true; 
            this.slug = slugify(this.title, {
                replacement:'-', 
                remove: /[*+~.()'"!:@]/g, 
                lower:true, 
            })
            var ingredients = [...new Set(this.ingredients)]; 
            db.collection('recipes').add({
                title:this.title,
                ingredients:ingredients.filter(Boolean),
                slug:this.slug, 
            })
            .then(()=>{
                this.$router.push({path:'/'})
            })
            .catch(err=>{
                console.log(err); 
            })
        }, 
        deleteIngredient(id){
            this.ingredients = this.ingredients.filter((ingredient,index)=>{
                return index !=  id;  
            })
        }
    }
    
}
</script>


<style scoped>
    input[type=submit]{
        background: #51c06b;
        border:none; 
        border-radius: 0; 
       
    }
    input[type=submit]:hover{
        background: #b8e994;
        border:none; 
        border-radius: 0;
    }
    .btn-light{
        color: #b71540; 
        font-weight: 700;   
    }
    .text-danger{
        font-size:1.4rem;
        display: inline; 
        font-weight: 500;
        cursor: pointer;
    }
</style>