
<template>
  <div>
    <div class="label-class">
      <label :for="dynaRule.labelFor">{{ dynaRule.label }}:</label>
    </div>
    <div style="width: 50%">
      <b-form-input
        :id="dynaRule.labelFor"
        @change="$emit('onUpdate', dynaRule.label, $event)"
        required
        :placeholder="dynaRule.placeholder"
      ></b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dynaRule"],
  data() {
    return {
      name: ""
    };
  },

  methods: {
    fieldOnUpdate: function(e) {
      alert('something changed!');
    }
  }
};
</script>

<style scoped>
.label-class {
  width: 134px;
  flex-shrink: 0;
}
</style>