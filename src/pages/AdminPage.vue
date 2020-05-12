<template>
  <div>
    <div class="alert alert-info">Admin Page</div>
    <form>
      <!-- <div class="section-header"> Settings</div>
      <div>
        <div id='app'>
          <b-alert show> Hello {{ name }} </b-alert>
        </div>
      </div> -->
 <div class="section-header"> Rules</div>
      <div>
          <ul>
              <li v-for="rule in rules">
                <div class="show-as-link" v-on:click="getRule(rule.ruleId)">{{ rule.ruleName }}</div>
              </li>
          </ul>
      </div>
    </form>

    <form v-if="selectedRule">
      <div class="section-header"> Selected Rule Details</div>
        <div style="padding-left: 12px">
          <div> {{selectedRule.ruleName}}</div>
          <div> {{selectedRule.ruleDescription}}</div>
          <div> {{selectedRule.ruleType}}</div>
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
      selectedRule: undefined
    };
  },
  created() {
      adminService.getAllRules().then((r) => {
          this.rules = r;
          console.log('rules are ', this.rules.length)
      });
      
  },
  methods: {
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
  font-weight: 600
}
</style>