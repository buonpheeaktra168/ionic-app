<template>
  <input
    :class="disabled == true ? 'input-disable' : 'input'"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="value"
    :type="type"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script lang="ts">
export default {
  props: ["value", "placeholder", "disabled", "type"],
  emits: ["update:value"],
};
</script>

<style scoped>
.input {
  display: flex;
  width: 90%;
  height: 35px;
  background-color: #ffff;
  color: rgb(84, 84, 84);
  border: none;
  margin-top: 8px;
  padding-left: 12px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.input:focus-visible {
  display: flex;
  width: 90%;
  height: 35px;
  background-color: #ffff;
  color: rgb(84, 84, 84);
  border: none;
  outline: none;
  margin-top: 8px;
  padding-left: 12px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.input-disable {
  display: flex;
  width: 90%;
  height: 30px;
  background-color: hwb(0 100% 0% / 0.266);
  color: rgb(146, 146, 146);
  border: none;
  margin-top: 8px;
  border-radius: 8px;
  padding-left: 12px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>
