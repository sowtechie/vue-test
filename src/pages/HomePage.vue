<template>
    <div class='container'>
        <p>
            <router-link to="/admin">Go to admin page</router-link>
        </p>
        <p>
            <router-link to="/samples">New Requests Observed</router-link>
        </p>
        <p>
            <router-link to="/sample">Sample Page</router-link>
        </p>
         
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