<template>
  <div>
    <div class="alert alert-info">Http Request Page </div>
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
                    >Headers</button>
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
                      v-for="header in Object.entries(urlheaderStatuses[parentIndex].requestHeaders)"
                    >{{header[0]}} : {{header[1]}}</div>
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
                    >Form Data</button>
                  </h2>
                </div>
                <div
                  :id="'formData' + parentIndex"
                  class="collapse"
                  aria-labelledby="headingOne"
                  :data-parent="'#collapseOneHeaders' + parentIndex"
                >
                  <div class="card-body">
                    <div>
						{{urlheaderStatuses[parentIndex].formData.origin}}
					</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headersStatusJson from "./../assets/headersStatus.json";
// import { adminService } from "../_services";
import Vue from "vue";

export default {
  data: function() {
    return {
      urlheaderStatuses: headersStatusJson
    };
  },
  created() {
    adminService
      .getUrlStatus(this.parserMode)
      .then(response => {
        this.isError = false;
        this.urlheaderStatuses = response;
      })
      .catch(err => {
        this.isError = true;
        this.parserResponseStatus = "Error while setting Parser";
      });
  },
  methods: {}
};
</script>

<style>
</style>
