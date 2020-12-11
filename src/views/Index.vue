<template>
  <v-row>
    <v-col cols="12" md="4" v-for="(card,index) in cards" :key="index">
     <v-card class="mx-auto" max-width="400">
       <v-img class="white--text align-end" height="200px" :src="card.bgImg">
         <v-card-title>{{ card.title }}</v-card-title>
       </v-img>
       <v-card-text class="text--primary">
         <div>{{ card.title }}</div>
       </v-card-text>
       <v-card-actions>
         <v-btn color="orange" text>
            share
         </v-btn>
         <v-btn color="orange" text>
           Explore
         </v-btn>
       </v-card-actions>      
     </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
     cards:[]  
  }),
  created() {
    this.axios.get('/cards').then((res) =>{
      console.log(res.data.data)
      this.cards = res.data.data
    })
  }
}
</script>
<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
