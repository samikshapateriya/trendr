# **App Name**: IdeaSpark

## Core Features:

- Idea Feed Display: Display a feed of recent ideas posted by users in a card-based layout, showing user profile, idea title, description, tags, and interaction icons (like, comment, share).
- Idea Posting: Enable users to post new ideas with a title, description, tags, optional 'Need Help With' field, and image upload. Use a simple form layout for input.
- User Profile Management: Implement a profile page where users can view and edit their information, including name, bio, interests/skills, profile picture, and a 'Looking for a co-founder' toggle.

## Style Guidelines:

- Bright but soothing colors: light blue, green, yellow.
- Accent color: A vibrant teal (#008080) to highlight key interactive elements.
- Minimal layout with card-based design for idea feed and user profiles.
- Subtle transitions and hover effects for a smooth user experience.
- Use clear and modern icons for navigation and actions.

## Original User Request:
Build a mobile and web app called "InnovatorSpace" — a social platform where users can:

Sign Up/Login with email/password and Google authentication.

Create and Edit User Profiles, including:

Name

Bio

Interests/skills

Profile picture

"Are you looking for a co-founder?" toggle

Post New Ideas:

Title

Description

Tags (example: AI, HealthTech, EdTech, etc.)

Add a "Need Help With" field (optional) where users can specify skills they need (e.g., coding, marketing).

Upload supporting images (optional)

Idea Feed:

Show recent ideas posted by users.

Allow users to like, comment, and share ideas.

Show number of likes and comments on each idea.

Co-founder Matching Section:

Swipeable card interface showing users who are open to finding co-founders.

Filter matches by skill, location, or industry.

If both users swipe right, open a chat window.

Chat Feature:

Real-time messaging between matched users.

Media sharing (images, docs)

Online/offline status indicator.

Trending Section:

Highlight ideas that are trending (most likes + comments in last 24–48 hours).

Community Section:

Allow users to follow each other.

View profiles of other users.

Build a "My Network" list of followed users.

Notifications:

Notify users when someone likes/comments on their idea.

Notify when they match with a potential co-founder.

Notify about trending posts.

Admin Panel:

Manage user reports, content moderation (flagged ideas, blocked users).

Tech Stack Requirements:

Use Firebase Authentication for login.

Use Firestore Database for storing user data, posts, and chat messages.

Use Firebase Storage for uploading profile pictures and idea images.

Use Firebase Cloud Messaging (FCM) for notifications.

InnovatorSpace App — Custom UI Layout
🏠 Home Screen (Idea Feed)
Top Bar:

App Logo + "InnovatorSpace" (centered)

Right corner: 🔍 Search Icon (for searching ideas/users)

Feed Layout (Card Style):

User profile picture + Name (tap to view profile)

Idea Title (bold)

Short Description (3 lines max)

Tags (pill-shaped colorful buttons)

Like ❤️ | Comment 💬 | Share 🔄 icons below each idea

Trending Badge (if idea is trending)

Bottom Navigation Bar (Fixed 5 icons):
| Home 🏠 | Match 🤝 | Post ➕ | Community 👥 | Profile 👤 |

➕ Post New Idea Page
Title Input Field (big font)

Description Text Box (scrollable)

Tag Selector (multi-select dropdown)

"Need Help With" (optional) input field

Upload Image (optional button)

Post Idea Button (Big, vibrant color)

🤝 Match (Co-Founder Swipe) Screen
Swipeable Card Interface (Tinder-like):

Big User Profile Picture

Name, Skills, Interests

Short Bio (2–3 lines)

"Looking For Co-Founder" tag

Swipe Right ✅ (Interested)

Swipe Left ❌ (Pass)

Top Filters Bar:

Filter by Skills, Industry, Location

👥 Community Screen
Search Bar (Find people by name, skills, industry)

Suggested Users List:

Small Profile Pic + Name + Skills (tags)

"Follow" button

Tabs on Top:

🔥 Trending Users | 🌱 New Users | 💬 Discussions (future feature)

👤 Profile Screen
Cover Image + Profile Picture (Editable)

Name, Bio, Interests/Skills

"Open to Co-Founder Search" toggle

Your Posted Ideas (grid/list view)

Your Connections (followers and following)

Edit Profile Button (floating action button)

💬 Chat Screen (For Matches)
Recent Chats List (Profile Pic + Name + Last Message)

Real-time chat window:

Text input field

Image/file upload button

Typing indicator

🔔 Notifications Screen (Slide from top)
New Likes on your ideas

New Comments

New Match alerts

Follow notifications

🎨 Design Style Guidelines

Element	Style
Color Palette	Bright but soothing colors (light blue, green, yellow)
Fonts	Rounded, friendly sans-serif (example: Poppins, Montserrat)
Buttons	Soft corners (rounded), minimal shadows
Card Layouts	Smooth elevation, hover effects
Animation	Subtle transitions (no laggy heavy animations)
Overall Vibe	Light, young, energetic, welcoming
✍️ In Short:
Minimal Layout + Swipe Magic + Idea Joyfulness = A Platform People Love Using.
  