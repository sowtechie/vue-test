<template>
  <div>
    <div class="alert alert-info">Admin Page</div>
    <form v-on:submit.prevent>
      <div class="section-wrapper">
        <div class="section-header">Parser Settings</div>
        <div>
          <div id='parser'>
            <div>
              <div>
                <input v-model="parserMode" type="radio" id="parserOn" name="parser" value="true">
                <label for="parserOn">On</label><br>
                <input v-model="parserMode" type="radio" id="parserOff" name="parser" value="false">
                <label for="parserOff">Off</label><br>
              </div>
              <div>
                <button v-on:click="setParser()">Set Parser</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showRulesSection">
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
      </div>
    </form>


  </div>
</template>

<script>

import { adminService } from "../_services"

export default {
  data() {
    return {
      rules: [],
      selectedRule: undefined,
      parserMode: false,
      showRulesSection: false
    };
  },
  created() {
      // this.getRules();
  },
  methods: {
    setParser() {
     adminService.setParser(this.parserMode).then((r) => {
          this.showRulesSection = true;
          alert('Parser is set successfully. Now click on Get Rules')
          console.log('rules are ', this.rules.length)
      }); 
    },
    getRules() {
     adminService.getAllRules().then((r) => {
          this.rules = r;
          console.log('rules are ', this.rules.length)
      }); 
    },
    getRule(ruleId) {
     adminService.getRule(ruleId).then((r) => {
          this.selectedRule = r;
          console.log('rule is ', this.selectedRule)
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
</style>