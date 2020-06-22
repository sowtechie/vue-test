<template>
  <div>
    <b-row>
      <div class="sideh-container">
        <!--
         <div class="navbar-collapse collapse" id="navbarCustom">
              <ul class="navbar-nav">
                  <li class="nav-item active">
                      <a class="nav-link" href="#">Active</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                  </li>
              </ul>
           </div>   
           -->
        
        <span class="tb-container svactive-not-select">
            <span>
              <b-form-checkbox
                id="checkboxes-21"
                @change="onNewMessages"
                v-model="formSideBar.gallRules"
              ></b-form-checkbox>
            </span>
            <span class="tb-box-2">Select</span>
        </span>
        <div class="a-container a-offset">
          
           
          
          <span class="sv-rule-selected svactive-tree ">
            <a  href="#">New</a>
          </span>
          <span class="svactive-not-tree" style="padding-left: 10px;">
            <a href="#">Ignored</a>
          </span>
          

        </div>
        

      </div>
    </b-row>
    <b-table
      id="svsidebar"
      sticky-header
      :items="items"
      head-variant="light"
      :per-page="pageSize"
      :current-page="currentPage"
      :show-empty="true"
      :filter="filter"
      ref="svib"
      selectable
      :select-mode="selectMode"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <div style="margin-top:10px;">
            
            <b-form-checkbox v-model="rowSelected"></b-form-checkbox>
          </div>
          <!--
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
          -->
        </template>
        <template v-else>
          <span style="padding-top:10px;">
            <b-form-checkbox v-model="rowSelected"></b-form-checkbox>
          </span>
          <!--
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
          -->
        </template>
      </template>
      <template v-slot:cell(rule_uri)="row">
        <div class="s-container">
          <div class="s-box2">
            <div>
              <span   class="space-left text-muted rule-secondary ">{{row.item.created_last}}</span>
            </div>
            <div>
              <span    class="space-left text-rule rule-primary">{{row.item.rule_uri}}</span>
            </div>
          </div>
        </div>
      </template>
    </b-table>

    <b-row>
      <b-col class="col-8">
        <b-pagination
          :total-rows="filteredOrigins.length"
          v-model="currentPage"
          :per-page="pageSize"
          :hide-goto-end-buttons="true"
          size="sm"
          align="right"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import config from "config";
export default {
  props:['filter'],
  data() {
    return {
      formSideBar: {
        gallRules: false
      },
      //api
      //filter: 'xml',
        filterOn: [],
      svcol: null,
      //api..
      svpointer: null,
      total: 0,
      next: null,
      pageSize: 5,
      currentPage: 1,

      modes: ["multi", "single", "range"],
      fields: [
        { label: "Sel", key: "selected" },
        { label: "        New Ignored", key: "rule_uri" }
      ],
      items: [],
      selectMode: "multi",
      selected: [],

      headers: [],

      form: {
        name: "sv"
      },

      show: true
    };
  },
  created: function() {
    let serverURL = `${config.headerStatusUrl}/getAllParameters`;
    // let serverURL = 'http://localhost:8080/svstatus'
  
    axios
      .get(serverURL)
      .then(response => {
        if (!(response && response.data && response.data.content)) {
          console.log(
            "Service error - Please contact Backend admin for Services error or Retry later"
          );
          return;
        }
        if (response.data.content.length < 1) {
          console.log(
            "Services has empty data content is empty array expected list of sampling urls"
          );
          let param = {
            type: "EMPTY_RULES"
          };
          this.svcol = response.data.content;
          this.$emit("svblank", param);
          return;
        }
        this.svcol = response.data.content;
       
        this.svcol.map((view, i) => {
          view["generalHeaders"] = view["requestHeaders"];
          view["rule_uri"] = view["requestUrl"];
          view["is_selected"] = false;
          view["created_last"] = "08/1 10:00 AM";
          if (!view["responseHeaders"]) {
            view["responseHeaders"] = {};
          }
          if (
            view["responseHeaders"] &&
            Object.keys(view["responseHeaders"]).length < 1
          ) {
            view["responseHeaders"] = {};
          }
        });

       
        this.items = this.svcol;
       
      })
      .catch(error => console.log(error));
  },
  methods: {
    onNewMessages() {
     
      if (this.formSideBar.gallRules === false) {
        this.$refs.svib.clearSelected();
        this.$refs.svib.selectAllRows();
        this.formSideBar.gallRules = true;
      } else {
        this.$refs.svib.clearSelected();
        this.formSideBar.gallRules = false;
      }


    },
    onRowSelected(items) {
      this.selected = items;

      let param = {
        rule: this.selected[0].rule_uri,
        created_last: this.selected[0].created_last,
        responseHeaders: this.selected[0].responseHeaders,
        generalHeaders: this.selected[0].generalHeaders
      };
      this.svpointer = param;
      this.$emit("svrefresh", param);
    }
  },
  computed: {
    filteredOrigins() {
      return this.items;
    },
    maxPage() {
      let total = this.items.length;
      let page = Math.floor(
        total / this.pageSize + (total % this.pageSize > 0 ? 1 : 0)
      );
      return Math.max(page, 1);
    }
  }
};
</script>

