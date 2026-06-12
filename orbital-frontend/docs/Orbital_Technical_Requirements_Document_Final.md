

ORBITAL Technical Requirements Document
## Confidential — Orbital Internal Document Page 1
## ORBITAL
## Systems That Orbit Your Business
## Technical Requirements Document
## Version 1.0  |  June 2025
## Classification: Confidential — Internal Use Only




## 1. Introduction
## 1.1 Purpose
This Technical Requirements Document (TRD) defines the full technical specification for the
Orbital platform — a modern digital growth and automation agency website with a scalable
backend architecture. It covers frontend, backend, database, API, infrastructure, and future-
phase requirements.
This document is intended for the founding engineering team and any future technical
contributors.
## 1.2 Project Scope
Phase 1 scope covers the public-facing marketing website and lead generation system. The
architecture must be designed to support future expansion into client dashboards, invoice
management, an automation request portal, and an AI assistant layer.
## 1.3 Definitions & Acronyms
## Term Definition
TRD Technical Requirements Document
SPA Single Page Application
API Application Programming Interface
REST Representational State Transfer
JWT JSON Web Token

ORBITAL Technical Requirements Document
## Confidential — Orbital Internal Document Page 2
## Term Definition
CI/CD Continuous Integration / Continuous Deployment
CDN Content Delivery Network
SEO Search Engine Optimization
CRM Customer Relationship Management
n8n Open-source workflow automation tool used internally at Orbital


## 2. System Overview
## 2.1 Architecture Summary
Orbital follows a decoupled, layered architecture consisting of:
- A React + JavaScript as the frontend client
- A Spring Boot REST API as the backend service layer
- A PostgreSQL relational database for persistent data storage
- An SMTP / third-party email service for transactional emails
- Future integration hooks for n8n, CRM systems, and AI APIs
## 2.2 Deployment Strategy
## Layer Recommended Platform Notes
Frontend Vercel / Netlify Static hosting with global CDN, auto-
deploy from Git
Backend API Railway / Render / VPS
(Ubuntu)
Containerized Spring Boot JAR
## Database Supabase / Railway
PostgreSQL
Managed PostgreSQL with backups
Email Resend / SendGrid Transactional email delivery



ORBITAL Technical Requirements Document
## Confidential — Orbital Internal Document Page 3
## 3. Frontend Requirements
## 3.1 Technology Stack
Technology Version (Minimum) Purpose
React 18.x UI component library and rendering
JavaScript 5.x Dynamic scripting and developer experience
Tailwind CSS 3.x Utility-first CSS styling
Framer Motion 11.x Animations and page transitions
React Router 6.x Client-side routing
React Hook Form 7.x Form state management and validation
Axios / Fetch Latest HTTP client for API calls
Vite 5.x Build tool and dev server
## 3.2 Pages & Routes
## Route Page Description
/ Home Hero, services overview, portfolio highlights, process,
CTAs
/services Services Detailed service breakdown: Build, Grow, Automate
/ourWork Our Work Case studies and project showcases
/about About Company mission, vision, story, team
/contact Contact Lead gen form, Calendly embed, WhatsApp, email
/404 Not Found Custom 404 error page
## 3.3 Performance Requirements
- Lighthouse Performance Score: ≥ 90 on desktop, ≥ 80 on mobile
- Largest Contentful Paint (LCP): < 2.5 seconds
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- All images must use WebP format with lazy loading
- Code splitting enabled per route via React.lazy and Suspense
- Unused CSS purged by Tailwind in production build
3.4 SEO Requirements
- Meta title and description per page (managed via React Helmet or Vite plugin)
- Open Graph and Twitter Card meta tags on all pages
- Structured data (JSON-LD) for Organization and Service schema

ORBITAL Technical Requirements Document
## Confidential — Orbital Internal Document Page 4
- XML sitemap generated and submitted to Google Search Console
- Canonical URLs configured for all pages
- robots.txt properly configured
## 3.5 Accessibility Requirements
- WCAG 2.1 Level AA compliance
- All images must have meaningful alt text
- Keyboard navigation must work for all interactive elements
- Color contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text
- ARIA labels on icon-only buttons and form fields


- Non-Functional Requirements
## 4.1 Performance
- API response time: < 300ms for 95th percentile under normal load
- API must handle: 100 concurrent users in Phase 1, scalable to 1000+ in Phase 2
- Frontend build size: < 500KB gzipped initial bundle
- All images optimized and served from CDN
## 4.2 Availability & Reliability
- Target uptime: 99.5% (Phase 1), 99.9% (Phase 2+)
- Zero-downtime deployments via rolling deploy strategy
- API health check endpoint: GET /api/v1/health
- Automated error alerts via Sentry or equivalent
## 4.3 Scalability
- Backend stateless design — horizontally scalable with load balancer
- Database connection pool sized for concurrent load
- Static frontend deployable to global CDN edge nodes
## 4.4 Maintainability
- Backend: Clean Architecture with separation of Controller, Service, Repository layers
- Frontend: Feature-based folder structure, not type-based
- All code reviewed via pull request before merge to main
- Unit test coverage: ≥ 70% for backend service layer
- Integration tests for all public API endpoints
- ESLint + Prettier enforced on frontend; Checkstyle on backend
## 4.5 Monitoring & Observability

ORBITAL Technical Requirements Document
## Confidential — Orbital Internal Document Page 5
- Structured JSON logging on backend (Logback + SLF4J)
- Spring Boot Actuator endpoints enabled for health and metrics
- Error tracking: Sentry (frontend + backend)
- Uptime monitoring: UptimeRobot or Better Uptime


- CI/CD & DevOps
## 5.1 Version Control
- Git with GitHub as the remote repository host
- Branch strategy: main (production), develop (staging), feature/* (development)
- Commit message convention: Conventional Commits (feat:, fix:, chore:, etc.)
- Protected main branch: requires PR review + passing CI before merge
## 6. Data Privacy & Compliance
- GDPR-aligned data handling for international clients (EU users)
- Privacy Policy page required on website before launch
- Cookie consent banner for analytics scripts (Google Analytics)
- Contact form must include explicit consent checkbox: “I agree to Orbital contacting me
regarding my enquiry.”
- Lead data retained for maximum 2 years unless client relationship is active
- Right to deletion: process for handling user data removal requests
- All data transmitted over HTTPS / TLS 1.2+
- Production database access restricted to backend service IP only

