<script setup lang="ts">
// Article screen with the "Forklar" AI tooltip on a highlighted term.
</script>

<template>
  <div class="relative w-full h-full flex flex-col px-5 pt-14 pb-6" style="background: #F6F6F6">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-[16px]" style="color: rgba(16,16,16,0.6)">‹</span>
      <span class="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style="background: #E5EDF5; color: #005379; border: 1px solid rgba(0,83,121,0.3)">Fra Adresseavisen</span>
    </div>

    <div class="text-[19px] font-extrabold leading-tight mb-2" style="color: #101010">
      Formannskapet vil utvide studenttilbudet på Gløshaugen
    </div>

    <div class="text-[12px] leading-relaxed" style="color: rgba(16,16,16,0.75)">
      <span class="forklar-term">formannskapet</span>
      <span> har vedtatt å utvide tilbudet til studenter på campus. Bakgrunnen er økt press på boligmarkedet i Trondheim. </span>
      <span class="forklar-term">Bærum</span>
      <span> er ikke berørt, men flere andre bydeler vurderes.</span>
    </div>

    <!-- Forklar tooltip -->
    <div class="mt-4 rounded-xl p-3" style="background: #E5EDF5; border: 1px solid rgba(0,83,121,0.3)">
      <div class="flex items-center gap-1.5 mb-1">
        <span class="text-[11px]">✨</span>
        <span class="text-[11px] font-bold tracking-wide" style="color: #005379">Forklar</span>
      </div>
      <div class="text-[11.5px] leading-snug" style="color: rgba(16,16,16,0.8)">
        Formannskapet er kommunens øverste utvalg — ordfører og komiteledere som forbereder sakene for bystyret.
      </div>
    </div>

    <div class="mt-auto rounded-xl py-3 text-center text-[13px] font-bold" style="background: #005379; color: #fff">
      Les hele saken
    </div>
  </div>
</template>

<style scoped>
.forklar-term {
  background: rgba(0, 83, 121, 0.12);
  border-bottom: 2px solid #005379;
  border-radius: 3px;
  padding: 0 2px;
  color: #101010;
  font-weight: 600;
}
</style>
