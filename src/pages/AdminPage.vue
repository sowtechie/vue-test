<template>
  <div>
    <div class="alert alert-info">Admin Page</div>
    <form v-on:submit.prevent>
      <div class="section-wrapper">
        <div v-if="!isError" class="message">{{parserResponseStatus}}</div>
        <div v-if="isError" class="error-message">{{parserResponseStatus}}</div>
        <div class="section-header">Parser Settings</div>
        <div>
          <div id="parser">
            <div>
              <div>
                <input v-model="parserMode" type="radio" id="parserOn" name="parser" value=true />
                <label for="parserOn">On</label>
                <br />
                <input v-model="parserMode" type="radio" id="parserOff" name="parser" value=false />
                <label for="parserOff">Off</label>
                <br />
              </div>
              <div>
                <button v-on:click="setParser()">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="showRulesSection">
        <div class="section-wrapper">
          <div class="section-header"> Rules (click to view more details)</div>
          <div>
            <button v-on:click="getRules()">Get Rules</button>
          </div>
          <div>
              <ul>
                  <li v-for="rule in rules">
                    <div class="show-as-link" v-on:click="getRule(rule.ruleId)">{{ rule.ruleName }}</div>
                  </li>
              </ul>
          </div>
        </div>
        <div v-if="selectedRule" class="section-wrapper">
          <div class="section-header"> Selected Rule Details</div>
          <div style="padding-left: 12px">
            <div> {{selectedRule.ruleName}}</div>
            <div> {{selectedRule.ruleDescription}}</div>
            <div> {{selectedRule.ruleType}}</div>
          </div>
        </div>
      </div>-->
    </form>
  </div>
</template>

<script>
import { adminService } from "../_services";

export default {
  data() {
    return {
      rules: [],
      selectedRule: undefined,
      parserMode: false,
      showRulesSection: false,
      parserResponseStatus: "",
      isError: false
    };
  },
  created() {
    // this.getRules();
  },
  methods: {
    setParser() {
      adminService
        .setParser(this.parserMode)
        .then(response => {
          // this.showRulesSection = true;
          console.log("respon is ", response);
          if (response && response.status == 200) {
            this.isError = false;
            this.parserResponseStatus = "Parser settings saved successfully";
          } else {
            this.isError = true;
            this.parserResponseStatus = "Error while setting parser";
          }

          // alert('Parser is set successfully. Now click on Get Rules')
          // console.log('rules are ', this.rules.length)
        })
        .catch(err => {
          this.isError = true;
          this.parserResponseStatus = "Error while setting Parser";
        });
    },
    getRules() {
      adminService.getAllRules().then(r => {
        this.rules = r;
        console.log("rules are ", this.rules.length);
      });
    },
    getRule(ruleId) {
      adminService.getRule(ruleId).then(r => {
        this.selectedRule = r;
        console.log("rule is ", this.selectedRule);
      });
    }
  }
};
</script>

<style scoped>
.show-as-link:hover {
  cursor: pointer;
  text-decoration: underline;
}

.section-header {
  font-size: 16px;
  font-weight: 600;

  padding-top: 12px;
}

.section-wrapper {
  margin-top: 12px;
  padding: 16px;
  border: 1px solid gray;
}

.message {
  color: green;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>