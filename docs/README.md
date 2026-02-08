# Content Creator Copilot - UI Mockups

Complete UI mockup collection for the Content Creator Copilot SaaS platform. This is a production-grade multi-tenant SaaS application designed to help creators generate short-form and long-form content with AI.

## 🎯 Product Overview

**Purpose**: A SaaS platform that transforms content ideas into complete video packages through an AI-powered workflow:

```
Idea → Style Profile → Content Plan → Voiceover (TTS) → Transcription (Whisper) → Captions (SRT/VTT) → Export Pack
```

## 📁 Mockup Structure

```
mockups/
├── README.md (this file)
├── assets/
│   └── css/
│       └── styles.css (shared design system)
│
├── Authentication Flow
│   ├── login.html
│   ├── signup.html
│   └── forgot-password.html
│
├── Onboarding Wizard (5 steps)
│   ├── onboarding-step1.html (Choose platforms)
│   ├── onboarding-step2.html (Creator profile)
│   ├── onboarding-step3.html (Sample content)
│   ├── onboarding-step4.html (Style card review)
│   └── onboarding-step5.html (First project)
│
├── Main Application
│   ├── dashboard.html (Home dashboard)
│   ├── projects.html (Project library)
│   ├── project-workspace.html (Core editing UI)
│   ├── team.html (Team management)
│   ├── billing.html (Plans & usage)
│   ├── analytics.html (Usage analytics)
│   └── settings.html (Account settings)
│
└── Internal Tools
    └── admin-console.html (Admin dashboard)
```

## 🚀 Quick Start

1. **View the mockups**: Open any HTML file in your browser
2. **Start with authentication**: `login.html` or `signup.html`
3. **See onboarding flow**: `onboarding-step1.html` → ... → `onboarding-step5.html`
4. **Explore main app**: `dashboard.html` (best starting point)

## 📄 Page Descriptions

### Authentication & Onboarding

#### **login.html**
- Email/password authentication
- Google OAuth option
- Remember me & forgot password
- Links to signup

#### **signup.html**
- Create new account
- Optional organization setup
- Email verification
- Terms & privacy agreement

#### **forgot-password.html**
- Password reset flow
- Email verification
- Success message

#### **onboarding-step1.html**
- Platform selection (Reels, Shorts, YouTube, TikTok, LinkedIn, Twitter)
- Multi-select cards
- Progress indicator (20%)

#### **onboarding-step2.html**
- Content niche selection
- Target audience input
- Tone selection (Professional, Casual, Energetic, etc.)
- Language preferences
- Progress indicator (40%)

#### **onboarding-step3.html**
- Three methods to provide samples:
  1. Paste video/post links
  2. Upload transcript files
  3. Enter text directly
- Tab-based interface
- Progress indicator (60%)

#### **onboarding-step4.html**
- AI-generated Style Card review
- Editable fields:
  - Speaking tone
  - Content pacing
  - Hook style
  - CTA pattern
  - Vocabulary level
  - Signature phrases
  - Forbidden words
  - Content structure
- Regenerate option
- Progress indicator (80%)

#### **onboarding-step5.html**
- Create first project
- Content idea input
- Platform & duration selection
- Keywords (optional)
- Voiceover & captions toggles
- Free trial info
- Progress indicator (100%)

### Main Application

#### **dashboard.html** ⭐ Start Here
- Overview statistics (projects, videos, duration, exports)
- Recent projects table
- Quick action cards
- Trial banner with upgrade CTA
- Full navigation sidebar
- Workspace switcher
- Usage meter

#### **projects.html**
- Grid view of all projects
- Filters: platform, status, date
- Search functionality
- Project cards with:
  - Thumbnail/preview
  - Status badge (Completed, In Progress, Failed, Draft)
  - Platform badge
  - Duration & metadata
  - Quick actions
- Pagination
- Empty states

#### **project-workspace.html** ⭐ Core Feature
Multi-tab interface for editing projects:

**Tabs:**
1. **Brief** - Project details, constraints, generation timeline
2. **Style Card** - Editable style settings (hidden by default)
3. **Script** - Generated script with timestamps
4. **Voiceover** - Audio player, voice selection, regeneration
5. **Transcript** - Whisper-generated transcript (hidden by default)
6. **Captions** - SRT/VTT editor with preview, style options
7. **Scenes & Prompts** - Shot list and visual prompts (hidden by default)
8. **Exports** - Download individual files or complete pack

