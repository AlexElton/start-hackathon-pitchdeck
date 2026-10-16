<script setup lang="ts">
// Simplified Norway outline with a highlighted Trøndelag region.
// Coordinates are hand-tuned percentages inside a 100x100 viewBox.
const norway = `M 30 2
  L 38 6 L 44 4 L 50 9 L 58 8 L 64 14 L 72 16 L 78 24 L 84 30 L 88 40 L 92 52 L 90 64 L 84 74 L 76 82 L 66 88 L 56 92 L 46 94 L 38 92 L 32 86 L 28 78 L 24 70 L 20 62 L 16 54 L 14 46 L 16 38 L 20 30 L 24 20 L 27 12 Z`

defineProps<{ highlightTrondelag?: boolean }>()
</script>

<template>
  <div class="relative w-full h-full">
    <svg viewBox="0 0 100 100" class="w-full h-full">
      <defs>
        <linearGradient id="no-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e6ebef" />
          <stop offset="100%" stop-color="#d5dde3" />
        </linearGradient>
      </defs>
      <path
        :d="norway"
        fill="url(#no-grad)"
        stroke="rgba(16,16,16,0.25)"
        stroke-width="0.8"
        stroke-linejoin="round"
      />
      <!-- Trøndelag highlight -->
      <ellipse
        v-if="highlightTrondelag"
        cx="52"
        cy="26"
        rx="16"
        ry="9"
        fill="rgba(0,83,121,0.22)"
        stroke="#005379"
        stroke-width="0.9"
      />
      <!-- Trondheim dot -->
      <circle cx="52" cy="26" r="1.6" fill="#005379" />
      <circle cx="52" cy="26" r="4" fill="none" stroke="rgba(0,83,121,0.5)" stroke-width="0.5" />
    </svg>
    <div
      v-if="highlightTrondelag"
      class="absolute text-[11px] font-semibold"
      style="left: 62%; top: 22%; color: #005379"
    >
      Trøndelag
    </div>
  </div>
</template>
