# Axary

> Every person carries many worlds within them.

Axary is a peaceful digital place for self-reflection through symbolic worlds.
Instead of opening a dashboard, visitors begin a personal journey. They answer
gentle questions, discover worlds representing different parts of themselves,
and eventually return to see how those worlds have changed with them.

## Vision

Create one of the most beautiful and calming places on the internet: a universe
people visit when they want to understand themselves, feel encouraged, and
spend time with questions that do not have instant answers.

## Mission

Turn self-reflection into a gentle journey through meaningful places. Axary
replaces diagnosis with curiosity, metrics with symbolism, and endless
scrolling with intentional reflection.

## Philosophy

Axary is not an art gallery, a social network, or an AI image website. It is a
digital place.

People should not say, “I use Axary.” They should say, “I’m going to spend a
little time in Axary tonight.”

That distinction guides the product:

- Calm before stimulation
- Reflection before interpretation
- Encouragement before evaluation
- Symbolism before scoring
- Atmosphere before interface

## Technology

### Frontend

- React and strict TypeScript
- Vite
- React Three Fiber and Three.js
- Framer Motion
- React Router
- Zustand
- Tailwind CSS
- ESLint and Prettier

### Backend

- ASP.NET Core Web API (.NET 10)

PostgreSQL, Cloudflare R2, and SignalR are intentionally deferred until the
experience requires them.

## Roadmap

1. **The First Light** — establish Axary’s atmosphere and visual language.
2. **The First Worlds** — prove that handcrafted worlds can carry emotion.
3. **The Book of Worlds** — establish reflection, symbolic worlds, The Curator,
   and future-ready conversation foundations.
4. **World Entry** — allow intentional visits inside one symbolic world.
5. **Living Worlds** — introduce personalization, memory, and change over time.

See [docs/ROADMAP.md](docs/ROADMAP.md) for the product boundaries and exit
criteria of each milestone.

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Build and quality checks:

```bash
npm run check
```

### Backend

The backend is deliberately an empty .NET 10 Web API skeleton.

```bash
cd backend/Axary.Api
dotnet restore
dotnet run
```

## Current Milestone

**Phase 3 — The Book of Worlds Foundation**

Visitors now begin with a calm introduction and a reusable multi-step
questionnaire. Completing the reflection reveals five symbolic worlds—Heart,
Growth, Bonds, Purpose, and Soul—which can be observed from orbit. The Curator
offers scripted guidance through a reusable dialogue model prepared for future
branching and memory. Personality interpretation, AI conversations, accounts,
and persistence remain intentionally unimplemented.

## Documentation

- [Design Bible](docs/DESIGN_BIBLE.md)
- [Story](docs/STORY.md)
- [Roadmap](docs/ROADMAP.md)
- [Brand Guidelines](docs/BRAND_GUIDELINES.md)

## License

Axary is available under the [MIT License](LICENSE).
