<script setup lang="ts">
// Read/unread map state — pins fade after reading ("inbox zero" feeling).
defineProps<{ read?: boolean }>()
</script>

<template>
  <div class="relative w-full h-full" style="background: #F6F6F6">
    <div class="absolute inset-0">
      <CityMap />
    </div>

    <!-- unread pins -->
    <div
      v-for="(p, i) in [
        { x: 30, y: 30 }, { x: 55, y: 22 }, { x: 70, y: 45 }, { x: 22, y: 60 }, { x: 48, y: 55 },
      ]"
      :key="'u' + i"
      class="pin-dot pin-news"
      :style="{ left: p.x + '%', top: p.y + '%', opacity: read ? 0.12 : 0.95, transition: 'opacity 1s ease' }"
    />

    <!-- read pins (faded) -->
    <div
      v-for="(p, i) in [
        { x: 40, y: 42 }, { x: 62, y: 62 }, { x: 80, y: 30 },
      ]"
      :key="'r' + i"
      class="pin-dot pin-event"
      :style="{ left: p.x + '%', top: p.y + '%', opacity: read ? 0.1 : 0.9, transition: 'opacity 1s ease' }"
    />

    <div class="absolute left-3 right-3 top-10 z-20">
      <div class="flex items-center gap-2 rounded-xl px-3 py-2" style="background: rgba(255,255,255,0.92); border: 1px solid #E2E2E2">
        <span class="text-[13px] font-medium" style="color: #101010">Trondheim</span>
        <span class="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style="background: rgba(40,170,226,0.12); color: #28AAE2">
          {{ read ? 'Kartet er tomt ✓' : '5 nye i nærheten' }}
        </span>
      </div>
    </div>
  </div>
</template>
