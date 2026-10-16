<script setup lang="ts">
// Fragmentation visual — scattered sources around a student.
const sources = [
  { label: 'Nyheter', icon: '📰', x: 12, y: 14, color: '#005379' },
  { label: 'Arrangementer', icon: '🎟', x: 68, y: 8, color: '#FF9E18' },
  { label: 'Studentorganisasjoner', icon: '🎓', x: 78, y: 42, color: '#28AAE2' },
  { label: 'Tilbud', icon: '🏷', x: 8, y: 52, color: '#F7A800' },
  { label: 'Sosiale medier', icon: '💬', x: 30, y: 72, color: '#C31632' },
  { label: 'Ulike nettsider', icon: '🌐', x: 62, y: 68, color: '#4E9D2D' },
]
</script>

<template>
  <div class="relative w-full h-full">
    <!-- connecting lines -->
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line
        v-for="(s, i) in sources"
        :key="i"
        :x1="s.x" :y1="s.y"
        :x2="50" :y2="50"
        stroke="rgba(16,16,16,0.12)"
        stroke-width="0.4"
        stroke-dasharray="2 2"
      />
    </svg>

    <!-- student center -->
    <div class="absolute" style="left: 50%; top: 50%; transform: translate(-50%, -50%)">
      <div class="w-20 h-20 rounded-full flex items-center justify-center text-3xl" style="background: #fff; border: 1.5px solid #E2E2E2">
        🧑‍🎓
      </div>
    </div>

    <!-- scattered sources -->
    <div
      v-for="(s, i) in sources"
      :key="s.label"
      class="absolute"
      :style="{ left: s.x + '%', top: s.y + '%', transform: 'translate(-50%, -50%)' }"
    >
      <div class="flex items-center gap-2 px-3 py-2 rounded-xl" style="background: #fff; border: 1px solid #E2E2E2">
        <span class="text-base">{{ s.icon }}</span>
        <span class="text-[13px] font-semibold whitespace-nowrap" :style="{ color: s.color }">{{ s.label }}</span>
      </div>
    </div>
  </div>
</template>
