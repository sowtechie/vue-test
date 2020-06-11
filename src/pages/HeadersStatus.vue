<template>
  <div>
    <div class="alert alert-info">Http Request Samples</div>
    <div class="accordion" id="accordionExample">
      <div class="card" v-for="(headersStatusObject, parentIndex) in urlheaderStatuses">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button
              class="btn btn-link btn-block text-left"
              type="button"
              data-toggle="collapse"
              :data-target="'#collapseOne' + parentIndex"
              aria-expanded="true"
              aria-controls="collapseOne"
            >{{headersStatusObject.requestUrl}}</button>
          </h2>
        </div>
        <div :id="'collapseOne' + parentIndex" class="collapse" data-parent="#accordionExample">
          <div class="card-body">
            <div class="accordion" :id="'accordionBody' + parentIndex">
              <div class="card">
                <div class="card-header">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      :data-target="'#collapseOneHeaders' + parentIndex"
                      aria-expanded="true"
                      aria-controls="collapseOneHeaders"
                    >Request Headers</button>
                  </h2>
                </div>
                <div
                  :id="'collapseOneHeaders' + parentIndex"
                  class="collapse"
                  aria-labelledby="headingOne"
                  :data-parent="'#collapseOneHeaders' + parentIndex"
                >
                  <div class="card-body">
                    <div
                      v-for="(header, headerIndex) in urlheaderStatuses[parentIndex].requestHeaders"
                    >
                      <input
                        type="checkbox"
                        name="cName"
                        v-model="header.selected"
                        v-on:change="submitSelectedHeaders()"
                      />
                      <b>{{header.key}}</b>
                      : {{header.value}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion" :id="'accordionBody' + parentIndex">
              <div class="card">
                <div class="card-header">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      :data-target="'#formData' + parentIndex"
                    >Request Content</button>
                  </h2>
                </div>
                <div
                  :id="'formData' + parentIndex"
                  class="collapse"
                  aria-labelledby="headingOne"
                  :data-parent="'#collapseOneHeaders' + parentIndex"
                >
                  <div class="card-body">
                    <div>{{urlheaderStatuses[parentIndex].payload}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top: 8px; margin-bottom: 8px; float: right">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                v-on:click
                ="extractSelectedHeaders(parentIndex)"
              >
                <!-- <router-link to="/selectedHeaders" style="color: white">Extract</router-link> -->
                Extract
              </button>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                  
                    <div class="modal-header">
                      <div> 
                        <div class= "header-container">
                      <div style="padding-right:10px"><a href="#section2">Name Assets</a></div>
                      <div><a href="#section2">Set Rules</a></div>
                 </div>
                      <h6 class="modal-title" id="exampleModalLabel">{{selectedSample.requestUrl}}</h6>
                    </div>
                     </div>
                    <div class="modal-body">
                      <div class="section-header">General</div>
                      <div class="section-content">
                        <div class="input-group url-title mb-3">
                          <div class="content-label">
                            <label for="male">Url Title:</label>
                          </div>
                          <div style="padding-top:5px; align-items:center">
                            <input style ="align-items:center"
                              type="text"
                              class="form-control"
                              placeholder="Friendly Url"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="section-header">Request Headers</div>
                        <div class="section-content">
                          <div v-for="(header, headerIndex) in getSelectedSampleHeaders()">
                            <div class="input-group url-title mb-3">
                              <div class="content-label">
                                <label :for="parentIndex + ':' + headerIndex">{{header.headerKey}}:</label>
                              </div>
                              <div style="padding-top:5px; align-items:center">
                                <input
                                  v-model="header.headerValue"
                                  :id="parentIndex + ':' + headerIndex"
                                  type="text"
                                  class="form-control"
                                  placeholder="Username"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-primary">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 8px; margin-bottom: 8px; float: right">
        <!-- <button type="button" class="btn btn-primary" @click="submitSelectedHeaders()"> -->
        <!-- <router-link to="/selectedHeaders" style="color: white">Submit</router-link> -->
        <!-- </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import headersStatusJson from "./../assets/headersStatus.json";
import { headerStatusService } from "../_services";
import Vue from "vue";

export default {
  data: function() {
    return {
      urlheaderStatuses: headersStatusJson.content,
      selectedSampleIndex: 0,
      selectedSample: {title: "https://verizonwireless.com/order/status"}
    };
  },
  created() {
    headerStatusService.getAllParameters().then(response => {
      // this.urlheaderStatuses = response.content || [];
    });
  },
  methods: {
    extractSelectedHeaders(index) {
      this.selectedSampleIndex = index;
      this.selectedSample = this.urlheaderStatuses[this.selectedSampleIndex];
      localStorage.setItem("samples", JSON.stringify(this.urlheaderStatuses));
      console.log("submitSelectedHeaders" , index);
    },
    submitSelectedHeaders() {
      localStorage.setItem("samples", JSON.stringify(this.urlheaderStatuses));
      console.log("submitSelectedHeaders");
    },
    getSelectedSampleHeaders() {
      const ha = JSON.parse(localStorage.getItem("samples"))[this.selectedSampleIndex].requestHeaders.filter(s => s.selected);
      console.log(JSON.stringify(ha));
      const m = ha.map(h=>{return {
        headerKey: h.key,
        headerValue: h.value
      }});
      console.log('get sel', JSON.stringify(m))
      return m;
    }
  }
};
</script>

<style>
.modal-footer {
  display: flex;
  justify-content: space-between;
}

.url-title {
  display: flex;
  align-items: center;

  label {
    margin-bottom: 0;
  }
}

.section-header {
  color: gray;
}

.section-content {
  margin-left: 24px;
}

.content-label {
    width: 112px;
}
.header-container{
  display:flex;
  flex-direction: row; 
  padding-bottom:10px;
  
}
</style>
