<script setup lang="ts">
// App screen recording for use inside PhoneFrame. Plays from the start whenever
// `playing` turns true and stops on the last frame (or repeats with `loop`);
// rewinds when `playing` turns false.
// `video` picks the recording: "demo" (our app, default) or "feed" (an endless news feed).
import { onMounted, ref, watch } from 'vue'
import demo from '../assets/screens/app-demo.mp4'
import feed from '../assets/screens/feed-demo.mp4'

const props = defineProps<{ playing?: boolean, loop?: boolean, video?: 'demo' | 'feed' }>()
const src = { demo, feed }[props.video ?? 'demo']
const el = ref<HTMLVideoElement>()

function sync(playing?: boolean) {
  const v = el.value
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
    ref="el"
    :src="src"
    class="w-full h-full"
    style="object-fit: cover; object-position: top"
    :loop="loop"
    muted
    playsinline
    preload="auto"
  />
</template>
