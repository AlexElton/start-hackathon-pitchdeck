<script setup lang="ts">
// Polaris ecosystem — central "70+ local titles" with orbiting assets.
const orbit = [
  { label: 'Journalister', icon: '✍️', x: 50, y: 6 },
  { label: 'Lokal kunnskap', icon: '🧭', x: 88, y: 26 },
  { label: 'Lokale bedrifter', icon: '🏪', x: 92, y: 66 },
  { label: 'Arrangementer', icon: '🎟', x: 66, y: 92 },
  { label: 'Data', icon: '📊', x: 32, y: 92 },
  { label: 'Distribusjon', icon: '📮', x: 8, y: 66 },
  { label: 'Tillit', icon: '🤝', x: 10, y: 26 },
]
</script>

<template>
  <div class="relative w-full h-full">
    <!-- orbit rings -->
    <div class="absolute rounded-full" style="left: 50%; top: 50%; width: 62%; height: 62%; transform: translate(-50%, -50%); border: 1px dashed rgba(16,16,16,0.15)" />
    <div class="absolute rounded-full" style="left: 50%; top: 50%; width: 88%; height: 88%; transform: translate(-50%, -50%); border: 1px dashed rgba(16,16,16,0.1)" />

    <!-- center -->
    <div class="absolute" style="left: 50%; top: 50%; transform: translate(-50%, -50%)">
      <div class="px-6 py-5 rounded-2xl text-center" style="background: #E5EDF5; border: 1.5px solid rgba(0,83,121,0.5); box-shadow: 0 0 60px rgba(0,83,121,0.15)">
        <div class="text-4xl font-extrabold" style="color: #005379">70+</div>
        <div class="text-[13px] font-semibold mt-0.5" style="color: rgba(16,16,16,0.75)">lokale aviser</div>
      </div>
    </div>

    <!-- orbiting nodes -->
    <div
      v-for="o in orbit"
      :key="o.label"
      class="absolute"
      :style="{ left: o.x + '%', top: o.y + '%', transform: 'translate(-50%, -50%)' }"
    >
      <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style="background: #fff; border: 1px solid #E2E2E2">
        <span class="text-sm">{{ o.icon }}</span>
        <span class="text-[12px] font-semibold whitespace-nowrap" style="color: rgba(16,16,16,0.8)">{{ o.label }}</span>
      </div>
    </div>
  </div>
</template>
