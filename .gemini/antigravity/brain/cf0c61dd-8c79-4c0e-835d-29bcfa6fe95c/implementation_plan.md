# Convert Plain HTML to Next.js React App

This plan outlines the steps to convert the existing plain HTML/CSS/Vanilla JS codebase for the Denvertrip website into a modern Next.js React application, enabling the integration of the requested stacked carousel component (using Shadcn UI and Tailwind CSS).

## User Review Required
> [!WARNING]
> This is a major structural change. The existing static `index.html`, `style.css`, and `script.js` files will be replaced by a React-based architecture using Next.js (App Router), Tailwind CSS, and TypeScript. All your images and custom tracking scripts will be preserved, but the core foundation of the site will change.

## Proposed Changes

### Setup Next.js Architecture
- Generate a new Next.js 14 project in a temporary folder using `create-next-app` (TypeScript, Tailwind, App Router).
- Move the generated React infrastructure (`package.json`, `tailwind.config.ts`, `src/app`, etc.) into the main project root.
- Initialize `shadcn/ui` to support the required UI components (Badge, Carousel, etc.) in `src/components/ui`.

### Migrate Existing Assets
- Move all image files (jpg, png, webp) to the `public/` directory so they are correctly served by Next.js.
- Move `robots.txt` and `sitemap.xml` to `public/`.
- Move the existing tracking logic (`tracking.js`) to `public/` and configure it in the Root Layout.

### Convert HTML to React Components
- **Global Layout (`src/app/layout.tsx`)**: Migrate the contents of your `<head>` (fonts, meta tags, Google Tag Manager, Google Consent Mode) into Next.js Metadata and layout structure.
- **Home Page (`src/app/page.tsx`)**: Convert `index.html` into a React functional component. Replace standard `class` attributes with `className`, and self-close elements like `img` and `input`.
- **Other Pages**: Convert `contact.html`, `privacy.html`, and `terms.html` into `src/app/contact/page.tsx`, `src/app/privacy/page.tsx`, and `src/app/terms/page.tsx`.

### Migrate Styles to Tailwind / Global CSS
- Bring the existing `style.css` rules into `src/app/globals.css`. While we will introduce Tailwind for the new components, the existing CSS will be preserved initially to ensure the design does not break during the transition.
- Convert `script.js` logic (mobile menu toggle, scroll events) into React hooks (`useEffect`, `useState`) within the components.

### Integrate the Requested Carousel
- Install dependencies: `motion`, `class-variance-authority`, `clsx`, `tailwind-merge`, and `lucide-react`.
- Add the `Badge` component via shadcn CLI.
- Create `src/components/carousel-07.tsx` containing the provided Stacked Carousel code.
- Inject the `CarouselStacked` component into the "Destinations" or "Service Area" section of the new Next.js homepage.

## Verification Plan

### Automated Tests
- `npm run build` to ensure the new Next.js app compiles successfully without TypeScript or Linting errors.
- Run `npm run dev` in the background to serve the site.

### Manual Verification
- Review the locally hosted version to ensure the design looks identical to the original HTML version.
- Verify the mobile menu works using React state instead of vanilla DOM manipulation.
- Check that the new Stacked Carousel renders properly in the Service Area, animates on drag, and displays the mountain/nature images provided in the code.
- Ensure the Google Tag Manager and Consent Mode scripts still load correctly in the `<head>`.
