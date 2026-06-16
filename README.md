# Orbital

Systems That Orbit Your Business.

Orbital is a modern digital growth and technology agency website built to act as both the company's public presence and its first portfolio case study. Phase 1 focuses on a premium marketing website, clear service positioning, portfolio proof, and lead generation through a polished contact flow.

The project is designed as a scalable foundation for future expansion into automation, client dashboards, CRM workflows, AI assistants, and internal admin tools.

## Project Status

Phase 1: Agency website and lead generation platform.

Phase 1 focuses on:

- Public-facing marketing website
- Services presentation
- Portfolio and case study showcase
- About page
- Contact and lead capture flow
- SEO and performance fundamentals
- Deep Space visual brand system

Phase 2 features such as client portals, payment flows, AI automation, n8n workflow integrations, VAPI voice agents, CRM sync, and admin content management are intentionally out of scope for the initial release.

## Product Goals

Orbital is built to solve digital presence and growth problems for small businesses, startups, institutes, e-commerce founders, and local brands.

The website must:

- Build trust within the first few seconds of landing
- Present Orbital as a premium technology agency, not a generic freelance studio
- Explain services clearly and directly
- Showcase real work and case studies
- Convert visitors into leads through contact forms, Calendly, WhatsApp, and email
- Perform well on mobile, tablet, and desktop
- Provide a scalable architecture for future backend and automation systems

## Core Pages

The public website is a single page application with client-side routing.

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | First impression, value proposition, services preview, portfolio highlights, process, CTA |
| `/services` | Services | Detailed service categories, packages, deliverables, and conversion CTAs |
| `/our-work` | Our Work | Portfolio projects, filters, case study previews, proof of capability |
| `/about` | About | Mission, vision, story, values, and team trust-building |
| `/contact` | Contact | Primary lead capture form, Calendly, WhatsApp, email, and response promise |
| `/404` | Not Found | Branded fallback page for unmatched routes |

## Services

Phase 1 services are grouped around traditional agency offerings.

### Web Development

Modern static and dynamic websites for SMBs, startups, personal brands, and growing companies.

### Digital Marketing

SEO setup, social media support, content strategy, and digital growth foundations for local businesses.

### Landing Page Design

Conversion-focused pages for e-commerce, launches, campaigns, and specific offers.

### IT Consulting

Technical roadmap support, digital tool selection, and setup guidance for traditional businesses.

The broader service direction uses three high-level categories:

- Build: web development and digital products
- Grow: branding, SEO, content, and digital marketing
- Automate: automation and AI systems planned for later phases

## Key Features

Launch-blocking requirements include:

- Fully responsive design across mobile, tablet, and desktop
- Clear CTA on every page
- Portfolio section with at least three case studies at launch
- Contact form with validation and consent checkbox
- Calendly booking option
- WhatsApp contact link
- Direct email contact option
- SEO basics including meta tags, Open Graph, sitemap, and robots.txt
- Deep Space brand theme applied consistently
- Fast page load with mobile LCP target under 2.5 seconds
- Accessible UI following WCAG 2.1 AA principles

## Contact And Lead Flow

The contact page is the most important conversion path in Phase 1.

The lead capture form includes:

- Full name
- Email
- Optional phone number
- Service interest
- Message
- Consent checkbox

Expected form behavior:

1. Visitor fills out the form.
2. Client-side validation runs before submission.
3. Submit button enters a loading state.
4. Lead payload is sent to the backend API.
5. Backend validates and rate-limits the request.
6. Lead is stored.
7. Confirmation email is sent to the visitor.
8. Internal notification email is sent to the Orbital team.
9. Success state replaces the form.

Alternative contact paths:

- Calendly embedded booking widget
- WhatsApp button with pre-filled message
- Direct mailto email link

## Technical Architecture

Orbital is designed as a decoupled layered system.

```text
Frontend SPA
   |
   | REST API
   v
Spring Boot Backend
   |
   v
PostgreSQL Database
   |
   +-- Transactional Email Service
   +-- Future n8n / CRM / AI Integrations
```

### Frontend

The current frontend is located in:

```text
orbital-frontend/
```

Frontend stack:

- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- React Hook Form
- Lucide React
- Three.js / React Three Fiber
- GSAP
- Lenis smooth scrolling

### Backend

The planned backend architecture uses:

- Java
- Spring Boot
- REST APIs
- PostgreSQL
- Controller / Service / Repository layering
- Server-side validation
- Rate limiting for lead submissions
- Async email dispatch
- Health check endpoint at `/api/v1/health`

### Database

Planned persistent data includes:

- Leads
- Portfolio items
- Future users / clients
- Future invoices
- Future project dashboard records

### Deployment

Recommended deployment strategy:

| Layer | Platform |
| --- | --- |
| Frontend | Vercel or Netlify |
| Backend | Railway, Render, or VPS |
| Database | Supabase or Railway PostgreSQL |
| Email | Resend or SendGrid |
| Monitoring | Sentry, UptimeRobot, or Better Uptime |

## API Direction

Planned public API endpoints include:

```text
GET  /api/v1/health
GET  /api/v1/services
GET  /api/v1/our-work
GET  /api/v1/our-work/{slug}
POST /api/v1/leads
```

Future admin and client endpoints may include:

```text
POST  /api/v1/auth/login
GET   /api/v1/client/projects
POST  /api/v1/admin/our-work
PATCH /api/v1/admin/our-work/{id}
```

### Brand Personality

Orbital should feel like the intersection of:

- A premium SaaS startup
- A boutique creative technology studio
- A futuristic but trustworthy digital agency

The design should be confident, modern, intelligent, and conversion-aware.

### Color Palette

