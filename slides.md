---
theme: seriph
title: Hva skjer rundt meg?
info: Map-first lokalnyheter for studenter — Polaris hackathon pitch
drawings:
  persist: false
mdc: true
transition: fade
class: !p-0
layout: default
clicks: 1
---

<div class="absolute inset-0" style="background: #ffffff" />
<div class="absolute inset-0 flex items-center justify-center">
  <div class="flex flex-col items-center text-center">
    <div class="grid grid-cols-10 gap-x-2 gap-y-1">
      <ph-person-fill
        v-for="i in 50"
        :key="i"
        class="w-7 h-7"
        :class="{ 'person-red': $clicks >= 1 && i <= 40 }"
        :style="{ transitionDelay: $clicks >= 1 ? `${(i - 1) * 40}ms` : '0ms' }"
      />
    </div>
    <div v-click>
      <div class="text-4xl font-extrabold mt-4" style="color: #101010">80 %</div>
      <p class="text-lg mt-2" style="color: rgba(16,16,16,0.75); max-width: 300px">
        av studenter synes det er vanskelig å henge med på lokale nyheter
      </p>
    </div>
  </div>
</div>

<!--
Ren hvit bakgrunn med 50 mørkeblå figurer. Klikk 1: de første 40 blir klart røde (80 %), og «80 % av studenter synes …»-teksten dukker opp — 40 av 50 studenter mister lokalnyhetene. La tallet snakke. Ikke forklar produktet ennå.
-->

---
transition: slide-left
clicks: 1
---

<h1 class="!text-5xl mb-2">Hvordan finner du ut av hva studenter faktisk trenger?</h1>
<div v-click class="mt-16 text-center">
  <div class="text-6xl font-extrabold" style="color: #E02020">Du spør dem.</div>
</div>

<!--
Klikk 1: «Du spør dem.» — vi spurte studentene selv. Neste slide viser svarene.
-->

---
transition: slide-left
layout: center
---

<div class="text-center">
  <h1 class="!text-5xl mb-2">Vi spurte <span class="accent">48 studenter</span>.</h1>
  <h2 class="!text-2xl dim font-normal mb-10">Undersøkelse om nyhetshverdagen deres.</h2>
  <div v-click class="flex items-stretch justify-center gap-6">
    <div class="card px-8 py-6 text-center" style="width: 300px">
      <div class="text-6xl font-extrabold accent">70,8<span class="text-3xl">%</span></div>
      <div class="text-lg mt-2" style="color: rgba(16,16,16,0.75)">føler at de går glipp av nøyaktig hvor hendelser tar sted</div>
    </div>
    <div class="card px-8 py-6 text-center" style="width: 300px">
      <div class="text-6xl font-extrabold" style="color: #FF9E18">93,7<span class="text-3xl">%</span></div>
      <div class="text-lg mt-2" style="color: rgba(16,16,16,0.75)">går ofte glipp av rabatter fordi de er spredt over for mange apper og steder</div>
    </div>
  </div>
  <div v-click class="mt-10 text-2xl font-bold" style="color: #101010">
    Og <span class="accent">91,7 %</span> ville brukt et kart som viser nyheter og fester der de faktisk skjer.
  </div>
</div>

<!--
Egen spørreundersøkelse, 48 svar. Klikk 1: tallene — 70,8 % mister hvor hendelser skjer,
93,7 % mister rabatter. Klikk 2: 91,7 % ville brukt kartet.
-->

---
transition: slide-left
layout: center
---

