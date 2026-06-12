ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 1
ORBITAL
Systems That Orbit Your Business
Application Flow Document
Version 1.0 | June 2025
```
Classification: Confidential — Internal Use Only
```
1. Purpose & Scope
This Application Flow Document describes all user-facing and system-level flows for the Orbital
platform. It captures how users navigate the website, how data moves between the frontend and
backend, how leads are processed, and how each major feature operates end to end.
This document serves as the single source of truth for how the application behaves — for use
by designers, developers, and QA during build and testing.
1.1 Actors
Actor Description
Visitor Anonymous user browsing the Orbital public website
Lead A visitor who has submitted a contact form or booking request
Orbital Team Founders and staff receiving and managing leads internally
```
Admin Internal superuser managing Our Work, services, and content (Phase 2+)
```
```
Client An authenticated client accessing their project dashboard (Phase 2+)
```
System Automated processes: email dispatch, validation, logging, n8n webhooks
1.2 Document Conventions
Flow steps are presented as numbered step tables. Each step shows: Step number | Actor |
Action or system behaviour. Decision points are shown as [Decision] rows. Error paths are shown
with⚠ prefix.
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 2
2. Site Navigation & Page Flow
2.1 Overall Navigation Structure
```
The Orbital website is a Single Page Application (SPA) with client-side routing. All pages share
```
a persistent top navigation bar and footer.
Page Route Primary CTA Links To
Home / Get Started → /contact Services, Our Work, About,
Contact
Services /services Book a Call → /contact Contact, specific service anchors
Our Work /our-work Start a Project → /contact Individual case study modals or
pages
About /about Work With Us → /contact Contact
Contact /contact Submit Form / Book via
Calendly
WhatsApp, Email
404 /404 Go Home → / Home
```
2.2 First Visit Flow (New Visitor)
```
Step Actor Action / Description
```
1 Visitor Lands on / (Home page) via search, referral, or direct URL
```
2 System SPA loads, Framer Motion hero animation plays, page title
and meta tags render
3 Visitor Scrolls through sections: Hero → Services overview → Our
Work highlights → Process → CTA banner
4 Visitor [Decision] Clicks a navigation link or CTA button
4a Visitor Clicks ‘Services’ → React Router navigates to /services with
page transition animation
4b Visitor Clicks ‘Our Work’ → navigates to /our-work
4c Visitor Clicks ‘Get Started’ or ‘Contact’ → navigates to /contact
5 System Scroll position resets to top on each route change
6 Visitor Browses target page, eventually navigates to /contact
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 3
2.3 Return Visitor Flow
Step Actor Action / Description
1 Visitor Lands directly on /services, /our-work, or /contact via
bookmark or shared link
2 System React Router resolves the route, correct page component
mounts
3 Visitor Continues browsing and proceeds to contact flow if interested
3. Home Page Flow
3.1 Page Section Sequence
Order Section Content User Action Available
```
1 Navigation Bar Logo, nav links (Services, Our Work,
```
```
About, Contact), CTA button
```
Click any link to navigate
2 Hero Section Headline, tagline, two CTA buttons:
‘View Our Work’ and ‘Get Started’
Click CTA or scroll down
3 Services
Overview
3 service cards: Build, Grow,
Automate with short descriptions
Click ‘Learn More’ per card →
/services
4 Our Work
Highlights
3–4 featured project cards pulled from
backend or static data
Click project → modal or /our-
work
5 How We Work 4-step process: Discover, Design,
Build, Launch
Read only / scroll
6 CTA Banner Full-width dark banner: ‘Ready to
grow?’ with button to /contact
Click → /contact
7 Footer Links, social icons, copyright, privacy
policy
Click links
```
3.2 Our Work Card Click Flow (Home Page)
```
Step Actor Action / Description
1 Visitor Clicks an Our Work card on the homepage
2 System [Decision] Is the card linked to a full case study page or a
modal?
2a System If modal: overlay opens with project details, image,
description, tags, and live URL
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 4
Step Actor Action / Description
```
2b System If page link: React Router navigates to /our-work/{slug}
```
3 Visitor Reviews project details
4 Visitor Clicks ‘Start a Similar Project’ CTA → navigates to /contact
5 Visitor OR closes modal and continues browsing
4. Services Page Flow
4.1 Services Page Layout
Services are grouped into three categories displayed as tabbed or scrollable sections:
• Build — Web development services
• Grow — Branding and digital marketing services
• Automate — Automation and AI solutions
4.2 Services Data Flow
Step Actor Action / Description
1 System On /services page mount, frontend checks if services data is
available
```
2 System [Decision] Are services hardcoded (Phase 1) or fetched from
```
API?
2a System Phase 1: Services data rendered from local static config file
in frontend codebase
2b System Phase 2+: GET /api/v1/services called, loading state shown,
response populates UI
3 System Services render grouped by category: Build, Grow, Automate
4 Visitor Clicks a service category tab or scrolls to section
5 Visitor Reads service details and package tiers
6 Visitor Clicks ‘Get a Quote’ or ‘Book a Call’ button
7 System React Router navigates to /contact, optionally pre-filling
service interest query param: /contact?service=web-
development
8 System Contact form reads query param and pre-selects service
interest dropdown
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 5
5. Our Work Page Flow
5.1 Our Work Data Loading
Step Actor Action / Description
1 Visitor Navigates to /our-work
2 System Page component mounts, loading skeleton shown
3 System GET /api/v1/our-work request sent to backend
4 Backend Queries portfolio_items table where is_published = true,
ordered by display_order
5 Backend Returns JSON array of portfolio items
```
6 System Frontend renders project cards in a responsive grid (3 cols
```
```
desktop, 2 tablet, 1 mobile)
```
7 System ⚠ If API fails: error state shown with retry button, or static
fallback data used
5.2 Our Work Filtering Flow
Step Actor Action / Description
1 Visitor Clicks a filter tab: All | Web | Branding | Automation
2 System Frontend filters rendered cards client-side by category field
```
(no additional API call)
```
3 System Framer Motion animates card reorder / fade transition
4 Visitor Views filtered results
5.3 Our Work Case Study Flow
Step Actor Action / Description
1 Visitor Clicks an Our Work card
2 System [Decision] Is the item a modal or dedicated page?
2a System Modal: overlay opens with full details. URL does not change.
```
2b System Page: GET /api/v1/our-work/{slug} fetches full case study
```
```
data, page renders at /our-work/{slug}
```
3 Visitor Views: project overview, challenge, solution, technologies
used, results, images
4 Visitor Clicks ‘View Live Site’ → opens external URL in new tab
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 6
Step Actor Action / Description
5 Visitor Clicks ‘Start a Project’ CTA → /contact
6. Contact & Lead Capture Flow
This is the most critical flow in Phase 1. Every element must be tested thoroughly. A broken
contact flow directly means lost revenue.
6.1 Contact Page Layout
Component Description
Contact Form Primary lead capture: name, email, phone, service interest, message,
consent checkbox
Calendly Embed Inline booking widget for visitors who prefer to schedule a call directly
WhatsApp Button wa.me link opening a pre-filled WhatsApp message to Orbital’s number
Email Link Direct mailto: link for visitors who prefer email
Location / Timezone Optional: ‘Based in Kathmandu, Nepal | Available for global clients’
```
6.2 Contact Form Submission Flow (Happy Path)
```
Step Actor Action / Description
1 Visitor Arrives at /contact, form is blank and ready
```
2 Visitor Fills in: Full Name, Email, Phone (optional), Service Interest
```
```
(dropdown), Message
```
3 Visitor Checks consent checkbox: ‘I agree to Orbital contacting me
regarding my enquiry’
4 Visitor Clicks ‘Send Message’ button
5 Frontend React Hook Form triggers client-side validation on all fields
6 Frontend [Decision] Are all fields valid?
6a Frontend ⚠ Validation fails: inline error messages shown under each
invalid field, form not submitted
```
7 Frontend Submit button changes to loading state (spinner), button
```
disabled to prevent double submission
```
8 Frontend POST /api/v1/leads sent with JSON payload: { name, email,
```
phone, serviceInterest, message, consentGiven, source:
```
'website' }
```
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 7
Step Actor Action / Description
9 Backend Spring Boot receives request, runs @Valid annotation checks
server-side
9a Backend ⚠ Validation fails server-side: 400 Bad Request returned with
field error details
10 Backend Rate limit check: has this IP submitted more than 5 times in
the last hour?
10a Backend ⚠ Rate limit exceeded: 429 Too Many Requests returned
11 Backend Lead record inserted into leads table with created_at
timestamp
12 Backend Async: confirmation email sent to visitor’s email address
13 Backend Async: internal notification email sent to Orbital team
14 Backend 201 Created response returned to frontend
15 Frontend Success state shown: form replaced with confirmation
message and thank-you note
16 Frontend Optional: trigger Google Analytics 4 lead_generated event
6.3 Contact Form Error Flows
Step Actor Action / Description
```
E1 Frontend ⚠ Network error (no internet / API unreachable): error toast
```
```
shown: ‘Something went wrong. Please try again or contact
```
us via WhatsApp.’
E2 Backend ⚠ 500 Internal Server Error: frontend shows generic error
message, lead NOT saved, team alerted via Sentry
E3 Backend ⚠ 429 Rate limit: frontend shows message: ‘You’ve sent too
many messages. Please try again in an hour.’
E4 Backend ⚠ Email delivery fails: lead IS saved to database, error
logged, retry attempted once
6.4 Calendly Booking Flow
Step Actor Action / Description
1 Visitor Sees the Calendly embed widget on /contact page
2 Visitor Selects an available date and time slot
3 Calendly Collects visitor name and email directly within the widget
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 8
Step Actor Action / Description
4 Calendly Books the meeting and sends confirmation emails to both
visitor and Orbital team
5 System Orbital team receives Calendly email notification with meeting
details
6 System Phase 2+: Calendly webhook fires to backend, creates a lead
record automatically
6.5 WhatsApp Contact Flow
Step Actor Action / Description
1 Visitor Clicks ‘Chat on WhatsApp’ button
2 System Opens
```
wa.me/{number}?text=Hi%2C+I%27m+interested+in+Orbital%27s+services
```
in new tab
```
3 Visitor WhatsApp opens (web or app) with pre-filled message
```
4 Visitor Sends message directly to Orbital’s WhatsApp number
5 Orbital Team Responds manually via WhatsApp Business
7. Email Notification Flow
```
7.1 Lead Confirmation Email (To Visitor)
```
Step Actor Action / Description
```
1 Backend Lead successfully saved to database (step 11 of Contact
```
```
Form flow)
```
2 Backend Spring @Async email service invoked with visitor’s email and
name
3 System HTML email template rendered with: visitor name, submitted
message summary, Orbital branding
4 SMTP Email dispatched via Resend / SendGrid API
```
5 Visitor Receives email: ‘Thanks for reaching out, {name}! We’ll be in
```
touch within 24–48 hours.’
6 System ⚠ If delivery fails: error logged in backend logs and Sentry,
retry once after 60 seconds
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 9
```
7.2 Internal Lead Notification Email (To Orbital Team)
```
Step Actor Action / Description
1 Backend After lead is saved, internal notification triggered
asynchronously
```
2 System HTML email rendered with: full lead details (name, email,
```
```
phone, service interest, message, timestamp, source IP)
```
3 SMTP Email sent to Orbital team’s internal email address
4 Orbital Team Receives notification, reviews lead, follows up within SLA
window
5 System Phase 2+: lead also pushed to CRM via n8n webhook
simultaneously
8. Our Work Management Flow (Internal)
Phase 1: Our Work items are managed directly in the database or via seed scripts. Phase 2+: An
admin panel will allow the team to manage Our Work items through a UI.
8.1 Phase 1 — Adding an Our Work Item
Step Actor Action / Description
1 Orbital Team Completes a client project and decides to showcase it
2 Developer Prepares project data: title, slug, description, category, tags,
image URLs, live URL
```
3 Developer Uploads project images to CDN or static hosting (Cloudflare
```
```
R2 / Vercel public folder)
```
4 Developer Runs SQL INSERT or a seed script to add the portfolio_items
record to the database
```
5 System New item appears on /our-work immediately (no cache
```
```
invalidation needed in Phase 1)
```
8.2 Phase 2+ — Admin Panel Our Work Flow
Step Actor Action / Description
```
1 Admin Logs into Orbital admin panel at /admin (JWT-authenticated)
```
2 Admin Navigates to Our Work → Add New Item
```
3 Admin Fills in: title, slug (auto-generated), description, category,
```
tags, upload images, live URL, featured flag
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 10
Step Actor Action / Description
4 Admin Clicks ‘Save as Draft’ or ‘Publish’
5 Backend POST /api/v1/admin/our-work validates and persists the
record
6 System If published: item appears on /our-work immediately
7 Admin Can edit or unpublish any item via PATCH /api/v1/admin/our-
```
work/{id}
```
9. Automation & Webhook Flow (Phase 2+)
These flows are planned for Phase 2 when n8n is deployed. The backend must expose webhook
endpoints to support these flows even if n8n is not yet active.
9.1 Lead-to-CRM Automation Flow
Step Actor Action / Description
```
1 Backend New lead saved to database (contact form submission)
```
2 Backend POST request sent to n8n webhook endpoint with lead
payload
3 n8n Webhook received, workflow triggered
```
4 n8n Lead data mapped to CRM fields (HubSpot / Notion / custom
```
```
CRM)
```
5 n8n New contact created or updated in CRM
6 n8n Optional: Slack / Discord notification sent to team channel
with lead summary
7 n8n Optional: lead added to email drip campaign sequence
8 n8n Workflow completion logged
9.2 Follow-Up Email Sequence Flow
Step Actor Action / Description
1 n8n Triggered 24 hours after lead is created with no CRM status
update
2 n8n Checks CRM: has this lead been contacted or marked as in-
progress?
3 n8n [Decision] Has the lead been actioned?
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 11
Step Actor Action / Description
3a n8n Yes: workflow ends, no email sent
3b n8n No: follow-up email sent to lead via SMTP: ‘Just checking in
— we’d love to connect’
4 n8n Reminder notification sent to Orbital team Slack channel
5 n8n Workflow waits 48 more hours, then repeats check once
10. Error & Edge Case Flows
10.1 404 Not Found
Step Actor Action / Description
1 Visitor Navigates to a URL that does not match any defined route
2 React Router Catches unmatched route, renders 404 page component
3 System Page displays: Orbital branded 404 illustration, friendly
message, ‘Go Home’ button
4 Visitor Clicks ‘Go Home’ → navigates to /
```
10.2 API Unavailable (Backend Down)
```
Step Actor Action / Description
```
1 Visitor Navigates to /our-work or /services (data-fetching pages)
```
2 Frontend API request times out or returns network error after 5
seconds
3 Frontend Error boundary catches the failure, renders fallback UI
4 System Fallback: static placeholder data shown OR friendly error
message with retry button
5 System Error logged to Sentry with full context
```
6 Visitor Contact page and static pages remain fully functional (no API
```
```
dependency)
```
10.3 Slow Network / Loading States
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 12
Scenario Loading Behaviour
Our Work page loading Skeleton card grid shown while GET /api/v1/our-work is in flight
Contact form submitting Submit button disabled, spinner shown, form fields locked
Page route transition Framer Motion fade transition plays, new page mounts when
ready
Images loading Lazy load with blur placeholder until fully loaded
11. Analytics Event Flow
Google Analytics 4 tracks the following key events to measure lead funnel performance:
GA4 Event Name Trigger Key Parameters
page_view Every route change in SPA page_title, page_path
service_view User views a specific
service section
service_category, service_name
our_work_click User clicks an Our Work
card
project_title, project_category
cta_click User clicks any CTA button cta_label, cta_location, destination
contact_start User begins filling the
```
contact form (first field
```
```
focused)
```
source_page
lead_generated Contact form successfully
```
submitted (201 response
```
```
received)
```
service_interest, source
calendly_open Calendly embed becomes
visible / interaction begins
—
whatsapp_click WhatsApp button clicked —
12. Phase 2+ Client Portal Flows (Preview)
These flows are out of scope for Phase 1 but documented here to ensure the architecture
supports them without major rework.
12.1 Client Login Flow
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 13
Step Actor Action / Description
1 Client Navigates to /login
2 Client Enters email and password, clicks ‘Sign In’
3 Frontend POST /api/v1/auth/login with credentials
4 Backend Validates credentials, returns JWT access token + refresh
token
```
5 Frontend Stores JWT in memory (not localStorage), refresh token in
```
HTTP-only cookie
6 Frontend Redirects client to /dashboard
12.2 Project Dashboard Flow
Step Actor Action / Description
1 Client Lands on /dashboard after login
```
2 Frontend GET /api/v1/client/projects (authenticated, JWT in
```
```
Authorization header)
```
3 Backend Returns projects associated with this client’s account
4 Client Views project list with status indicators: Scoping, In Progress,
Review, Delivered
5 Client Clicks a project to view milestones, deliverables, and file
downloads
6 Client Downloads a deliverable → backend returns a signed URL
from cloud storage
12.3 Invoice Flow
Step Actor Action / Description
1 Orbital Team Generates invoice via admin panel, links to client account
2 System Client receives email notification: ‘Invoice #001 is ready’
3 Client Logs into /dashboard → navigates to Invoices tab
4 Client Views invoice details: services, amount, due date
5 Client Clicks ‘Pay Now’ → redirected to Stripe / Khalti payment
page
6 Payment Gateway Processes payment, fires webhook to backend on success
7 Backend Marks invoice as paid, updates database, sends receipt email
ORBITAL Application Flow Document
Confidential — Orbital Internal Document Page 14
13. Document Revision History
Version Date Author Changes
1.0 June 2025 Orbital Founding Team Initial Application Flow Document created
— End of Document —