# Learnings

Permanent, append-only. Never delete an entry — bugs get marked mitigated,
not removed; patterns stay even if unused for a while.

## Bugs / gotchas

_(none yet)_

## Patterns that worked

### Challenge the claim of completeness before accepting it

"Have you looked at all the resources available?" caught that the actual
assignment brief and spec had never been fetched — only the repo-local
READMEs — after readiness had already been asserted. The same move applied
to the plan caught a harness with no subject and a phasing scheme organised
by calendar day rather than dependency. One cheap question, three expensive
omissions. Ask it at every claimed checkpoint rather than trusting the
claim.

### Write a decision down in the turn it is made

Two decisions settled in conversation — the interactive-elements scope and
the one-page-per-week stream amendment — never reached `WORKLOG.md`, so a
context clear would have lost both, and one had already survived a handoff
only by luck. A decision that exists only in dialogue does not exist. The
fix is not "log more diligently later"; it is logging in the same turn the
decision lands, because there is no later that reliably arrives.

### Read the packages, not the README

Every constraint that actually changed the build plan came from reading
dependency source: `published: false` silently breaks the graph for every
inbound ref, axe throws the build and CI's deploy runs its own build,
`embed:` directives create graph edges, assessment weights are unenforced
across assessments. None of that is in the starter documentation. On a
platform you did not write, the failure modes live in the code.

### Stub every node first, then wire the graph in one pass

Because the build hard-fails on a dangling `related:` ref, incremental
graph-wiring means every intermediate state is broken. Creating all nodes as
schema-valid stubs first makes it impossible for an edge to dangle, turns
graph wiring into one reviewable commit with one owner, and — the real
payoff — lets many authors write into the graph concurrently without any of
them being able to break the build for the others.
