<script setup lang="ts">
// We ask the student group chat. When `on`, 48 reactions flood in — one per respondent:
// 44 enthusiastic yeses (91,7 %), 4 shrugs. Reactions keep bobbing so the slide stays alive.
const props = withDefaults(defineProps<{ on?: boolean, total?: number, yes?: number }>(), {
  on: false,
  total: 48,
  yes: 44,
})

const W = 760
const H = 270
const BUBBLE = { w: 440, h: 96 }

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rand = seeded(5)
const kinds = [
  { icon: 'thumb', color: '#005379' },
  { icon: 'heart', color: '#c792ea' },
  { icon: 'fire', color: '#FF9E18' },
  { icon: 'star', color: '#F7A800' },
  { icon: 'thumb', color: '#28AAE2' },
]

// Scatter reactions around the bubble without overlapping each other
const spots: { x: number, y: number }[] = []
for (let tries = 0; spots.length < props.total && tries < 20000; tries++) {
  const x = 22 + rand() * (W - 44)
  const y = 22 + rand() * (H - 44)
  if (Math.abs(x - W / 2) < BUBBLE.w / 2 + 20 && Math.abs(y - H / 2) < BUBBLE.h / 2 + 22)
    continue
  if (spots.some(s => Math.hypot(s.x - x, s.y - y) < 42))
    continue
  spots.push({ x, y })
}

const noIdx = new Set<number>()
while (noIdx.size < props.total - props.yes)
  noIdx.add(Math.floor(rand() * spots.length))

const reactions = spots.map((s, i) => ({
  ...s,
  no: noIdx.has(i),
  kind: kinds[Math.floor(rand() * kinds.length)],
  delay: i * 32 + rand() * 120,
  bob: rand() * 2,
  tilt: (rand() - 0.5) * 24,
}))
</script>

<template>
  <div class="chat" :style="{ width: `${W}px`, height: `${H}px` }">
    <div class="bubble" :style="{ width: `${BUBBLE.w}px` }">
      <div class="avatar">
        <ph-users-three-fill class="w-6 h-6" />
      </div>
      <div class="text-left">
        <div class="bubble-name">Studentgruppa · 48 medlemmer</div>
        <div class="bubble-text">Ville du brukt et kart som viser nyheter og fester der de faktisk skjer?</div>
      </div>
      <div class="typing" :class="{ hide: props.on }">
        <span /><span /><span />
      </div>
    </div>

    <div
      v-for="(r, i) in reactions"
      :key="i"
      class="reaction"
      :class="{ on: props.on, no: r.no }"
      :style="{
        left: `${r.x}px`,
        top: `${r.y}px`,
        transitionDelay: props.on ? `${r.delay}ms` : '0ms',
        '--tilt': `${r.tilt}deg`,
      }"
    >
      <div class="reaction-inner" :style="{ animationDelay: `${r.bob}s`, color: r.no ? undefined : r.kind.color }">
        <ph-smiley-meh-fill v-if="r.no" class="w-6 h-6" />
        <ph-thumbs-up-fill v-else-if="r.kind.icon === 'thumb'" class="w-6 h-6" />
        <ph-heart-fill v-else-if="r.kind.icon === 'heart'" class="w-6 h-6" />
        <ph-fire-fill v-else-if="r.kind.icon === 'fire'" class="w-6 h-6" />
        <ph-star-fill v-else class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat {
  position: relative;
}

.bubble {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 22px 22px 22px 6px;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  box-shadow: 0 10px 30px rgba(16, 16, 16, 0.08);
}

.avatar {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #005379;
  color: #ffffff;
}

.bubble-name {
  font-size: 12px;
  font-weight: 700;
  color: rgba(16, 16, 16, 0.45);
}

.bubble-text {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  color: #101010;
}

.typing {
  position: absolute;
  left: 22px;
  bottom: -30px;
  display: flex;
  gap: 4px;
  padding: 7px 10px;
  border-radius: 12px;
  background: #e9e9e9;
  transition: opacity .3s ease;
}

.typing.hide {
  opacity: 0;
}

.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(16, 16, 16, 0.4);
  animation: typing 1.2s infinite ease-in-out;
}

.typing span:nth-child(2) { animation-delay: .15s; }
.typing span:nth-child(3) { animation-delay: .3s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); opacity: .4; }
  30% { transform: translateY(-4px); opacity: 1; }
}

.reaction {
  position: absolute;
  z-index: 1;
  transform: translate(-50%, -50%) scale(0) rotate(0deg);
  transition: transform .45s cubic-bezier(.3, 1.8, .5, 1);
}

.reaction.on {
  transform: translate(-50%, -50%) scale(1) rotate(var(--tilt));
}

.reaction-inner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(16, 16, 16, 0.1);
  animation: bob 2.4s ease-in-out infinite alternate;
}

.reaction.no .reaction-inner {
  color: rgba(16, 16, 16, 0.3);
  background: #f0f0f0;
  box-shadow: none;
}

@keyframes bob {
  from { transform: translateY(-3px); }
  to { transform: translateY(3px); }
}
</style>
