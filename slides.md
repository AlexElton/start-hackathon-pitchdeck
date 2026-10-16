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
      <div class="text-4xl font-extrabold mt-4" style="color: #101010">80 % av studenter</div>
      <p class="text-lg mt-2" style="color: rgba(16,16,16,0.75); max-width: 300px">
        mener det er vanskelig å henge med på lokale nyheter
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
  <div class="kicker">Vi spurte 48 studenter</div>
  <h1 class="!text-4xl mb-6">Hvor skjer det egentlig?</h1>
  <LostPins :on="$clicks >= 1" />
  <div v-click class="mt-4">
    <span class="text-3xl font-extrabold" style="color: #E02020">34 av 48</span>
    <span class="text-xl dim ml-2">vet ikke nøyaktig hvor ting skjer rundt dem</span>
  </div>
</div>

<!--
48 nåler = 48 studenter som svarte. Klikk 1: 34 av nålene mister plassen sin — de driver av, blir uskarpe og røde (70,8 %).
Nyhetene finnes, men de er ikke koblet til et sted.
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
    <span class="text-3xl font-extrabold" style="color: #E02020">45 av 48</span>
    <span class="text-xl dim ml-2">går glipp av rabatter fordi de ligger spredt i for mange apper</span>
  </div>
</div>

<!--
48 rabattlapper svever rundt telefonen — én per student. Klikk 1: telefonen fanger tre, de 45 andre faller på gulvet (93,7 %).
-->

---
transition: slide-left
layout: center
clicks: 1
---

<div class="flex flex-col items-center text-center">
  <div class="kicker">Så vi spurte</div>
  <h1 class="!text-4xl mb-4">Rekk opp hånda hvis du ville brukt <span class="accent">et kart over nyhetene</span>.</h1>
  <HandsUp :on="$clicks >= 1" />
  <div v-click class="mt-2">
    <span class="text-3xl font-extrabold accent">44 av 48</span>
    <span class="text-xl dim ml-2">rakk opp hånda</span>
  </div>
</div>

<!--
Still spørsmålet til salen også — gjerne be dem rekke opp hånda. Klikk 1: 44 av 48 hender skyter opp (91,7 %)
for et kart som viser nyheter og fester der de faktisk skjer.
-->

---
transition: slide-left
layout: center
clicks: 2
---

<div class="flex flex-col items-center text-center">
  <div class="kicker">Mer fra undersøkelsen</div>
  <h1 class="!text-4xl mb-6">Hva studentene faktisk etterspør.</h1>
  <WishPins :on="$clicks >= 1" />
  <div v-click="2" class="mt-6 text-2xl font-bold" style="color: #101010">
    Vi bygde <span class="accent">det studentene ba om</span> — ikke det vi gjettet på.
  </div>
</div>

<!--
Klikk 1: de fem ønskene faller ned som nåler på kartet — i samme farger som i appen.
Tilbud, arrangementer, kart, filtrering, forklaring. Klikk 2: vi bygde det de ba om, ikke det vi gjettet på.
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
