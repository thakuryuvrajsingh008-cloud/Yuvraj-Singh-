/* ============================================================
   AURORA STUDIOS — PORTFOLIO DATA (PORTFOLIO-DATA.JS)
   Real Client Work & High-Converting Digital Solutions
============================================================ */

const PORTFOLIO_PROJECTS = [
  {
    id: "waffle-paradise",
    title: "The Waffle Paradise",
    client: "The Waffle Paradise Cafe",
    category: "websites",
    categoryLabel: "Websites & Branding",
    subtitle: "Premium Cafe Experience, Online Ordering & Daily Specials",
    description: "Designed a boutique cafe brand experience and online pre-ordering web application featuring 100% vegetarian Belgian & stuffed waffles with dynamic 'Waffle of the Day' daily offers at ₹99.",
    fullDescription: "The Waffle Paradise is a premier dessert cafe in Aligarh, UP. We built a high-converting web presence with interactive 4-step WhatsApp pre-ordering, daily rotating menu highlights, live total calculation, and custom social media creative posters that drove a 340% surge in pickup orders.",
    image: "assets/images/waffle_paradise_mockup.jpg",
    tags: ["UI/UX Design", "Web Development", "Social Media Creatives", "Online Ordering"],
    metrics: [
      { label: "Order Volume", value: "+340%" },
      { label: "Daily Conversion", value: "28.4%" },
      { label: "Avg Prep Time Saved", value: "15 min" }
    ],
    deliverables: [
      "Responsive Cafe Ordering Web App",
      "Waffle of the Day Weekly Poster Campaign",
      "100% Veg Branding & Visual Identity",
      "Automated WhatsApp Order Payload Generator"
    ],
    liveUrl: "#waffle-paradise-demo",
    isSampleCodeAvailable: true
  },
  {
    id: "ace-factor-fitness",
    title: "Ace Factor Fitness",
    client: "Ace Factor Fitness Gym",
    category: "websites",
    categoryLabel: "Websites & Branding",
    subtitle: "Aligarh's Biggest Gym Showcase & Member Portal",
    description: "Built an ultra-premium dark obsidian & gold aesthetic website showcasing Achal Taal's premier full-scale fitness floor with 7 distinct training programs.",
    fullDescription: "Ace Factor Fitness is Aligarh's most prestigious fitness facility at Khalsa Complex. We designed an imposing, luxury dark-mode web experience featuring interactive program cards (Crossfit, Zumba, Cycling, Yoga, Strength Training), floor status indicators, verified 5.0-star review console, and instant click-to-call integration.",
    image: "assets/images/ace_factor_mockup.jpg",
    tags: ["High-End Web Design", "Gym Branding", "Mobile Responsive", "Lead Generation"],
    metrics: [
      { label: "Inbound Enquiries", value: "+210%" },
      { label: "Google Review Rating", value: "5.0 ★" },
      { label: "Page Load Speed", value: "0.6s" }
    ],
    deliverables: [
      "Full-Screen Hero with Video Motion",
      "7 Discipline Program Cards",
      "Live Floor Status & Google Map Routing",
      "High Conversion Call-To-Action Suite"
    ],
    liveUrl: "#ace-factor-demo",
    isSampleCodeAvailable: true
  },
  {
    id: "fitless-2-fitness",
    title: "Fitless 2 Fitness",
    client: "Fitless 2 Fitness Gym",
    category: "websites",
    categoryLabel: "Web App & Tool",
    subtitle: "Smart BMI/BMR Health Calculator & Custom Diet Planner",
    description: "Engineered a modern web application for DayalBagh, Agra's top-rated fitness center with a real-time BMI/BMR/TDEE health calculator and personalized macro meal planner.",
    fullDescription: "Created a comprehensive web application for Fitless 2 Fitness with instant Mifflin-St Jeor calculation, interactive macro split targets (Protein, Carbs, Fats), Zumba/Yoga class schedules, trainer rosters, and direct WhatsApp trial booking.",
    image: "assets/images/fitless2fitness_mockup.jpg",
    tags: ["Web App", "BMI Calculator", "Health Tech", "Diet Planning"],
    metrics: [
      { label: "Trial Bookings", value: "+180%" },
      { label: "Member Engagement", value: "4.8m avg" },
      { label: "Google Reviews", value: "4.9 ★ (148+)" }
    ],
    deliverables: [
      "Dynamic Health Metric Calculator",
      "Custom Macro & Calorie Target Engine",
      "Trainer Portfolio & Review Wall",
      "Integrated Free Trial Booking Form"
    ],
    liveUrl: "#fitless2fitness-demo",
    isSampleCodeAvailable: true
  },
  {
    id: "cinematic-brand-commercial",
    title: "Cinematic Brand Commercials",
    client: "Lifestyle & Fitness Brands",
    category: "ads-commercials",
    categoryLabel: "Ads & Video",
    subtitle: "High-Energy 4K Commercial Edits & Product Showcases",
    description: "Produced cinematic brand films with dynamic speed ramps, sound design, sound effects (SFX), and color grading to build premium brand equity.",
    fullDescription: "Delivered complete commercial editing workflows including multi-cam synchronization, custom motion typography, beat-matched transitions, audio mastering, and export optimization across 16:9 widescreen and 9:16 vertical formats.",
    image: "assets/images/ace_factor_mockup.jpg",
    tags: ["Commercial Video", "Color Grading", "Sound Design", "Motion Graphics"],
    metrics: [
      { label: "Retention Rate", value: "84%" },
      { label: "Total Views", value: "650K+" },
      { label: "Client Rating", value: "5.0 ★" }
    ],
    deliverables: [
      "Full 4K Cinematic Commercial Master",
      "Dynamic Sound Design & SFX Track",
      "Social Teasers & Story Cutdowns",
      "Custom Graphic Lower Thirds"
    ],
    liveUrl: "#video-commercial-demo"
  },
  {
    id: "ugc-ad-campaign",
    title: "High-Converting UGC Video Ads",
    client: "E-Commerce & DTC Brands",
    category: "ads-commercials",
    categoryLabel: "Ads & Video",
    subtitle: "Viral Hook Short-Form Video Creatives with 1.2M+ Organic Views",
    description: "Scripted, shot, and edited high-converting UGC-style video advertisements for Meta, Instagram Reels, and YouTube Shorts with dynamic sound design and bold captions.",
    fullDescription: "Produced a suite of 20+ viral short-form creatives focusing on thumb-stopping 3-second hooks, dynamic kinetic typography, color-graded footage, and proven direct-response CTA frameworks.",
    image: "assets/images/waffle_paradise_mockup.jpg",
    tags: ["Video Editing", "UGC Reels", "Commercial Ads", "Direct Response"],
    metrics: [
      { label: "Total Impressions", value: "1.8M+" },
      { label: "ROAS (Return on Ad Spend)", value: "4.2x" },
      { label: "Click-Through Rate", value: "3.8%" }
    ],
    deliverables: [
      "9:16 Vertical Video Commercials",
      "High CTR YouTube Thumbnail Packages",
      "Sound Design & Motion Graphic Overlays",
      "A/B Tested Hook Variations"
    ],
    liveUrl: "#ugc-ad-demo"
  }
];

