<template>
  <div>
    <div>
      <p>{{leading}}  <mdb-icon far icon="circle" :color="color"/>  {{trailing}} </p>
    </div>
  </div>
</template>

<script>
  import { mdbIcon } from "mdbvue";
  export default {
    props:['leading','color','trailing'],
    components:{
      mdbIcon
    }
  }

</script>
<style>
  .spinner-1 {
    animation: spinner 1s 1s infinite linear;
  }
  .spinner-2 {
    animation: spinner 2s 2s infinite linear;
  }
  @keyframes spinner {
    0% {
    transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
</style>
