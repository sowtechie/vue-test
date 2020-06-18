<template>
  <div>
       <b-row class="block-start ">
                 <b-col class="col-1 ">
                 </b-col>
                 <b-col class="col-7">
                     <div class="plus-container">
                         <span class="add-condition-text">New Rule</span>
                         <b-form-select id="input-sc2" v-model="elnform.newRuleName" :options="svtags" required></b-form-select>
                         <div @click="createRule" id="create-action-1" class="extract-start add-plus"> <i class="fa fa-plus-circle " ></i></div> 
                                     <b-tooltip  target="create-action-1" triggers="hover">
                                        Select <b>response headers</b> to push to Elastic Server!
                                    </b-tooltip>
                         <!--
                          <b-button
     
                                @click="createNamedRule" style="min-width:100px; color:#fff; background-color:green"
                            >Create</b-button>
                            -->
                     </div>
                 </b-col>
                
            </b-row>  
  </div>  
</template>

<script>

export default {
  props:['svtags'],
  data() {
    return {

        newItem:'cat',
        elnform :{
            newRuleName:''
        },
        /*
         subjects:[{
          text:'select header', value:null
      },{
           text: "accept", value: "accept"
      },{
          text:'accept-encoding', value:'accept-encoding'
      }],
       acls:[{
          text:'select access', value:null
      },{
           text: "allow", value: "allow"
      },{
          text:'deny', value:'deny'
      }] */
    }
  },
   methods: {
       createRule(evt){
           console.log('click neew rule');

           let param = ['addacess']
           console.log(this.svtags);
           console.log(this.elnform.newRuleName);
           let selects = this.svtags.filter( (o,idx)=>{
               return o['key'] === this.elnform.newRuleName;
           })
           console.log(selects);
           this.newItem = selects[0]
             this.$emit('svcadd', this.newItem);
       }
    
  }
  
};
</script>

<style scoped>
 
</style>