<style scoped>
.s-container {
  display: flex;
  flex-direction: row;

  padding-bottom: 1px;
  padding-top: 1px;
}
.s-cb-container {
  display: flex;
  justify-content: center;
  flex-flow: column;
}
.s-box1 {
  align-content: center;
}
.s-box2 {
  font-size: 14px;
}
.space-left {
  padding-left: 10px;
}

table .table .thead-light th {
  background-color: #fff !important;
  border-top: 0px !important;
}

.sideh-container {
  color: blue !important;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 10px;
}
.sideh-container span,
a {
  color: blue !important;
}
.a-container {
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.sideh-container > span {
  padding-left: 27px;
}

.a-offset {
  padding-left: 105px;
}

tr td span .custom-control {
  top: 10px;
  position: relative;
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
}
.table tr:nth-child(3n+3) {  
  color: #ccc;
   background: red !important;
}
td:nth-child(1) {
  color: red !important;
}
td:nth-child(1) {
  color: red !important;
}

.tb-container{
   display: flex;
    flex-direction: row;
}
.tb-box-2{
  padding-left: 35px;;
}
.sv-rule-selected{
  /*color: #0d2a35 !important; */
    color: #575f65 !important;
  text-decoration: none;
}
.sv-rule-selected a {

    color: #0d2a35 !important;
}


.a-container a:hover, .a-container a:active {

    color: #ffffff !important;
   
    padding-left: 0.5rem;
    padding-top:0.5rem;
     padding-bottom: 0.5rem;
     padding-right: 0.5rem;

     text-decoration-line: none;
     text-decoration-style: solid;

     background-color:rgba(48,197,189, 0.6) ;

}


.a-container .svactive-tree {

    color: #ffffff !important;
    text-decoration: none;
     padding-left: 0.5rem;
      padding-right: 0.5rem;
    padding-top:0.5rem;
     padding-bottom: 0.5rem;
     
   /*
   48 197 189
    
     padding-right: 0.5rem; */
    
    background-color:rgba(48,197,189, 1.0) ;/* add background-color to active links */

}


.a-container .svactive-not-tree {

    
    text-decoration: none;
     padding-left: 0.5rem;
      padding-right: 0.5rem;
    padding-top:0.5rem;
     padding-bottom: 0.5rem;
     
   /*
   
    
     padding-right: 0.5rem; */
    
   

}
.svactive-not-select{
  padding-top:0.5rem;
}

.text-muted{
  color: #929ba2 !important;
}
 
 .text-rule{
   color: #575f65 !important;
  
 }
 .rule-secondary{
    font-size: 14px;

 }
 .rule-primary{
   font-size: 16px;

 }
/*navbar .. */
</style>