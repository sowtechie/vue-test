<template>
    <div>
        <!-- <h1>Hi {{user.firstName}}!</h1> -->
        <p>
            <router-link to="/admin">Go to admin page</router-link>
        </p>
        <!-- <p>
            <router-link to="/updateProfile">Update Profile</router-link>
        </p>
        <p>
            <router-link to="/customersList">Customers List</router-link>
        </p> -->
    </div>
</template>

<script>
import { userService } from '../_services';

export default {
    data () {
        return {
            // user: {},
        }
    },
    created () {
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
};
</script>