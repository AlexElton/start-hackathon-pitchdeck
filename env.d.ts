// Let TypeScript understand image imports (Vite turns them into URLs)
declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.mp4' {
  const src: string
  export default src
}
