<script setup lang="ts">
// We ask the student group chat (Beer Nye). When `on`, 52 reactions flood in — one per respondent:
// 48 enthusiastic yeses (91,7 %), 4 shrugs. Reactions keep bobbing so the slide stays alive.
const props = withDefaults(defineProps<{ on?: boolean, total?: number, yes?: number }>(), {
  on: false,
  total: 52,
  yes: 48,
})

const W = 760
const H = 300
const BUBBLE = { w: 460, h: 110 }

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
    <div class="message" :style="{ width: `${BUBBLE.w}px` }">
      <div class="avatar">
        <ph-users-three-fill class="w-5 h-5" />
      </div>
      <div class="text-left">
        <div class="bubble-name">Beer Nye · 52 medlemmer</div>
        <div class="bubble">
          Ville du brukt et kart som viser nyheter og fester der de faktisk skjer?
          <svg class="tail" viewBox="0 0 14 18" aria-hidden="true">
            <path d="M14 0C14 8 10 15 0 18H14Z" fill="currentColor" />
          </svg>
        </div>
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

.message {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.avatar {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
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
  margin: 0 0 4px 14px;
}

/* Received message: white bubble, tail at the bottom-left pointing to the avatar */
.bubble {
  position: relative;
  padding: 11px 16px;
  border-radius: 20px 20px 20px 6px;
  background: #ffffff;
  color: #101010;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
  filter: drop-shadow(0 6px 16px rgba(16, 16, 16, 0.08));
}

.tail {
  position: absolute;
  left: -6px;
  bottom: 0;
  width: 14px;
  height: 18px;
  color: #ffffff;
}

/* Someone is typing a reply — sits on the right like an outgoing message */
.typing {
  position: absolute;
  right: 0;
  bottom: -38px;
  display: flex;
  gap: 4px;
  padding: 9px 12px;
  border-radius: 16px 16px 6px 16px;
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
