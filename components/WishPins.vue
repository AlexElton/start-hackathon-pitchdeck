<script setup lang="ts">
// The five feature wishes drop onto a map as pins, in the same category colors as the app.
defineProps<{ on?: boolean }>()

const wishes = [
  { icon: 'tag', color: '#F7A800', label: 'Studentrabatter og lokale tilbud', y: 30 },
  { icon: 'confetti', color: '#FF9E18', label: 'Kveldens arrangementer og fester', y: 50 },
  { icon: 'pin', color: '#005379', label: 'Nyheter på kart', y: 26 },
  { icon: 'funnel', color: '#28AAE2', label: 'Filtrering av kategorier', y: 48 },
  { icon: 'chat', color: '#c792ea', label: 'Forklaring av ukjente ord og personer', y: 32 },
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
      :key="w.icon"
      class="wish"
      :class="{ on }"
      :style="{ left: `${10 + i * 20}%`, top: `${w.y}%`, transitionDelay: on ? `${i * 140}ms` : '0ms' }"
    >
      <div class="wish-pin" :style="{ background: w.color }">
        <div class="wish-icon">
          <ph-tag-fill v-if="w.icon === 'tag'" class="w-7 h-7" />
          <ph-confetti-fill v-else-if="w.icon === 'confetti'" class="w-7 h-7" />
          <ph-map-pin-fill v-else-if="w.icon === 'pin'" class="w-7 h-7" />
          <ph-funnel-fill v-else-if="w.icon === 'funnel'" class="w-7 h-7" />
          <ph-chat-circle-text-fill v-else class="w-7 h-7" />
        </div>
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
  height: 260px;
  border-radius: 1.25rem;
  background: #e5edf5;
  overflow: hidden;
}

.wish {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  opacity: 0;
  transform: translate(-50%, -160px);
  transition: transform .7s cubic-bezier(.3, 1.6, .5, 1), opacity .3s ease;
}

.wish.on {
  opacity: 1;
  transform: translate(-50%, 0);
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

.wish-icon {
  transform: rotate(45deg);
  color: #ffffff;
  display: flex;
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
