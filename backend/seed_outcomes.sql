-- Seed Learning Outcomes and Curriculum for chef-course-dhaka
UPDATE courses SET
  outcomes_en = '[
    {"title": "Master 120+ international recipes across 16+ global cuisines", "description": "Cook with confidence from French classics to Asian street food, Middle Eastern grills, and South Asian specialties."},
    {"title": "Earn NSDA Level-2 and Level-3 government certification", "description": "Receive nationally recognized credentials from the Prime Minister''s Office of Bangladesh (NSDA)."},
    {"title": "Achieve ISO-HACCP food safety certification", "description": "Demonstrate internationally accepted food hygiene and safety standards audited by SGS Switzerland."},
    {"title": "Secure 5-star hotel internship placement", "description": "Graduate into paid internships at top-tier hotels in Dhaka and internationally through our dedicated placement cell."},
    {"title": "Build professional knife skills and kitchen management", "description": "Execute precision cuts, plating techniques, and manage a high-volume commercial kitchen with confidence."},
    {"title": "Develop menu design and food costing expertise", "description": "Plan, price, and execute profitable restaurant menus using real-world costing methods."}
  ]'::jsonb,
  curriculum_en = '[
    {"title": "Month 1 — Foundation: Kitchen Safety and Core Techniques", "duration": "4 Weeks", "description": "Build your culinary base with professional knife skills, food safety protocols, and foundational cooking methods.", "topics": ["Professional knife skills and precision cuts", "HACCP and food safety standards (ISO/NSDA)", "Stocks, mother sauces, and classic soups", "Mise en place and kitchen organization"]},
    {"title": "Month 2 — International Cuisines: Asian, Middle Eastern and Western", "duration": "4 Weeks", "description": "Dive into 120+ recipes from 16 countries with hands-on cooking in our commercial kitchen lab.", "topics": ["Classic French and Continental techniques", "South Asian and Bangladeshi culinary arts", "Middle Eastern grills, mezze, and rice dishes", "East Asian cuisine: Chinese, Japanese, Thai"]},
    {"title": "Month 3 — Advanced Skills: Pastry, Baking and Modern Plating", "duration": "4 Weeks", "description": "Master pastry arts, artisan baking, and restaurant-standard plating and garnishing.", "topics": ["Pastry doughs, tarts, and European desserts", "Artisan breads and laminated doughs", "Modern plating, sauce work, and food styling", "NSDA Level-2 assessment and mock exam"]},
    {"title": "Month 4–6 — Internship: 5-Star Hotel Placement", "duration": "12 Weeks", "description": "Apply your skills in a real professional kitchen environment with mentored 5-star hotel internship support.", "topics": ["Live kitchen rotations in Dhaka''s top hotels", "Weekly progress reviews with senior executive chefs", "Final NSDA Level-3 certification exam", "Job placement counseling and portfolio review"]}
  ]'::jsonb
WHERE slug = 'chef-course-dhaka';

