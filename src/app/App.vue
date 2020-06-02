<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-10">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>