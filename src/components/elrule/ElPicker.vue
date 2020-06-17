<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-row class="block-start">
        <b-col class="col-1"></b-col>
        <b-col class="col-6 sv-header-row">
          <div class="pick-action-container">
            <span class="pick-cb-offset">
              <b-form-checkbox
                id="checkboxes-21"
                @change="selectAllPicker"
                v-model="formBar.gallPicker"
              >Select All</b-form-checkbox>
            </span>
            <div id="extract-action-1" class="extract-start" style="padding-bottom:10px;">
              <b-button variant="info" size="sm" class="float-left" @click="showModal">Ignore</b-button>
              <b-button
                variant="success"
                style="margin-left:15px;"
                size="sm"
                class="float-left"
                @click="showModal"
              >Extract</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-form>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-row class="block-start">
        <b-col class="col-1"></b-col>
        <b-col class="col-8">
          <b-form-group id="input-group-3">
            <b-row>
              <div class="t-container">
                <span>
                  <b-form-checkbox
                    id="checkboxes-2"
                    @change="selectAllGe"
                    v-model="form.gall"
                  >Request Headers</b-form-checkbox>
                </span>

              </div>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-2"></b-col>
        <b-col class="col-8">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
            <b-row v-for="geh in Object.entries(generalHeaders)">
              <b-form-checkbox :value="geh[0]">{{geh[0]}} : {{geh[1]}}</b-form-checkbox>
            </b-row>
          </b-form-checkbox-group>
        </b-col>
      </b-row>

      <!--response-->

      <b-row class="block-start">
        <b-col class="col-1"></b-col>
        <b-col class="col-8">
          <b-form-group id="input-group-6">
            <b-row>
              <div class="t-container">
                <span>
                  <b-form-checkbox
                    @change="selectAllRh"
                    v-model="form.gresponseAll"
                  >Response Headers</b-form-checkbox>
                </span>

              </div>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-2"></b-col>

        <b-col class="col-8">
          <b-form-group id="input-group-7">
            <b-form-checkbox-group v-model="form.responseGroupchecked" id="checkboxes-5">
              <b-row v-for="rsh in Object.entries(responseHeaders)">
                <b-form-checkbox :value="rsh[0]">{{rsh[0]}} : {{rsh[1]}}</b-form-checkbox>
              </b-row>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>

      <!--response.. --->
    </b-form>

    <!--svc -->
    <!--modal-->

  <b-modal id="modal-prevent-closing" ref="push-workflow" size="lg" hide-header>
      <div style="display: flex; flex-direction: row">
        <div style="text-decoration: underline" @click="hideRuleSets">
          <b>Name Assets</b>
        </div>
        <!-- <div style="padding-left: 12px; text-decoration: underline" @click="showRuleSets">Set Rules</div> -->
      </div>

        <div class="my-2 d-block push-hdr">
          <div>
            <b>{{selectedRuleUri}}</b>
          </div>
        </div>
      <hr>
      <div>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="input-invalid">Friendly Url:</label>
          </b-col>
          <div  style = "width: 50%">
            <b-form-input id="input-invalid" placeholder="Friendly Url"></b-form-input>
          </div>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="input-invalid">Group Names:</label>
          </b-col>
          <div style = "width: 50%">
            <b-form-input id="input-invalid" placeholder="Group Name"></b-form-input>
          </div>
        </b-row>
      </div>

      <div v-if="!displayRuleSets">
        <b-container fluid>
          <form ref="svpushform" @submit.stop.prevent="handleSubmit">
            <div class="t-container">
              <!-- from popup -->
              <div>General Headers</div>
            </div>
