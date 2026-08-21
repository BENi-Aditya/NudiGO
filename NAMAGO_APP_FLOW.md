# NAMAGO — COMPLETE APP FLOW & USER JOURNEY
Version 1.0 | August 20, 2026

---

## TABLE OF CONTENTS
1. [High-Level App Flow](#high-level-app-flow)
2. [First-Time User Journey](#first-time-user-journey)
3. [Returning User Journey](#returning-user-journey)
4. [Screen-by-Screen Flow](#screen-by-screen-flow)
5. [Navigation Structure](#navigation-structure)
6. [User States & Paths](#user-states--paths)

---

## HIGH-LEVEL APP FLOW

```
ENTRY POINT
    ↓
Landing Page
    ↓
Onboarding (5 screens)
    ↓
Create Profile (optional auth)
    ↓
Learning Path Dashboard
    ↓
┌─────────────────────────────────────┐
│  CORE LEARNING LOOP                 │
│                                     │
│  Lesson → Exercises → Practice →   │
│  Speaking → AI Roleplay →          │
│  Completion → Mission → Review     │
│                                     │
│  ↻ (repeat)                        │
└─────────────────────────────────────┘
    ↓
Real-World Usage
    ↓
Return to App (streak tracking)
```

---

## FIRST-TIME USER JOURNEY

### Phase 1: Discovery & Onboarding (2-3 minutes)
```
Step 1: Landing Page
  ↓ [Start Learning CTA]
Step 2: Welcome Screen
  ↓ [Continue]
Step 3: Choose Learning Goal
  ↓ [Select: College/Work/Travel/etc.]
Step 4: Choose Current Level
  ↓ [Select: Nothing yet/Few words/etc.]
Step 5: Choose Priority Situations
  ↓ [Multi-select: Food/Autos/Shopping/etc.]
Step 6: Path Ready
  ↓ [Let's Go]
Step 7: Learning Dashboard (Home)
```

### Phase 2: First Lesson (3-5 minutes)
```
Step 8: Lesson Preview
  ↓ [Start Lesson]
Step 9: Exercise 1 - Vocabulary Introduction
  ↓ [Continue]
Step 10: Exercise 2 - Multiple Choice
  ↓ [Select Answer]
Step 11: Exercise 3 - Word Bank
  ↓ [Build Sentence]
Step 12: Exercise 4 - Listening
  ↓ [Listen & Select]
Step 13: Exercise 5 - Speaking
  ↓ [Record & Validate]
Step 14: Exercise 6 - AI Roleplay
  ↓ [Converse with AI]
Step 15: Lesson Complete
  ↓ [Continue]
Step 16: Mission Assigned
  ↓ [Got It]
Step 17: Back to Dashboard
```

### Phase 3: Habit Formation
```
Step 18: Return Next Day
  ↓
Step 19: See Streak & XP
  ↓
Step 20: Review Due Concepts
  ↓
Step 21: Next Lesson
  ↓
[Loop continues...]
```

**Total Time to First Success:** ~5-8 minutes
**User Feeling:** "I can actually say something in Kannada now!"

---

## RETURNING USER JOURNEY

```
Open App
  ↓
┌─────────────────────────────────────┐
│ Home Screen shows:                  │
│ • Welcome back message              │
│ • Current streak (🔥 5 days)       │
│ • XP progress bar                   │
│ • Current lesson (highlighted)      │
│ • Review prompt (if due)            │
│ • Active mission                    │
└─────────────────────────────────────┘
  ↓
One Clear Next Action:
  ├─→ "Review 3 concepts" (if review due)
  ├─→ "Continue Lesson" (if in progress)
  └─→ "Start Next Lesson" (default)
  ↓
[Enter Learning Loop]
  ↓
Complete Activity
  ↓
Return to Home
  ↓
See Progress Update
```

---

## SCREEN-BY-SCREEN FLOW

### 🚀 SCREEN 1: LANDING PAGE
**Purpose:** Convert visitors into learners within 5 seconds

**Content:**
- Hero section with value proposition
- Social proof
- Clear CTA
- Feature highlights
- Footer with links

**User Action:** Click "Start Learning" → Onboarding

---

### 📝 SCREEN 2: ONBOARDING - WELCOME
**Layout:** Centered content, minimal distractions

**Content:**
```
[Visual: Bangalore illustration/abstract]

Welcome to Bangalore.

Let's teach you the Kannada
you'll actually use.

[Start Learning] ← Primary CTA
```

**User Action:** Click "Start Learning" → Goal Selection

---

### 🎯 SCREEN 3: ONBOARDING - LEARNING GOAL
**Layout:** Card-based selection

**Content:**
```
Why are you learning Kannada?

┌─────────────┐  ┌─────────────┐
│   College   │  │    Work     │
└─────────────┘  └─────────────┘

┌─────────────┐  ┌─────────────┐
│ Just moved  │  │   Travel    │
└─────────────┘  └─────────────┘

┌─────────────┐  ┌─────────────┐
│   Friends   │  │   Curious   │
└─────────────┘  └─────────────┘

[Back]  [Continue] ← Appears after selection
```

**User Action:** Select one → Current Level

---

### 📊 SCREEN 4: ONBOARDING - CURRENT LEVEL
**Layout:** Simple selection

**Content:**
```
How much Kannada do you know?

○ Nothing yet
○ A few words
○ I understand some
○ I can speak a little

[Back]  [Continue]
```

**User Action:** Select one → Priority Situations

---

### 🎪 SCREEN 5: ONBOARDING - PRIORITY SITUATIONS
**Layout:** Multi-select chips

**Content:**
```
What do you want to handle first?

[Select all that apply]

☐ Food         ☐ Autos
☐ Shopping     ☐ College
☐ Directions   ☐ Meeting people
☐ Small talk

[Back]  [Continue]
```

**User Action:** Select 1-3 → Path Ready

---

### ✅ SCREEN 6: ONBOARDING - PATH READY
**Layout:** Confirmation with preview

**Content:**
```
[Icon: ✨]

Your path is ready.

Bangalore Beginner

You'll start with greetings, food,
and getting around.

[Let's Go!] ← Primary CTA
```

**User Action:** Click "Let's Go" → Dashboard/Home

---

### 🏠 SCREEN 7: HOME / LEARNING DASHBOARD
**Purpose:** Central hub showing progress and next action

**Layout:**
```
┌─────────────────────────────────────┐
│ Header                              │
│ Namaskara, [Name]! 👋              │
│                                     │
│ 🔥 3 day streak    ⭐ 250 XP       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NEXT UP                             │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ Lesson 2                     │   │
│ │ Ordering Food               │   │
│ │                             │   │
│ │ 5 min • 20 XP               │   │
│ │                             │   │
│ │      [Continue Lesson]      │   │
│ └─────────────────────────────┘   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ YOUR PATH                           │
│                                     │
│ Level 1: First Kannada              │
│ ●●●○○ 3/5 complete                 │
│                                     │
│ [View Full Path]                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ACTIVE MISSION                      │
│                                     │
│ 🎯 Say "Namaskara" to someone      │
│                                     │
│ [I Did It] [Skip]                   │
└─────────────────────────────────────┘

[Bottom Navigation]
[Home] [Practice] [Missions] [Profile]
```

**User Actions:**
- Click "Continue Lesson" → Lesson View
- Click "View Full Path" → Learning Path
- Click bottom nav → Other sections

---

### 📖 SCREEN 8: LESSON VIEW
**Purpose:** Focused learning experience

**Layout:**
```
┌─────────────────────────────────────┐
│ [X]          ●●●○○○○          [?]  │  ← Progress & Help
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │
│     [EXERCISE CONTENT AREA]         │
│                                     │
│         (Dynamic based on           │
│          exercise type)             │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │
│          [Primary Action]           │
│                                     │
└─────────────────────────────────────┘
```

**Exercise Types:**

**A. Vocabulary Introduction**
```
        ನಮಸ್ಕಾರ
       Namaskara

         Hello

     [🔊 Play Audio]

Example: "Namaskara" is how you
greet someone in Kannada.

         [Continue]
```

**B. Multiple Choice**
```
What does "Namaskara" mean?

┌─────────────────────────────┐
│        Goodbye              │
└─────────────────────────────┘

┌─────────────────────────────┐
│         Hello               │ ← Correct
└─────────────────────────────┘

┌─────────────────────────────┐
│       Thank you             │
└─────────────────────────────┘
```

**C. Word Bank / Sentence Builder**
```
Build the sentence:
"One coffee please"

[Your Answer Area]
_________________________

Available words:
[ondu] [coffee] [kodi]
[beku] [nimma]

[Check Answer]
```

**D. Listening Exercise**
```
Listen and select what you hear:

        [🔊 Play]

        [🔊 Play Slow]

○ Ondu coffee
○ Ondu chai kodi  ← Correct
○ Coffee beku

[Check Answer]
```

**E. Speaking Exercise**
```
Say this phrase:

     ಒಂದು ಕಾಫಿ ಕೊಡಿ
    Ondu coffee kodi

   [🔊 Hear Example]


    [🎤 Tap to Record]


  [Hint: Break it down]
```

**F. AI Roleplay**
```
┌─────────────────────────────────┐
│ AI Waiter 🧑‍🍳                  │
├─────────────────────────────────┤
│                                 │
│ "ಏನು ಬೇಕು?"                    │
│  Enu beku?                      │
│  What do you want?              │
│                                 │
└─────────────────────────────────┘

Your turn to respond:

[Type your response]
___________________________

[Hint] [🎤 Speak]  [Send →]
```

---

### 🎉 SCREEN 9: LESSON COMPLETE
**Purpose:** Celebrate progress and assign mission

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│           ✨ Great work!            │
│                                     │
│         You practiced:              │
│                                     │
│       • Ordering drinks             │
│       • Saying "please"             │
│       • Asking prices               │
│                                     │
│    ┌─────────────────────┐         │
│    │   + 20 XP           │         │
│    │   🔥 3 day streak   │         │
│    └─────────────────────┘         │
│                                     │
│                                     │
│         [Continue]                  │
│                                     │
└─────────────────────────────────────┘
```

**User Action:** Click Continue → Mission Screen

---

### 🎯 SCREEN 10: MISSION ASSIGNED
**Purpose:** Bridge app learning to real-world usage

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│        🎯 Real-World Mission        │
│                                     │
│     Next time you order a drink,    │
│        try saying this:             │
│                                     │
│    ┌─────────────────────┐         │
│    │  ಒಂದು ಕಾಫಿ ಕೊಡಿ     │         │
│    │  Ondu coffee kodi   │         │
│    │  [🔊]               │         │
│    └─────────────────────┘         │
│                                     │
│         Reward: +50 XP              │
│                                     │
│     [I'll Try It!]  [Skip]         │
│                                     │
└─────────────────────────────────────┘
```

**User Action:** 
- Click "I'll Try It" → Back to Home
- Click "Skip" → Back to Home

---

### 🗺️ SCREEN 11: LEARNING PATH
**Purpose:** Show progress and upcoming lessons

**Layout:**
```
┌─────────────────────────────────────┐
│ [← Back]    Your Path               │
└─────────────────────────────────────┘

Level 1: First Kannada
●●●○○ 3/5 complete

  ✅ Lesson 1: Namaskara
  ✅ Lesson 2: My name is...
  ✅ Lesson 3: How are you?
  
  ⭕ Lesson 4: Yes/No/Okay ← CURRENT
     5 min • 20 XP
     [Start Lesson]
  
  🔒 Lesson 5: Thank you
  
───────────────────────────

Level 2: Daily Life
○○○○○ 0/5 complete

  🔒 Lesson 6: Ordering food
  🔒 Lesson 7: Water/quantities
  🔒 Lesson 8: Asking price
  🔒 Lesson 9: Paying
  🔒 Lesson 10: Vegetarian food

[Continue scrolling...]
```

---

### 💬 SCREEN 12: PRACTICE HUB
**Purpose:** Additional practice beyond lessons

**Layout:**
```
┌─────────────────────────────────────┐
│ Practice                            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📝 Review Due (3 concepts)          │
│                                     │
│ Keep your skills sharp              │
│                                     │
│ [Start Review]                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🤖 AI Conversations                 │
│                                     │
│ Practice with:                      │
│ • Auto Driver                       │
│ • Shopkeeper                        │
│ • Restaurant Server                 │
│                                     │
│ [Choose Scenario]                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🎤 Speaking Practice                │
│                                     │
│ Practice pronunciation              │
│                                     │
│ [Start Speaking]                    │
└─────────────────────────────────────┘
```

---

### 🎯 SCREEN 13: MISSIONS
**Purpose:** Track real-world usage

**Layout:**
```
┌─────────────────────────────────────┐
│ Missions                            │
└─────────────────────────────────────┘

ACTIVE MISSION

┌─────────────────────────────────────┐
│ 🎯 Say "Namaskara" to someone      │
│                                     │
│ Phrase: ನಮಸ್ಕಾರ                    │
│ Reward: +50 XP                      │
│                                     │
│ [I Did It!] [Skip]                  │
└─────────────────────────────────────┘

COMPLETED MISSIONS

✅ Ordered a drink in Kannada
   2 days ago • +50 XP

✅ Greeted someone
   3 days ago • +50 XP

[Show More]
```

---

### 👤 SCREEN 14: PROFILE
**Purpose:** Show achievements and settings

**Layout:**
```
┌─────────────────────────────────────┐
│ Profile                             │
└─────────────────────────────────────┘

     [Avatar]
   
   Aditya Kumar
   Bangalore Beginner

┌─────────────────────────────────────┐
│ STATS                               │
│                                     │
│ 🔥 Streak: 5 days                  │
│ ⭐ Total XP: 250                    │
│ 📚 Lessons: 8/25                    │
│ 💬 Conversations: 12                │
│ 🎯 Missions: 5                      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ SETTINGS                            │
│                                     │
│ • Learning Goal                     │
│ • Daily Reminder                    │
│ • Audio & Voice                     │
│ • Account                           │
│ • Help & Feedback                   │
└─────────────────────────────────────┘

[Log Out]
```

---

## NAVIGATION STRUCTURE

### Primary Navigation (Bottom Nav Bar)

```
┌─────┬─────┬─────┬─────┐
│  🏠 │ 💬  │ 🎯  │ 👤  │
│Home │Prac │Miss │Prof │
└─────┴─────┴─────┴─────┘
```

**Navigation States:**
- **Home:** Default view, shows current lesson
- **Practice:** Review, AI roleplay, speaking
- **Missions:** Active and completed missions
- **Profile:** Stats, achievements, settings

---

## USER STATES & PATHS

### State 1: Brand New User
```
Landing → Onboarding → First Lesson → Mission → Home
```
**Goal:** Complete first lesson within 10 minutes

---

### State 2: Active Learner (Days 2-7)
```
Home → Review → New Lesson → Practice → Mission
```
**Goal:** Build daily habit, maintain streak

---

### State 3: Consistent User (Week 2+)
```
Home → Path Overview → Choose Lesson → Complete → Mission
```
**Goal:** Autonomous learning, self-directed path

---

### State 4: Returning After Break
```
Home → See Welcome Back → Review Concepts → Continue
```
**Goal:** Re-engage without punishment

---

### State 5: Mission Focused
```
Home → Missions → Complete Mission → XP Reward → New Lesson
```
**Goal:** Real-world application emphasis

---

## KEY INTERACTION PATTERNS

### Pattern 1: ONE CLEAR NEXT ACTION
Every screen should have ONE primary action that's visually dominant.

❌ Bad: Multiple equal CTAs
✅ Good: One primary button, one secondary option

---

### Pattern 2: IMMEDIATE FEEDBACK
Every user action should receive instant visual response.

- Button press: 80-120ms compression
- Correct answer: ✓ + subtle celebration
- Wrong answer: Gentle shake + explanation

---

### Pattern 3: PROGRESS VISIBILITY
Users should always know:
- Where they are
- What they've completed  
- What's next
- How long it takes

---

### Pattern 4: GRACEFUL EXITS
Users can exit lessons without losing progress.

- [X] button → "Save & Exit?"
- Auto-save on each exercise
- Resume where you left off

---

### Pattern 5: CONTEXTUAL HINTS
Help is available but not intrusive.

- [?] icon in lesson → Quick tips
- Stuck on exercise → "Hint" button appears
- Speaking struggling → "Break it down" option

---

## ACCESSIBILITY & RESPONSIVE NOTES

### Mobile First (320px - 768px)
- Single column layouts
- Large tap targets (44x44px minimum)
- Bottom navigation for thumb reach
- Minimal scrolling within exercises
- Audio controls easily accessible

### Tablet (768px - 1024px)
- Slightly wider content
- Same vertical flow
- Larger typography
- More whitespace

### Desktop (1024px+)
- Centered content (max-width 600px)
- Sidebar navigation option
- Keyboard shortcuts available
- Mouse hover states

---

## ERROR STATES & EDGE CASES

### No Internet
```
[Icon: 📡❌]

You're offline

Your progress is saved.
Lessons will sync when you're back online.

[Retry]
```

### Microphone Denied
```
[Icon: 🎤❌]

Microphone access needed

Speaking practice needs mic access.
Want to enable it?

[Settings] [Skip Speaking]
```

### AI Temporarily Down
```
[Icon: 🤖💤]

Practice is taking a break

Try again in a moment, or continue with
other exercises.

[Retry] [Continue Without AI]
```

---

## SUCCESS METRICS PER SCREEN

| Screen | Success Metric | Target |
|--------|----------------|--------|
| Landing | Click CTA | >50% |
| Onboarding | Complete all 5 | >80% |
| First Lesson | Complete | >70% |
| Mission Acceptance | Click "I'll Try It" | >60% |
| Second Day Return | Open app | >40% |
| Lesson Completion | Finish to end | >85% |

---

## FINAL NOTES

**Core Principle:** Each screen answers:
1. Where am I?
2. What should I do?
3. Why does this matter?

**Design Philosophy:**
- Playful but not childish
- Clear but not boring  
- Encouraging but not patronizing
- Fast but not rushed

**The North Star:**
"Can a judge with zero Kannada complete the first lesson and feel confident saying one phrase?"

If yes → The flow works.
If no → Simplify further.

---

END OF APP FLOW DOCUMENT