<div class="text-center">
  <div class="kicker">Mer fra undersøkelsen</div>
  <h1 class="!text-5xl mb-12">Hva studentene faktisk etterspør.</h1>
  <div class="mx-auto text-left" style="width: 620px">
    <div v-click class="flex items-center gap-6 mb-6">
      <div class="text-xl font-extrabold" style="color: #F7A800; width: 44px">01</div>
      <div class="text-2xl font-bold" style="color: #101010; border-left: 4px solid #F7A800; padding-left: 20px">Studentrabatter og lokale tilbud</div>
    </div>
    <div v-click class="flex items-center gap-6 mb-6">
      <div class="text-xl font-extrabold" style="color: #FF9E18; width: 44px">02</div>
      <div class="text-2xl font-bold" style="color: #101010; border-left: 4px solid #FF9E18; padding-left: 20px">Kveldens arrangementer og fester</div>
    </div>
    <div v-click class="flex items-center gap-6 mb-6">
      <div class="text-xl font-extrabold" style="color: #005379; width: 44px">03</div>
      <div class="text-2xl font-bold" style="color: #101010; border-left: 4px solid #005379; padding-left: 20px">Nyheter på kart</div>
    </div>
    <div v-click class="flex items-center gap-6 mb-6">
      <div class="text-xl font-extrabold" style="color: #28AAE2; width: 44px">04</div>
      <div class="text-2xl font-bold" style="color: #101010; border-left: 4px solid #28AAE2; padding-left: 20px">Filtrering av nyhetskategorier</div>
    </div>
    <div v-click class="flex items-center gap-6">
      <div class="text-xl font-extrabold" style="color: #c792ea; width: 44px">05</div>
      <div class="text-2xl font-bold" style="color: #101010; border-left: 4px solid #c792ea; padding-left: 20px">Forklaring av ukjente ord og personer</div>
    </div>
  </div>
  <div v-click class="mt-12 text-2xl font-bold" style="color: #101010">
    Vi bygde <span class="accent">det studentene ba om</span> — ikke det vi gjettet på.
  </div>
</div>

<!--
Funksjonsønsker matcher produktet: tilbud, arrangementer, kart, filtrering, forklaring.
Ingen gjetning — vi bygde det studentene ba om.
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
    <PhoneFrame style="width: 210px; height: 430px">
      <div class="relative w-full h-full">
        <div
          class="absolute inset-0 screen-fade"
          :class="{ on: $clicks < 1 }"
        >
          <div class="feed-skeleton" style="width: 100%; height: 100%">
            <div class="feed-skeleton-track">
              <div v-for="half in 4" :key="half" class="feed-grid">
                <div class="feed-box" style="height: 64px">
                  <div class="feed-img" style="height: 30px" />
                  <div class="feed-line" style="width: 80%" />
                </div>
                <div class="feed-box" style="height: 40px">
                  <div class="feed-line" style="width: 70%" />
                </div>
                <div class="feed-box" style="height: 34px">
                  <div class="feed-line" style="width: 60%" />
                </div>
                <div class="feed-box" style="height: 58px">
                  <div class="feed-img" style="height: 24px" />
                  <div class="feed-line" style="width: 85%" />
                </div>
                <div class="feed-box" style="height: 46px">
                  <div class="feed-line" style="width: 75%" />
                </div>
                <div class="feed-box" style="height: 70px">
                  <div class="feed-img" style="height: 34px" />
                  <div class="feed-line" style="width: 90%" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-0 screen-fade"
          :class="{ on: $clicks >= 1 }"
        >
          <AppMapScreen active-tab="kart" filter="saker" show-sheet />
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
    <div class="text-5xl font-bold mt-2">er det vi vil ha.</div>
  </div>
</div>

---
transition: fade
layout: center
class: text-center
---

<div class="kicker">Demo</div>
<h1 class="!text-5xl mb-8">Fra pin til hele saken.</h1>
<div class="flex items-center justify-center gap-6">
  <div class="text-center">
    <PhoneFrame style="width: 210px; height: 440px">
      <AppMapScreen active-tab="kart" filter="saker" />
    </PhoneFrame>
    <div class="mt-3 text-sm font-bold tracking-widest uppercase faint">Pin</div>
  </div>
  <div class="text-3xl accent">→</div>
  <div class="text-center">
    <PhoneFrame style="width: 210px; height: 440px">
      <AppSummaryScreen />
    </PhoneFrame>
    <div class="mt-3 text-sm font-bold tracking-widest uppercase faint">Sammendrag</div>
  </div>
  <div class="text-3xl accent">→</div>
  <div class="text-center">
    <PhoneFrame style="width: 210px; height: 440px">
      <AppArticleScreen />
    </PhoneFrame>
    <div class="mt-3 text-sm font-bold tracking-widest uppercase faint">Hele saken</div>
  </div>
</div>
<div v-click class="mt-6 text-center text-lg dim">
  Bygget i SwiftUI → Vapor → Polaris-data + Gemini. La oss vise dere live.
</div>

<!--
Overlat resten til live-demoen: åpne appen, trykk på en pin, vis sammendrag og artikkel.
Arkitektur: SwiftUI → Vapor → Polaris-data + Gemini.
-->
