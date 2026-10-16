<script setup lang="ts">
// iPhone frame wrapper — drop any screen content inside the slot.
</script>

<template>
  <div class="phone">
    <div class="phone-notch" />
    <div class="phone-screen">
      <div class="ios-status">
        <span>9:41</span>
        <span class="flex items-center gap-1">
          <span class="inline-block w-3.5 h-2 rounded-[2px]" style="background: #101010; opacity: 0.9" />
          <span class="inline-block w-4 h-2 rounded-[3px]" style="border: 1px solid rgba(16,16,16,0.7)" />
        </span>
      </div>
      <slot />
    </div>
    <div class="ios-home" />
  </div>
</template>
