<script setup lang="ts">
// The loop — circular ecosystem flow.
const steps = [
  { label: 'Lokal journalistikk', icon: '📰' },
  { label: 'Lokal informasjon', icon: '📍' },
  { label: 'Studenter oppdager den', icon: '🧑‍🎓' },
  { label: 'Arrangementer + tilbud', icon: '🎟' },
  { label: 'Daglig vane', icon: '🔁' },
  { label: 'Mer engasjement for Polaris', icon: '📈' },
]
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <div class="relative" style="width: 560px; height: 460px">
      <!-- circle path -->
      <div class="absolute rounded-full" style="left: 50%; top: 50%; width: 78%; height: 78%; transform: translate(-50%, -50%); border: 1.5px dashed rgba(16,16,16,0.2)" />

      <!-- center message -->
      <div class="absolute text-center px-8" style="left: 50%; top: 50%; transform: translate(-50%, -50%); width: 60%">
        <div class="text-lg font-bold leading-snug" style="color: #101010">
          Hver sak blir mer nyttig når den har et sted.
        </div>
        <div class="text-sm mt-2" style="color: rgba(16,16,16,0.55)">
          Hvert sted blir mer oppdagbart når det har informasjon.
        </div>
      </div>

      <!-- steps around circle -->
      <div
        v-for="(s, i) in steps"
        :key="s.label"
        class="absolute"
        :style="{
          left: 50 + 42 * Math.cos((i / steps.length) * 2 * Math.PI - Math.PI / 2) + '%',
          top: 50 + 42 * Math.sin((i / steps.length) * 2 * Math.PI - Math.PI / 2) + '%',
          transform: 'translate(-50%, -50%)',
        }"
      >
        <div class="flex items-center gap-2 px-3.5 py-2 rounded-xl" style="background: #fff; border: 1px solid #E2E2E2">
          <span class="text-base">{{ s.icon }}</span>
          <span class="text-[13px] font-semibold whitespace-nowrap" style="color: rgba(16,16,16,0.85)">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
