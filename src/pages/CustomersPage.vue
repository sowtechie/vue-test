<template>
  <div>
    <div class="alert alert-info">All Customers</div>
    <form @submit.prevent="handleSubmit">
     <ul>
        <li v-for="customer in customers">
          {{ customer._id}} ) {{ customer.name }} - {{ customer.servicePlan }}
        </li>
    </ul>
    </form>
  </div>
</template>

<script>

import { timer } from "rxjs";
import { userService } from "../_services"

export default {
  data() {
    return {
      customers: []
    };
  },
  created() {
      userService.getAllCustomers().then((sr) => {
          this.customers = sr;
          console.log('customer are ', this.customers.length)
      });
      
  },
  methods: {
    handleSubmit(e) {
     
    }
  }
};
</script>