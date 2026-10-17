<script setup lang="ts">
// One person per icon. `affected` people turn red when `on` is true.
withDefaults(defineProps<{
  total?: number
  affected?: number
  on?: boolean
  cols?: number
}>(), {
  total: 50,
  affected: 40,
  on: false,
  cols: 10,
})
</script>

<template>
  <div class="people-grid" :style="{ gridTemplateColumns: `repeat(${cols}, auto)` }">
    <svg
      v-for="i in total"
      :key="i"
      class="person"
      :class="{ 'person-red': on && i <= affected }"
      viewBox="0 0 24 28"
      aria-hidden="true"
    >
      <circle cx="12" cy="6.5" r="5" fill="currentColor" />
      <path d="M3 25a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a9 9 0 0 0-18 0z" fill="currentColor" />
    </svg>
  </div>
</template>

<style scoped>
.people-grid {
  display: grid;
  gap: 14px 12px;
  justify-content: center;
}

.person {
  width: 26px;
  height: 30px;
  display: block;
}
</style>
