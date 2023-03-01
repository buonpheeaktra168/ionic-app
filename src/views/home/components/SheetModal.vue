<template>
  <ion-modal
    ref="modal"
    :trigger="trigger"
    :initial-breakpoint="0.5"
    :breakpoints="[0, 0.25, 0.5, 1]"
  >
    <ion-content class="ion-padding" :force-overscroll="true">
      <ion-searchbar
        v-model="data.title"
        @click="$refs.modal.$el.setCurrentBreakpoint(1)"
        placeholder="Search"
      ></ion-searchbar>
      <TodoCard
        v-for="(todo, index) in todos"
        :key="index"
        :card-title="todo.title"
        :value="todo.isCompleted"
      >
        <ion-label :class="todo.isCompleted ? 'done' : null">{{
          todo.isCompleted ? "Done" : null
        }}</ion-label>
      </TodoCard>
      <PlusButton
        v-if="data.title"
        horizontal="end"
        vertical="center"
        :icon="search"
        @onClick="onSearchTodo"
      />
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { IonModal, IonContent, IonSearchbar, IonLabel } from "@ionic/vue";
import { search } from "ionicons/icons";
import { defineComponent, ref, watchEffect } from "vue";
import { TodoCard, PlusButton } from "@/views/home/components";
import { useStore } from "vuex";
import { computed } from "vue";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonSearchbar,
    TodoCard,
    IonLabel,
    PlusButton,
  },
  props: {
    trigger: String,
  },
  data() {
    return {
      search,
    };
  },
  setup() {
    const store = useStore();
    const todos = computed(() => store.getters["todoModule/getTodos"]);
    const data = ref({
      title: "",
    });

    watchEffect(() => {
      if (data.value.title == "") {
        store.dispatch("todoModule/fetchTodos").then();
      }
    });

    const onSearchTodo = () => {
      store.dispatch("todoModule/searchTodos", data.value);
    };

    return {
      todos,
      data,
      onSearchTodo,
    };
  },
});
</script>

<style scoped>
.done {
  color: rgb(0, 132, 255);
  font-size: 12px;
  font-weight: bold;
}
</style>
