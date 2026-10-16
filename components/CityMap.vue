<script setup lang="ts">
// Stylised 3D/satellite-style city map (Trondheim) built from CSS shapes.
// Deterministic pseudo-random so pins don't jump between renders.
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(42)

interface Pin {
  x: number
  y: number
  kind: 'news' | 'event' | 'deal' | 'student'
  label?: string
  size?: number
}

const kinds: Pin['kind'][] = ['news', 'news', 'event', 'event', 'deal', 'student']

const pins: Pin[] = Array.from({ length: 26 }, (_, i) => ({
  x: 6 + rand() * 88,
  y: 8 + rand() * 82,
  kind: kinds[i % kinds.length],
  size: 10 + rand() * 6,
}))

// A few labelled pins for storytelling
const labelled: Pin[] = [
  { x: 30, y: 34, kind: 'news', label: 'Adresseavisen' },
  { x: 62, y: 22, kind: 'event', label: 'UKA' },
  { x: 72, y: 58, kind: 'deal', label: 'Studenttilbud' },
  { x: 18, y: 66, kind: 'student', label: 'Studentersamfundet' },
]

// Cluster bubbles (zoomed-out feel)
const clusters = [
  { x: 44, y: 40, n: 12 },
  { x: 78, y: 30, n: 7 },
  { x: 24, y: 74, n: 5 },
]

// "Buildings" — abstract 3D-ish blocks
const blocks = Array.from({ length: 34 }, () => ({
  x: rand() * 96,
  y: rand() * 92,
  w: 2 + rand() * 5,
  h: 2 + rand() * 5,
  o: 0.05 + rand() * 0.1,
}))

// Roads
const roads = [
  { x: 0, y: 30, w: 100, h: 2.2, r: -4 },
  { x: 0, y: 62, w: 100, h: 1.8, r: 3 },
  { x: 28, y: 0, w: 2, h: 100, r: 6 },
  { x: 66, y: 0, w: 1.6, h: 100, r: -5 },
  { x: 10, y: 84, w: 80, h: 1.4, r: -2 },
]

// Water (Nidelva-ish curve)
const river = 'M -5 70 C 20 60, 30 80, 48 66 S 78 40, 105 52'

defineProps<{ showLabels?: boolean }>()
</script>

<template>
  <div class="citymap">
    <!-- base gradient -->
    <div class="absolute inset-0" style="background: radial-gradient(120% 90% at 30% 20%, #e8eef2 0%, #dde6ec 45%, #d3dee6 100%)" />

    <!-- water -->
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path :d="river" fill="none" stroke="#9fc4d8" stroke-width="5" stroke-linecap="round" opacity="0.9" />
      <path :d="river" fill="none" stroke="#7fb0cc" stroke-width="2" stroke-linecap="round" opacity="0.6" />
    </svg>

    <!-- roads -->
    <div
      v-for="(r, i) in roads"
      :key="'r' + i"
      class="absolute rounded-full"
      :style="{
        left: r.x + '%',
        top: r.y + '%',
        width: r.w + '%',
        height: r.h + 'px',
        transform: `rotate(${r.r}deg)`,
        background: 'rgba(255,255,255,0.85)',
      }"
    />

    <!-- buildings -->
    <div
      v-for="(b, i) in blocks"
      :key="'b' + i"
      class="absolute rounded-[2px]"
      :style="{
        left: b.x + '%',
        top: b.y + '%',
        width: b.w + '%',
        height: b.h + '%',
        background: `rgba(120,140,160,${b.o})`,
        boxShadow: '1px 2px 0 rgba(0,0,0,0.08)',
      }"
    />

    <!-- green patches -->
    <div class="absolute rounded-full" style="left: 8%; top: 12%; width: 14%; height: 12%; background: rgba(78,157,45,0.18); filter: blur(6px)" />
    <div class="absolute rounded-full" style="left: 80%; top: 70%; width: 16%; height: 14%; background: rgba(78,157,45,0.15); filter: blur(6px)" />

    <!-- pins -->
    <div
      v-for="(p, i) in pins"
      :key="'p' + i"
      class="pin-dot"
      :class="'pin-' + p.kind"
      :style="{
        left: p.x + '%',
        top: p.y + '%',
        width: p.size + 'px',
        height: p.size + 'px',
        opacity: 0.9,
      }"
    />

    <!-- clusters -->
    <div
      v-for="(c, i) in clusters"
      :key="'c' + i"
      class="absolute flex items-center justify-center rounded-full text-white font-bold"
      :style="{
        left: c.x + '%',
        top: c.y + '%',
        width: 34 + c.n + 'px',
        height: 34 + c.n + 'px',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 83, 121, 0.18)',
        border: '1.5px solid rgba(0, 83, 121, 0.55)',
        backdropFilter: 'blur(2px)',
        fontSize: '12px',
      }"
    >
      {{ c.n }}
    </div>

    <!-- labelled pins -->
    <template v-if="showLabels">
      <div
        v-for="(p, i) in labelled"
        :key="'l' + i"
        class="absolute"
        :style="{ left: p.x + '%', top: p.y + '%' }"
      >
        <div class="flex items-center gap-1.5" style="transform: translate(-6px, -50%)">
          <span class="pin-dot" :class="'pin-' + p.kind" style="position: static; width: 12px; height: 12px" />
          <span class="map-label">{{ p.label }}</span>
        </div>
      </div>
    </template>

    <slot />
  </div>
</template>

<style scoped>
.citymap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.map-label {
  font-size: 11px;
  font-weight: 600;
  color: #101010;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #E2E2E2;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
  backdrop-filter: blur(4px);
}
</style>
