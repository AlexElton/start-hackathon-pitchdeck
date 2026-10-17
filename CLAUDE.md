# Pitch deck style guide

Slidev deck (`slides.md`) for the Polaris hackathon pitch: a map-first local-news app for students. Read this before adding or changing a slide.

- **Language:** Norwegian bokmål on slides and in speaker notes. Use comma decimals and a space before the percent sign (`70,8 %`).
- **Run:** `pnpm dev`. The markdown-it override in `pnpm-workspace.yaml` must stay, or the dev server crashes.
- **Global styles** live in `styles/index.css`. Reuse its classes (`.kicker`, `.accent`, `.dim`, `.faint`, `.card`, `.chip`, `.fade-item`, `.screen-fade`, `.person-red`) before writing new inline styles.

## Colors

Every color has a job. Don't introduce new colors. If you need another one, add it here first.

| Token | Hex | Use it for |
|---|---|---|
| Ink | `#101010` | Headings, body text, the main statement |
| Ink dim | `rgba(16,16,16,0.62)` (`.dim`) | Supporting lines, captions |
| Ink faint | `rgba(16,16,16,0.4)` (`.faint`) | Labels, "not counted" items |
| Polaris blue | `#005379` (`--accent`, `.accent`) | Neutral or default state, our answer, emphasis in headings |
| Problem red | `#E02020` (`.person-red`) | **Only** the people or things affected by the problem. Never decoration |
| Background | `#f6f6f6` (slides), `#ffffff` (cards, full-bleed data slides) | Surfaces |
| Border | `#e2e2e2` | Card borders, hairlines |

Category colors (they match the map pins in the app, so keep the mapping fixed):

| Category | Hex | Pin class | Icon |
|---|---|---|---|
| Nyheter (news) | `#005379` | `.pin-news` | `ph-newspaper-fill` |
| Arrangementer / fester (events) | `#FF9E18` | `.pin-event` | `ph-confetti-fill` |
| Rabatter / tilbud (deals) | `#F7A800` | `.pin-deal` | `ph-tag-fill` |
| Student | `#28AAE2` | `.pin-student` | `ph-student-fill` |
| Forklaring (explanations) | `#c792ea` | none | `ph-chat-circle-text-fill` |

Rule of thumb: a slide uses **blue and red**, or **category colors**, never both. Red against blue tells a problem story. Category colors tell a product story.

## Showing data: pictures, not charts

The audience should *see* the finding before they read it. Slide 1 sets the standard: 50 people, and 40 of them turn red. Nobody has to parse an axis.

### Principles

1. **One finding per slide, or per click.** If a slide has three percentages, split it into clicks or slides.
2. **Every icon is something real.** Choose an icon that *is* the subject of the finding: a person for a share of students, a pin for location, a tag for discounts. Never use an abstract circle or bar when a real object fits.
3. **Make the count honest.** Our survey had **52 respondents**, so draw 52 people, one icon per real student. Round to whole people and say so in the speaker notes:
   - 70,8 % = **37 of 52**
   - 93,7 % = **49 of 52**
   - 91,7 % = **48 of 52**

   Use a 10×10 grid (100 icons) only for external statistics with no known *n*, like the 80 % on slide 1. In that case, state the source.
4. **Change the picture to match the finding.** The animation should act out the claim:
   - People who "miss out" → they turn red.
   - Discounts "spread across too many apps" → tags scatter into many app tiles.
   - Events "you can't place" → pins float with no location until the map drops in.
5. **Picture first, number second.** Click 1 runs the animation. The number and a short line appear on the same click or the next one. The number is a caption for the picture, not the other way around.
6. **At most one big number on screen.** Write any other figures as words ("nesten alle", "tre av fire") or move them to the speaker notes.
7. **Never repeat a metaphor.** Each data slide gets its own picture. Slide 1 owns the people grid. Before you reach for a pattern that's already in the deck, ask: "What does this finding *look like* in real life?" Then build that.
8. **No charts.** No bar, pie, donut or line charts, no axes, no legends. If a legend seems necessary, the icons are wrong. The one exception is a real change over time that can't be shown any other way, and that needs a reason in the speaker notes.

