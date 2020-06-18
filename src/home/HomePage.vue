<template>

    <div>

        <p>

            <router-link to="/admin"><span style="color:blue">Go to admin page</span></router-link>

        </p>

        <p>

             <router-link to="/svel"><span style="color:blue">Elastic Rule</span></router-link>

        </p>

    </div>

</template>



<script>

import { userService } from '../_services';



export default {

    data () {

        return {

             user: {},

        }

    },

    created () {

        this.user = JSON.parse(localStorage.getItem('user'));

    }

};

</script>
