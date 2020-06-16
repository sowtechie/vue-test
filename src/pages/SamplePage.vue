<template>
  <div>
    <div class="alert alert-info">
      <h6>Admin UI</h6>
    </div>

    <hr />
    <h4>
      <b>URL Manager</b>
    </h4>
    <div class="search-container">
      <div style="padding-right:10px">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              <svg
                class="bi bi-search"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div style="padding-right:10px">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <!-- <button class="btn btn-outline-secondary" type="button">Button</button> -->
          </div>
          <select
            class="custom-select"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
          >
            <option selected>Filter</option>
          </select>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-secondary">Ignore</button>
      </div>
    </div>
    <hr />

    <div style="height: 100%">
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-4"
            style=" 
            border-right: 1px solid black; 
            height: 500px; "
          >
            <div class="select">
              <div style="display: flex; flex-direction:row; padding-top:5px">
                <div style="padding-">
                  <input
                    style="padding-right:5px"
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                  />
                </div>
                <div>
                  <h6 style="padding-left:10px">Select All</h6>
                </div>
              </div>
              <div class="anchor">
                <div>
                  <a style="padding-right:5px" href="#section2">New</a>
                </div>
                <div>
                  <a href="#section2">Ignored</a>
                </div>
              </div>
            </div>
            <hr />
            <div class="input-group mb-3">
              <!-- <div class="input-group-prepend">
                <div class="input-group-text">
                  <input type="checkbox" aria-label="Checkbox for following text input" />
                </div>
              </div>-->
              <div
                class="sample-header"
                v-for="(headersStatusObject, sampleIndex) in urlHeadersStatuses"
                v-on:click="previewSample(sampleIndex)"
              >
                <input
                  style="padding-right:5px"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
                {{ headersStatusObject.requestUrl}}
                <hr style="width: 100%" />
              </div>
            </div>
          </div>

          <div class="col-8" v-if="selectedSample.requestUrl">
            <div>
              <h5 class="modal-title" id="exampleModalLabel">{{selectedSample.requestUrl}}</h5>
              <hr />
            </div>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              v-on:click="extractSelectedHeaders()"
            >Define Rules</button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <div>
                      <div>
                        <a href="#section2">Name Assets</a>
                        <a href="#section2">Set Rules</a>
                      </div>
                      <h6
                        class="modal-title"
                        id="exampleModalLongTitle"
                      >{{selectedSample.requestUrl}}</h6>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div v-if="!showSetRules" class="modal-body">
                    <div class="section-header">General</div>
                    <div class="section-content">
                      <div class="input-group url-title mb-3">
                        <div class="content-label">
                          <label for="male">Url Title:</label>
                        </div>
                        <div style="padding-top:5px; align-items:center">
                          <input
                            style="align-items:center"
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
                              <label for="headerIndex">{{header.headerKey}}:</label>
                            </div>
                            <div style="padding-top:5px; align-items:center">
                              <input
                                v-model="header.headerValue"
                                id="headerIndex"
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
                  <div v-if="showSetRules" class="modal-body">
                    <h6>IF</h6>
                    <div class="dropdown">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >Is</button>

                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Is not</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                      <button type="button" class="btn btn-secondary">Admin</button>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Next</button>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div>
              <input
                style="padding-right:5px"
                type="checkbox"
                aria-label="Checkbox for following text input"
              />

              <b>Request URL</b>
              : {{selectedSample.requestUrl}}
              <div v-for="(headerObject) in selectedSample.requestHeaders">
                <input
                  style="padding-right:5px"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  
                />
                <b>requestHeaders</b>
                :{{headerObject.key}}
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
import { headerStatusService } from "../_services";
import Vue from "vue";
export default {
  data: function() {
    return {
      urlHeadersStatuses: headersStatusJson.content,
      selectedSampleIndex: 0,
      selectedSample: {},
      showSetRules: false
    };
  },
  created() {
    localStorage.setItem("samples", JSON.stringify(this.urlHeadersStatuses));
    headerStatusService.getAllParameters().then(response => {
      // this.urlHeadersStatuses = response.content || [];
    });
  },
  methods: {
    previewSample(sampleIndex) {
      this.selectedSample = this.urlHeadersStatuses[sampleIndex];
      this.selectedSampleIndex = sampleIndex;
      console.log("this.selectedSample", this.selectedSample);
    },
    extractSelectedHeaders() {
      this.selectedSample = this.urlHeadersStatuses[this.selectedSampleIndex];
      this.selectedSample.requestHeaders.forEach(rh => {
        rh.value = "";
      });
      localStorage.setItem("samples", JSON.stringify(this.urlHeadersStatuses));
    },
    submitSelectedHeaders() {
      localStorage.setItem("samples", JSON.stringify(this.urlHeadersStatuses));
      console.log("submitSelectedHeaders");
    },
    getSelectedSampleHeaders() {
      console.log("this.selectedSampleIndex", this.selectedSampleIndex);
      const ha = JSON.parse(localStorage.getItem("samples"))[
        this.selectedSampleIndex
      ].requestHeaders.filter(s => s.selected);
      console.log(JSON.stringify(ha));
      const m = ha.map(h => {
        console.log("h", h.key, "v:", h.value);
        return {
          headerKey: h.key,
          headerValue: h.value
        };
      });
      console.log("get selectedHeaders => ", JSON.stringify(m));
      return m;
    },
    showScreen3(show) {
      this.showSetRules = show;
    }
  }
};
</script>
<style>
.sample-header {
  padding: 12px;
}
.header {
  /* text-decoration-line: underline;
 padding-left: 5px;
 Padding-bottom:5px */
}
.custom-select {
  width: 10px;
}
.search-container {
  display: flex;
  flex-direction: row;
}
.select {
  display: flex;
  flex-direction: row;
  /* padding-right: 5px; */
  align-items: center;
  padding-top: 3px;
  justify-content: space-between;
}
.anchor {
  color: black;
  display: flex;
  flex-direction: row;
  /* padding-right: 5px; */
  padding-top: 3px;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
}
</style>