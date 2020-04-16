<template>
    <div>
        <h1>Hi {{user.firstName}}!</h1>
        <p>
            <router-link to="/updateProfile">Update Profile</router-link>
        </p>
    </div>
</template>

<script>
import { userService } from '../_services';

export default {
    data () {
        return {
            user: {},
            users: []
        }
    },
    created () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.users.loading = true;
        userService.getAll().then(users => this.users = users);
    }
};
</script>