| Token | Hex | Usage |
| --- | --- | --- |
| Deep Space Black | `#050A14` | Primary background |
| Midnight Blue | `#0D1F3C` | Cards, sections, modals |
| Orbital Blue | `#1B6FE8` | Primary CTAs, links, active states |
| Electric Cyan | `#38D9F5` | Accents, badges, hover states |
| Soft White | `#F0F4FF` | Primary text |

Supporting colors:

| Token | Hex |
| --- | --- |
| Card Surface | `#0F1E38` |
| Subtle Border | `#1A2E50` |
| Muted Text | `#8899BB` |
| Success | `#22C55E` |
| Error | `#EF4444` |
| Warning | `#F59E0B` |

### Typography

The design brief specifies a clean two-font system:

- Primary UI / display font: Inter
- Monospace / tech labels: JetBrains Mono

The PRD also references Syne and DM Mono as brand font options, so typography should be finalized before production launch to avoid inconsistency.

### UI Principles

- Premium first
- Dark and purposeful
- Motion with meaning
- Conversion-aware layouts
- Reusable scalable components
- No generic corporate layouts
- No stock-looking visuals
- No decorative animation without purpose

## Motion And Interaction

Animations should guide attention, communicate state, or reinforce the brand.

Expected animation patterns:

- Hero text stagger fade-up
- Route fade transitions
- Section reveal on scroll
- Card entrance staggering
- Our Work filter transitions
- Button hover glow
- Card hover lift
- Form success transition
- Navbar blur on scroll

All motion should respect `prefers-reduced-motion`.

## Accessibility Requirements

The website should target WCAG 2.1 AA.

Accessibility requirements include:

- Sufficient color contrast
- Semantic HTML structure
- Logical heading hierarchy
- Keyboard navigation for all interactive elements
- Visible focus indicators
- Meaningful image alt text
- Proper form labels
- Error messages linked to fields
- ARIA labels on icon-only buttons
- Reduced motion support

## Performance Requirements

Frontend targets:

- Lighthouse desktop score: 90+
- Lighthouse mobile score: 80+
- LCP under 2.5 seconds
- FID under 100ms
- CLS under 0.1
- Initial gzipped frontend bundle under 500KB
- Lazy-loaded images
- WebP image format
- Route-level code splitting
- Production CSS purging

Backend targets:

- API response time under 300ms for 95th percentile under normal load
- 100 concurrent users in Phase 1
- Scalable to 1000+ users in Phase 2
- Stateless backend design
- Structured logging and monitoring

## Analytics

Planned analytics events include:

| Event | Trigger |
| --- | --- |
| `page_view` | Route change |
| `service_view` | User views a service section |
| `our_work_click` | User clicks a project card |
| `cta_click` | User clicks a CTA |
| `contact_start` | User begins filling contact form |
| `lead_generated` | Contact form succeeds |
| `calendly_open` | Calendly interaction begins |
| `whatsapp_click` | WhatsApp button clicked |

Google Analytics should be gated behind cookie consent where required.

## Privacy And Compliance

Privacy requirements include:

- HTTPS / TLS 1.2+
- Explicit contact consent checkbox
- GDPR-aligned handling for international visitors
- Privacy Policy page before launch
- Cookie consent banner for analytics
- Lead data retained for a maximum of two years unless an active relationship exists
- Right-to-deletion process for user data
- Restricted production database access

## Project Structure

Current frontend structure:

```text
orbital-frontend/
|-- docs/
|   |-- AFD.md
|   |-- PRD.md
|   |-- TRD.md
|   `-- UIDESIGNBRIEF.md
|-- public/
|   |-- favicon.svg
|   |-- icons.svg
|   |-- robots.txt
|   `-- sitemap.xml
|-- src/
|   |-- components/
|   |-- data/
|   |-- hooks/
|   |-- pages/
|   |-- App.jsx
|   |-- main.jsx
|   `-- index.css
|-- package.json
|-- vite.config.js
`-- eslint.config.js
```

## Getting Started

From the frontend directory:

```bash
cd orbital-frontend
npm install
npm run dev
```

The development server runs with Vite.

## Available Scripts

Inside `orbital-frontend/`:

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Development Standards

Recommended standards from the technical requirements:

- Use Git for version control
- Commit before every major feature
- Use Conventional Commits, such as `feat:`, `fix:`, and `chore:`
- Use feature branches for development
- Keep `main` production-ready
- Review code before merging
- Follow feature-based frontend organization
- Keep components reusable
- Maintain accessibility and performance budgets

## Phase 1 Scope

Included:

- Home page
- Services page
- Portfolio / Our Work page
- About page
- Contact page
- 404 page
- Responsive design
- SEO basics
- Lead generation flow
- Brand system implementation

Not included:

- AI services section
- n8n workflow builder
- VAPI voice agent
- Client dashboard
- Payment or invoice system
- User authentication
- CMS / no-code content editing
- Admin panel

## Phase 2 Direction

The architecture should support later expansion into:

- Admin panel for portfolio and content management
- Client login and dashboard
- Project status tracking
- Deliverable downloads
- Invoice management
- Stripe / Khalti payment flow
- n8n lead-to-CRM automation
- Follow-up email sequences
- AI automation services
- Voice agent integrations

## Documentation

Source planning documents live in:

```text
orbital-frontend/docs/
```

Key documents:

- `AFD.md`: Application flows and user journeys
- `PRD.md`: Product requirements and launch scope
- `TRD.md`: Technical architecture and engineering requirements
- `UIDESIGNBRIEF.md`: Visual design system and UX direction

## Brand Statement

Orbital builds digital systems that help businesses grow.

The website should demonstrate that promise through its own quality: fast, polished, credible, conversion-focused, and technically scalable.