<b-row class="block-start">
              <b-col class="col-12">
                <b-container fluid>
                  <div style="display: flex; flex-direction: row; align-items: center" class="my-1" v-for="dynaRule in dynaGeneralRules() " :key="type">
                    <div class="label-class">
                      <label :for="`type-${type}`">{{ dynaRule.label }}:</label>
                    </div>
                    <div style="width: 50%">
                      <b-form-input
                        :id="dynaRule.labelFor"
                        v-model="form[dynaRule.label]"
                        required
                        :placeholder="dynaRule.placeholder"
                      ></b-form-input>
                    </div>
                  </div>
                </b-container>
              </b-col>
            </b-row>
            <!--rsh-->
            <b-row class="block-start">
              <div class="t-container">
                <span>Response Headers</span>
                <div id="edgers-action-41" class="extract-start"></div>
                <b-tooltip target="edgers-action-41" triggers="hover">
                  Select
                  <b>response headers</b> to push to Elastic Server!
                </b-tooltip>
              </div>
            </b-row>
            <b-row class="block-start">
              <b-col class="col-12">
                <b-container fluid>
                  <div style="display: flex; flex-direction: row; align-items: center" class="my-1" v-for="dynaRule in dynaResponseRules() " :key="type">
                    <div class="label-class">
                      <label :for="`type-${type}`">{{ dynaRule.label }}:</label>
                    </div>
                    <div style="width: 50%">
                      <b-form-input
                        :id="dynaRule.labelFor"
                        v-model="form[dynaRule.label]"
                        required
                        :placeholder="dynaRule.placeholder"
                      ></b-form-input>
                    </div>
                  </div>
                </b-container>
              </b-col>
            </b-row>
          </form>
        </b-container>
      </div>
      <div v-if="displayRuleSets">Show name rules</div>
      <template v-slot:modal-footer>
        <div
          class="w-100"
          style="display: flex; flex-direction: row; justify-content: space-between"
        >
          <div>
            <b-button :pressed="true"  variant="secondary" size="sm" class="float-right" @click="hideModal">Cancel</b-button>
          </div>
          <div>
            <b-button  :pressed="true" variant="primary" size="sm" class="float-right" @click="okModal">Next</b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["generalHeaders", "responseHeaders", "selectedRuleUri"],
  data() {
    return {
      //api
      svcol: null,
      //modal
      footerBgVariant: "light",
      footerTextVariant: "dark",
      name: "",
      nameState: null,
      submittedNames: [],

      responseStates: { "1": "" },

      pipeResponse: {},
      pipeGeneral: {},

      //modal..

      rhall: false,
      ghall: false,
      piall: false,

      headers: [],
      formBar: {
        gallPicker: false
      },
      form: {
        gall: false,
        checked: [],

        gurl: false,
        gmethod: false,
        gstatusCode: false,
        gremoteAddress: false,
        greferralPolicy: false,

        gresponseAll: false,
        accept: false,
        "user-agent": false,
        host: false,
        "timeout-access": false,
        cookie: false,
        "postman-token": false,
        "x-origin-path": false,
        connection: false,
        "x-forwarded-for": false,

        responseGroupchecked: []
      },

      show: true
    };
  },

  methods: {
    onOrigin() {
      //sv
    },

    checkFormValidity() {
      const valid = this.$refs.svpushform.checkValidity();

      this.nameState = valid;
      return valid;
    },

    resetModal(e) {
      this.name = "";
      this.nameState = null;
    },
    okModal(e) {
      e.preventDefault();

      this.handleExtract();
    },
    handleExtract() {
      let isValid = this.checkFormValidity();
      if (!isValid) {
        console.log("form invalud");
        return;
      }

      this.submittedNames.push(this.name);
      this.hideModal();
    },
    showModal() {
      let keys = this.form.responseGroupchecked;
      if (keys.length < 1) {
         console.log('sv nor esponse headers');
      }
      keys = this.form.checked;
      if (keys.length < 1) {
        return;
      }
      this.applyTransform();
      this.$refs["push-workflow"].show();
    },
    hideModal() {
      this.$refs["push-workflow"].hide();
    },
    applyTransform() {
      this.pipeResponse = {};
      this.pipeGeneral = {};
      let keys = this.form.responseGroupchecked;
      for (let i = 0; i < keys.length; i++) {
        let n = keys[i];
        this.pipeResponse[n] = this.responseHeaders[n];
      }
      keys = this.form.checked;
      for (let i = 0; i < keys.length; i++) {
        let n = keys[i];
        this.pipeGeneral[n] = this.generalHeaders[n];
      }
    },
    dynaResponseRules: function() {
      let rules = [];
      let hdr1 = this.pipeResponse;

      let hdr = Object.keys(hdr1);

      for (let i = 0; i < hdr.length; i++) {
        let key = hdr[i];
        let v = hdr1[key];
        let item = {
          id: "input-group-" + i,
          label: key,
          defaultValue: v,
          labelFor: "input-" + i,

          // placeholder: "Like Value ",
          description: "Enter " + key
        };
        this.form[key] = "";
        rules.push(item);
      }
      let o = rules;

      return rules;
    },
    dynaGeneralRules: function() {
      let rules = [];
      let hdr1 = this.pipeGeneral;

      let hdr = Object.keys(hdr1);

      for (let i = 0; i < hdr.length; i++) {
        let key = hdr[i];
        let v = hdr1[key];
        let item = {
          id: "input-group-ge-" + i,
          label: key,
          defaultValue: "",
          labelFor: "input-ge" + i,
          // placeholder: "Enter value ",
          description: "Enter  " + key
        };
        this.form[key] = "";
        rules.push(item);
      }
      let o = rules;

      return rules;
    },
    selectAllPicker() {
      this.piall = !this.piall;
      if (this.piall === true) {
        let keys = Object.keys(this.generalHeaders);
        this.form.checked = keys;

        let rkeys = Object.keys(this.responseHeaders);

        this.form.responseGroupchecked = rkeys;
        this.form.gall = true;
        this.form.gresponseAll = true;
      } else {
        this.form.gall = false;
        this.form.gresponseAll = false;
        this.form.checked = [];
        this.form.responseGroupchecked = [];
      }
    },
    selectAllGe() {
      this.ghall = !this.ghall;

      if (this.ghall === true) {
        let keys = Object.keys(this.generalHeaders);
        this.form.checked = keys;
      } else {
        this.form.checked = [];
      }
    },
    selectAllRh() {
      this.rhall = !this.rhall;

      if (this.rhall === true) {
        let keys = Object.keys(this.responseHeaders);

        this.form.responseGroupchecked = keys;
      } else {
        this.form.responseGroupchecked = [];
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  computed: {
    fieldRsStates: function() {
      let ob = {};
      let ar = Object.keys(this.responseHeaders);
      for (let i = 0; i < ar.length; i++) {
        let k = ar[i];
        ob[k] = "";
      }

      this.responseStates = ob;
      return this.responseStates;
    },
    dynaRules: function() {
      let rules = [];
      let hdr1 = this.responseHeaders;
      console.log(hdr1);
      let hdr = Object.keys(hdr1);
      console.log(hdr);
      for (let i = 0; i < hdr.length; i++) {
        let key = hdr[i];
        let v = hdr1[key];
        let item = {
          id: "input-group-" + i,
          label: "key",
          defaultValue: v,
          labelFor: "input-" + i,

          placeholder: "Like " + v,
          description: "Enter " + key
        };
        this.form[key] = v;
        rules.push(item);
      }
      let o = rules;

      return rules;
    },
    fieldGeStates: function() {
      let ob = {};
      let ar = Object.keys(this.generalHeaders);
      for (let i = 0; i < ar.length; i++) {
        let k = ar[i];
        ob[k] = "";
      }

      this.generalStates = ob;
      return this.generalStates;
    },
    dynaGeRules: function() {
      let rules = [];
      let hdr1 = this.generalHeaders;

      let hdr = Object.keys(hdr1);

      for (let i = 0; i < hdr.length; i++) {
        let key = hdr[i];
        let v = hdr1[key];
        let item = {
          id: "input-group-ge-" + i,
          label: key,
          defaultValue: v,
          labelFor: "input-ge" + i,

          placeholder: "Like " + v,
          description: "Enter " + key
        };
        this.form[key] = v;
        rules.push(item);
      }
      let o = rules;

      return rules;
    },
    filteredOrigins() {
      return this.headers;
    }
  }
};
</script>

<style scoped>
.extract-start {
  padding-left: 10px;
  padding-bottom: 10px;
}
.sv-header-row {
  margin-left: 0;
  padding-left: 0px;
}

.t-container {
  display: flex;
  flex-direction: row;

  padding-bottom: 1px;
  padding-top: 20px;
  border-bottom: 1px solid #ccc3c3;
}
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

.block-start {
  padding-top: 10px;
}
.push-hdr {
  font-size: 14px;
}

.btn {
  display: inline-block;
  font-weight: 400;
  /*  color: #212529; */
  color: #fff;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*background-color: transparent; */
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
/*
footer {
    background-color: #fff;
    padding-top: 1.5rem;
    padding-bottom: 0px;
}*/
.modal-footer {
  background-color: lightgray!important; }

.pick-action-container {
  display: flex;
  flex-direction: row;

  padding-bottom: 1px;
  padding-top: 10px;
  border-bottom: 1px solid #ccc3c3;
}
.pick-cb-offset {
  margin-top: 10px;
}
.label-class {
  width: 134px;
  flex-shrink: 0;
}
</style>