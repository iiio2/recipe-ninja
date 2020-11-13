<template>
    <div class="container">
        <router-link tag="button" class="btn btn-info mb-4"
        to="/add-recipe">
            Add Recipe
        </router-link>
        <div class="row">
            <div class="col-sm-4 py-4" v-for="recipe in recipes" :key="recipe.id">
                <button @click="deleteRecipe(recipe.id)" class="btn btn-danger btn-sm">X</button>
                <button @click="updatePage(recipe)" class="btn btn-success btn-sm">@</button>
                <h3 class="mb-4 mt-2">{{ recipe.title }}</h3>
                <ul>
                    <li :key="index" v-for="(ingredient,index) in recipe.ingredients">
                        {{ ingredient }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import db from "../firebase";

export default {
    name:'Index', 
    data(){
        return {
            recipes:[],
        }
    }, 
    created(){
        db.collection('recipes').get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{ 
                var recipe = doc.data(); 
                recipe.id = doc.id; 
                this.recipes.push(recipe); 
            })
            console.log(this.recipes); 
        })
    },
    methods:{
        deleteRecipe(id){
            db.collection('recipes').doc(id).delete()
            .then(()=>{
                this.recipes = this.recipes.filter(recipe=>{
                    return recipe.id != id;  
                })
            })
            .catch(err=>{
                console.log(err); 
            })
        },
        updatePage(recipe){
            this.$router.push({name:'UpdateRecipe', params:{recipe_slug: recipe.slug }}); 
        }
    }
}
</script>



<style scoped>
    .col-sm-4{
        border: 2px solid #333;
        margin: 5px; 
    }
</style>