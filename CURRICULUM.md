# SLOP3841 — curriculum specification

**Professional Identity Performance** — *fluency in a role you do not yet hold*

Level 3, Semester 1 2027, teaching window `2027-02-22` → `2027-05-28`.

This is the build spec six agents write from. It is a working document, not
prose: titles, taglines, glosses and bios are *in* the spec because they are
the artefacts. Page bodies are not here — they are the writers' job.

Judgement calls the user may want to reverse are marked **⚠ decision**.

## 0. Platform rules that bind every content file

Read these before writing a single frontmatter block.

- **`published: false` is banned.** It removes the node from the graph and makes
  every inbound `related:` ref dangle, which hard-fails the build. Use
  `draft: true` if something must be marked not-final.
- **Every `related:` ref is fully prefixed — `<collection>/<slug>` — always.**
  No bare slugs anywhere in this build. A bare slug resolves against the
  *declaring* collection, so a session file `week-07.md` writing
  `related: [week-07]` produces a self-ref and throws. The always-prefix rule
  removes that entire failure class. (**⚠ decision 2**, see §9.)
- Edges are symmetrised by the graph, so **declare each edge exactly once**.
  Direction convention in §7.
- `{/* embed: <ref> */}` in a body **silently creates an edge**. Do not use
  embeds in this build unless the edge is also in §7's table.
- `teachers:` does **not** create a graph edge — it lands in `meta`. Staff edges
  are declared explicitly in §7.
- Every date — including every `due:` — must sit inside
  `2027-02-22`..`2027-05-28`. `spec/data-integrity.test.ts` enforces it.
- `people` frontmatter is validated by a **non-loose** `z.object` in
  `src/content.config.ts`: `title`, `description` (min 40 chars), `role`,
  optional `contact`/`affiliation`/`email`/`url`. Unknown keys are stripped, so
  **do not put `related:` on a person file** — people get their edges inbound.
- `description` on session/lecture/assessment nodes is the homepage tease.
  `surface` reads it via the data layer; the writer owns the text.
- No `photo:`/`photoAlt:` on anyone. The starter portraits are being deleted.

## 1. The three streams

Lectures are shared by all students. Each stream runs its own weekly tutorial.
The website models this as **one `sessions` node per week containing three
stream sections** (a `streams:` frontmatter key) — never one node per stream per
week.

Stream names are plain and institutional so navigation and headings stay
readable. Each carries exactly **one** satirical line, used only where the
stream is defined (stream index / policies / week-1 page) and never repeated as
a subheading on all twelve week pages.

**⚠ decision 6:** the streams partition by **how the field screens candidates**,
not by discipline. That is why a health-informatics student and a civil
engineer land in the same stream, and why the advice "pick by how your target
roles screen you, not by what your degree is called" is the actual guidance on
the stream page. The alternative — partition by faculty — is tidier on paper and
teaches nothing.

| Stream | Tagline (use once) | Fields | Pick it if |
|---|---|---|---|
| **Technical Practice** | For the fields where the performance is competence, and someone will eventually ask you to open a terminal in front of them. | software, engineering, data and analytics, applied and environmental science, health and biomedical technology, IT operations | your target roles screen with a technical exercise, take-home or a portfolio of things that must actually run |
| **Creative and Communications Practice** | For the fields where the performance is taste, and the portfolio is both the evidence and the alibi. | design, media production, writing and editing, marketing and communications, architecture, arts and cultural administration | your target roles ask to see a body of work and judge it on judgement rather than on correctness |
| **Commercial and Public Practice** | For the fields where the performance is judgement, and nobody will ever ask to see the spreadsheet. | consulting, finance, accounting, law, policy and public service, management, NGO and program delivery | your target roles screen with written selection criteria, competency panels or assessment centres |

Convenors: Technical → Anselm Pike. Creative and Communications → Nadia
Ferrante. Commercial and Public → Sunil Raman. (§5.)

Cross-stream tutorial attendance is encouraged, never assessed. Two weeks
deliberately break the stream walls: **week 6** ends with a cross-stream lap of
the gallery walk, and **week 12**'s viva admits cross-stream observers.

## 2. The running artefact

