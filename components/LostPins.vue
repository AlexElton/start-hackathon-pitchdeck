<script setup lang="ts">
// 52 pins on a map — one per respondent. When `on`, 37 of them lose their place:
// they drift, blur and turn red (70,8 % don't know exactly where things happen).
const props = withDefaults(defineProps<{ on?: boolean, total?: number, lost?: number }>(), {
  on: false,
  total: 52,
  lost: 37,
})

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(7)
const pins = Array.from({ length: props.total }, (_, i) => ({
  x: 4 + rand() * 92,
  y: 8 + rand() * 80,
  dx: (rand() - 0.5) * 120,
  dy: (rand() - 0.5) * 80,
  rot: (rand() - 0.5) * 70,
  delay: rand() * 900,
  rank: i,
}))
// Shuffle which pins get lost so it doesn't sweep left to right
for (let i = pins.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1))
  ;[pins[i].rank, pins[j].rank] = [pins[j].rank, pins[i].rank]
}
</script>

<template>
  <div class="lost-map">
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
      <path d="M-5 42 C 20 30, 40 52, 62 38 S 90 20, 105 26" stroke="#cfe0ec" stroke-width="5" fill="none" />
      <path d="M0 14 L100 20 M18 0 L26 60 M58 0 L50 60 M80 0 L86 60 M0 50 L100 46" stroke="#ffffff" stroke-width="1.4" fill="none" />
    </svg>
    <div
      v-for="(p, i) in pins"
      :key="i"
      class="lost-pin"
      :class="{ gone: props.on && p.rank < props.lost }"
      :style="{
        left: `${p.x}%`,
        top: `${p.y}%`,
        transitionDelay: props.on ? `${p.delay}ms` : '0ms',
        transform: props.on && p.rank < props.lost
          ? `translate(calc(-50% + ${p.dx}px), calc(-100% + ${p.dy}px)) rotate(${p.rot}deg)`
          : 'translate(-50%, -100%)',
      }"
    >
      <ph-map-pin-fill class="w-7 h-7" />
    </div>
  </div>
</template>

<style scoped>
.lost-map {
  position: relative;
  width: 700px;
  height: 240px;
  border-radius: 1.25rem;
  background: #e5edf5;
  overflow: hidden;
}

.lost-pin {
  position: absolute;
  color: #005379;
  transition: transform 1.1s cubic-bezier(.3, .7, .3, 1), color .5s ease, filter 1.1s ease, opacity 1.1s ease;
}

.lost-pin.gone {
  color: #E02020;
  filter: blur(2px);
  opacity: .55;
}
</style>
