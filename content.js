// ✏️ Edit everything about your story here — no need to touch the other files.
// Dates use the format YYYY-MM-DD. Photos go in assets/photos/ (leave "" for a decorative placeholder).

window.SITE = {
  herName: "Sapana Singh",
  hisName: "Anurag Singh",
  heroTitle: "Mr. & Mrs. Singh",
  heroNames: "Sapana & Anurag",
  hashtag: "#SinghSquared",

  // Curtain intro shown before the site opens (her tap also starts the music)
  intro: { line: "For", name: "Sapana", hint: "tap to open my heart ♡" },
  greeting: "~ This is for you - Mera Baacha! ~",
  heroTagline: "Like the mountains hold the sky, I'll always hold you.",
  heroSubline: "You are my favourite view",

  // The counter at the top counts from this date
  togetherSince: "2026-11-01T22:09:00+05:30", // 1 Nov 2026, 10:09 PM IST

  // Background music — audio only (hidden YouTube player of the official video)
  music: { title: "Tum Ko Dekha To Yeh Khayal Aaya", artist: "Jagjit Singh & Chitra Singh", youtubeId: "EZJgQsMQDFw" }, // full song on repeat; add start/end (seconds) to loop just a part

  specialDates: [
    {
      icon: "💬",
      title: `First Conversation`,
      date: "2026-11-02",
      story: `It all started on Jeevansathi.com. I smartly and politely got your number, and from there our story moved to WhatsApp. Then, on the 2nd day, I didn't text you at all - and that evening my screen blipped with a "disappeared" text from you. That's when I realised you were interested too, and from then on there was no looking back.`
    },
    {
      icon: "❤️",
      title: `My "I Love You"`,
      date: "2026-11-06",
      story: `Just a few days later, you were travelling back home for Deepavali. So much mess had happened, and you poured all your emotions out to me. In the middle of all that, you told me "You love me". I know it wasn't the official one, but from that moment I didn't want to hold back anymore - and from the very next day, I openly accepted that I'm falling for you.`
    },
    {
      icon: "🪔",
      title: `Our First Fight`,
      date: "2026-11-07",
      story: `And then, right the next day, I goofed up. I said something you didn't like, and you just blasted at me. We slept muhh phulake that night. But the next morning was Deepawali, 8th November - your favourite festival - and I couldn't let it be ruined for you. We were both feeling terrible, so I collected all my strength and texted you a long Happy Diwali message. You responded so warmly, and my heart fell for you a little more that day.`
    },
    {
      icon: "💞",
      title: `Your "I Love You" Day`,
      date: "2026-11-25",
      story: `Then came the day that was a roller coaster for you. It started sweet - the pretty dresses of my choice got delivered to you (credit lelu thodi apni pasand ki). But then we had a small argument, you had to travel to Kochi via Bhopal, the train got delayed, and on the way you heard about your Papa's dengue. You were just not happy. I had already planned to do something special for you once you reached Bhopal, and honestly, I was a bit scared because of your mood. But I was like fuck it - I'll do it for her even if she gets mad, and I'll handle it calmly. That one step turned out to be a masterstroke. It was the food you had told me only once that you like, and you loved it. And then you turned to me with "Anurag Singh: I ... Love ... You!"`
    }
  ],

  // Put her photos in assets/photos/ and set photo: "assets/photos/<file name>"
  happyMoments: [
    // comingSoon: true shows a "Coming Soon" frame — remove it and add photo/date/text once it happens
    { title: "Our First Date", date: "", text: "", photo: "", comingSoon: true },
    { title: "Our First Trip", date: "", text: "", photo: "", comingSoon: true },
    { title: "Sunset Together", date: "", text: "", photo: "", comingSoon: true }
  ],

  // Pictures of your shayaris — put them in assets/photos/
  shayaris: [
    { photo: "assets/photos/shayari-1.jpg", caption: "" },
    { photo: "assets/photos/shayari-2.jpg", caption: "" },
    { photo: "assets/photos/shayari-3.jpg", caption: "" }
  ],

  // Her Cuteness photo wall — add as many frames as you like
  // optional position: "x% y%" moves the crop focus (e.g. "35% 75%" = left/bottom)
  // round: true shows the frame as a circle (photo should be square-cropped)
  // videos: { video: "assets/videos/x.mp4", poster: "assets/videos/x-poster.jpg" } play muted on a loop
  cuteWall: [
    { photo: "assets/photos/cute-1.jpg", caption: "" },
    { photo: "assets/photos/cute-2.jpg", caption: "", round: true },
    { photo: "assets/photos/cute-5.jpg", caption: "", round: true },
    { photo: "assets/photos/cute-6.jpg", caption: "" },
    { photo: "assets/photos/cute-9.jpg", caption: "" },
    { photo: "assets/photos/cute-10.jpg", caption: "" },
    { photo: "assets/photos/cute-11.jpg", caption: "", round: true },
    { photo: "assets/photos/cute-13.jpg", caption: "" },
    { photo: "assets/photos/cute-14.jpg", caption: "", round: true },
    { photo: "assets/photos/cute-15.jpg", caption: "" },
    { video: "assets/videos/video-1.mp4", poster: "assets/videos/video-1-poster.jpg", caption: "" },
    { photo: "assets/photos/cute-16.jpg", caption: "", round: true },
    { photo: "assets/photos/cute-18.jpg", caption: "" },
    { photo: "assets/photos/cute-19.jpg", caption: "", round: true },
    { video: "assets/videos/video-2.mp4", poster: "assets/videos/video-2-poster.jpg", caption: "" },
    { photo: "assets/photos/cute-22.jpg", caption: "" },
    { photo: "assets/photos/cute-23.jpg", caption: "" },
    { photo: "assets/photos/cute-24.jpg", caption: "", round: true },
    { video: "assets/videos/video-3.mp4", poster: "assets/videos/video-3-poster.jpg", caption: "" },
    { photo: "assets/photos/cute-26.jpg", caption: "", round: true },
    { photo: "assets/photos/cute-28.jpg", caption: "" },
    { photo: "assets/photos/cute-29.jpg", caption: "", round: true },
    { video: "assets/videos/video-4.mp4", poster: "assets/videos/video-4-poster.jpg", caption: "" },
    { photo: "assets/photos/cute-31.jpg", caption: "", round: true },
    { photo: "assets/photos/cute-32.jpg", caption: "" },
    { photo: "assets/photos/cute-33.jpg", caption: "" },
    { photo: "assets/photos/cute-34.jpg", caption: "", round: true }
  ],

  letter: {
    heading: "Hello Mera Banachar Baacha",
    body: [
      `I don't know how on earth I fell for you so quickly. You just give me a different kind of peace. The comfort, the empathy, the love, the cuteness, the desire you showed in me - all of it is just blooming inside me.`,
      `And because of that, you keep hovering in my head like a child, and I'm really not able to focus on my stuff. The kid who used to be so indulged in work is actually distracted now - always thinking about you, your cute behaviour, your bamdassi, your gussa, your chapar chapar.`,
      `I have never come across such a sweet, warm personality in my life. I have craved love my entire life, and I think I have finally found someone who is almost on the same level as me. And it's not just how you are with me - your stories about work, and the work you did for needy people, make you stand out from everyone else. Keep doing the good work, and I'm sure it will come back to you in the form of blessings.`,
      `I also know you have had your past, and I'm very much welcoming of it, because it was a part of you once and it's not easy to get over. But I want to make my own space in your world and make you feel the way you always wanted to feel. I want to break all the myths people have told you, or that you have pictured in your head - and it's not me who is doing it, it's God who is showering His blessings on you through me.`,
      `It's been only a few days, but I have actually gone mad for you. You always tell me it's too early to commit or say all these things, but somehow I'm very clear: I want you to be my partner in crime, the Mumma of our kids, my parents' best Bahu - and I'll make sure you see the same efforts from my side for your (our) family.`,
      `I'm actually emotional writing this, but yeah, I wanted to pour all my emotions into it. I'm not sure if you will like it or not, but I want to keep putting in these efforts to make our life the best one, and one to remember.`
    ],
    signOff: "Your Lovely",
    from: "Chu-kundaar"
  }
};