One artefact runs the whole semester: **the Dossier** — in voice, *a folder of
receipts for a person you are becoming*. It gains exactly one numbered section
per week (§3's final column), is submitted in part at weeks 4 and 8, swapped at
week 11, and closed at week 12 as the capstone. No week invents a new artefact.

Section order, so writers can reference sections by number:

1. Baseline Inventory (W1) · 2. Three Target Ads (W1) · 3. Annotated Teardown
(W2) · 4. Gap Map (W3) · 5. Receipt Ledger (W4) · 6. Three Anecdotes (W5) ·
7. Target-Fitted Artefact + Varnish Note (W6) · 8. Outreach Log (W7) ·
9. Red-Teamed Revision + Diff Note (W8) · 10. Interview Prep Pack + Route
Declaration (W9) · 11. Negotiation and Decline Scripts (W10) · 12. Ninety-Day
Ramp Plan (W11) · 13. Performance-versus-Genuine Audit (W12).

A weekly **reflection log** entry accompanies every section and is consolidated
into the capstone.

## 3. The twelve weeks

All formats below are distinct — **12 distinct `format:` values** against a
machine-checked floor of 6. The check also forbids two session bodies sharing a
normalised opening 40 characters, so **no writer may open a session body with a
stock sentence**; open on that week's specific activity.

Arc, in one line per act: **weeks 1–4** establish an honest baseline and learn
to read what the role is actually asking; **weeks 5–8** build the materials and
then attack them; **weeks 9–12** perform live, transact, and audit what became
true.

| Wk | Date | Lecture title (in voice) | Real skill underneath | Tutorial `format:` | Dossier step |
|---|---|---|---|---|---|
| 1 | 2027-02-22 | The Room Already Knows | Establish an evidenced baseline; separate performance (framing what is true) from deception (claiming what is not) | `self-audit clinic` | §1 Baseline Inventory, §2 three real target ads |
| 2 | 2027-03-01 | Reqspeak: A Field Guide to the Dialect of the Job Ad | Read an advertisement critically — boilerplate vs wishlist vs the actual daily work vs the accidental confession | `teardown` | §3 four-column annotated teardown of one primary target |
| 3 | 2027-03-08 | The Shape of the Distance | Gap articulation specific enough to plan against, said aloud without apologising or bluffing | `blind review` | §4 Gap Map, each gap tiered by closeability |
| 4 | 2027-03-15 | Receipts | Convert activity into artefacts a stranger can verify in ninety seconds | `claims tribunal` | §5 Receipt Ledger; §1 rewritten with struck claims removed |
| 5 | 2027-03-22 | The Load-Bearing Anecdote | Structure experience into three reusable honest stories: situation, decision, consequence, what you'd change | `roleplay` | §6 three anecdotes, each mapped to the four questions it answers |
| 6 | 2027-03-29 | Varnish, and How Much Is Too Much **(flagship deck)** | Presentation of work — how framing and finish make real work legible, and where finish starts concealing thinness | `gallery walk` | §7 target-fitted artefact in draft + first Varnish Note entries |
| — | 2027-04-05 | *teaching break* | — | — | build, do not polish |
| 7 | 2027-04-12 | The Pre-Warmed Stranger | Outreach that is not cold: research a specific person, find a real reason, write something answerable in one line, survive silence | `outreach sprint` | §8 Outreach Log |
| 8 | 2027-04-19 | The Plausibility Budget | How much unevidenced claim a document or conversation can carry before it collapses — and spotting the same collapse in others | `red-team session` | §9 revised materials + diff note naming what was cut and why |
| 9 | 2027-04-26 | Interview Weather | Interview mechanics: what you control (structure, examples, your questions, recovery) and what you do not | `mock panel` | §10 prep pack + **interview route declaration** (safety net, §4) |
| 10 | 2027-05-03 | What They Wish You'd Asked **(guest relay)** | Negotiation and question-asking at entry level; reading an offer or a rejection for information | `negotiation simulation` | §11 one negotiation script, one decline script, one question set |
| 11 | 2027-05-10 | Competence Lag **(stream guests in tutorial)** | The first ninety days: asking for help without forfeiting credibility, learning in public, setting a real ramp | `artefact swap` | §12 ninety-day ramp plan, built from §4 |
| 12 | 2027-05-17 | Seamwork | Audit what was performed versus what became genuine; decide deliberately what to keep performing and what to go learn | `closing viva` | §13 audit; Dossier closed and consolidated |

### Guest lectures — where they sit, and in two different modes

**⚠ decision 5.** Lectures are shared but guests are field-specific, which is a
contradiction if a guest lecture is a whole lecture. Resolved by splitting:

- **Week 10 — shared guest relay.** Three practitioners, one per field, fifteen
  minutes each, in the one shared lecture slot, hosted by the three stream
  convenors. Every student hears all three. Title: *What They Wish You'd Asked*.
- **Week 11 — guests in the tutorial room.** Each stream convenor hosts one
  practitioner from their own field inside that stream's tutorial, responding to
  swapped Dossiers. Field-specific, small room, no shared slot needed.

No other week has a guest. Guests are named as roles, not as invented people —
do not add them to the `people` collection.

### Week-by-week detail

Each paragraph below is the writer's brief for that week. Every week ties to its
lecture skill and advances the Dossier.

**Week 1 — The Room Already Knows.** Opens by naming the bit: everyone in the
room is already performing a professional identity, including the staff, and the
course's only rule is the difference between framing what is true and claiming
what is not. Tutorial is a `self-audit clinic`: students bring three real job
ads and whatever materials they currently have, and audit each claim against
evidence they could produce today. *Technical* — audit a CV plus one repo; every
claim must point at something that runs. *Creative* — audit a portfolio; mark
which pieces are finished and which are "in progress" with honesty.
*Commercial* — audit a LinkedIn and a cover letter; mark which claims survive a
single "show me". Nothing is graded; the point is the floor.

**Week 2 — Reqspeak.** The lecture is a translation exercise: an ad is four
documents stapled together, and the fourth one — the accidental confession about
what went wrong in the last hire — is the useful one. Tutorial is a `teardown`
of one ad, live, into four columns. *Technical* — graduate engineering ad, each
bullet mapped to a verifiable artefact. *Creative* — studio or agency brief,
identifying what is actually being bought. *Commercial* — a selection-criteria
document, mapped to the answer shapes it is fishing for.

**Week 3 — The Shape of the Distance.** Gaps are not sizes, they are shapes. The
lecture teaches the three tiers (closeable by week 12 / closeable in a year /
not closeable and must be said out loud) and why the specific version earns more
respect than the vague one. Tutorial is a `blind review`: teardowns are
anonymised and swapped *within* stream, each student writes the gap map for
someone else's target, then the author compares it with their own. *Technical* —
technical-depth gaps. *Creative* — taste-and-range gaps. *Commercial* —
judgement-and-context gaps.

**Week 4 — Receipts.** The lecture is about the ninety-second verification and
what survives it. Tutorial is a `claims tribunal`: each student reads their
claims aloud and peers demand a receipt for each; unevidenced claims are struck
from the record on the spot. *Technical* — a receipt is a commit, a running
thing, or a measurement. *Creative* — a receipt is a piece someone other than
you has seen or used. *Commercial* — a receipt is a number, a decision, or a
named stakeholder. **Assessment 1 due Friday 2027-03-19.**

**Week 5 — The Load-Bearing Anecdote.** Three stories, prepared properly, beat
twelve improvised — and preparing is not dishonest. The lecture gives the
structure and the failure modes (the story with no decision in it; the story
where the outcome is someone else's). Tutorial is `roleplay`: paired
question-and-answer, rotating, with one observer scoring whether the story
answered the question actually asked. *Technical* — a failure or debugging story
showing reasoning under uncertainty. *Creative* — a piece that did not work and
what the revision cost. *Commercial* — a decision made with insufficient
information, and who it affected.

**Week 6 — Varnish, and How Much Is Too Much.** The flagship deck week (§8).
Thin varnish makes real work legible; thick varnish hides that there is little
underneath, and people who hire for a living can tell by touch. Tutorial is a
`gallery walk`: work goes on the walls, written critique goes on sheets beside
it, nobody defends their own piece until the final lap. *Technical* — repo front
page and README. *Creative* — portfolio sequencing and case-study structure.
*Commercial* — one-page capability brief. The last twenty minutes is a
**cross-stream lap**: each stream walks the other two, which is where students
learn their own conventions are conventions.

**Week 7 — The Pre-Warmed Stranger.** Outreach, with the honesty constraint
stated in the lecture: never misrepresent who you are or why you are writing.
Tutorial is an `outreach sprint` — three messages drafted in the room, peers
score each for answerability in one line. **Sending is the student's choice**:
the Outreach Log records what was drafted, what was sent or deliberately not
sent, and why, and it is graded identically either way. *Technical* —
maintainers, engineering-blog authors, meetup organisers. *Creative* —
practitioners whose specific piece you can speak about. *Commercial* — alumni,
industry-body contacts, graduate-program liaisons. Silence is taught as the
standard reply, not a verdict. (**⚠ decision 9**, resolved: an earlier draft
required at least one real send, which conscripts a non-consenting stranger
into an assessment — the same objection that shaped the week-9 pool.)

**Week 8 — The Plausibility Budget.** The budget is shared: one indefensible
buzzword discredits the true sentence beside it. Tutorial is a `red-team
session` — within stream, peers attack the submitted materials for the weakest
claim and *time how long it takes to find it*. *Technical* — probe for depth
behind vocabulary. *Creative* — probe for whose work it actually was.
*Commercial* — probe for the numbers behind the stated outcome. Students leave
with a diff note. **Assessment 2 due Friday 2027-04-23.**

**Week 9 — Interview Weather.** Interview mechanics, and the explicit separation
of what you control from the weather. Tutorial is a `mock panel` run to each
field's actual convention: *Technical* — mixed live-technical and behavioural.
*Creative* — portfolio walkthrough with deliberate interruption. *Commercial* —
competency panel against written selection criteria. **This is the safety-net
week**: every student declares their interview route at the end of the tutorial,
and anyone without a confirmed real interview opts into the Practice Interview
Partner Pool (§4). The declaration is a Dossier artefact, not a judgement.

**Week 10 — What They Wish You'd Asked.** Guest relay in the lecture slot.
Tutorial is a `negotiation simulation`: scripted rounds with a staff member
playing the other side, and a hard rule that every student says the number out
loud at least once. *Technical* — scope, level, team, take-home expectations.
*Creative* — rates, usage rights, and refusing an unpaid test brief.
*Commercial* — start date, rotation preference, grad-stream choice. Also taught:
how to decline without burning the contact.

**Week 11 — Competence Lag.** The interval between being hired and being able to
do the job is normal, universal, and never mentioned at the offer stage.
Tutorial is an `artefact swap`: complete Dossiers are exchanged within stream
and each student presents *someone else's* case to that stream's practitioner
guest, who responds to the case rather than to the person. That is what makes
the critique usable and the room survivable. **Assessment 3 due Friday
2027-05-14.**

**Week 12 — Seamwork.** The closing lecture is the audit, delivered by the
convenor as an audit of her own performance first. Tutorial is a `closing viva`:
eight minutes per student, examined by their own stream on one question — which
part of your performance became true, and how do you know. Cross-stream
observers admitted. **Capstone due Wednesday 2027-05-26.**

## 4. The assessment ladder

Four assessments. Weights **20 + 25 + 10 + 45 = 100**. Largest is **45**, under
the 50 ceiling. Both facts are machine-checked.

**⚠ decision 3:** four assessments rather than three. Keeping the capstone under
50 while leaving the earlier pieces honestly weighted needed a fourth small
component; the alternative was inflating Assessment 1 to 30, which overvalues a
week-4 artefact. **⚠ decision 4:** that fourth component is peer critique, which
is participation-adjacent marking and the most reversible call in this section —
it is graded on *submitted written critiques*, never on attendance or talking.

Criteria weights sum to exactly 100 **within each assessment** (schema-enforced).

### A1 — Role Teardown and Gap Map

- Slug `assessments/01-role-teardown`, `week: 4`, `weight: 20`
- `due: 2027-03-19T17:00:00+10:00`
- **Submits:** Dossier §§1–4 — evidenced Baseline Inventory, three target ads,
  one four-column annotated teardown, and the tiered Gap Map.
- **Marking** `mode: weighted`

| Criterion | Weight |
|---|---|
| Accuracy of the teardown — does the four-column split hold up against the ad | 30 |
| Specificity of gap articulation — planned against, not apologised for | 40 |
| Evidence behind every baseline claim | 20 |
| Legibility of the Dossier as a working document someone else could read | 10 |

### A2 — Performance Materials

- Slug `assessments/02-performance-materials`, `week: 8`, `weight: 25`
- `due: 2027-04-23T17:00:00+10:00`
- **Submits:** materials fitted to one named target — CV or résumé, a cover
  letter or pitch, one field-appropriate artefact (repo front page / portfolio
  case study / one-page capability brief), plus the **Varnish Note** recording
  every presentational decision and what it reveals or conceals.
- **Marking** `mode: weighted`

| Criterion | Weight |
|---|---|
| Fitness to the named target rather than to a generic reader | 30 |
| Evidence behind every claim; receipt debt paid down | 25 |
| Performance awareness — the Varnish Note's honesty and specificity | 25 |
| Craft and legibility of the materials themselves | 20 |

### A3 — Peer Critique Contribution

- Slug `assessments/03-peer-critique`, `week: 11`, `weight: 10`
- `due: 2027-05-14T17:00:00+10:00`
- **Submits:** the three most substantial written critiques the student *gave*
  across the semester (from any of weeks 3, 6, 8 or 11), each with a short note
  on what it changed in the recipient's work, countersigned by the recipient.
- **Marking** `mode: weighted`

| Criterion | Weight |
|---|---|
| Specificity — critique of a decision, not of polish | 40 |
| Usefulness — evidence it changed what someone did next | 35 |
| Reciprocity and conduct across the semester | 25 |

### A4 — Capstone: Applications in the Wild

- Slug `assessments/04-capstone-applications`, `week: 12`, `weight: 45`
- `due: 2027-05-26T17:00:00+10:00`
- **Submits:** the application materials as actually sent, the consolidated
  twelve-entry reflection log, one interview debrief, the ninety-day ramp plan,
  and the performance-versus-genuine audit.
- **Graded on process artefacts only.** Never on outcome, never on offer, never
  on the prestige of the organisation. State this on the page in plain language,
  twice: once in the brief and once beside the criteria.
- **Marking** `mode: weighted`

| Criterion | Weight |
|---|---|
| Gap articulation under real conditions | 25 |
| Performance awareness — what was performed, what was genuine, and why | 25 |
| Adaptation under real friction | 25 |
| Completeness and honesty of the process record | 15 |
| Interview debrief quality | 10 |

### The week-9 safety net — belongs on A4's page

Load-bearing ethics constraint. Write it out; do not compress it to a footnote.

- Students apply to roles **they are actually pursuing anyway**. Applying to a
  role you have no intention of taking is not permitted.
- By the end of the **week-9 tutorial** every student declares an interview
  route. A student with no confirmed real interview opts into the **Practice
  Interview Partner Pool**, coordinated by Margot Tse.
- Pool interviewers are recruiters and practitioners who have **signed written
  consent** knowing they are conducting a SlopU practice interview for a course
  in which the interview is a teaching exercise. Nobody is deceived, and nobody
  who has not consented is approached.
- The debrief is graded **identically** either way. There is no mark difference
  between routes and no requirement to disclose which route was used beyond the
  factual note in the log.
- Misrepresenting facts about yourself to any employer, real or pool, is an
  academic integrity matter and is handled under `/policies/`. The course teaches
  framing, not fabrication — this sentence belongs on the page verbatim.

An earlier design that deceived non-consenting recruiters was rejected on
exactly these grounds. Do not reintroduce it in any form.

## 5. The people

Five staff. No photos — the bios carry them. `role:` is a free string in this
repo's schema, so the stream is named in the role. `description` must clear 40
characters and is what the people listing shows.

| Slug | Name | `role:` | Stream convened | In-voice bio direction |
|---|---|---|---|---|
| `wren-halloway` | Dr Wren Halloway | `convenor` | — | Designed the course after a decade on hiring panels, and now teaches the thing she spent that decade watching candidates get wrong. Opens every semester by naming which parts of her own job she is still performing. Contact for course-level questions and anything the stream convenors escalate. |
| `anselm-pike` | Dr Anselm Pike | `stream convenor — Technical Practice` | Technical Practice | Former engineering manager who has read more README files than is medically advisable. Asks "does it run" before anything else and means it kindly. Runs the week-2 teardown and the week-8 red team. |
| `nadia-ferrante` | Nadia Ferrante | `stream convenor — Creative and Communications Practice` | Creative and Communications Practice | A working designer who reviews portfolios for a living and can name the exact slide where she stopped reading. Teaches sequencing as a discipline rather than as taste. Delivers the week-6 lecture. |
| `sunil-raman` | Dr Sunil Raman | `stream convenor — Commercial and Public Practice` | Commercial and Public Practice | Eleven years on public-sector selection panels, and can recite the four words that sink a criteria response. Presides over the week-4 claims tribunal and enjoys it more than he will admit. |
| `margot-tse` | Margot Tse | `practice fellow` | — | Coordinates the Practice Interview Partner Pool and its consent paperwork. The person to see about the week-9 route declaration, extensions, and any application process that is making you feel unwell. Not a marker for A4 debriefs she facilitated. |

`teachers:` assignments, so writers do not have to guess:

- **Lectures** — W1 `wren-halloway`; W2 `anselm-pike`; W3 `anselm-pike`;
  W4 `sunil-raman`; W5 `wren-halloway`; W6 `nadia-ferrante`; W7 `margot-tse`;
  W8 `wren-halloway` + `anselm-pike`; W9 `margot-tse`; W10 `anselm-pike` +
  `nadia-ferrante` + `sunil-raman` (the relay); W11 `wren-halloway`;
  W12 `wren-halloway`.
- **Sessions** — every week lists the three stream convenors (`anselm-pike`,
  `nadia-ferrante`, `sunil-raman`), because all three tutorials run every week.
  Week 9 adds `margot-tse`.

## 6. Node-id inventory

**Naming convention.** Sessions and lectures are keyed by **week**
(`week-01`…`week-12`, zero-padded); assessments by **submission order**
(`NN-short-name`); people by **name-slug**. Three conventions, each matching what
that collection is ordered by. Node ids are `<collection>/<slug>`, so
`sessions/week-07` and `lectures/week-07` are distinct nodes — see **⚠ decision
2** and §0's always-prefix rule.

### `src/content/sessions/` — 12 files

`week-01.md` `week-02.md` `week-03.md` `week-04.md` `week-05.md` `week-06.md`
`week-07.md` `week-08.md` `week-09.md` `week-10.md` `week-11.md` `week-12.md`

Frontmatter per file: `title`, `description`, `week`, `date`, `teachers`,
`format`, `term`, `termGloss`, `streams`, `spec`, `related`. `format`/`term`/
`termGloss`/`streams` are invented keys — the session schema is `.loose()`, so
they survive into the API's `meta`.

### `src/content/lectures/` — 12 files

`week-01.md` … `week-12.md` (same padding). Frontmatter: `title`,
`description`, `week`, `date`, `teachers`, `spec`, `related`; plus `slides:` on
**week-06 only**.

### `src/content/assessments/` — 4 files

`01-role-teardown.md` · `02-performance-materials.md` · `03-peer-critique.md` ·
`04-capstone-applications.md`

### `src/content/people/` — 5 files

`wren-halloway.md` · `anselm-pike.md` · `nadia-ferrante.md` · `sunil-raman.md` ·
`margot-tse.md`

### Also a graph node, not under `src/content/`

`src/pages/policies/index.mdx` → node id **`policies/index`** (registered in
`site-config.ts` as `{ key: "policies", dir: "pages/policies" }`). It must have
at least one edge; §7 gives it two.

### Totals

**33 content files** (12 + 12 + 4 + 5) and **34 graph nodes** including
`policies/index`.

### What happens to every starter file

| Starter path | Disposition |
|---|---|
| `src/content/sessions/01-getting-started.md` | **renamed** → `sessions/week-01.md`, body and frontmatter fully rewritten |
| `src/content/sessions/02-first-review.md` | **renamed** → `sessions/week-02.md`, fully rewritten |
| `src/content/lectures/week-01.md` | **kept in place**, fully rewritten (slug already matches) |
| `src/content/lectures/week-02.md` | **kept in place**, fully rewritten |
| `src/content/assessments/assignment-1.md` | **renamed** → `assessments/01-role-teardown.md`, fully rewritten |
| `src/content/assessments/final-project.md` | **renamed** → `assessments/04-capstone-applications.md`, fully rewritten; marking mode changes `holistic` → `weighted` |
| `src/content/people/idris-fenn.md` + `.avif` | **deleted**, both |
| `src/content/people/marisol-quaye.md` + `.avif` | **deleted**, both |
| `src/decks/week-01.deck.mdx` | **renamed** → `src/decks/week-06-varnish.deck.mdx`, fully rewritten (§8) |
| `src/pages/policies/index.mdx` | **rewritten in place**; node id stays `policies/index` |

**Ordering hazard:** `teachers:` uses `reference("people")`, so deleting
`idris-fenn` and `marisol-quaye` breaks the two starter sessions and two starter
lectures until their `teachers:` are repointed. Delete the people and repoint the
four referring files **in the same commit**.

## 7. The `related:` edge table

**Direction convention.** Every edge is declared **once**, on the node that
comes first in this total order:

1. collection order: `sessions` → `lectures` → `assessments` → `people` →
   `policies`
2. within a collection, the lower week number / lower assessment number

So a session declares its lecture; a lecture never declares a session. An
assessment declares its policy edge; policies declares nothing. **People files
declare nothing at all** (their schema strips `related:`) — every person edge is
inbound from a lecture, and symmetrisation gives them their edge.

Every ref is fully prefixed. No bare slugs. No self-refs. No `published: false`.

### A. Session → its week's lecture (12) — required by the spec check

| from | to |
|---|---|
| `sessions/week-01` | `lectures/week-01` |
| `sessions/week-02` | `lectures/week-02` |
| `sessions/week-03` | `lectures/week-03` |
| `sessions/week-04` | `lectures/week-04` |
| `sessions/week-05` | `lectures/week-05` |
| `sessions/week-06` | `lectures/week-06` |
| `sessions/week-07` | `lectures/week-07` |
| `sessions/week-08` | `lectures/week-08` |
| `sessions/week-09` | `lectures/week-09` |
| `sessions/week-10` | `lectures/week-10` |
| `sessions/week-11` | `lectures/week-11` |
| `sessions/week-12` | `lectures/week-12` |

### B. Session spine, week N → week N+1 (11)

| from | to |
|---|---|
| `sessions/week-01` | `sessions/week-02` |
| `sessions/week-02` | `sessions/week-03` |
| `sessions/week-03` | `sessions/week-04` |
| `sessions/week-04` | `sessions/week-05` |
| `sessions/week-05` | `sessions/week-06` |
| `sessions/week-06` | `sessions/week-07` |
| `sessions/week-07` | `sessions/week-08` |
| `sessions/week-08` | `sessions/week-09` |
| `sessions/week-09` | `sessions/week-10` |
| `sessions/week-10` | `sessions/week-11` |
| `sessions/week-11` | `sessions/week-12` |

### C. Lecture spine — **cut, do not write these** (0)

Eleven `lectures/week-N` → `lectures/week-N+1` edges were specified here and
removed at the W0 gate. Two spines pointing the same direction made the graph
read as a ladder rather than a network, and the session spine (B) already
carries week-to-week navigation for the pages a marker actually opens. Lectures
keep their week-mates via A and their staff via E. The letter is retained so
the group labels below do not shift.

### D. Session → assessment (6)

| from | to |
|---|---|
| `sessions/week-04` | `assessments/01-role-teardown` |
| `sessions/week-08` | `assessments/02-performance-materials` |
| `sessions/week-09` | `assessments/04-capstone-applications` |
| `sessions/week-11` | `assessments/03-peer-critique` |
| `sessions/week-11` | `assessments/04-capstone-applications` |
| `sessions/week-12` | `assessments/04-capstone-applications` |

### E. Lecture → person (5)

| from | to |
|---|---|
| `lectures/week-01` | `people/wren-halloway` |
| `lectures/week-03` | `people/anselm-pike` |
| `lectures/week-04` | `people/sunil-raman` |
| `lectures/week-06` | `people/nadia-ferrante` |
| `lectures/week-09` | `people/margot-tse` |

### F. Assessment ladder (3)

| from | to |
|---|---|
| `assessments/01-role-teardown` | `assessments/02-performance-materials` |
| `assessments/02-performance-materials` | `assessments/04-capstone-applications` |
| `assessments/03-peer-critique` | `assessments/04-capstone-applications` |

### G. Assessment → policies (2)

| from | to |
|---|---|
| `assessments/01-role-teardown` | `policies/index` |
| `assessments/04-capstone-applications` | `policies/index` |

### Totals and invariants

**A 12 + B 11 + C 0 + D 6 + E 5 + F 3 + G 2 = 39 declared edges.**

Isolation audit — every one of the 34 nodes has at least one edge:

- 12 sessions: all via A (and B)
- 12 lectures: all via A inbound (five also via E)
- `01-role-teardown` via D/F/G · `02-performance-materials` via D/F ·
  `03-peer-critique` via D/F · `04-capstone-applications` via D/F/G
- all 5 people via E
- `policies/index` via G

No `(from, to)` pair repeats, and no row has `from == to`. **⚠ decision 7,
resolved:** the lecture spine is cut and the session spine kept — spine edges
exist for lateral navigation, not because week 5 has anything to say about week
6, and one spine is enough to carry that without the graph collapsing into a
ladder.

## 8. The flagship deck — week 6

**Which:** `lectures/week-06`, *Varnish, and How Much Is Too Much*
(2027-03-29), delivered by Nadia Ferrante.

**Frontmatter value, exact:**

```yaml
slides: /decks/week-06-varnish/
```

Matches `^\/decks\/[a-z0-9-]+\/$`. Built from
`src/decks/week-06-varnish.deck.mdx`. **⚠ decision 11:** slug is
`week-06-varnish`, not `week-06` — a marker who lands on `/decks/` should be
able to tell what the deck is about without opening it.

**Why week 6 (⚠ decision 1).** It is the exact midpoint — the last week before
the teaching break — so a marker opening it sees a course already running rather
than a course introducing itself. It is also the most visual topic in the
twelve, which means the slides do work a page cannot: two versions of the same
artefact, side by side, is a slide and not a paragraph. And it sits directly
upstream of Assessment 2, so the deck is load-bearing teaching rather than a
showcase. The obvious alternative is week 9 (interviews), which is the
crowd-pleaser but is also the week already carrying the safety-net mechanism;
the deck is the wrong place for administrative weight.

**Outline — 13 slides.** Each line is content, then speaker-note intent.

1. **Title** — "Varnish, and How Much Is Too Much", SLOP3841 week 6.
   *Notes:* name the bit in the first thirty seconds — everything in your
   Dossier is already varnished, the question is thickness, not whether.
2. **`_class: impact`** — "Nobody assesses your work. They assess your work as
   presented." *Notes:* the uncomfortable premise. Presentation is not an
   optional extra layer; it is the only channel.
3. **The same project, twice** — two panels, identical work, bare vs framed.
   *Notes:* nothing about the underlying work differs between these panels. Ask
   the room which one they would open on a Friday afternoon.
4. **The ninety-second read** — the four questions an assessor actually runs:
   what is it, does it work, did you do it, do I care. *Notes:* present this as
   observed behaviour, not folklore. These four questions are the spec your
   artefact is written against.
5. **Thin varnish: four moves** — name the problem, show the thing running,
   state your part, state the constraint. *Notes:* each move is one sentence,
   not a redesign. Demonstrate all four on a single artefact.
6. **Thick varnish: four tells** — adjectives instead of outcomes, no named
   constraint, passive voice around ownership, finish inversely proportional to
   depth. *Notes:* deliberately mirrors the previous slide's structure. Flag
   that the class will be red-teaming exactly these in week 8.
7. **Three surfaces, same four moves** — columns: repo front page / portfolio
   case study / one-page capability brief. *Notes:* the gallery walk is
   organised by these three columns; say which wall each stream starts at.
8. **Live teardown** — one real-ish artefact, annotated with what its varnish is
   doing. *Notes:* do this slowly on screen. Ask the room to call the tell
   before naming it yourself.
9. **Whose work was it** — attribution, group projects, and the word "we".
   *Notes:* the integrity boundary, said plainly. Overclaiming a team output is
   the most common portfolio failure and among the easiest to detect.
10. **The Varnish Note** — the week's Dossier artefact: every presentational
    decision, and what it reveals or conceals. *Notes:* show one good entry and
    one useless entry. This is 25% of Assessment 2's criteria.
11. **Gallery-walk mechanics** — timing, what goes on each other's sheets, the
    cross-stream final lap. *Notes:* enforce *written* critique — it becomes
    Assessment 3 evidence, and verbal critique leaves no receipt.
12. **Where this lands** — Assessment 2 due Friday of week 8, red-team session
    week 8, the teaching break in between. *Notes:* explicit instruction to
    spend the break building, not polishing. Say it twice.
13. **`_class: impact`** — "Varnish is not a lie. It is a claim about where to
    look." *Notes:* close on the sincere point inside the satirical frame, and
    stop. No moralising coda.

Deck mechanics per the platform notes: single-line MDX directives only,
` ```notes ` fences for speaker notes, deck-relative asset paths, and check slide
fit at **both** marking viewports.

## 9. The twelve brainrot terms

One per week, as `term:` and `termGloss:` frontmatter on that week's **session**
node, rendered on the week page and aggregated into a glossary that links back.

**⚠ decision 8:** these are built as **one coherent invented lexicon** — a course
that has coined twelve pieces of jargon for career advice is itself the joke,
and the terms cross-reference each other (receipt debt is what the plausibility
budget is spent on; seamwork audits the truthfloor). The alternative was twelve
independent gags, which is funnier per item and worse as a semester. The user can
swap any single term without disturbing the rest, except that swapping
**truthfloor** (W1) or **seamwork** (W12) breaks the bookend.

None of these is existing internet slang relabelled.

| Wk | `term:` | `termGloss:` |
|---|---|---|
| 1 | **truthfloor** | The lowest claim you could make about yourself and still defend it in a room containing someone able to check. Most CVs are written a full storey above their author's truthfloor, which is survivable right up until the follow-up question. Find yours in week 1 so everything you build this semester has something underneath it. |
| 2 | **reqspeak** | The dialect job advertisements are written in, where "fast-paced environment" and "wears many hats" are load-bearing. Every ad is four documents stapled together: legal boilerplate, a wishlist nobody expects met, the work you would actually do, and an accidental confession about the last person who held the job. Learn to read the fourth one. |
| 3 | **gapshape** | Not how large the distance between you and the role is, but what shape it has — which parts close in a fortnight, which take a year, and which you will simply have to say out loud. "I'm still learning" is not a gapshape; "I have never deployed anything other people depended on" is. The specific version is the one you can plan against, and the one a panel respects. |
| 4 | **receipt debt** | The accumulated distance between the claims on your materials and the evidence you could produce for them inside ninety seconds. Receipt debt is invisible until somebody says "show me", at which point it is charged in full. Pay it down by converting activity into artefacts a stranger can verify without you in the room. |
| 5 | **the load-bearing anecdote** | The one story you have told well enough that it holds up under four different questions without buckling. Students arrive believing they need twelve stories and leave knowing they need three, each built as situation, decision, consequence, and what they would change. Preparing is not dishonest; improvising badly is not more authentic. |
| 6 | **artefact varnish** | The layer of finish sitting between your work and the person assessing it. Thin varnish makes real work legible — a README that says what the thing does, a case study that names the problem it solved. Thick varnish conceals that there is not much underneath, and anyone who hires for a living can tell the difference by touch. |
| 7 | **the pre-warmed stranger** | Somebody you have never met who nevertheless has a specific reason to reply, because you did the reading first. The distance between a cold message and a pre-warmed one is one sentence proving you know which thing they made. Warm one stranger properly rather than mailing forty, and expect silence, which is the standard reply and not a verdict. |
| 8 | **plausibility budget** | The finite quantity of unevidenced claim a single document or conversation can carry before none of it is believed. The budget is shared, which is why one indefensible buzzword discredits the true sentence beside it: spend the budget on the one stretch that matters and evidence everything else. Once you can see your own budget you can see everybody else's. |
| 9 | **interview weather** | The conditions of the room you did not create and cannot change — the panel's mood, a format nobody warned you about, the excellent candidate before you. You prepare the parts you control: structure, examples, the questions you ask, and recovery from one bad answer. Everything else is weather, and weather is not a verdict on your worth. |
| 10 | **the negotiation flinch** | The half-second in which your face answers the salary question before you do. Entry-level negotiation is narrower than the internet claims but it is never zero — start date, level, team, scope, and in some fields rates and usage rights are all genuinely open — and the flinch is what costs you the parts that were available. Rehearse the sentence aloud until it is boring. |
| 11 | **competence lag** | The interval between being hired for a role and being able to perform it: normal, universal, and almost never mentioned at the offer stage. Managing your lag means asking for help in a way that shows you already tried, learning where people can see you doing it, and holding a ninety-day plan built from your own gap map. Pretending you have no lag is the fastest way to lengthen it. |
| 12 | **seamwork** | The join between the version of you that was performed and the version that quietly became true, and the labour of deciding what to do about it. By week 12 some of your performance has been overtaken by real competence and some has not, and the useful question is which is which. Seamwork is the audit: keep what is honest scaffolding, and go and learn the rest. |

## 10. Every ⚠ decision in one place

All eleven went to the user at the W0 sign-off gate. Four were ruled on
explicitly (1, 3+4, 7, 9); the rest stand as specified. Two were changed.

1. Flagship deck on **week 6**, not week 9 (§8). **Confirmed at the gate.**
2. `week-NN` slugs for **both** sessions and lectures, mitigated by the
   always-fully-prefix-refs rule (§0, §6).
3. **Four** assessments rather than three, to keep the capstone under 50 without
   inflating A1 (§4). **Confirmed at the gate.**
4. **Peer critique graded** at 10% — participation-adjacent marking, graded on
   submitted written critiques only (§4). **Confirmed at the gate.**
5. Guest lectures **split across two weeks in two modes** — shared relay in W10,
   in-tutorial per-stream guests in W11 (§3).
6. Streams partition by **how a field screens candidates**, not by discipline
   (§1).
7. **Changed at the gate.** The lecture spine (C, 11 edges) is cut; the session
   spine (B) is kept. 39 declared edges, not 50 (§7).
8. Terms built as **one cross-referencing lexicon**; truthfloor and seamwork are
   bookends and should not be swapped independently (§9).
9. **Changed at the gate.** Week 7 no longer requires a real send; drafting is
   compulsory, sending is the student's choice, and the Outreach Log is graded
   identically either way (§3).
10. Capstone due **2027-05-26**, nine days after the last teaching week and two
    days inside the course window (§4).
11. Deck slug `week-06-varnish` rather than `week-06` (§8).
