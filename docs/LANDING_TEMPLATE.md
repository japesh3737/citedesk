# Landing template integration

The user supplied a TypeScript canvas data-rain component in the attached Pasted text.txt. Adapted it directly into web/components/ui/data-rain.tsx with colocated CSS. Existing Vite/React/TypeScript and semantic CSS suffice: this component uses no shadcn components, Tailwind utilities or additional dependencies, so no framework migration is needed.

The root route is now a minimal welcome screen with CiteDesk identity, short copy, Login to existing /admin/login, guest Explore to /explore and direct Assistant access. The full existing editorial homepage is retained at /explore. All public/admin routes remain intact. Data rain uses warm rust/olive colors, source-over composition for paper contrast, constrained particle counts and a light center mask to protect legibility. Added a pause/resume control; existing reduced-motion static rendering and hidden-tab suspension are preserved. Canvas and decorative layers cannot intercept clicks and are hidden from assistive technology.

Verification scope: build/typecheck/lint, existing API/public/admin flows, welcome canvas rendering, pause/resume, login/guest navigation, reduced-motion and 320px overflow, desktop/mobile screenshots.
