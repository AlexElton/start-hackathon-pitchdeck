<script setup lang="ts">
// Summary card screen — pin → summary step.
</script>

<template>
  <div class="relative w-full h-full flex flex-col px-5 pt-14 pb-6" style="background: #F6F6F6">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-[16px]" style="color: rgba(16,16,16,0.6)">‹</span>
      <span class="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style="background: #E5EDF5; color: #005379; border: 1px solid rgba(0,83,121,0.3)">Fra Adresseavisen</span>
    </div>

    <div class="text-[19px] font-extrabold leading-tight mb-3" style="color: #101010">
      Ny studentbolig på Øya vedtatt
    </div>

    <div class="rounded-xl p-3 mb-3" style="background: #E5EDF5; border: 1px solid rgba(0,83,121,0.2)">
      <div class="text-[12px] leading-relaxed" style="color: #101010">
        Kommunen har vedtatt å bygge 400 nye studentboliger på Øya. Byggestart er planlagt etter sommeren.
      </div>
    </div>

    <div class="space-y-2">
      <div v-for="b in ['400 boliger fra 2027', 'Byggestart etter sommeren', 'Nær Gløshaugen og Øya campus']" :key="b" class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: #005379" />
        <span class="text-[12px]" style="color: rgba(16,16,16,0.7)">{{ b }}</span>
      </div>
    </div>

    <div class="mt-auto rounded-xl py-3 text-center text-[13px] font-bold" style="background: #005379; color: #fff">
      Les hele saken
    </div>
  </div>
</template>
