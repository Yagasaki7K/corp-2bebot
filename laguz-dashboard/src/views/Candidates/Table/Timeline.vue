<template>
  <div>
    <div
      v-for="(d, i) in data"
      :key="i"
    >
      <timeline-item :leading="format(d.updated_at)" :color="d.color" :trailing="transpileStatus(d)" />
    </div>
  </div>
</template>

<script>
import TimelineItem from "./TimelineItem";
import { format } from 'date-fns';
export default {
  props:{
    data: {
      type: Array,
      default: () => [],
    }
  },
  mounted(){
  },
  components: {
    TimelineItem,
  },
  methods:{
    format(date){
      return format(Date.parse(date), 'dd/MM/yyyy HH:mm:ss');
    },
    transpileStatus(data){
      if(data.event === 'done') return 'Finalizado';
      if(data.event === 'assigned') return `Atribuído: ${data.distributor.url_username || 'Não definido'} `;
      if(data.event === 'declined' || data.event === 'denied') return 'Negado';
      if(data.event === 'reallocated' ) return 'Transferido'
      if(data.event === 'opened' ) return 'Aberto'
      return data.event
    }
  }
};
</script>

<style>
</style>