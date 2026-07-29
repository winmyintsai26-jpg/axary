# Axary

> A quiet universe where creativity is encouraged.

Axary is a peaceful digital place built around creation, discovery, and gentle
human encouragement. Every creator will own a world. Visitors will travel
through those worlds instead of scrolling through a feed, and creative work
will be encountered as a place rather than ranked as content.

## Vision

Create one of the most beautiful and calming places on the internet: a universe
people choose to visit when they want to feel peaceful, inspired, and ready to
make something.

## Mission

Give every creator a world of their own and make discovery feel like travel.
Axary replaces comparison with curiosity, metrics with meaning, and endless
scrolling with intentional exploration.

## Philosophy

Axary is not an art gallery, a social network, or an AI image website. It is a
digital place.

People should not say, “I use Axary.” They should say, “I’m going to spend a
little time in Axary tonight.”

That distinction guides the product:

- Calm before stimulation
- Discovery before distribution
- Encouragement before evaluation
- Ownership before performance
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
2. **The First Planet** — define the first explorable world.
3. **The First Gallery** — let a world hold creative work.
4. **The Universe** — connect worlds through meaningful travel.
5. **Community** — introduce encouragement without comparison.

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

**Milestone 1 — The First Light**

The application opens directly into a full-screen night sky with a procedural
star field, subtle twinkling, soft pointer parallax, and one invitation:
**Begin Journey**. No accounts, uploads, feeds, galleries, or backend behavior
exist yet.

## Documentation

- [Design Bible](docs/DESIGN_BIBLE.md)
- [Story](docs/STORY.md)
- [Roadmap](docs/ROADMAP.md)
- [Brand Guidelines](docs/BRAND_GUIDELINES.md)

## License

Axary is available under the [MIT License](LICENSE).