const SKILLS_DATA = {
  all: [
    { name: "HTML5 & Semantic SEO", icon: "fa-brands fa-html5", category: "web" },
    { name: "Modern CSS3 / SCSS", icon: "fa-brands fa-css3-alt", category: "web" },
    { name: "JavaScript (ES6+)", icon: "fa-brands fa-js", category: "web" },
    { name: "React.js & Components", icon: "fa-brands fa-react", category: "web" },
    { name: "Responsive UI/UX Design", icon: "fa-solid fa-mobile-screen", category: "web" },
    { name: "Performance Optimization", icon: "fa-solid fa-gauge-high", category: "web" },
    { name: "Video Editing (Premiere / CapCut)", icon: "fa-solid fa-film", category: "creative" },
    { name: "High-CTR Thumbnail Design", icon: "fa-solid fa-image", category: "creative" },
    { name: "Social Media Post Design", icon: "fa-solid fa-palette", category: "creative" },
    { name: "Viral UGC Ad Creatives", icon: "fa-solid fa-video", category: "creative" },
    { name: "Commercials & Storyboarding", icon: "fa-solid fa-clapperboard", category: "creative" },
    { name: "Sound Design & Motion FX", icon: "fa-solid fa-wand-magic-sparkles", category: "creative" },
    { name: "Social Media Management", icon: "fa-solid fa-share-nodes", category: "marketing" },
    { name: "Content Strategy & Funnels", icon: "fa-solid fa-bullseye", category: "marketing" },
    { name: "Brand Presence & Growth", icon: "fa-solid fa-arrow-trend-up", category: "marketing" }
  ]
};
