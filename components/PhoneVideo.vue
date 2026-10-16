<script setup lang="ts">
// App screen recording for use inside PhoneFrame. Plays once from the start whenever
// `playing` turns true and stops on the last frame; rewinds when `playing` turns false.
import { onMounted, ref, watch } from 'vue'
import demo from '../assets/screens/app-demo.mp4'

const props = defineProps<{ playing?: boolean }>()
const video = ref<HTMLVideoElement>()

function sync(playing?: boolean) {
  const v = video.value
  if (!v)
    return
  v.currentTime = 0
  if (playing)
    v.play().catch(() => {})
  else
    v.pause()
}

watch(() => props.playing, sync)
// Covers loading the page while already on the playing click
onMounted(() => props.playing && sync(true))
</script>

<template>
  <video
    ref="video"
    :src="demo"
    class="w-full h-full"
    style="object-fit: cover; object-position: top"
    muted
    playsinline
    preload="auto"
  />
</template>
