# IdeaBoard AI

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust values. Set `USE_MOCKS=true` to enable the in-memory mock server.
3. Run the app:
   ```bash
   npm start
   ```

## Architecture Overview
- **Navigation**: Bottom tabs + native stacks in `src/navigation/RootNavigator.tsx`.
- **State**: Zustand slices combined in `src/state/store.ts`.
- **Data**: Axios client (`src/client/Api.ts`) with optional mock server (`src/client/mocks/mockServer.ts`).
- **Design System**: Tokens and theming in `src/theme/theme.tsx`. Use `useTheme()`; avoid hardcoded colors or sizes.

## Canvas Internals
Nodes render absolutely and edges are straight lines (`EdgeLayer`). Connect mode toggles edge creation.

## AI Run Flow
Collect nodes where `content.activeForPrompt === true` and send to `/ai/run`. Display results in `AIRunResultModal`.

## Templates Flow
Templates list and detail screens with mock purchase and instantiate endpoints.

## Kitchen Sink
`DesignKitchenSink.tsx` renders tokens and components for visual QA.
