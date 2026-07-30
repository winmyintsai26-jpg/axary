# Performance Pass

## Goal

Axary's rendering should disappear behind the feeling of the world. This pass
keeps the established visual design while reducing work performed every frame,
especially during orbital transitions and Heart World exploration.

## Largest Bottlenecks

The audit identified four high-impact costs:

1. All five detailed orbital worlds stayed mounted even when only one could be
   seen.
2. Repeated Heart World objects were separate meshes and materials, creating
   avoidable draw calls.
3. camera, lighting, and water loops created short-lived Three.js objects every
   frame.
4. keyboard movement wrote destination and location values into Zustand at
   frame rate, causing React subscriptions to receive unnecessary updates.

## Changes

### Scene lifecycle

- Detailed orbital worlds mount only while approaching or observing a world.
- Only the selected detailed world mounts.
- Book lights unmount when they are not visible.
- The Heart World remains isolated from the orbital scene graph.

### Instancing

Repeated geometry now uses `InstancedMesh` while preserving its previous
positions, colors, dimensions, and movement:

| Repeated group | Before | After |
| --- | ---: | ---: |
| Cherry tree trunks and canopy layers | 36 draw calls | 6 draw calls |
| Winding path stones | 30 | 2 |
| Bridge planks | 12 | 2 |
| Hidden-garden flowers | 18 | 2 |
| Fish | 4 | 1 |
| Bird wings | 6 | 1 |
| Butterflies | 4 | 1 |
| **Measured subtotal** | **110** | **15** |

This representative repeated-object subtotal is reduced by approximately 86%.
Other unique landmarks remain separate because they have independent meaning or
interaction.

### Frame-loop allocation

- Camera vectors are allocated once and reused.
- Lighting phase colors are created once rather than rebuilt every frame.
- Water transition colors are reused.
- The fish school updates one instance buffer from one animation loop.

At least 13 short-lived Three.js objects per active Heart World frame were
removed from the steady render path. This reduces garbage-collection pressure
that previously appeared as intermittent stutter.

### React and world state

- Keyboard movement remains inside frame-local refs.
- Active location updates only when the visitor actually enters a different
  symbolic area.
- Heart time updates only when the day phase changes.
- No React state is written continuously during ordinary movement.

### Pixel workload

The maximum device-pixel ratio was reduced from 1.6 to 1.35. At the cap, this
reduces shaded pixels by approximately 29% while preserving the composition,
colors, geometry, and responsive layout.

## Validation

- ESLint: zero warnings
- Prettier: clean
- Strict TypeScript: clean
- Vite production build: successful
- Source diff whitespace validation: clean

The comparison above uses deterministic scene-graph and allocation counts.
Runtime frame rate varies by browser, GPU, resolution, power mode, and open
applications, so no universal FPS claim is made.

*If a feature makes the worlds feel more alive, more reflective, and more
compassionate, it belongs in Axary. If it distracts from that purpose, it does
not.*
