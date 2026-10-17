<script setup lang="ts">
// The five feature wishes drop onto a map as pins, in the same category colors as the app.
// They drop in by themselves every time the slide becomes active.
import { useIsSlideActive } from '@slidev/client'
import { ref, watch } from 'vue'

const isActive = useIsSlideActive()
// Bumping `run` re-creates the pins, which restarts their drop animation
const run = ref(0)
watch(isActive, (active) => {
  if (active)
    run.value++
}, { immediate: true })

const wishes = [
  { color: '#F7A800', label: 'Studentrabatter og lokale tilbud', y: 14 },
  { color: '#FF9E18', label: 'Kveldens arrangementer og fester', y: 28 },
  { color: '#005379', label: 'Nyheter på kart', y: 10 },
  { color: '#28AAE2', label: 'Filtrering av kategorier', y: 26 },
  { color: '#c792ea', label: 'Nyhetssammendrag', y: 12 },
]
</script>

<template>
  <div class="wish-map">
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
      <path d="M-5 30 C 25 18, 45 38, 70 24 S 95 14, 105 18" stroke="#cfe0ec" stroke-width="4" fill="none" />
      <path d="M0 10 L100 14 M14 0 L20 40 M40 0 L36 40 M64 0 L60 40 M86 0 L90 40" stroke="#ffffff" stroke-width="1" fill="none" />
    </svg>
    <div
      v-for="(w, i) in wishes"
      :key="`${run}-${w.label}`"
      class="wish"
      :class="{ drop: run > 0 }"
      :style="{ left: `${(i + 0.5) * (100 / wishes.length)}%`, top: `${w.y}%`, animationDelay: `${900 + i * 280}ms` }"
    >
      <div class="wish-pin" :style="{ background: w.color }">
        <div class="wish-dot" />
      </div>
      <div class="wish-shadow" />
      <div class="wish-label">{{ w.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.wish-map {
  position: relative;
  width: 820px;
  height: 280px;
  border-radius: 1.25rem;
  background: #e5edf5;
  overflow: hidden;
}

.wish {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  opacity: 0;
  transform: translate(-50%, -160px);
}

/* A keyframe animation (not a transition) so it replays from the top every time
   the slide is entered, even if the slide was already active when it mounted. */
.wish.drop {
  animation: wish-drop .9s cubic-bezier(.3, 1.6, .5, 1) both;
}

@keyframes wish-drop {
  from {
    opacity: 0;
    transform: translate(-50%, -160px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.wish-pin {
  width: 60px;
  height: 60px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(16, 16, 16, 0.18);
}

.wish-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
}

.wish-shadow {
  width: 22px;
  height: 6px;
  margin-top: 8px;
  border-radius: 50%;
  background: rgba(16, 16, 16, 0.15);
}

.wish-label {
  margin-top: 8px;
  padding: 4px 10px;
  border-radius: 10px;
  background: #ffffff;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  color: #101010;
  box-shadow: 0 2px 8px rgba(16, 16, 16, 0.08);
}
</style>
