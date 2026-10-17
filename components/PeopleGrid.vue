<script setup lang="ts">
// One person per icon. `affected` people turn red when `on` is true,
// one row at a time from the top, `rowDelay` ms apart.
withDefaults(defineProps<{
  total?: number
  affected?: number
  on?: boolean
  cols?: number
  rowDelay?: number
}>(), {
  total: 50,
  affected: 40,
  on: false,
  cols: 10,
  rowDelay: 1000,
})
</script>

<template>
  <div class="people-grid" :style="{ gridTemplateColumns: `repeat(${cols}, auto)` }">
    <svg
      v-for="i in total"
      :key="i"
      class="person"
      :class="{ 'person-red': on && i <= affected }"
      :style="on ? { transitionDelay: `${Math.floor((i - 1) / cols) * rowDelay}ms` } : undefined"
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
