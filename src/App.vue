<template>
  <div id="app">
    <h2 class="text-center my-3">{{ title }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title:'Recipe Ninja!'
    }
  }
}
</script>

<style>

</style>
