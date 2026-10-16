<script setup lang="ts">
// iPhone frame wrapper — drop any screen content inside the slot.
// The bezel is a transparent-screen image laid on top; the slot sits underneath,
// cut to the screen opening. Set only the width — the height follows the image.
// Pass `screen="map"` to show a real app screenshot from assets/screens/<name>.webp
// instead of slot content (screenshots carry their own status bar).
import frame from '../assets/iphone-frame.webp'
import article from '../assets/screens/article.webp'
import map from '../assets/screens/map.webp'
import summary from '../assets/screens/summary.webp'

// `hideStatus` fades out the fake status bar + home indicator, e.g. while slot content
// is a recording that has its own.
const props = defineProps<{ screen?: 'map' | 'summary' | 'article', hideStatus?: boolean }>()

const screenshot = props.screen ? { map, summary, article }[props.screen] : undefined
</script>

<template>
  <div class="phone">
    <div v-if="screenshot" class="phone-screen">
      <img :src="screenshot" class="phone-shot" alt="" draggable="false">
    </div>
    <div v-else class="phone-screen">
      <div class="ios-status" :class="{ 'is-hidden': props.hideStatus }">
        <span>9:41</span>
        <span class="flex items-center gap-1">
          <span class="inline-block w-3.5 h-2 rounded-[2px]" style="background: #101010; opacity: 0.9" />
          <span class="inline-block w-4 h-2 rounded-[3px]" style="border: 1px solid rgba(16,16,16,0.7)" />
        </span>
      </div>
      <slot />
      <div class="ios-home" :class="{ 'is-hidden': props.hideStatus }" />
    </div>
    <img :src="frame" class="phone-bezel" alt="" draggable="false">
  </div>
</template>

<style scoped>
/* Measured from assets/iphone-frame.webp (857 × 1736):
   screen opening x 41–809, y 33–1701, corner radius ≈ 115 px, Dynamic Island y 57–119. */
.phone {
  position: relative;
  width: 212px;
  aspect-ratio: 857 / 1736;
  flex-shrink: 0;
}

/* Bleeds ~5 px (image space) under the bezel so no light edge shows through its anti-aliasing */
.phone-screen {
  position: absolute;
  left: 4.2%;
  right: 4.9%;
  top: 1.6%;
  bottom: 1.67%;
  border-radius: 15.4% / 7.15%;
  overflow: hidden;
  background: #f6f6f6;
}

.ios-status,
.ios-home {
  transition: opacity 0.4s ease;
}

.ios-status.is-hidden,
.ios-home.is-hidden {
  opacity: 0;
}

.phone-shot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.phone-bezel {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.22));
}

/* iOS status bar — vertically centred on the Dynamic Island */
.ios-status {
  position: absolute;
  top: 3.3%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 11%;
  font-size: 11px;
  font-weight: 700;
  color: #101010;
  z-index: 25;
  font-family: -apple-system, 'SF Pro Text', sans-serif;
}

/* iOS home indicator */
.ios-home {
  position: absolute;
  bottom: 1.4%;
  left: 50%;
  transform: translateX(-50%);
  width: 36%;
  height: 4px;
  border-radius: 999px;
  background: rgba(16, 16, 16, 0.85);
  z-index: 30;
}
</style>
