<template>
  <div>
    <div class="alert alert-info">User Details</div>
    <h2>Profile</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Name</label>
        <input
          disabled="true"
          type="text"
          v-model="username"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && !username }"
        />
        <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !email }"
        />
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
      </div>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          v-model="firstName"
          name="firstName"
          class="form-control"
          :class="{ 'is-invalid': submitted && !firstName }"
        />
        <div v-show="submitted && !firstName" class="invalid-feedback">First Name is required</div>
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input
          type="number"
          v-model="age"
          name="age"
          class="form-control"
          :class="{ 'is-invalid': submitted && !age }"
        />
        <div v-show="submitted && !age" class="invalid-feedback">Age is required</div>
      </div>
      <!-- <div class="form-group">
        <label for="gender">Gender</label>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Gender</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item">Male</a>
            <a class="dropdown-item">Female</a>
          </div>
        </div>
      </div> -->
      <div class="form-group float-right">
        <button class="btn btn-primary" :disabled="loading">Update</button>
        <img
          v-show="loading"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
      </div>
      <div v-if="error" class="alert alert-danger">{{error}}</div>
    </form>
  </div>
</template>

<script>
import { router } from "../../_helpers";
import { userService } from "../../_services";
import { timer } from "rxjs";

export default {
  data() {
    return {
      username: "",
      firstName: "",
      email: "",
      age: "",
      gender: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: "",
      userDetails: {}
    };
  },
  created() {
    this.userDetails = JSON.parse(localStorage.getItem("user"));
    console.log('userdretails ', this.userDetails)
    this.username = this.userDetails.username;
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      const { username, firstName, age, email } = this;

      // stop here if form is invalid
      if (!(username && firstName && age && email)) {
        return;
      }

      this.loading = true;
      this.userDetails.email = email;
      this.userDetails.age = age;
      this.userDetails.firstName = firstName;
      userService.updateUserDetails(this.userDetails).then(resp => {
        this.loading = false;
      })
    }
  }
};
</script>