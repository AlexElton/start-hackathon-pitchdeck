---
theme: seriph
title: Hva skjer rundt meg?
info: Map-first lokalnyheter for studenter — Polaris hackathon pitch
drawings:
  persist: false
mdc: true
transition: fade
class: '!p-0'
layout: default
clicks: 1
---

<div class="absolute inset-0" style="background: #ffffff" />
<div class="absolute inset-0 flex items-center justify-center">
  <div class="flex flex-col items-center text-center">
    <PeopleGrid :total="50" :affected="40" :on="$clicks >= 1" />
    <div v-click>
      <div class="text-4xl font-extrabold mt-4" style="color: #101010">8 av 10 studenter</div>
      <p class="text-lg mt-2" style="color: rgba(16,16,16,0.75); max-width: 300px">
        mener det er vanskelig å henge med på lokale nyheter
      </p>
    </div>
  </div>
</div>

<!--
Ren hvit bakgrunn med 50 dempede blå figurer. Klikk 1: de første 40 blir klart røde (80 %), og «80 % av studenter synes …»-teksten dukker opp — 40 av 50 studenter mister lokalnyhetene. La tallet snakke. Ikke forklar produktet ennå.
-->

---
transition: slide-left
clicks: 1
---

<h1 class="!text-5xl mb-2">Hvordan finner du ut av hva studenter faktisk trenger?</h1>
<div v-click class="mt-16 text-center">
  <div class="text-6xl font-extrabold accent">Du spør dem.</div>
</div>

<!--
Klikk 1: «Du spør dem.» — vi spurte studentene selv. Neste slide viser svarene.
-->

---
transition: slide-left
layout: center
clicks: 1
---

<div class="flex flex-col items-center text-center">
  <div class="kicker">Vi spurte 52 studenter</div>
  <h1 class="!text-4xl mb-6">Hvor skjer det egentlig?</h1>
  <LostPins :on="$clicks >= 1" />
  <div v-click class="mt-4">
    <span class="text-3xl font-extrabold" style="color: #E02020">37 av 52</span>
    <span class="text-xl dim ml-2">vet ikke nøyaktig hvor ting skjer rundt dem</span>
  </div>
</div>

<!--
52 nåler = 52 studenter som svarte. Klikk 1: 37 av nålene mister plassen sin — de driver av, blir uskarpe og røde (70,8 %).
Nyhetene finnes, men de er ikke koblet til et sted.
-->

---
transition: slide-left
layout: center
---

<div class="flex justify-center">
  <PhoneFrame style="width: 212px" hide-status>
    <PhoneVideo video="feed" playing loop />
  </PhoneFrame>
</div>

<!--
Den endeløse feeden (ekte skjermopptak av en nyhetsapp): slik leter studentene etter lokalnyheter i dag — scrolling uten sted.
-->

---
transition: slide-left
layout: center
clicks: 1
---

<div class="flex flex-col items-center text-center">
  <h1 class="!text-4xl mb-6">Rabattene faller mellom stolene.</h1>
  <FallingDeals :on="$clicks >= 1" />
  <div v-click class="mt-4">
    <span class="text-3xl font-extrabold" style="color: #E02020">49 av 52</span>
    <span class="text-xl dim ml-2">går glipp av rabatter fordi de ligger spredt i for mange apper</span>
  </div>
</div>

<!--
52 rabattlapper svever rundt telefonen — én per student. Klikk 1: telefonen fanger tre, de 49 andre faller på gulvet (93,7 %).
-->

---
transition: slide-left
layout: center
clicks: 1
---

<div class="flex flex-col items-center text-center">
  <h1 class="!text-4xl mb-4">Så vi spurte <span class="accent">rett ut</span>.</h1>
  <ChatReactions :on="$clicks >= 1" />
  <div v-click class="mt-2">
    <span class="text-3xl font-extrabold accent">48 av 52</span>
    <span class="text-xl dim ml-2">sa ja</span>
  </div>
</div>

<!--
Spørsmålet i gruppechatten Beer Nye — «skriver …» mens vi venter. Klikk 1: 52 reaksjoner strømmer inn, én per student:
48 tomler, hjerter og flammer (91,7 % ja), 4 skuldertrekk. De ville brukt et kart som viser nyheter og fester der de skjer.
-->

---
transition: slide-left
layout: center
clicks: 1
---

<div class="flex flex-col items-center text-center">
  <div class="kicker">Mer fra undersøkelsen</div>
  <h1 class="!text-4xl mb-6">Hva studentene faktisk etterspør.</h1>
  <WishPins />
  <div v-click class="mt-6 text-2xl font-bold" style="color: #101010">
    Vi bygde <span class="accent">det studentene ba om</span> — ikke det vi gjettet på.
  </div>
</div>

<!--
Når sliden åpnes, faller de fem ønskene ned som nåler på kartet — i samme farger som i appen.
Tilbud, arrangementer, kart, filtrering, nyhetssammendrag. Klikk 1: vi bygde det de ba om, ikke det vi gjettet på.
-->

---
transition: slide-left
layout: center
clicks: 1
---

<div class="relative h-[430px]">
  <div
    class="absolute left-1/2 top-1/2 z-10 transition-transform duration-700"
    :style="{ transform: $clicks >= 1 ? 'translate(calc(-50% - 180px), -50%)' : 'translate(-50%, -50%)' }"
  >
    <PhoneFrame style="width: 212px" hide-status>
      <div class="relative w-full h-full">
        <div
          class="absolute inset-0 screen-fade"
          :class="{ on: $clicks < 1 }"
        >
          <PhoneVideo video="feed" :playing="$clicks < 1" loop />
        </div>
        <div
          class="absolute inset-0 screen-fade"
          :class="{ on: $clicks >= 1 }"
        >
          <PhoneVideo :playing="$clicks >= 1" />
        </div>
      </div>
    </PhoneFrame>
  </div>

  <div
    class="absolute top-1/2 text-left fade-item transition-transform duration-700"
    :class="{ on: $clicks >= 1 }"
    :style="{ left: 'calc(50% + 85px)', transform: $clicks >= 1 ? 'translateY(-50%)' : 'translate(-60px, -50%)' }"
  >
    <div class="accent uppercase !text-8xl font-bold leading-none">DETTE</div>
    <div class="text-5xl font-bold mt-2">er det de vil ha.</div>
  </div>
</div>

---
transition: fade
layout: center
class: text-center
---

<div class="flex items-center justify-center gap-6">
  <div class="text-center">
    <PhoneFrame screen="map" style="width: 217px" />
    <div class="mt-3 text-sm font-bold tracking-widest uppercase faint">Pin</div>
  </div>
  <div class="text-3xl accent">→</div>
  <div class="text-center">
    <PhoneFrame screen="article" style="width: 217px" />
    <div class="mt-3 text-sm font-bold tracking-widest uppercase faint">Oppsummering</div>
  </div>
  <div class="text-3xl accent">→</div>
  <div class="text-center">
    <PhoneFrame screen="summary" style="width: 217px" />
    <div class="mt-3 text-sm font-bold tracking-widest uppercase faint">Sammendrag</div>
  </div>
</div>

<!--
Overlat resten til live-demoen: åpne appen, trykk på en pin, vis oppsummeringen av saken og dagens sammendrag.
Arkitektur: SwiftUI → Vapor → Polaris-data + Gemini.
-->
