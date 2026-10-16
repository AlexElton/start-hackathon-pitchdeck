<script setup lang="ts">
// A crowd of 48 hands — one per respondent. When `on`, 44 shoot up
// ("ville du brukt et kart?" — 91,7 % said yes). The rest stay down.
const props = withDefaults(defineProps<{ on?: boolean, total?: number, yes?: number }>(), {
  on: false,
  total: 48,
  yes: 44,
})

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(23)
const perRow = props.total / 2
const hands = Array.from({ length: props.total }, (_, i) => ({
  row: i < perRow ? 0 : 1,
  col: i % perRow,
  lift: 52 + rand() * 26,
  tilt: (rand() - 0.5) * 24,
  delay: rand() * 700,
  rank: i,
}))
for (let i = hands.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1))
  ;[hands[i].rank, hands[j].rank] = [hands[j].rank, hands[i].rank]
}
</script>

<template>
  <div class="crowd">
    <div
      v-for="(h, i) in hands"
      :key="i"
      class="hand"
      :class="{ up: props.on && h.rank < props.yes, back: h.row === 0 }"
      :style="{
        left: `${(h.col + (h.row ? 0.5 : 0)) * (100 / (perRow + 0.5))}%`,
        bottom: h.row ? '-6px' : '18px',
        transitionDelay: props.on ? `${h.delay}ms` : '0ms',
        transform: props.on && h.rank < props.yes
          ? `translateY(-${h.lift}px) rotate(${h.tilt}deg)`
          : `translateY(0) rotate(${h.tilt / 2}deg)`,
      }"
    >
      <ph-hand-palm-fill class="w-8 h-8" />
      <div class="arm" />
    </div>
    <div class="crowd-fade" />
  </div>
</template>

<style scoped>
.crowd {
  position: relative;
  width: 760px;
  height: 200px;
  overflow: hidden;
}

.hand {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(16, 16, 16, 0.22);
  transition: transform .6s cubic-bezier(.3, 1.5, .5, 1), color .3s ease;
}

.hand.back {
  z-index: 0;
}

.hand:not(.back) {
  z-index: 2;
}

.arm {
  width: 9px;
  height: 120px;
  margin-top: -4px;
  border-radius: 5px;
  background: currentColor;
}

.hand.up {
  color: #005379;
}

.hand.up.back {
  color: #33789e;
}

.crowd-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  z-index: 3;
  background: linear-gradient(to bottom, rgba(246, 246, 246, 0), #f6f6f6 85%);
}
</style>
