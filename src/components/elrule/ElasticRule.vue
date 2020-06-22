<template>

  <div class="rectangle">
    <div class="row">
      <div class="search-filter col-sm-12 col-md-12 col-lg-12" id="sticky_filter">
        <div class="rule-container">
          <div class="bodycontainer">
            <h4 class="member-heading">Manage URLS</h4>
          </div>
          <div class="formContainer">
            <b-row class="mb-2 um-top-bar um-form">
      
          <b-form inline>
    <label class="sr-only" for="inline-form-input-name">Search</label>
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Search"
    ></b-input>

   <label class="mr-sm-2" for="inline-form-custom-select-pref"></label>
    <b-form-select
      id="inline-form-custom-select-pref"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="[{ text: 'Filter', value: null }, 'Today', 'Last 2days', 'Last 4 days']"
      :value="null"
    ></b-form-select>

    <label class="mr-sm-2" for="inline-form-custom-select-ignore"></label>
   

    <b-button variant="primary">Ignore</b-button>
  </b-form >
          </b-row>
    <b-row class="mb-2">
      <b-col class="col-3 um-sidebar-right">
       
        
        <ElSideBar v-on:svblank="blankOutPicker"  v-on:svrefresh="svrefreshPicker"></ElSideBar>
        
        
      </b-col>
      <b-col class="col-8  um-sidebar-picker">
       
         
        
        <ElPicker v-show="showPicker"  v-on:created="onTagCreated"    v-bind:generalHeaders="pointerGerenal"   v-bind:responseHeaders="pointerResponse" v-bind:selectedRuleUri="pointerRule"> </ElPicker>
        
      </b-col>
    </b-row>
             
           
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./elastic.css";

import ElSideBar from '../../components/elrule/ElSidebar';
import ElPicker from '../../components/elrule/ElPicker';


export default {
  components: { ElSideBar, ElPicker},
  data() {
    return {
      showPicker : false,
      pointerRule:"https://www.verizon.com/home/phone/",
      pointerGerenal:{
                "url": "https://www.verizon.com/home/phone/",
                "method": "PostmanRuntime/7.25.0",
                "statusCode": "1 localhost:9005",
              
                "remoteAddress": "https://www.verizon.com/home/phone/",
                "referralPolicy": "no referral",
              
            },
      pointerResponse:{
            "accept": "*/*",
                "user-agent": "PostmanRuntime/7.25.0",
                "host": "localhost:9005",
                "timeout-access": "<function1>",
                "cookie": "ECOMM_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImFwcE5hbWUiOiJlY29tbV9zdG9yZV9wcm9zcGVjdCIsIlJFRkVSRVJfVVJMIjoiL3Byb3NwZWN0L3RlYWxlYWZUYXJnZXQiLCJjc3BOb25jZSI6IjNhNzc4NTg1MzM2ZDViYzJlOTc3MWY3MDcxYmRkMWI0ZjMzNThlN2I4MWUzMzk0MWUwYTJiMjg4ODE1ZjU1MzQiLCJwbGF5U2Vzc2lvbiI6IlBPVC1ELWIwN2Q1MzBiLTU5NDEtNDVmNy04YjhmLWI5YjdhMWMxYzQ5YXtzNH0iLCJDb3JyZWxhdGlvbklkIjoiT05FRElHSVRBTC0xMDZhYjkxNy1mNGFjLTQyODEtODM5ZS1kMTVjYzA5OTQyNmQtVC0xNTg4NjQ4OTYxNjEwIn0sIm5iZiI6MTU4ODY0ODk2MSwiaWF0IjoxNTg4NjQ4OTYxfQ.jJhfEty9jzNrVtZXMU5yc2JKNQA_Y2Yei1a9QK-UoC4; GlobalSessionID=sfasdfasdf65765676fsadfas7f678sdf; billingId=Sanjeev",
                "postman-token": "0d40cbae-a0b2-4f9b-83a2-317cdd2f6ce3",
                "x-origin-path": "/jsonUri1/",
                "connection": "keep-alive",
                "x-forwarded-for": "10.20.216.50",
                "x-custom-hdr": "Custom Header 1",
                "accept-encoding": "gzip, deflate, br"
      } ,     
     
      form: {
        email: "",
        name: "",
        rqMethod: null,
        checked: []
      },
      rqMethods: [
        { text: "Select One", value: null },
        "GET",
        "POST",
        "DELETE",
        "PUT"
      ],
      show: true
    };
  },
  methods: {
    blankOutPicker(e){
       console.log('sv empty---');
       this.showPicker = false;

    },
    svrefreshPicker(p){
      this.showPicker = true;
      console.log('sv---');
      console.log(p);
      let ruleId = p.rule;
      this.pointerGerenal = p.generalHeaders;
      this.pointerResponse = p.responseHeaders;
      this.pointerRule = p.rule;
    

    }
   
    
  }
};
</script>
<style scoped>
.um-form{
  padding: 20px 0 20px 20px;
}
.rule-right{
  padding-left: 20px;
}

</style>