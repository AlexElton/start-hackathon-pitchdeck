<script setup lang="ts">
// In-app map screen used inside PhoneFrame — mimics the real SwiftUI prototype.
defineProps<{
  activeTab?: 'kart' | 'liste'
  filter?: 'saker' | 'arrangementer' | 'tilbud'
  showSheet?: boolean
}>()
</script>

<template>
  <div class="relative w-full h-full" style="background: #F6F6F6">
    <!-- map area -->
    <div class="absolute inset-0">
      <CityMap />
    </div>

    <!-- top search / title -->
    <div class="absolute left-3 right-3 top-10 z-20">
      <div class="flex items-center gap-2 rounded-xl px-3 py-2" style="background: rgba(255,255,255,0.92); border: 1px solid #E2E2E2; backdrop-filter: blur(8px)">
        <span class="text-[13px]" style="color: rgba(16,16,16,0.45)">🔍</span>
        <span class="text-[13px] font-medium" style="color: #101010">Trondheim</span>
      </div>
    </div>

    <!-- filter chips -->
    <div class="absolute left-3 right-3 top-[68px] z-20 flex gap-1.5">
      <span
        v-for="f in ['Saker', 'Arrangementer', 'Tilbud']"
        :key="f"
        class="px-2.5 py-1 rounded-full text-[11px] font-semibold"
        :style="filter && f.toLowerCase().startsWith(filter.slice(0, 5))
          ? 'background:#005379;color:#fff'
          : 'background:rgba(255,255,255,0.92);color:rgba(16,16,16,0.75);border:1px solid #E2E2E2'"
      >
        {{ f }}
      </span>
    </div>

    <!-- bottom tab bar -->
    <div class="absolute left-0 right-0 bottom-0 z-20 flex" style="background: rgba(255,255,255,0.95); border-top: 1px solid #E2E2E2; backdrop-filter: blur(10px)">
      <div
        v-for="t in [{ id: 'kart', icon: '🗺', label: 'Kart' }, { id: 'liste', icon: '☰', label: 'Liste' }]"
        :key="t.id"
        class="flex-1 flex flex-col items-center py-2.5 gap-0.5"
      >
        <span class="text-[15px]" :style="activeTab === t.id ? 'color:#005379' : 'color:rgba(16,16,16,0.5)'">{{ t.icon }}</span>
        <span class="text-[10px] font-semibold" :style="activeTab === t.id ? 'color:#005379' : 'color:rgba(16,16,16,0.5)'">{{ t.label }}</span>
      </div>
    </div>

    <!-- bottom sheet -->
    <div
      v-if="showSheet"
      class="absolute left-0 right-0 bottom-[54px] z-20 rounded-t-2xl px-4 pt-3 pb-4"
      style="background: rgba(255,255,255,0.97); border-top: 1px solid #E2E2E2; backdrop-filter: blur(12px)"
    >
      <div class="w-9 h-1 rounded-full mx-auto mb-3" style="background: #E2E2E2" />
      <div class="flex items-start gap-3">
        <div class="w-11 h-11 rounded-lg flex-shrink-0" style="background: #E5EDF5; border: 1px solid rgba(0,83,121,0.25)" />
        <div class="min-w-0">
          <div class="text-[10px] font-bold tracking-wider uppercase mb-0.5" style="color: #005379">Fra Adresseavisen</div>
          <div class="text-[13px] font-semibold leading-snug" style="color: #101010">Ny studentbolig på Øya vedtatt</div>
          <div class="text-[11px] mt-1 leading-snug" style="color: rgba(16,16,16,0.55)">• 400 nye boliger fra 2027<br>• Byggestart etter sommeren</div>
        </div>
      </div>
      <div class="mt-3 rounded-lg py-2 text-center text-[12px] font-bold" style="background: #005379; color: #fff">
        Les hele saken
      </div>
    </div>

    <slot />
  </div>
</template>
