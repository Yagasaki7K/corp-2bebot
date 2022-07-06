<template>
  <mdb-col  class="m-0" lg="2" m="3" md="6">
    <mdb-card ref="card">
      <mdb-card-body>
        <div>
          <mdb-col class="pl-0"  col="2">
           <div class="square">
             <div class="inside-square first-square"></div>
             <div class="inside-square"></div>
             <div class="inside-square"></div>
             <div class="inside-square"></div>
           </div>
          </mdb-col>
        </div>
        <div >
          <mdb-col  class="value-candidatura">{{value}}</mdb-col>
          <mdb-col class="candidatura">{{description}}</mdb-col>
        </div>
        
      </mdb-card-body>
    </mdb-card>
  </mdb-col>
</template>

<script>
import {
  mdbCard,
  mdbCardBody,
  mdbCol,
} from "mdbvue";
export default {
  components: {
    mdbCol,
    mdbCard,
    mdbCardBody,
  },
  props: {
    value: {
      type: String,
      default: '250'
    },
    description: {
      type: String,
      default: 'Descrição'
    },
    bgColor: {
      type: String,
      default: '#3E3AF3'
    }
  },
  mounted(){
    this.setColors()
  },
  methods: {
    setColors() {
      this.$refs.card.$el.style.backgroundColor = this.bgColor
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px !important;
  height: 75px !important;    
  color: #FFFFFF;
  border-radius: 12px;
  padding: 2px;
}
.icon{
  font-size: 12px;
  padding-left: 0px !important;
}
.value-candidatura{
  /* font-family: Poppins !important; */
  font-size: 22px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  letter-spacing: 0em !important;
  text-align: left !important;
  padding-left: 0 !important;
  line-height: 120% !important 
}
.candidatura{
  /* font-family: Poppins; */
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 0 !important;
}
.card-body {
  margin-bottom: 0 !important;
  padding: 0 !important;
  padding-left: 10px !important;
  height: 75px !important;
}
.m-3{
  margin: 0px !important;
}
.square{
  width: 25px;
  height: 25px !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
}
.inside-square{
  width: 40%;
  height: 40%;
  border-radius: 3px;
  margin-right: 1px;
  margin-bottom: 1px;
  background: #ffffff69;
  border-radius: 1.5px;
}
div.inside-square.first-square {
    background: #FFFFFF !important;
}
</style>