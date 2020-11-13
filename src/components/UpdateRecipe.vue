<template>
    <div class="container">
        <router-link tag="button" class="btn btn-info mb-4"
        to="/">
            Home
        </router-link>
        <h3>Edit Recipe</h3>
        <form @submit.prevent="editRecipe">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" class="form-control" v-model="recipe.title" />
            </div>
            
            <div class="form-group">
                <div :key="index" v-for="(ing, index) in recipe.ingredients">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" class="form-control" v-model="recipe.ingredients[index]" />
                <p @click="deleteIngredient(index)" class="text-danger">X</p>
                </div>
            </div>

            <div class="form-group">
                <label for="ingredients">Ingredients</label>
                <input @keydown.tab.prevent="addIngredient" type="text" name="ingredients" class="form-control" v-model="ingredient" />
                <p>Press <strong>tab</strong> to add the ingredients</p>
            </div>
            <input type="submit" class="btn btn-light my-3" value="Edit Recipe" :disabled="showButton" /> 
        </form>
    </div>    
</template>

<script>

import db from '../firebase'; 
import slugify from 'slugify'; 

export default {
    name:'UpdateRecipe', 
    data(){
        return {
            recipe:'',
            ingredient:'', 
            showButton:false, 
        }
    },
    created(){
        var ref = db.collection('recipes').where('slug','==', this.$route.params.recipe_slug); 
        ref.get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.recipe = doc.data(); 
                this.recipe.id = doc.id;  
            })
        })
    },
    methods:{
        editRecipe(){
            if(this.recipe.title.length == 0 || this.recipe.ingredients.length == 0){
                return; 
            }
            this.showButton = true; 
            this.recipe.slug = slugify(this.recipe.title,{
                replacement:'-', 
                remove: /[*+~.()'"!:@]/g, 
                lower:true,
            }); 
            var ingredients = [...new Set(this.recipe.ingredients)]; 
            db.collection('recipes').doc(this.recipe.id).update({
                title:this.recipe.title,
                ingredients:ingredients.filter(Boolean), 
                slug:this.recipe.slug, 
            })
            .then(()=>{
                this.$router.push({path:'/'}); 
            })
            .catch(err=>{
                console.log(err);
            })
        },
    addIngredient(){
        if(this.ingredient.length == 0){
            return; 
        }
        this.recipe.ingredients.push(this.ingredient); 
        this.ingredient = ''; 
    }, 
    deleteIngredient(id){
        this.recipe.ingredients = this.recipe.ingredients.filter((ingredient, index)=>{
            return index != id;  
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