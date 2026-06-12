ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 1
ORBITAL
Systems That Orbit Your Business
UI/UX Design Brief
Version 1.0 | June 2025
```
Classification: Confidential — Internal Use Only
```
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 2
1. Brief Overview
This UI/UX Design Brief defines the visual language, interaction design principles, component
specifications, and page-by-page design direction for the Orbital website. It serves as the single
source of truth for all design decisions, ensuring consistency across every screen and
interaction.
Every design choice made for Orbital must answer one question: does this make the product
feel like a premium, modern, technology-driven company — or does it feel generic? If the
answer is generic, rethink it.
1.1 Design Objectives
• Communicate Orbital's positioning as a digital growth and automation agency, not a
freelance web studio
• Build immediate trust and credibility with first-time visitors within the first 5 seconds
• Guide visitors along a clear conversion funnel from awareness to contact
• Deliver a premium, space-inspired aesthetic that stands out in the Nepal and
international markets
• Ensure full functionality and visual quality across all device sizes
1.2 Design Principles
Principle What It Means in Practice
Premium First Every element should feel considered and deliberate. No clipart, no stock-
feeling icons, no default shadows.
Dark & Purposeful The dark theme is the identity. Light sections should be used sparingly, as
contrast moments, not as defaults.
Motion With Meaning Every animation should serve a purpose: guiding attention, communicating
state, or reinforcing the brand. No animation for animation's sake.
Conversion-Aware Every page section has a job. Design must support that job — a CTA must
be unmissable, a service card must sell the service.
Scalable System Every component must be designed as a reusable system, not a one-off.
The design system must scale as Orbital grows.
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 3
2. Brand Identity
2.1 Brand Personality
Orbital should feel like the intersection of a premium SaaS startup and a boutique creative
technology studio. The brand is confident without being arrogant, futuristic without being cold,
and intelligent without being inaccessible.
Attribute Design Expression
Premium Generous whitespace, sharp typography, restrained use of colour, high-
quality imagery
Futuristic Space-inspired palette, subtle glows, geometric forms, motion design
Intelligent Clean information hierarchy, purposeful data visualisation, no noise
Trustworthy Consistent system, professional typography, clear messaging, no gimmicks
Growth-Oriented Forward-moving layouts, upward visual flow, strong CTAs, results-focused
copy
2.2 What to Avoid
• Generic blue-and-white corporate website layouts
```
• Overuse of gradients (maximum 2–3 gradient uses per page)
```
• Bright, neon-heavy colour usage that feels cheap
• Stock photography of people shaking hands or staring at laptops
• Cluttered layouts with too many competing elements
• Comic Sans, Papyrus, or any non-web-optimised font
• Rounded corners on everything — use geometry intentionally
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 4
3. Colour System
3.1 Primary Palette
These five colours form the entire Orbital brand palette. No additional colours should be
introduced without explicit design review.
Deep Space Black
#050A14
Primary page background. Used on 80%+ of all surfaces.
Midnight Blue
#0D1F3C
Secondary background for cards, sections, modals, and
elevated surfaces.
Orbital Blue
#1B6FE8
Primary brand colour. Used for primary CTAs, active states,
links, and key highlights.
Electric Cyan
#38D9F5
Accent colour. Used for hover states, badges, icon highlights,
and secondary accents. Use sparingly.
Soft White
#F0F4FF
Primary text colour on dark backgrounds. Also used for
headings and body copy.
3.2 Extended Palette
Token Hex Usage
surface/card #0F1E38 Slightly lighter card surfaces within dark sections
border/subtle #1A2E50 Subtle borders on cards, dividers, and input fields
```
border/accent #1B6FE8 Highlighted borders (focused input fields, active nav items)
```
text/muted #8899BB Secondary body text, captions, metadata, placeholder text
text/disabled #4A5568 Disabled form fields, inactive states
success #22C55E Success states, completed steps, positive indicators
error #EF4444 Error states, validation failures, destructive actions
warning #F59E0B Warning states, cautionary alerts
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 5
3.3 Gradient Definitions
Gradient Name Definition Usage
```
Hero Gradient linear-gradient(135deg, #050A14 0%,
```
```
#0D1F3C 50%, #050A14 100%)
```
Hero section background
```
Brand Glow radial-gradient(ellipse at center,
```
```
rgba(27,111,232,0.15) 0%, transparent
```
```
70%)
```
Behind hero headline or key CTA
sections
```
Cyan Accent linear-gradient(90deg, #1B6FE8,
```
```
#38D9F5)
```
Accent lines, badge backgrounds,
active underlines
```
Card Shimmer linear-gradient(135deg, #0D1F3C 0%,
```
```
#0F1E38 100%)
```
Service and portfolio card
backgrounds
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 6
4. Typography System
4.1 Font Families
Role Font Weights Used Source
Primary /
Display
Inter 400, 500, 600, 700,
800
Google Fonts
Monospace /
Code
```
JetBrains Mono 400, 500 Google Fonts (use sparingly for
```
```
tech labels)
```
Fallback Stack system-ui, -apple-
system, sans-serif
— System fallback
Do not use more than two font families on the website. Inter handles all headings, body, and UI
text. JetBrains Mono is used only for code snippets, terminal-style labels, or tech badges.
4.2 Type Scale
Style Name Size Weight Line
Height
Usage
Display XL 72–
80px
800 1.1 Hero headline only
Display L 56–
64px
700–
800
1.15 Section hero headlines
Heading 1 40–
48px
```
700 1.2 Page-level headings (H1)
```
Heading 2 32–
36px
600–
700
```
1.25 Section headings (H2)
```
Heading 3 24–
28px
```
600 1.3 Sub-section headings (H3)
```
Heading 4 20–
22px
600 1.35 Card titles, widget headings
Body L 18–
20px
400 1.7 Lead paragraphs, feature descriptions
Body 16–
17px
400 1.65 Standard body copy
Body S 14–
15px
400 1.6 Captions, metadata, helper text
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 7
Style Name Size Weight Line
Height
Usage
Label 12–
13px
500–
600
1.4 Tags, badges, nav items, overlines
Mono 13–
14px
400–
500
1.5 Code labels, tech badges, CLI text
4.3 Typography Rules
```
• Headlines on dark backgrounds: Soft White (#F0F4FF)
```
• Body copy on dark backgrounds: #B0C0DD or Soft White at 85% opacity
```
• Never use pure white (#FFFFFF) for body text — it is too harsh on dark backgrounds
```
• Optical kerning enabled on all display text
• Maximum line length: 70 characters for body copy, 55 for lead paragraphs
```
• Text alignment: left-aligned for body copy; centred only for hero and CTA sections
```
```
• Letter spacing: +0.02em on labels and badges; -0.02em to -0.03em on Display XL
```
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 8
5. Spacing & Layout System
5.1 Spacing Scale
```
All spacing uses a 4px base unit (Tailwind CSS default scale). The following values are the
```
canonical spacing tokens:
Token Value Usage
space-1 4px Micro gaps: icon-to-label, inline element spacing
space-2 8px Tight gaps: between related elements within a component
```
space-3 12px Component internal padding (compact)
```
```
space-4 16px Component internal padding (standard)
```
space-6 24px Between components within a section
space-8 32px Section sub-group separation
space-12 48px Between major content blocks within a section
```
space-16 64px Section top/bottom padding (mobile)
```
```
space-20 80px Section top/bottom padding (tablet)
```
```
space-24 96px Section top/bottom padding (desktop)
```
space-32 128px Hero section padding, major section separation
5.2 Layout Grid
• Grid system: 12-column CSS Grid
```
• Content max-width: 1280px (centred with auto margins)
```
```
• Column gutter: 24px (desktop), 16px (tablet), 16px (mobile)
```
```
• Outer page padding: 24px (mobile), 40px (tablet), 80px (desktop)
```
```
• Full-bleed sections (hero, CTA banner) extend to viewport width; content inside still
```
constrained to 1280px
5.3 Responsive Breakpoints
Breakpoint Min Width Columns Notes
```
xs (mobile) 320px 1–2 Single column, stacked layout
```
```
sm (mobile L) 480px 2 Two-column grids for cards
```
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 9
Breakpoint Min Width Columns Notes
```
md (tablet) 768px 6 Nav collapses to hamburger below this
```
```
lg (desktop) 1024px 12 Full layout unlocked
```
```
xl (wide) 1280px 12 Max content width capped at 1280px
```
```
2xl (ultrawide) 1536px+ 12 Same as xl; margins grow, content does not
```
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 10
6. Core Component Specifications
All components should be built as reusable React components. Each component must support
dark theme as default. Light variants are secondary.
6.1 Buttons
Primary Button
Main conversion action. Used for primary CTAs like Get Started, Send Message, Book a Call.
```
• Background: Orbital Blue (#1B6FE8)
```
• Text: Soft White, 15px, weight 600
• Border radius: 8px
• Padding: 14px 28px
```
• Hover: background lightens 8%, subtle box-shadow: 0 0 24px rgba(27,111,232,0.4)
```
```
• Active: background darkens 5%, scale(0.98)
```
• Disabled: opacity 40%, cursor not-allowed
• Transition: all 0.2s ease
Secondary Button
Secondary actions. Used for Learn More, View Our Work, See All Projects.
• Background: transparent
• Border: 1.5px solid #1B6FE8
• Text: Orbital Blue, 15px, weight 600
• Border radius: 8px
• Padding: 13px 27px
```
• Hover: background rgba(27,111,232,0.1), border colour brightens
```
• Transition: all 0.2s ease
Ghost Button
Tertiary actions, navigation elements, inline actions.
• Background: transparent
• Border: none
• Text: Soft White at 70% opacity, 15px, weight 500
• Padding: 10px 16px
```
• Hover: text opacity 100%, background rgba(255,255,255,0.05)
```
• Underline optional for inline ghost buttons
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 11
6.2 Navigation Bar
Top Navigation
Persistent navigation present on all pages. Fixed position on scroll.
```
• Background: rgba(5,10,20,0.85) with backdrop-filter: blur(12px) on scroll
```
• Height: 72px desktop, 64px mobile
• Logo: left-aligned, Orbital wordmark in Orbital Blue
• Nav links: centre or right-aligned, 15px, weight 500, Soft White at 80% opacity
• Active nav link: Orbital Blue colour, Cyan underline accent
• Hover: Soft White at 100% opacity
• CTA button: Primary Button, right-aligned
• Mobile: hamburger icon at 768px and below, full-screen slide-in menu
6.3 Cards
Service Card
```
Displays a single service category (Build, Grow, Automate) or individual service.
```
```
• Background: Midnight Blue (#0D1F3C)
```
• Border: 1px solid #1A2E50
• Border radius: 12px
• Padding: 32px
• Icon: 40x40px, Electric Cyan tint
• Title: Heading 4 size, Soft White, weight 600
```
• Description: Body size, muted text (#8899BB)
```
```
• Hover: border-colour transitions to Orbital Blue, subtle upward translate(-2px), box-shadow:
```
```
0 8px 32px rgba(27,111,232,0.15)
```
• Transition: all 0.25s ease
Our Work Card
Displays a project in the Our Work grid. Supports hover reveal overlay.
• Background: cover image fills card
• Aspect ratio: 16:9 or 4:3 depending on image
• Border radius: 12px, overflow hidden
• Default state: image shown, category badge top-left
```
• Hover state: dark overlay (rgba(5,10,20,0.85)) fades in over image
```
• Hover reveals: project title, short description, and arrow CTA
• Category badge: Label size, Cyan gradient background, 6px border radius
• Transition: overlay opacity 0.3s ease, content translateY from 8px to 0
Testimonial Card
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 12
Displays a client quote. Used in a horizontal scroll or grid layout.
```
• Background: surface/card (#0F1E38)
```
• Border: 1px solid #1A2E50
• Border-left: 4px solid Orbital Blue
• Border radius: 12px
• Padding: 28px 32px
• Quote mark: Display L size, Orbital Blue, opacity 30%, positioned top-left
• Quote text: Body L size, Soft White
• Author name: Label size, Soft White, weight 600
• Author title: Label size, muted text
6.4 Form Elements
Text Input / Textarea
Used on the Contact page form.
```
• Background: rgba(13,31,60,0.6)
```
• Border: 1.5px solid #1A2E50
• Border radius: 8px
• Padding: 14px 18px
• Text: Body size, Soft White
```
• Placeholder: muted text (#8899BB)
```
```
• Focus: border-colour Orbital Blue, box-shadow: 0 0 0 3px rgba(27,111,232,0.2)
```
• Error state: border-colour #EF4444, error message below in red
• Transition: border-colour 0.15s ease, box-shadow 0.15s ease
• Textarea: min-height 140px, resize vertical only
Select / Dropdown
Service interest selector on the Contact form.
• Same base styles as Text Input
• Custom arrow icon: Electric Cyan chevron, right-aligned
• Options dropdown: Midnight Blue background, Soft White text
• Selected option: Orbital Blue text
```
• Hover on option: rgba(27,111,232,0.1) background
```
Checkbox
Consent checkbox on Contact form.
• Size: 20x20px
• Unchecked: border 2px solid #1A2E50, transparent background
• Checked: Orbital Blue background, white checkmark icon
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 13
```
• Focus: box-shadow: 0 0 0 3px rgba(27,111,232,0.2)
```
• Label: Body S size, muted text, inline with checkbox
6.5 Badges & Tags
Category Badge
Used on Our Work cards and service labels.
```
• Background: rgba(56,217,245,0.12)
```
```
• Border: 1px solid rgba(56,217,245,0.3)
```
```
• Text: Electric Cyan (#38D9F5), Label size, weight 600
```
• Border radius: 6px
• Padding: 4px 12px
Tech Tag
Used to display technology stack on Our Work case studies.
```
• Background: rgba(27,111,232,0.1)
```
```
• Border: 1px solid rgba(27,111,232,0.25)
```
• Text: Orbital Blue, 12px, JetBrains Mono, weight 500
• Border radius: 4px
• Padding: 3px 10px
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 14
7. Page-by-Page Design Direction
7.1 Home Page
Hero Section
```
• Full-viewport height (100vh) on desktop, minimum 90vh on mobile
```
• Background: deep space black with subtle animated particle field or star-field effect
```
(canvas or CSS)
```
• Brand glow radial gradient centred behind headline
• Eyebrow text above headline: small Cyan label, e.g. 'Digital Growth & Automation
Agency'
• Headline: Display XL, Soft White, two lines maximum. Example: 'Systems That Help
Your Business Grow.'
• Sub-headline: Body L, muted text, one to two sentences maximum
```
• Two CTA buttons side by side: Primary (Get Started) and Ghost (View Our Work)
```
• Scroll indicator: subtle animated chevron or dot at bottom of hero
• Framer Motion: headline words animate in with staggered fade-up on mount
Services Overview Section
• Section heading: 'What We Do' or 'How We Help You Grow'
```
• Three service cards side by side on desktop (grid), stacked on mobile
```
```
• Cards: Build (web icon), Grow (chart icon), Automate (workflow icon)
```
• Each card: title, 2-3 sentence description, icon, and 'Learn More' ghost link
• Background: slight offset from hero — use Deep Space Black with a faint Midnight Blue
gradient overlay
Our Work Highlights Section
• Section heading: 'Our Work'
• 3-4 featured project cards in a masonry or uniform grid
• 'View All Work' secondary button below grid, centred
• Background: Midnight Blue section to create contrast from services section
How We Work Section
• Four-step horizontal process: Discover → Design → Build → Launch
• Desktop: horizontal stepper with connecting line in Orbital Blue
• Mobile: vertical stepper
• Each step: step number in Cyan, step title in Soft White, short description in muted text
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 15
CTA Banner Section
• Full-width dark section with Brand Glow effect
• Large headline: 'Ready to build something great?'
• Single Primary Button: 'Start a Project'
• Background: Deep Space with subtle animated gradient or noise texture
7.2 Services Page
• Page hero: smaller than home hero, 50–60vh, with page title and sub-headline
• Three tabbed or anchor-scrollable sections: Build | Grow | Automate
• Each category: category label in Cyan, heading, description paragraph, then a grid of
individual service cards
• Each service card shows: service name, short description, and key deliverables as a
short bullet list
```
• Pricing packages (if included): displayed as a 3-column comparison table per category
```
• Sticky category tab bar that updates active state as user scrolls
• Page ends with full-width CTA banner: 'Not sure which service you need? Let’s talk.'
7.3 Our Work Page
• Page hero: 40vh, title 'Our Work', short descriptor
• Filter tabs below hero: All | Web | Branding | Automation
• Project grid: 3 columns desktop, 2 tablet, 1 mobile
• Card hover: overlay reveals title, category badge, short description, and arrow
• Framer Motion: cards animate in with staggered fade when filter changes
• Empty state: if no projects in a category, friendly message with link to Contact
```
• Case study page (/our-work/{slug}): full-width cover image, project overview, challenge,
```
solution, result, tech tags, live site button
7.4 About Page
• Hero: 50vh, headline 'We Build Digital Systems That Work.'
• Mission & Vision: two-column layout, short punchy paragraphs
• Story section: narrative paragraph about why Orbital was founded
```
• Values: 3-4 value cards (similar style to service cards)
```
• Team section: photo grid with name, role, and one-line bio per person
```
• Team photos: consistent style (dark background, professional, not stock)
```
• Page ends with CTA: 'Work With Us'
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 16
7.5 Contact Page
• Two-column layout on desktop: left column = contact form, right column = alternative
contact options
• Left column: form with name, email, phone, service interest dropdown, message
textarea, consent checkbox, submit button
```
• Right column: Calendly embed (full widget), WhatsApp CTA button, email link,
```
location/timezone note
• Mobile: single column, form on top, alternatives below
• Success state: form replaced by confirmation card with Orbital Blue border and thank-
you message
• Error states: inline field errors, toast notification for server errors
• Background: Deep Space Black with subtle form panel in Midnight Blue
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 17
8. Motion & Animation Design
8.1 Animation Principles
• Purpose over decoration: every animation must serve a UX purpose
• Duration: 200–400ms for micro-interactions, 400–700ms for page transitions and section
reveals
• Easing: ease-out for entering elements, ease-in for exiting elements, ease-in-out for
state changes
```
• Stagger: 60–80ms between staggered child elements (card grids, list items)
```
• Respect prefers-reduced-motion: all animations must be disabled when the OS setting is
active
8.2 Animation Catalogue
Animation Trigger Duration Behaviour
Hero text reveal Page mount 600ms Words stagger fade-up, 80ms between
each word
Section reveal Scroll into view
```
(useInView)
```
500ms Section fades in and slides up 20px
Card entrance Scroll into view
```
(staggered)
```
400ms Cards stagger fade-up, 60ms between
each card
Filter transition Filter tab click 300ms Cards fade out, reorder, fade back in via
AnimatePresence
Page transition React Router
route change
300ms Fade out current page, fade in new page
Button hover Mouse enter/leave 200ms Background brightens, shadow appears
```
Card hover Mouse enter/leave 250ms translateY(-2px), shadow strengthens
```
Our Work card
overlay
Mouse enter/leave 300ms Dark overlay fades in, content slides up
Form success Submit 201
response
400ms Form fades out, success card fades in
Nav scroll Page scrollY >
20px
200ms Nav background transitions to blur-glass
style
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 18
9. Iconography & Imagery
9.1 Icons
```
• Icon library: Lucide Icons (open source, consistent stroke weight, React-ready)
```
```
• Default icon size: 20px (UI elements), 24px (feature icons), 40px (service card icons)
```
• Stroke width: 1.5px — do not use filled icons
• Icon colour: Soft White for UI icons, Electric Cyan for feature/service icons, Orbital Blue
for interactive icons
• Never use multiple icon styles in the same context — consistency is critical
9.2 Illustrations & Graphics
• Orbital may use custom geometric or space-themed SVG illustrations as hero or section
accents
• Illustration style: abstract, geometric, tech-inspired. Not cartoon or flat illustration style.
• Suggested use: subtle grid patterns, orbital ring graphics, constellation-style connecting
lines
• All decorative graphics must be SVG for resolution independence
9.3 Photography Guidelines
• Avoid generic stock photography of people in offices
• If people are used: candid, real team members only
```
• Project screenshots: clean, high-resolution, shown in device mockups (dark-themed
```
```
MacBook or browser frame)
```
• All images must be exported as WebP at 2x resolution for retina screens
• Image optimisation: compress to < 200KB per image before upload
• Lazy load all images below the fold
ORBITAL UI/UX Design Brief
Confidential — Orbital Internal Document Page 19
10. Accessibility Requirements
Requirement Standard Implementation
```
Colour contrast (text) WCAG AA
```
```
(4.5:1 minimum)
```
Soft White on Deep Space passes at 15:1. Verify all
colour combinations.
```
Colour contrast (large
```
```
text)
```
```
WCAG AA (3:1
```
```
minimum)
```
Check all heading and display text combinations
Keyboard navigation Full tab order All interactive elements reachable by Tab key, logical
order
Focus indicators Visible on all
elements
Custom focus ring: 2px Orbital Blue outline, 2px offset
Images Alt text on all
images
Decorative images: alt empty string. Informative:
descriptive alt.
Form labels All inputs
labelled
HTML label elements linked to inputs via htmlFor/id
pair
Error messages Descriptive and
accessible
Error messages associated with fields via aria-
describedby
Motion prefers-reduced-
motion
All Framer Motion animations wrapped in
useReducedMotion hook
Screen reader Semantic HTML Use correct heading hierarchy, landmark roles, aria-
labels on icons
— End of Document —