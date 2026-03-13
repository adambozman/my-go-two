-- ─────────────────────────────────────────────────────────────────────────────
-- Entertainment & Interests — Gender-specific Level 2, every item own card
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM public.category_registry WHERE page = 'mygotwo' AND section = 'entertainment';

INSERT INTO public.category_registry (key, label, section, page, genders, sort_order, is_active, fields, subcategories) VALUES

-- ═════════════════════════════════════════════════════════════════════════════
-- MALE
-- ═════════════════════════════════════════════════════════════════════════════

('movies-tv-male','Movies & TV','entertainment','mygotwo',ARRAY['male'],10,true,'[]'::jsonb,
'[
  {"id":"action","name":"Action","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comedy","name":"Comedy","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"drama","name":"Drama","image":"event-theater","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"horror","name":"Horror","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Subgenre","type":"select","value":"","options":["Slasher","Psychological","Supernatural","Found Footage","Comedy Horror","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sci-fi","name":"Sci-Fi","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"documentary","name":"Documentary","image":"event-concerts","fields":[
    {"label":"Favorite Docs","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["True Crime","Sports","Nature","History","Music","Tech","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"thriller","name":"Thriller","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"anime","name":"Anime","image":"event-concerts","fields":[
    {"label":"Favorite Series","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["Shonen","Shojo","Seinen","Isekai","Mecha","Slice of Life","Other"]},
    {"label":"Where You Watch","type":"select","value":"","options":["Crunchyroll","Netflix","Funimation","Hulu","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('music-male','Music','entertainment','mygotwo',ARRAY['male'],20,true,'[]'::jsonb,
'[
  {"id":"favorite-genres","name":"Favorite Genres","image":"event-concerts","fields":[
    {"label":"Top Genres","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-artists","name":"Favorite Artists","image":"event-concerts","fields":[
    {"label":"All-Time Favorites","type":"text","value":""},
    {"label":"Currently Listening To","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"concerts","name":"Concerts","image":"event-concerts","fields":[
    {"label":"Dream Concert","type":"text","value":""},
    {"label":"Preferred Venue Size","type":"select","value":"","options":["Small Club","Mid-Size Venue","Arena","Festival","Intimate / Acoustic","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"playlists","name":"Playlists","image":"event-concerts","fields":[
    {"label":"Playlist Link","type":"text","value":""},
    {"label":"Platform","type":"select","value":"","options":["Spotify","Apple Music","YouTube Music","Tidal","Amazon Music","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vinyl-collecting","name":"Vinyl / Collecting","image":"specific-products","fields":[
    {"label":"Do You Collect Vinyl","type":"select","value":"","options":["Yes","No","Want to Start"]},
    {"label":"Favorite Records","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"podcasts","name":"Podcasts","image":"event-concerts","fields":[
    {"label":"Favorite Podcasts","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["True Crime","Comedy","Sports","Business","Tech","History","Science","Other"]},
    {"label":"Platform","type":"select","value":"","options":["Spotify","Apple Podcasts","Google Podcasts","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-music-venues","name":"Live Music Venues","image":"event-concerts","fields":[
    {"label":"Favorite Local Venue","type":"text","value":""},
    {"label":"Favorite City for Music","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('sports-male','Sports','entertainment','mygotwo',ARRAY['male'],30,true,'[]'::jsonb,
'[
  {"id":"favorite-teams","name":"Favorite Teams","image":"event-sports","fields":[
    {"label":"NFL Team","type":"text","value":""},
    {"label":"NBA Team","type":"text","value":""},
    {"label":"MLB Team","type":"text","value":""},
    {"label":"NHL Team","type":"text","value":""},
    {"label":"Soccer Team","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fantasy-sports","name":"Fantasy Sports","image":"event-sports","fields":[
    {"label":"Sports You Play Fantasy","type":"text","value":""},
    {"label":"Platform","type":"select","value":"","options":["ESPN","Yahoo","DraftKings","FanDuel","Sleeper","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-events","name":"Live Events","image":"event-sports","fields":[
    {"label":"Favorite Sport to Watch Live","type":"text","value":""},
    {"label":"Favorite Stadium / Arena","type":"text","value":""},
    {"label":"Preferred Seat","type":"select","value":"","options":["Field / Floor","Lower Bowl","Upper Bowl","Suite","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sports-to-play","name":"Sports to Play","image":"event-sports","fields":[
    {"label":"Sports You Play","type":"text","value":""},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Recreational","Competitive","Elite"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"fitness","name":"Fitness","image":"clothing-activewear","fields":[
    {"label":"Workout Style","type":"select","value":"","options":["Weightlifting","CrossFit","Running","Cycling","Swimming","HIIT","Yoga","Other"]},
    {"label":"Gym or Home","type":"select","value":"","options":["Gym","Home","Both","Outdoors"]},
    {"label":"Favorite Gym","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"combat-sports","name":"Combat Sports","image":"event-sports","fields":[
    {"label":"Sport","type":"select","value":"","options":["Boxing","MMA","Wrestling","BJJ","Muay Thai","Kickboxing","Other"]},
    {"label":"Participant or Fan","type":"select","value":"","options":["Participant","Fan","Both"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"extreme-sports","name":"Extreme Sports","image":"travel-preferences","fields":[
    {"label":"Sport","type":"select","value":"","options":["Snowboarding","Surfing","Skateboarding","BMX","Rock Climbing","Skydiving","Other"]},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Pro"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('gaming-male','Gaming','entertainment','mygotwo',ARRAY['male'],40,true,'[]'::jsonb,
'[
  {"id":"console","name":"Console Gaming","image":"specific-products","fields":[
    {"label":"Platform","type":"select","value":"","options":["PlayStation","Xbox","Nintendo Switch","Multi-Platform"]},
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["FPS","RPG","Sports","Fighting","Racing","Adventure","Strategy","Other"]},
    {"label":"Gamertag","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pc-gaming","name":"PC Gaming","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["FPS","RTS","MOBA","RPG","Simulation","Other"]},
    {"label":"Steam / Epic Username","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mobile-gaming","name":"Mobile Gaming","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["Puzzle","Strategy","Battle Royale","RPG","Casual","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"board-games","name":"Board Games","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["Strategy","Party","Cooperative","Word Games","Card Games","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"card-games","name":"Card Games","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Trading Card Games","Poker","UNO","Magic: The Gathering","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vr","name":"VR Gaming","image":"specific-products","fields":[
    {"label":"Headset","type":"select","value":"","options":["Meta Quest","PlayStation VR","Valve Index","None Yet","Other"]},
    {"label":"Favorite VR Games","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"retro-gaming","name":"Retro Gaming","image":"specific-products","fields":[
    {"label":"Favorite Era","type":"select","value":"","options":["NES / SNES","N64","PlayStation 1 & 2","Sega Genesis","Arcade","Other"]},
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('books-podcasts-male','Books & Podcasts','entertainment','mygotwo',ARRAY['male'],50,true,'[]'::jsonb,
'[
  {"id":"fiction","name":"Fiction","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Authors","type":"text","value":""},
    {"label":"Subgenre","type":"select","value":"","options":["Thriller","Sci-Fi","Fantasy","Literary Fiction","Historical Fiction","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"non-fiction","name":"Non-Fiction","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["History","Science","Politics","Sports","True Crime","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"self-help","name":"Self-Help","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Focus Area","type":"select","value":"","options":["Productivity","Finance","Mindset","Health","Relationships","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"business","name":"Business","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Topics","type":"select","value":"","options":["Entrepreneurship","Investing","Leadership","Marketing","Finance","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"history","name":"History","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Era / Topic","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"true-crime","name":"True Crime","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Podcasts","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"audiobooks","name":"Audiobooks","image":"wish-list","fields":[
    {"label":"Platform","type":"select","value":"","options":["Audible","Libro.fm","Spotify","Apple Books","Other"]},
    {"label":"Favorite Titles","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('hobbies-male','Hobbies','entertainment','mygotwo',ARRAY['male'],60,true,'[]'::jsonb,
'[
  {"id":"outdoors","name":"Outdoors","image":"travel-preferences","fields":[
    {"label":"Activities","type":"select","value":"","options":["Hiking","Camping","Fishing","Hunting","Kayaking","Rock Climbing","Other"]},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"photography","name":"Photography","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Portrait","Landscape","Street","Sports","Wildlife","Film","Other"]},
    {"label":"Camera","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cooking","name":"Cooking","image":"favorite-meals","fields":[
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"travel","name":"Travel","image":"travel-preferences","fields":[
    {"label":"Dream Destination","type":"text","value":""},
    {"label":"Travel Style","type":"select","value":"","options":["Adventure","Road Trip","Backpacking","Luxury","Cultural","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"collecting","name":"Collecting","image":"specific-products","fields":[
    {"label":"What You Collect","type":"text","value":""},
    {"label":"Most Prized Item","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"diy-crafts","name":"DIY & Projects","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Woodworking","Home Improvement","Electronics","3D Printing","Other"]},
    {"label":"Current Project","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cars-motorsport","name":"Cars & Motorsport","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Car Enthusiast","Motorcycles","Racing","Detailing","Off-Road","Other"]},
    {"label":"Dream Car","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('nightlife-social-male','Nightlife & Social','entertainment','mygotwo',ARRAY['male'],70,true,'[]'::jsonb,
'[
  {"id":"bar-scene","name":"Bar Scene","image":"favorite-restaurants","fields":[
    {"label":"Favorite Bar Type","type":"select","value":"","options":["Sports Bar","Craft Beer","Cocktail Bar","Dive Bar","Wine Bar","Rooftop","Other"]},
    {"label":"Favorite Drink","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"clubs","name":"Clubs","image":"event-concerts","fields":[
    {"label":"Music Preference","type":"select","value":"","options":["Hip-Hop","House / EDM","Latin","Top 40","R&B","Other"]},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-music","name":"Live Music","image":"event-concerts","fields":[
    {"label":"Preferred Genre","type":"text","value":""},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"karaoke","name":"Karaoke","image":"event-concerts","fields":[
    {"label":"Go-To Song","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"game-nights","name":"Game Nights","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Format","type":"select","value":"","options":["Board Games","Card Games","Video Games","Trivia","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dinner-parties","name":"Dinner Parties","image":"favorite-restaurants","fields":[
    {"label":"Host or Guest","type":"select","value":"","options":["Love to Host","Love to Attend","Both"]},
    {"label":"Favorite Cuisine to Serve","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"rooftop-bars","name":"Rooftop Bars","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Drink","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('comedy-live-male','Comedy & Live Events','entertainment','mygotwo',ARRAY['male'],80,true,'[]'::jsonb,
'[
  {"id":"stand-up","name":"Stand-Up","image":"event-concerts","fields":[
    {"label":"Favorite Comedians","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Observational","Dark","Political","Self-Deprecating","Storytelling","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"improv","name":"Improv","image":"event-theater","fields":[
    {"label":"Favorite Shows / Groups","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-theater","name":"Live Theater","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Broadway","Off-Broadway","Local Theater","Musical","Drama","Comedy","Other"]},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"open-mic","name":"Open Mic","image":"event-concerts","fields":[
    {"label":"Participant or Audience","type":"select","value":"","options":["Participant","Audience","Both"]},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comedy-clubs","name":"Comedy Clubs","image":"event-concerts","fields":[
    {"label":"Favorite Club","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-comedians","name":"Favorite Comedians","image":"event-concerts","fields":[
    {"label":"All-Time Favorites","type":"text","value":""},
    {"label":"Currently Following","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- FEMALE
-- ═════════════════════════════════════════════════════════════════════════════

('movies-tv-female','Movies & TV','entertainment','mygotwo',ARRAY['female'],10,true,'[]'::jsonb,
'[
  {"id":"romance","name":"Romance","image":"anniversary-gifts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comedy","name":"Comedy","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"drama","name":"Drama","image":"event-theater","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"thriller","name":"Thriller","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"documentary","name":"Documentary","image":"event-concerts","fields":[
    {"label":"Favorite Docs","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["True Crime","Nature","Fashion","History","Social Justice","Food","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"horror","name":"Horror","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Subgenre","type":"select","value":"","options":["Psychological","Supernatural","Slasher","Comedy Horror","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sci-fi","name":"Sci-Fi","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"reality-tv","name":"Reality TV","image":"event-concerts","fields":[
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Genre","type":"select","value":"","options":["Dating","Competition","Lifestyle","Travel","True Crime","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('music-female','Music','entertainment','mygotwo',ARRAY['female'],20,true,'[]'::jsonb,
'[
  {"id":"favorite-genres","name":"Favorite Genres","image":"event-concerts","fields":[
    {"label":"Top Genres","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-artists","name":"Favorite Artists","image":"event-concerts","fields":[
    {"label":"All-Time Favorites","type":"text","value":""},
    {"label":"Currently Listening To","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"concerts","name":"Concerts","image":"event-concerts","fields":[
    {"label":"Dream Concert","type":"text","value":""},
    {"label":"Preferred Venue Size","type":"select","value":"","options":["Small Club","Mid-Size Venue","Arena","Festival","Intimate / Acoustic","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"playlists","name":"Playlists","image":"event-concerts","fields":[
    {"label":"Playlist Link","type":"text","value":""},
    {"label":"Platform","type":"select","value":"","options":["Spotify","Apple Music","YouTube Music","Tidal","Amazon Music","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"podcasts","name":"Podcasts","image":"event-concerts","fields":[
    {"label":"Favorite Podcasts","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["True Crime","Pop Culture","Self-Help","Comedy","Fashion","Wellness","Other"]},
    {"label":"Platform","type":"select","value":"","options":["Spotify","Apple Podcasts","Google Podcasts","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vinyl-collecting","name":"Vinyl / Collecting","image":"specific-products","fields":[
    {"label":"Do You Collect Vinyl","type":"select","value":"","options":["Yes","No","Want to Start"]},
    {"label":"Favorite Records","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-music-venues","name":"Live Music Venues","image":"event-concerts","fields":[
    {"label":"Favorite Local Venue","type":"text","value":""},
    {"label":"Favorite City for Music","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('books-podcasts-female','Books & Podcasts','entertainment','mygotwo',ARRAY['female'],30,true,'[]'::jsonb,
'[
  {"id":"fiction","name":"Fiction","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Authors","type":"text","value":""},
    {"label":"Subgenre","type":"select","value":"","options":["Romance","Thriller","Fantasy","Literary Fiction","Historical Fiction","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"non-fiction","name":"Non-Fiction","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["Memoir","Self-Help","Health","True Crime","Social Issues","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"self-help","name":"Self-Help","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Focus Area","type":"select","value":"","options":["Confidence","Finance","Mindset","Health","Relationships","Spirituality","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"true-crime","name":"True Crime","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Podcasts","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"book-clubs","name":"Book Clubs","image":"wish-list","fields":[
    {"label":"In a Book Club","type":"select","value":"","options":["Yes","No","Want to Join"]},
    {"label":"Recent Reads","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"history","name":"History","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Era / Topic","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"audiobooks","name":"Audiobooks","image":"wish-list","fields":[
    {"label":"Platform","type":"select","value":"","options":["Audible","Libro.fm","Spotify","Apple Books","Other"]},
    {"label":"Favorite Titles","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('hobbies-female','Hobbies','entertainment','mygotwo',ARRAY['female'],40,true,'[]'::jsonb,
'[
  {"id":"art-painting","name":"Art & Painting","image":"event-theater","fields":[
    {"label":"Medium","type":"select","value":"","options":["Watercolor","Oil","Acrylic","Sketching","Digital","Mixed Media","Other"]},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"photography","name":"Photography","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Portrait","Travel","Food","Nature","Film","Street","Other"]},
    {"label":"Camera","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cooking","name":"Cooking","image":"favorite-meals","fields":[
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"travel","name":"Travel","image":"travel-preferences","fields":[
    {"label":"Dream Destination","type":"text","value":""},
    {"label":"Travel Style","type":"select","value":"","options":["Beach","Cultural","City Break","Luxury","Backpacking","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"diy-crafts","name":"DIY & Crafts","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Candle Making","Pottery","Sewing","Knitting","Jewelry Making","Scrapbooking","Other"]},
    {"label":"Current Project","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"collecting","name":"Collecting","image":"specific-products","fields":[
    {"label":"What You Collect","type":"text","value":""},
    {"label":"Most Prized Item","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"gardening","name":"Gardening","image":"flowers","fields":[
    {"label":"Type","type":"select","value":"","options":["Flower Garden","Herb Garden","Vegetable Garden","Indoor Plants","Container Garden","Other"]},
    {"label":"Favorite Plants","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('nightlife-social-female','Nightlife & Social','entertainment','mygotwo',ARRAY['female'],50,true,'[]'::jsonb,
'[
  {"id":"bar-scene","name":"Bar Scene","image":"favorite-restaurants","fields":[
    {"label":"Favorite Bar Type","type":"select","value":"","options":["Wine Bar","Cocktail Bar","Rooftop","Speakeasy","Sports Bar","Dive Bar","Other"]},
    {"label":"Favorite Drink","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"clubs","name":"Clubs","image":"event-concerts","fields":[
    {"label":"Music Preference","type":"select","value":"","options":["Pop","House / EDM","Hip-Hop","Latin","R&B","Other"]},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-music","name":"Live Music","image":"event-concerts","fields":[
    {"label":"Preferred Genre","type":"text","value":""},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"karaoke","name":"Karaoke","image":"event-concerts","fields":[
    {"label":"Go-To Song","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"game-nights","name":"Game Nights","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Format","type":"select","value":"","options":["Board Games","Card Games","Trivia","Party Games","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dinner-parties","name":"Dinner Parties","image":"favorite-restaurants","fields":[
    {"label":"Host or Guest","type":"select","value":"","options":["Love to Host","Love to Attend","Both"]},
    {"label":"Favorite Cuisine to Serve","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"rooftop-bars","name":"Rooftop Bars","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Drink","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('comedy-live-female','Comedy & Live Events','entertainment','mygotwo',ARRAY['female'],60,true,'[]'::jsonb,
'[
  {"id":"stand-up","name":"Stand-Up","image":"event-concerts","fields":[
    {"label":"Favorite Comedians","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Observational","Self-Deprecating","Political","Storytelling","Dark","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"improv","name":"Improv","image":"event-theater","fields":[
    {"label":"Favorite Shows / Groups","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-theater","name":"Live Theater","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Broadway","Musical","Drama","Comedy","Ballet","Opera","Other"]},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"open-mic","name":"Open Mic","image":"event-concerts","fields":[
    {"label":"Participant or Audience","type":"select","value":"","options":["Participant","Audience","Both"]},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comedy-clubs","name":"Comedy Clubs","image":"event-concerts","fields":[
    {"label":"Favorite Club","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-comedians","name":"Favorite Comedians","image":"event-concerts","fields":[
    {"label":"All-Time Favorites","type":"text","value":""},
    {"label":"Currently Following","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('arts-culture-female','Arts & Culture','entertainment','mygotwo',ARRAY['female'],70,true,'[]'::jsonb,
'[
  {"id":"museums","name":"Museums","image":"event-theater","fields":[
    {"label":"Favorite Type","type":"select","value":"","options":["Art Museum","History Museum","Science Museum","Natural History","Interactive","Other"]},
    {"label":"Favorite Museum","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"galleries","name":"Galleries","image":"event-theater","fields":[
    {"label":"Art Style","type":"select","value":"","options":["Contemporary","Classical","Photography","Abstract","Street Art","Other"]},
    {"label":"Favorite Gallery","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"theater","name":"Theater","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Broadway","Musical","Drama","Comedy","Experimental","Other"]},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"film-festivals","name":"Film Festivals","image":"event-concerts","fields":[
    {"label":"Favorite Festival","type":"text","value":""},
    {"label":"Favorite Genre","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"poetry","name":"Poetry","image":"wish-list","fields":[
    {"label":"Favorite Poets","type":"text","value":""},
    {"label":"Favorite Collections","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dance","name":"Dance","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Ballet","Contemporary","Latin","Hip-Hop","Ballroom","Other"]},
    {"label":"Participant or Fan","type":"select","value":"","options":["Participant","Fan","Both"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cultural-events","name":"Cultural Events","image":"event-concerts","fields":[
    {"label":"Favorite Events","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Festivals","Food Events","Cultural Fairs","Art Walks","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('wellness-mindfulness-female','Wellness & Mindfulness','entertainment','mygotwo',ARRAY['female'],80,true,'[]'::jsonb,
'[
  {"id":"meditation","name":"Meditation","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Guided","Silent","Transcendental","Loving-Kindness","Body Scan","Other"]},
    {"label":"App / Platform","type":"select","value":"","options":["Calm","Headspace","Insight Timer","Ten Percent Happier","Other"]},
    {"label":"Frequency","type":"select","value":"","options":["Daily","Few Times a Week","Weekly","Occasionally"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"yoga","name":"Yoga","image":"clothing-activewear","fields":[
    {"label":"Style","type":"select","value":"","options":["Vinyasa","Hatha","Yin","Hot Yoga","Restorative","Kundalini","Other"]},
    {"label":"Favorite Studio","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"journaling","name":"Journaling","image":"wish-list","fields":[
    {"label":"Type","type":"select","value":"","options":["Gratitude","Bullet Journal","Stream of Consciousness","Prompted","Art Journal","Other"]},
    {"label":"Favorite Brand / Journal","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"reading","name":"Reading","image":"wish-list","fields":[
    {"label":"Favorite Genres","type":"text","value":""},
    {"label":"Reading Goal","type":"select","value":"","options":["1-10 books/year","10-25 books/year","25-50 books/year","50+ books/year"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"self-care","name":"Self-Care","image":"grooming-skin","fields":[
    {"label":"Routine","type":"text","value":""},
    {"label":"Favorites","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sound-baths","name":"Sound Baths","image":"wish-list","fields":[
    {"label":"Experience Level","type":"select","value":"","options":["Never Tried","Tried Once","Regular","At Home Practice"]},
    {"label":"Favorite Studio","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"breathwork","name":"Breathwork","image":"wish-list","fields":[
    {"label":"Style","type":"select","value":"","options":["Wim Hof","Box Breathing","4-7-8","Holotropic","Other"]},
    {"label":"App / Platform","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

-- ═════════════════════════════════════════════════════════════════════════════
-- NON-BINARY
-- ═════════════════════════════════════════════════════════════════════════════

('movies-tv-nb','Movies & TV','entertainment','mygotwo',ARRAY['non-binary'],10,true,'[]'::jsonb,
'[
  {"id":"action","name":"Action","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comedy","name":"Comedy","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"drama","name":"Drama","image":"event-theater","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Where You Watch","type":"select","value":"","options":["Netflix","HBO Max","Disney+","Hulu","Prime","Theater","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"thriller","name":"Thriller","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"sci-fi","name":"Sci-Fi","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"documentary","name":"Documentary","image":"event-concerts","fields":[
    {"label":"Favorite Docs","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["True Crime","Nature","History","Social Justice","Science","Music","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"horror","name":"Horror","image":"event-concerts","fields":[
    {"label":"Favorite Movies","type":"text","value":""},
    {"label":"Subgenre","type":"select","value":"","options":["Psychological","Supernatural","Slasher","Comedy Horror","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"anime","name":"Anime","image":"event-concerts","fields":[
    {"label":"Favorite Series","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["Shonen","Shojo","Seinen","Isekai","Slice of Life","Other"]},
    {"label":"Where You Watch","type":"select","value":"","options":["Crunchyroll","Netflix","Funimation","Hulu","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('music-nb','Music','entertainment','mygotwo',ARRAY['non-binary'],20,true,'[]'::jsonb,
'[
  {"id":"favorite-genres","name":"Favorite Genres","image":"event-concerts","fields":[
    {"label":"Top Genres","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-artists","name":"Favorite Artists","image":"event-concerts","fields":[
    {"label":"All-Time Favorites","type":"text","value":""},
    {"label":"Currently Listening To","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"concerts","name":"Concerts","image":"event-concerts","fields":[
    {"label":"Dream Concert","type":"text","value":""},
    {"label":"Preferred Venue Size","type":"select","value":"","options":["Small Club","Mid-Size Venue","Arena","Festival","Intimate / Acoustic","Any"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"playlists","name":"Playlists","image":"event-concerts","fields":[
    {"label":"Playlist Link","type":"text","value":""},
    {"label":"Platform","type":"select","value":"","options":["Spotify","Apple Music","YouTube Music","Tidal","Amazon Music","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"podcasts","name":"Podcasts","image":"event-concerts","fields":[
    {"label":"Favorite Podcasts","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["True Crime","Comedy","Culture","Self-Help","Tech","History","Other"]},
    {"label":"Platform","type":"select","value":"","options":["Spotify","Apple Podcasts","Google Podcasts","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vinyl-collecting","name":"Vinyl / Collecting","image":"specific-products","fields":[
    {"label":"Do You Collect Vinyl","type":"select","value":"","options":["Yes","No","Want to Start"]},
    {"label":"Favorite Records","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-music-venues","name":"Live Music Venues","image":"event-concerts","fields":[
    {"label":"Favorite Local Venue","type":"text","value":""},
    {"label":"Favorite City for Music","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('books-podcasts-nb','Books & Podcasts','entertainment','mygotwo',ARRAY['non-binary'],30,true,'[]'::jsonb,
'[
  {"id":"fiction","name":"Fiction","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Authors","type":"text","value":""},
    {"label":"Subgenre","type":"select","value":"","options":["Sci-Fi","Fantasy","Thriller","Literary Fiction","Historical Fiction","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"non-fiction","name":"Non-Fiction","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Topics","type":"select","value":"","options":["History","Science","Politics","Memoir","Social Issues","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"self-help","name":"Self-Help","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Focus Area","type":"select","value":"","options":["Productivity","Finance","Mindset","Health","Relationships","Identity","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"true-crime","name":"True Crime","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Podcasts","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"history","name":"History","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Favorite Era / Topic","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"business","name":"Business","image":"wish-list","fields":[
    {"label":"Favorite Books","type":"text","value":""},
    {"label":"Topics","type":"select","value":"","options":["Entrepreneurship","Investing","Leadership","Marketing","Finance","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"audiobooks","name":"Audiobooks","image":"wish-list","fields":[
    {"label":"Platform","type":"select","value":"","options":["Audible","Libro.fm","Spotify","Apple Books","Other"]},
    {"label":"Favorite Titles","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('gaming-nb','Gaming','entertainment','mygotwo',ARRAY['non-binary'],40,true,'[]'::jsonb,
'[
  {"id":"console","name":"Console Gaming","image":"specific-products","fields":[
    {"label":"Platform","type":"select","value":"","options":["PlayStation","Xbox","Nintendo Switch","Multi-Platform"]},
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["RPG","Adventure","Indie","FPS","Strategy","Other"]},
    {"label":"Gamertag","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"pc-gaming","name":"PC Gaming","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["RPG","Simulation","Indie","Strategy","Other"]},
    {"label":"Steam / Epic Username","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"mobile-gaming","name":"Mobile Gaming","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["Puzzle","Strategy","RPG","Casual","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"board-games","name":"Board Games","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Favorite Genres","type":"select","value":"","options":["Strategy","Cooperative","Party","Word Games","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"card-games","name":"Card Games","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Trading Card Games","Poker","UNO","Magic: The Gathering","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"vr","name":"VR Gaming","image":"specific-products","fields":[
    {"label":"Headset","type":"select","value":"","options":["Meta Quest","PlayStation VR","Valve Index","None Yet","Other"]},
    {"label":"Favorite VR Games","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"retro-gaming","name":"Retro Gaming","image":"specific-products","fields":[
    {"label":"Favorite Era","type":"select","value":"","options":["NES / SNES","N64","PlayStation 1 & 2","Sega Genesis","Arcade","Other"]},
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('hobbies-nb','Hobbies','entertainment','mygotwo',ARRAY['non-binary'],50,true,'[]'::jsonb,
'[
  {"id":"art-painting","name":"Art & Painting","image":"event-theater","fields":[
    {"label":"Medium","type":"select","value":"","options":["Watercolor","Oil","Acrylic","Sketching","Digital","Mixed Media","Other"]},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"photography","name":"Photography","image":"specific-products","fields":[
    {"label":"Style","type":"select","value":"","options":["Portrait","Landscape","Street","Film","Nature","Other"]},
    {"label":"Camera","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cooking","name":"Cooking","image":"favorite-meals","fields":[
    {"label":"Favorite Cuisines to Cook","type":"text","value":""},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced","Chef-Level"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"travel","name":"Travel","image":"travel-preferences","fields":[
    {"label":"Dream Destination","type":"text","value":""},
    {"label":"Travel Style","type":"select","value":"","options":["Adventure","Cultural","City Break","Beach","Backpacking","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"diy-crafts","name":"DIY & Crafts","image":"specific-products","fields":[
    {"label":"Type","type":"select","value":"","options":["Woodworking","Pottery","Sewing","3D Printing","Electronics","Other"]},
    {"label":"Current Project","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"collecting","name":"Collecting","image":"specific-products","fields":[
    {"label":"What You Collect","type":"text","value":""},
    {"label":"Most Prized Item","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"outdoors","name":"Outdoors","image":"travel-preferences","fields":[
    {"label":"Activities","type":"select","value":"","options":["Hiking","Camping","Kayaking","Rock Climbing","Cycling","Other"]},
    {"label":"Skill Level","type":"select","value":"","options":["Beginner","Intermediate","Advanced"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('nightlife-social-nb','Nightlife & Social','entertainment','mygotwo',ARRAY['non-binary'],60,true,'[]'::jsonb,
'[
  {"id":"bar-scene","name":"Bar Scene","image":"favorite-restaurants","fields":[
    {"label":"Favorite Bar Type","type":"select","value":"","options":["Cocktail Bar","Wine Bar","Craft Beer","Rooftop","Dive Bar","Speakeasy","Other"]},
    {"label":"Favorite Drink","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"clubs","name":"Clubs","image":"event-concerts","fields":[
    {"label":"Music Preference","type":"select","value":"","options":["House / EDM","Hip-Hop","Pop","Latin","R&B","Other"]},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-music","name":"Live Music","image":"event-concerts","fields":[
    {"label":"Preferred Genre","type":"text","value":""},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"karaoke","name":"Karaoke","image":"event-concerts","fields":[
    {"label":"Go-To Song","type":"text","value":""},
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"game-nights","name":"Game Nights","image":"specific-products","fields":[
    {"label":"Favorite Games","type":"text","value":""},
    {"label":"Format","type":"select","value":"","options":["Board Games","Card Games","Video Games","Trivia","Party Games","All"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dinner-parties","name":"Dinner Parties","image":"favorite-restaurants","fields":[
    {"label":"Host or Guest","type":"select","value":"","options":["Love to Host","Love to Attend","Both"]},
    {"label":"Favorite Cuisine to Serve","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"rooftop-bars","name":"Rooftop Bars","image":"favorite-restaurants","fields":[
    {"label":"Favorite Spot","type":"text","value":""},
    {"label":"Favorite Drink","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('arts-culture-nb','Arts & Culture','entertainment','mygotwo',ARRAY['non-binary'],70,true,'[]'::jsonb,
'[
  {"id":"museums","name":"Museums","image":"event-theater","fields":[
    {"label":"Favorite Type","type":"select","value":"","options":["Art Museum","History Museum","Science Museum","Natural History","Interactive","Other"]},
    {"label":"Favorite Museum","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"galleries","name":"Galleries","image":"event-theater","fields":[
    {"label":"Art Style","type":"select","value":"","options":["Contemporary","Abstract","Photography","Street Art","Classical","Other"]},
    {"label":"Favorite Gallery","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"theater","name":"Theater","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Broadway","Musical","Drama","Comedy","Experimental","Other"]},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"film-festivals","name":"Film Festivals","image":"event-concerts","fields":[
    {"label":"Favorite Festival","type":"text","value":""},
    {"label":"Favorite Genre","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"poetry","name":"Poetry","image":"wish-list","fields":[
    {"label":"Favorite Poets","type":"text","value":""},
    {"label":"Favorite Collections","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"dance","name":"Dance","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Contemporary","Hip-Hop","Ballet","Latin","Ballroom","Other"]},
    {"label":"Participant or Fan","type":"select","value":"","options":["Participant","Fan","Both"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"cultural-events","name":"Cultural Events","image":"event-concerts","fields":[
    {"label":"Favorite Events","type":"text","value":""},
    {"label":"Type","type":"select","value":"","options":["Festivals","Food Events","Cultural Fairs","Art Walks","Pride Events","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb),

('comedy-live-nb','Comedy & Live Events','entertainment','mygotwo',ARRAY['non-binary'],80,true,'[]'::jsonb,
'[
  {"id":"stand-up","name":"Stand-Up","image":"event-concerts","fields":[
    {"label":"Favorite Comedians","type":"text","value":""},
    {"label":"Style","type":"select","value":"","options":["Observational","Dark","Political","Self-Deprecating","Storytelling","Other"]},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"improv","name":"Improv","image":"event-theater","fields":[
    {"label":"Favorite Shows / Groups","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"live-theater","name":"Live Theater","image":"event-theater","fields":[
    {"label":"Type","type":"select","value":"","options":["Broadway","Musical","Drama","Comedy","Experimental","Other"]},
    {"label":"Favorite Shows","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"open-mic","name":"Open Mic","image":"event-concerts","fields":[
    {"label":"Participant or Audience","type":"select","value":"","options":["Participant","Audience","Both"]},
    {"label":"Favorite Venue","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"comedy-clubs","name":"Comedy Clubs","image":"event-concerts","fields":[
    {"label":"Favorite Club","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]},
  {"id":"favorite-comedians","name":"Favorite Comedians","image":"event-concerts","fields":[
    {"label":"All-Time Favorites","type":"text","value":""},
    {"label":"Currently Following","type":"text","value":""},
    {"label":"Notes","type":"text","value":""}
  ]}
]'::jsonb);