**Features:**
- Job timeline with step-by-step progress
- Regeneration options (with downstream impact warnings)
- Permission-gated actions (based on RBAC)
- Version history
- Comments & collaboration

#### **team.html**
- Team members list with roles
- RBAC: Owner, Admin, Editor, Viewer
- Invite member modal
- Pending invitations tab
- Audit log tab (placeholder)
- Role descriptions
- Seat usage warnings

#### **billing.html**
- Current plan overview
- Usage meters (projects, seats, TTS, Whisper)
- Pricing cards for 4 plans:
  - **Free Trial**: 3 projects, 3 seats
  - **Creator**: $29/mo - Unlimited projects, 5 seats
  - **Team**: $79/mo - Unlimited projects, 15 seats
  - **Enterprise**: Custom pricing
- Payment method management
- Billing history
- FAQ section

#### **analytics.html**
- Key metrics dashboard
- Projects created chart
- Platform distribution
- Resource usage (TTS, Whisper, Storage)
- Top exported projects
- Team activity breakdown
- Date range filter
- Export report option

#### **settings.html**
Multi-tab settings interface:

**Tabs:**
1. **Profile** - Name, email, avatar, timezone
2. **Workspace** - Workspace name & URL
3. **Brand Kit** - Tone, forbidden words, content constraints
4. **API Keys** - BYOK for Enterprise (OpenAI API key)
5. **Data & Privacy** - Data retention, export, deletion

**Additional Sections:**
- Change password
- Email notifications preferences
- Danger zone (delete workspace/account)

### Internal Tools

#### **admin-console.html** (Internal Only)
- System overview statistics
- Quick lookup (org, user, job)
- Recent jobs table with debugging
- Usage anomalies & abuse flags
- System health metrics
- Support ticket queue
- Dark sidebar theme
- Elevated admin privileges

## 🎨 Design System

All mockups use a consistent design system defined in `assets/css/styles.css`:

### Color Palette
- **Primary**: Blue (#0ea5e9)
- **Success**: Green (#22c55e)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Neutral**: Gray scale

### Components
- Buttons: Primary, Secondary, Outline, Danger, Success
- Forms: Inputs, Selects, Textareas, Checkboxes, Radio buttons
- Cards: Header, Body, Footer
- Tables: Sortable headers, hover states
- Badges: Status indicators
- Alerts: Info, Success, Warning, Danger
- Modals: Overlay, Header, Body, Footer
- Tabs: Navigation tabs
- Progress bars: Usage meters, loading states
- Empty states: No data placeholders

### Layout
- Sidebar: 260px fixed width
- Top bar: 64px height
- Responsive breakpoints
- Grid system (2, 3, 4 columns)

## 🔐 SaaS Features Demonstrated

### Multi-tenancy
- Organization/workspace switcher
- Isolated data per workspace
- Team member management

### Authentication & Authorization
- Email/password + OAuth
- RBAC (Owner, Admin, Editor, Viewer)
- Permission-gated UI elements
- Invitation flow

### Billing & Plans
- Tiered pricing (Trial, Creator, Team, Enterprise)
- Usage metering & quotas
- Seat management
- Upgrade prompts
- Trial countdown

### Usage Tracking
- Projects, TTS characters, Whisper minutes
- Visual usage meters
- Quota warnings
- Per-organization limits

### Collaboration
- Team members with roles
- Project ownership
- Comments (UI placeholder)
- Audit logs (UI placeholder)

### Workflow & Jobs
- Async job processing
- Step-by-step timeline
- Retry & regeneration
- Cancellation
- Error handling
- Progress tracking

### Data Management
- Export pack (ZIP download)
- Individual file downloads
- Data retention settings
- Account/workspace deletion

### Admin Tooling
- Internal admin console
- Search org/user/job
- Debug job timeline
- Usage anomalies
- Abuse detection
- System health monitoring

## 🎯 User Flows

### New User Journey
1. `signup.html` - Create account
2. `onboarding-step1.html` - Choose platforms
3. `onboarding-step2.html` - Define profile
4. `onboarding-step3.html` - Provide samples
5. `onboarding-step4.html` - Review style card
6. `onboarding-step5.html` - Create first project
7. `dashboard.html` - View dashboard
8. `project-workspace.html` - Edit generated content

### Content Creation Flow
1. `dashboard.html` or `projects.html` - Click "New Project"
2. Enter brief (idea, platform, duration)
3. Wait for AI generation (timeline shown)
4. `project-workspace.html` - Review & edit:
   - Script
   - Voiceover
   - Captions
   - Scenes
5. Export pack (ZIP download)

### Team Management Flow
1. `team.html` - View members
2. Click "Invite Member"
3. Enter email & role
4. Send invitation
5. Member receives email → accepts → joins workspace

### Upgrade Flow
1. `dashboard.html` - See trial banner
2. Click "Upgrade"
3. `billing.html` - View plans
4. Select plan (e.g., Creator $29/mo)
5. Add payment method
6. Confirm subscription

## 🔧 Technical Implementation Notes

### Frontend Stack Recommendation
- **Framework**: React or Next.js
- **State Management**: Zustand or Redux Toolkit
- **Styling**: Tailwind CSS (design system already CSS-ready)
- **Forms**: React Hook Form + Zod validation
- **API Client**: TanStack Query (React Query)
- **Real-time**: WebSocket or SSE for job progress

### Backend Requirements
- **Auth**: JWT + OAuth (Google)
- **Database**: PostgreSQL with row-level security
- **Storage**: S3-compatible (artifacts, exports)
- **Queue**: Bull/BullMQ (Redis) for jobs
- **AI APIs**: OpenAI (TTS, Whisper, GPT)
- **Observability**: OpenTelemetry, Sentry, Grafana

### Key Entities (Database Schema)
```
organizations
users
memberships (org_id, user_id, role)
projects (org_id, created_by)
jobs (org_id, project_id, status, steps)
artifacts (job_id, org_id, storage_path)
style_cards (org_id, version)
usage_ledger (org_id, metric, amount)
subscriptions (org_id, plan, stripe_id)
audit_logs (org_id, actor_id, action)
invitations (org_id, email, token)
```

## 📊 SaaS Metrics to Track

### Activation
- Signup → onboarding completion
- First project created
- First export downloaded

### Engagement
- Projects created per week
- Exports per project
- Team collaboration (comments, edits)

### Retention
- DAU/MAU ratio
- Churn rate
- Feature usage (voiceover, captions, etc.)

### Revenue
- MRR (Monthly Recurring Revenue)
- ARPU (Average Revenue Per User)
- Trial → paid conversion rate
- Plan upgrade rate

### Performance
- Job completion time
- Job success rate
- API response time
- Error rate

## 🎨 Design Principles

1. **Clarity**: Clear CTAs, obvious next steps
2. **Feedback**: Loading states, progress indicators, success/error messages
3. **Efficiency**: Bulk actions, keyboard shortcuts, smart defaults
4. **Trust**: Security indicators, permission clarity, data safety
5. **Scalability**: Works for 1 user or 100+ team members

## 🚧 Not Included (Future Enhancements)

- Templates library
- Assets library (stock images, music)
- Publishing integrations (direct upload to Instagram, YouTube, etc.)
- Webhooks for job completion
- Advanced analytics (performance tracking post-publish)
- White-label options
- Custom domains
- SSO/SAML (Enterprise)
- API for programmatic access

## 📞 Support & Feedback

These mockups represent the complete UI/UX for a production SaaS application. They are ready to be:
- Converted to React/Next.js components
- Integrated with a backend API
- Enhanced with interactivity
- Deployed as a live application

## 📝 Notes for Developers

### Converting to React
1. Extract common components (Button, Card, Table, etc.)
2. Create layout wrapper (Sidebar + TopBar + Content)
3. Implement routing (React Router or Next.js pages)
4. Add state management for user, org, projects
5. Connect to API endpoints
6. Add form validation
7. Implement real-time updates (job progress)

### Responsive Considerations
- Mobile breakpoint: 768px
- Sidebar collapses to hamburger menu
- Tables become card-based lists
- Grid layouts become single column
- Touch-friendly tap targets (44px minimum)

### Accessibility (A11y)
- All interactive elements keyboard-accessible
- ARIA labels for screen readers
- Focus indicators visible
- Color contrast WCAG AA compliant
- Form validation errors announced

### Performance
- Lazy load routes
- Virtualize long tables/lists
- Optimize images
- Code splitting
- Cache API responses
- Debounce search inputs

---

**Built with**: HTML5, CSS3, Production-grade SaaS patterns

**License**: Proprietary

**Last Updated**: 2026-01-31