-- Seed for pastry-bakery-course-dhaka
UPDATE courses SET
  outcomes_en = '[
    {"title": "Master European pastry arts: tarts, entremets, and macarons", "description": "Create restaurant-quality desserts using classical French and modern pastry techniques."},
    {"title": "Produce artisan breads, croissants, and laminated doughs", "description": "Bake professionally with precision using commercial ovens and dough sheeters."},
    {"title": "Earn NSDA pastry and bakery certification", "description": "Receive recognized credentials validating your professional pastry competency."},
    {"title": "Master chocolate work, sugar art, and cake decoration", "description": "Temper chocolate, create sugar showpieces, and decorate custom event cakes."},
    {"title": "Operate commercial bakery equipment confidently", "description": "Work with spiral mixers, deck ovens, proofers, and professional finishing tools."},
    {"title": "Launch your own home bakery or pastry business", "description": "Learn pricing, packaging, and branding fundamentals to start your bakery venture."}
  ]'::jsonb,
  curriculum_en = '[
    {"title": "Month 1 — Dough Fundamentals and Artisan Breads", "duration": "4 Weeks", "description": "Learn the science of doughs, yeast fermentation, and artisan bread production.", "topics": ["Yeast doughs, sourdough science, and biga starters", "Artisan breads: baguettes, ciabatta, focaccia", "Viennoiserie: croissants, Danishes, and pain au chocolat", "Laminated doughs and puff pastry technique"]},
    {"title": "Month 2 — Cakes, Chocolates and Entremets", "duration": "4 Weeks", "description": "Create premium cakes, chocolate confections, and modern dessert entremets.", "topics": ["Sponge cakes, genoise, and chiffon variations", "Buttercream, ganache, and fondant decoration", "Chocolate tempering, truffles, and bonbons", "Mousse cakes, mirror glazes, and modern entremets"]},
    {"title": "Month 3 — Tarts, Petit Fours and Advanced Pastry", "duration": "4 Weeks", "description": "Master French pastry classics, petit fours, and show-stopper event cakes.", "topics": ["Shortcrust, sweet pastry, and tart construction", "Eclairs, choux, and French petit fours", "Wedding and celebration cake tiers and assembly", "NSDA assessment and final portfolio review"]},
    {"title": "Month 4–6 — Internship and Business Development", "duration": "12 Weeks", "description": "Apply skills in real bakery/hotel kitchen environments with placement support.", "topics": ["Bakery internship placement in Dhaka hotels", "Home bakery branding and pricing workshop", "Client order management and production planning", "Final NSDA certification exam"]}
  ]'::jsonb
WHERE slug = 'pastry-bakery-course-dhaka';

-- Seed for cooking-course-dhaka
UPDATE courses SET
  outcomes_en = '[
    {"title": "Cook authentic dishes from 16+ international cuisines", "description": "Master recipes from Italian, Japanese, Thai, Indian, Arabic, Mexican, and more with professional technique."},
    {"title": "Develop professional cooking speed and station management", "description": "Execute multi-course meals efficiently, meeting restaurant service timing standards."},
    {"title": "Earn internationally recognized culinary certification", "description": "Graduate with credentials accepted by hotels, restaurants, and culinary schools worldwide."},
    {"title": "Master flavor balancing, seasoning, and recipe adaptation", "description": "Understand the science of flavor and adapt recipes confidently to dietary and regional requirements."},
    {"title": "Build a strong foundation in food presentation and plating", "description": "Plate dishes to restaurant and hotel buffet presentation standards."},
    {"title": "Qualify for hotel and restaurant chef positions in Bangladesh", "description": "Be ready for direct employment with CIB placement support into Dhaka restaurants and hotel kitchens."}
  ]'::jsonb,
  curriculum_en = '[
    {"title": "Month 1 — Global Cuisine Foundations", "duration": "4 Weeks", "description": "Learn foundational techniques applied across major world cuisines with hands-on kitchen practice.", "topics": ["Kitchen safety, hygiene, and HACCP basics", "Knife skills and vegetable cuts", "Stocks, broths, and international mother sauces", "Heat application: roasting, sauteing, braising, steaming"]},
    {"title": "Month 2 — Asian and Middle Eastern Cuisine Mastery", "duration": "4 Weeks", "description": "Cook authentic Asian street food, biryani, sushi basics, and Middle Eastern mezze.", "topics": ["Bangladeshi and South Asian cuisine: biryani, curry, dal", "Chinese stir-fry, dim sum, and noodle dishes", "Japanese basics: sushi rice, miso, and teriyaki", "Arabic mezze, grills, and rice dishes"]},
    {"title": "Month 3 — European and Modern Fusion Cuisine", "duration": "4 Weeks", "description": "Master Italian, French, Spanish, and modern fusion recipes for restaurant menus.", "topics": ["Italian pasta, risotto, and pizza dough from scratch", "French classical cooking: coq au vin, cassoulet", "Modern fusion: technique-driven plating and creativity", "Menu planning, food costing, and recipe scaling"]},
    {"title": "Month 4–6 — Internship Placement", "duration": "12 Weeks", "description": "Train in live hotel and restaurant kitchens with mentorship from executive chefs.", "topics": ["Live kitchen placement in Dhaka restaurants and hotels", "Chef station rotation: hot kitchen, cold kitchen, pastry", "Final certification exam and portfolio review", "Job placement counseling and career guidance"]}
  ]'::jsonb
WHERE slug = 'cooking-course-dhaka';
