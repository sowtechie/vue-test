<template>
  <div>
    <b-row >
       <div class="sideh-container">
                <span> <span>
              <b-form-checkbox
                id="checkboxes-21"
               
                v-model="formSideBar.gallRules"
              >Select All</b-form-checkbox>
            </span></span>
               <div class="a-container a-offset" >
                   <span> <a href="#">New </a> </span>
                  <span style="padding-left: 10px;"><a href="#">Ignored </a></span>
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
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
           <div style="margin-top:10px;">
                  <b-form-checkbox
                   
                    v-model="rowSelected"
                  ></b-form-checkbox>
         </div>
          <!--
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
          -->
        </template>
        <template v-else>
           <span style="padding-top:10px;">
                  <b-form-checkbox
                   
                    v-model="rowSelected"
                  ></b-form-checkbox>
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
             
              <span class="space-left">{{row.item.created_last}}</span>
            </div>
            <div>
             
              <span class="space-left">{{row.item.rule_uri}}</span>
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
  data() {
    return {
      formSideBar:{
        gallRules : false        
      },
      //api
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
      items: [
        ],
      selectMode: "single",
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
    console.log("serverURL :" + serverURL);
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
              type:'EMPTY_RULES'
           };
            this.svcol = response.data.content;
            this.$emit("svblank", param);
            return;
        }
        this.svcol = response.data.content;
        console.log("sv ---got server data");
        console.log(response);

        this.svcol.map((o, i) => {
          o["generalHeaders"] = o["requestHeaders"];
          o["rule_uri"] = o["requestUrl"];
          o["is_selected"] = false;
          o["created_last"] = "08/1 10:00 AM";
          if (!o["responseHeaders"]) {
            o["responseHeaders"] = {};
          }
          if (
            o["responseHeaders"] &&
            Object.keys(o["responseHeaders"]).length < 1
          ) {
            o["responseHeaders"] = {  };
          }
        });

        console.log("svmod data-----");
        console.log(this.svcol);
        this.items = this.svcol;
        console.log("svmod data ,,,");
      })
      .catch(error => console.log(error));
  },
  methods: {
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

.sideh-container{
   color: blue !important;
   display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 10px;

}
.sideh-container span, a {
   color: blue !important;
}
.a-container{
   display: flex;
  flex-direction: row;
  justify-content: right;

}

.sideh-container > span{
  padding-left: 27px;
}


.a-offset{
  padding-left: 125px;
}




tr td span .custom-control {
   top: 10px;
    position: relative;
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5rem;
}
</style>