### Pattern catalog

Pick the pattern that matches what the finding is *about*:

These are the ones already in the deck. Use them as inspiration, not a menu. Never put the same one in twice.

| The finding is about… | Pattern | In the deck |
|---|---|---|
| A share of people (opening hook) | **People grid.** The affected share turns red in a ripple | Slide 1, 80 % (inline) |
| Not knowing *where* | **Lost pins.** Pins on a map drift off, blur and turn red | `LostPins.vue`: 37 of 52 |
| Missing out / slipping away | **Falling objects.** Tags float around a phone; a few are caught, the rest fall to the floor | `FallingDeals.vue`: 49 of 52 |
| A vote or "would you…?" | **Group chat.** The question is posted in the student group chat; reactions flood in and keep bobbing (yes = thumbs/hearts/fire, no = gray shrug) | `ChatReactions.vue`: 48 of 52 |
| A list of wishes or features | **Pins dropping onto a map** in category colors, like in the app | `WishPins.vue`: five wishes |
| Many sources, no overview | **Scattered sources** around one student | `FragmentationVisual.vue` |
| Before / after | **Cross-fade** inside `PhoneFrame` (`.screen-fade`) | Feed → map |

The data components take `:on="$clicks >= 1"` plus counts as props (`total`, `lost`, `caught`, `yes`). They use seeded randomness, so the layout looks the same on every render.

More ideas for future findings: a calendar where days light up, a notification stack that piles up, a clock that runs out, a speech bubble filling with unfamiliar words.

### People grid snippet

```vue
---
clicks: 1
---

<PeopleGrid :total="52" :affected="37" :cols="13" :on="$clicks >= 1" />
<div v-click>
  <div class="text-4xl font-extrabold mt-4">37 av 52 studenter</div>
  <p class="text-lg mt-2 dim">vet ikke nøyaktig hvor ting skjer</p>
</div>
```

- 52 fits a 13×4 grid, 50 fits 10×5, 100 fits 10×10.
- Use `components/PeopleGrid.vue`. It draws its own head-and-shoulders silhouette: unaffected people in soft Polaris blue (`.person`), affected ones turn red one row at a time from the top, 1 s apart (`rowDelay`, `.person-red`). No jump, color only. Fade the number in after the last row.
- For a positive finding, swap `person-red` for a class that sets `color: #005379`, and start the people in `var(--ink-faint)`. Change `.person` and `.person-red` in a slide-scoped style, not globally.

## Motion

- Set `clicks:` in the frontmatter whenever the slide drives `$clicks` by hand.
- Use `v-click` on a wrapper to reveal a group in one step. Don't stagger list items with separate clicks.
- Use only color, opacity and translate transitions, 0.25–0.7 s. Movement between slides is `slide-left`, with `fade` at section breaks.
- Never animate something for decoration. Every motion should mean something ("they turn red", "it lands on the map").

## Type & layout

- One idea per slide: an `h1` statement (`!text-5xl`, extrabold), an optional `.kicker` above it, and at most one supporting line.
- Big numbers use `text-4xl`–`text-6xl font-extrabold`. Write the unit smaller (`<span class="text-3xl">%</span>`).
- Leave plenty of white space. If content needs scrolling or shrinking, it belongs on two slides.
- Speaker notes (`<!-- -->`) say what each click does and hold any numbers left out of the slide.

## Checklist before you finish a slide

- [ ] Can someone get the point in 3 seconds with the sound off?
- [ ] Is this visual metaphor used anywhere else in the deck? (It shouldn't be.)
- [ ] Does each icon stand for a real thing, and does the count match the data (n = 52)?
- [ ] Is there at most one number on screen?
- [ ] Is red used only for the problem?
- [ ] Do the clicks match the speaker notes?
- [ ] Does it still work in `pnpm dev`?
