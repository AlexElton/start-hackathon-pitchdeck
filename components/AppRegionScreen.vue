<script setup lang="ts">
// Region / avis selection onboarding step with the Norway map.
</script>

<template>
  <div class="relative w-full h-full flex flex-col px-5 pt-14 pb-6" style="background: #F6F6F6">
    <div class="text-[10px] font-bold tracking-widest uppercase mb-1" style="color: #005379">Steg 2 av 3</div>
    <div class="text-[22px] font-extrabold leading-tight mb-1" style="color: #101010">Velg din region</div>
    <div class="text-[12px] mb-2" style="color: rgba(16,16,16,0.5)">Vi viser nyheter fra ditt lokalområde.</div>

    <div class="flex-1 min-h-0">
      <NorwayMap highlight-trondelag />
    </div>

    <div class="rounded-xl px-3 py-2.5 mb-3 flex items-center justify-between" style="background: #fff; border: 1px solid rgba(0,83,121,0.5)">
      <div>
        <div class="text-[13px] font-bold" style="color: #101010">Adresseavisen</div>
        <div class="text-[10px]" style="color: rgba(16,16,16,0.5)">Trøndelag</div>
      </div>
      <span class="text-[12px]" style="color: #005379">✓</span>
    </div>

    <div class="rounded-xl py-3 text-center text-[14px] font-bold" style="background: #005379; color: #fff">
      Start kartet
    </div>
  </div>
</template>
