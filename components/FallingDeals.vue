<script setup lang="ts">
// 48 discount tags float around a phone — one per respondent. When `on`, 3 get caught
// by the phone and 45 fall to the floor (93,7 % miss discounts: "faller mellom stolene").
const props = withDefaults(defineProps<{ on?: boolean, total?: number, caught?: number }>(), {
  on: false,
  total: 48,
  caught: 3,
})

const W = 760
const H = 260
const CX = W / 2
const CY = H / 2 - 10

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(11)
const tags: { x: number, y: number, rot: number, fallRot: number, drift: number, delay: number }[] = []
while (tags.length < props.total) {
  const x = 20 + rand() * (W - 40)
  const y = 15 + rand() * (H - 90)
  // keep the area around the phone clear
  if (Math.abs(x - CX) < 90 && Math.abs(y - CY) < 95)
    continue
  tags.push({
    x,
    y,
    rot: (rand() - 0.5) * 50,
    fallRot: (rand() - 0.5) * 220,
    drift: (rand() - 0.5) * 50,
    delay: rand() * 1100,
  })
}
// The tags closest to the phone are the ones that get caught
const caughtSet = new Set(
  tags
    .map((t, i) => ({ i, d: Math.hypot(t.x - CX, t.y - CY) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, props.caught)
    .map(t => t.i),
)

function style(t: typeof tags[number], i: number) {
  const base = { left: `${t.x}px`, top: `${t.y}px`, transitionDelay: props.on ? `${t.delay}ms` : '0ms' }
  if (!props.on)
    return { ...base, transform: `translate(-50%, -50%) rotate(${t.rot}deg)` }
  if (caughtSet.has(i)) {
    const k = [...caughtSet].indexOf(i)
    return { ...base, transform: `translate(calc(-50% + ${CX - t.x + (k - 1) * 22}px), calc(-50% + ${CY - t.y + 10}px)) rotate(0deg) scale(.9)` }
  }
  return { ...base, transform: `translate(calc(-50% + ${t.drift}px), calc(-50% + ${H - 14 - t.y}px)) rotate(${t.fallRot}deg)` }
}
</script>

<template>
  <div class="deals" :style="{ width: `${W}px`, height: `${H}px` }">
    <div class="deals-floor" />
    <div class="deals-phone" :style="{ left: `${CX}px`, top: `${CY}px` }">
      <div class="deals-screen" />
    </div>
    <div
      v-for="(t, i) in tags"
      :key="i"
      class="deal-tag"
      :class="{ caught: props.on && caughtSet.has(i), dropped: props.on && !caughtSet.has(i) }"
      :style="style(t, i)"
    >
      <ph-tag-fill class="w-7 h-7" />
    </div>
  </div>
</template>

<style scoped>
.deals {
  position: relative;
}

.deals-floor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: #e2e2e2;
}

.deals-phone {
  position: absolute;
  width: 84px;
  height: 160px;
  transform: translate(-50%, -50%);
  border-radius: 18px;
  background: #101010;
  padding: 5px;
}

.deals-screen {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: #ffffff;
}

.deal-tag {
  position: absolute;
  z-index: 1;
  color: rgba(16, 16, 16, 0.6);
  transition: transform 1s cubic-bezier(.5, 0, .75, .2), color .4s ease, opacity .8s ease;
}

.deal-tag.caught {
  color: #005379;
  transition: transform .9s cubic-bezier(.3, .7, .3, 1), color .4s ease;
}

.deal-tag.dropped {
  color: #E02020;
  opacity: .7;
}
</style>
