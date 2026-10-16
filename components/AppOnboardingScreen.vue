<script setup lang="ts">
// Onboarding screen — category selection step.
const categories = [
  { label: 'Nyheter', on: true },
  { label: 'Arrangementer', on: true },
  { label: 'Tilbud', on: true },
  { label: 'Studentliv', on: true },
  { label: 'Sport', on: false },
  { label: 'Kultur', on: true },
  { label: 'Politikk', on: false },
  { label: 'Mat & drikke', on: true },
]
</script>

<template>
  <div class="relative w-full h-full flex flex-col px-5 pt-14 pb-6" style="background: #F6F6F6">
    <div class="text-[10px] font-bold tracking-widest uppercase mb-1" style="color: #005379">Steg 1 av 3</div>
    <div class="text-[22px] font-extrabold leading-tight mb-1" style="color: #101010">Hva interesserer deg?</div>
    <div class="text-[12px] mb-4" style="color: rgba(16,16,16,0.5)">Vi tilpasser kartet etter valgene dine.</div>

    <div class="flex flex-wrap gap-2">
      <span
        v-for="c in categories"
        :key="c.label"
        class="px-3 py-1.5 rounded-full text-[12px] font-semibold"
        :style="c.on
          ? 'background:#005379;color:#fff'
          : 'background:#fff;color:rgba(16,16,16,0.45);border:1px solid #E2E2E2'"
      >
        {{ c.label }}
      </span>
    </div>

    <div class="mt-auto">
      <div class="rounded-xl py-3 text-center text-[14px] font-bold" style="background: #005379; color: #fff">
        Velg din avis
      </div>
      <div class="mt-2 text-center text-[10px]" style="color: rgba(16,16,16,0.35)">Du kan endre dette når som helst</div>
    </div>
  </div>
</template>
