create table public.sections (
  id int primary key,
  order_index int not null,
  title text not null,
  subtitle text not null default ''
);
grant select on public.sections to anon, authenticated;
grant all on public.sections to service_role;
alter table public.sections enable row level security;
create policy "sections are public" on public.sections for select using (true);

create table public.units (
  id int primary key,
  section_id int not null references public.sections(id) on delete cascade,
  order_index int not null,
  title text not null,
  subtitle text not null default '',
  is_available boolean not null default false
);
grant select on public.units to anon, authenticated;
grant all on public.units to service_role;
alter table public.units enable row level security;
create policy "units are public" on public.units for select using (true);

create table public.lessons (
  id int primary key,
  unit_id int not null references public.units(id) on delete cascade,
  order_index int not null,
  title text not null,
  objective text not null default '',
  kind text not null default 'lesson'
);
grant select on public.lessons to anon, authenticated;
grant all on public.lessons to service_role;
alter table public.lessons enable row level security;
create policy "lessons are public" on public.lessons for select using (true);

create table public.concepts (
  id text primary key,
  lesson_id int not null references public.lessons(id) on delete cascade,
  unit_id int not null references public.units(id) on delete cascade,
  order_index int not null default 0,
  kannada text not null,
  transliteration text not null,
  english text not null,
  note text not null default '',
  kind text not null default 'word'
);
grant select on public.concepts to anon, authenticated;
grant all on public.concepts to service_role;
alter table public.concepts enable row level security;
create policy "concepts are public" on public.concepts for select using (true);

create table public.profiles (
  id uuid primary key,
  display_name text not null default 'Learner',
  xp int not null default 0,
  streak int not null default 0,
  longest_streak int not null default 0,
  daily_goal int not null default 30,
  goal text not null default 'daily_life',
  level text not null default 'beginner',
  support_level text not null default 'high',
  script_mode text not null default 'both',
  onboarding_done boolean not null default false,
  last_active_date date,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "profiles readable for leaderboard" on public.profiles for select to authenticated using (true);

create table public.user_lesson_progress (
  user_id uuid not null,
  lesson_id int not null references public.lessons(id) on delete cascade,
  times_completed int not null default 0,
  best_accuracy numeric not null default 0,
  last_completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);
grant select, insert, update, delete on public.user_lesson_progress to authenticated;
grant all on public.user_lesson_progress to service_role;
alter table public.user_lesson_progress enable row level security;
create policy "own lesson progress" on public.user_lesson_progress for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.user_concept_progress (
  user_id uuid not null,
  concept_id text not null references public.concepts(id) on delete cascade,
  mastery numeric not null default 0,
  correct_count int not null default 0,
  incorrect_count int not null default 0,
  due_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  primary key (user_id, concept_id)
);
grant select, insert, update, delete on public.user_concept_progress to authenticated;
grant all on public.user_concept_progress to service_role;
alter table public.user_concept_progress enable row level security;
create policy "own concept progress" on public.user_concept_progress for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.user_attempts (
  id bigserial primary key,
  user_id uuid not null,
  concept_id text references public.concepts(id) on delete cascade,
  exercise_type text not null,
  result text not null,
  created_at timestamptz not null default now()
);
grant select, insert on public.user_attempts to authenticated;
grant all on public.user_attempts to service_role;
alter table public.user_attempts enable row level security;
create policy "own attempts" on public.user_attempts for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.user_mistakes (
  user_id uuid not null,
  concept_id text not null references public.concepts(id) on delete cascade,
  exercise_type text not null default 'multiple_choice',
  times int not null default 1,
  resolved boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (user_id, concept_id)
);
grant select, insert, update, delete on public.user_mistakes to authenticated;
grant all on public.user_mistakes to service_role;
alter table public.user_mistakes enable row level security;
create policy "own mistakes" on public.user_mistakes for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.user_daily_activity (
  user_id uuid not null,
  day date not null,
  xp int not null default 0,
  lessons int not null default 0,
  exercises int not null default 0,
  primary key (user_id, day)
);
grant select, insert, update on public.user_daily_activity to authenticated;
grant all on public.user_daily_activity to service_role;
alter table public.user_daily_activity enable row level security;
create policy "own activity" on public.user_daily_activity for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.achievements (
  id text primary key,
  title text not null,
  description text not null,
  metric text not null,
  threshold int not null
);
grant select on public.achievements to anon, authenticated;
grant all on public.achievements to service_role;
alter table public.achievements enable row level security;
create policy "achievements are public" on public.achievements for select using (true);

create table public.user_achievements (
  user_id uuid not null,
  achievement_id text not null references public.achievements(id) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);
grant select, insert on public.user_achievements to authenticated;
grant all on public.user_achievements to service_role;
alter table public.user_achievements enable row level security;
create policy "own achievements" on public.user_achievements for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into public.achievements (id, title, description, metric, threshold) values
  ('first-words','First Words','Complete your first lesson','lessons',1),
  ('ten-lessons','Ten Down','Complete 10 lessons','lessons',10),
  ('streak-3','Three Day Streak','Practice 3 days in a row','streak',3),
  ('streak-7','Week Warrior','Practice 7 days in a row','streak',7),
  ('xp-500','500 XP','Earn 500 XP','xp',500),
  ('xp-2000','2000 XP','Earn 2000 XP','xp',2000),
  ('mastery-10','Ten Mastered','Master 10 concepts','mastered',10),
  ('speaker','Speaker','Complete a speaking session','speak',1);

insert into public.sections (id, order_index, title, subtitle) values
  (1,1,'FIRST KANNADA','Your first words that work everywhere'),
  (2,2,'FOOD AND DRINK','Order like you live here'),
  (3,3,'GETTING AROUND','Autos, metro and directions'),
  (4,4,'SHOPPING','Prices, numbers, negotiation'),
  (5,5,'COLLEGE LIFE','Classmates and campus'),
  (6,6,'CONVERSATION','Ask, answer, keep talking'),
  (7,7,'BANGALORE CONFIDENCE','Final real-world challenges');

insert into public.units (id, section_id, order_index, title, subtitle, is_available) values
  (1,1,1,'Hello Bangalore','Greet anyone, anywhere',true),
  (2,1,2,'Meet Me','Say who you are',true),
  (3,1,3,'Survival Kannada','Rescue phrases for real conversations',true),
  (4,2,4,'Order Something','Ask for what you want',true),
  (5,2,5,'Coffee and Tea','Darshini Kannada',true),
  (6,2,6,'Restaurant Kannada','Handle a full meal',true),
  (7,2,7,'Paying','Money without confusion',true),
  (8,3,8,'Autos','Win the auto conversation',true),
  (9,3,9,'Directions','Left, right, straight',false),
  (10,3,10,'Metro and Bus','Namma Metro Kannada',false),
  (11,3,11,'Places Around You','Shops, parks, landmarks',false),
  (12,4,12,'Prices','',false),
  (13,4,13,'Numbers','',false),
  (14,4,14,'Buying Things','',false),
  (15,4,15,'Polite Negotiation','',false),
  (16,5,16,'Meet Classmates','',false),
  (17,5,17,'Classroom Kannada','',false),
  (18,5,18,'Ask for Help','',false),
  (19,5,19,'Hostel / Daily Life','',false),
  (20,6,20,'Questions','',false),
  (21,6,21,'Answers','',false),
  (22,6,22,'Likes and Dislikes','',false),
  (23,6,23,'Plans','',false),
  (24,6,24,'Small Talk','',false),
  (25,7,25,'Food Challenge','',false),
  (26,7,26,'Auto Challenge','',false),
  (27,7,27,'Shopping Challenge','',false),
  (28,7,28,'Conversation Challenge','',false),
  (29,7,29,'Listening Challenge','',false),
  (30,7,30,'Final Bangalore Challenge','',false);

insert into public.lessons (id, unit_id, order_index, title, objective, kind) values
  (11,1,1,'Hello Bangalore 1','Greet people and say yes','lesson'),
  (12,1,2,'Hello Bangalore 2','Say no, thank you and okay','lesson'),
  (13,1,3,'Hello Bangalore — Speak','Say every phrase out loud','speak'),
  (14,1,4,'Hello Bangalore — Unit Review','Mixed review of the whole unit','review'),
  (21,2,1,'Meet Me 1','Give your name and ask where','lesson'),
  (22,2,2,'Meet Me 2','Talk about being a student and friends','lesson'),
  (23,2,3,'Meet Me — Speak','Say every phrase out loud','speak'),
  (24,2,4,'Meet Me — Unit Review','Mixed review of the whole unit','review'),
  (31,3,1,'Survival Kannada 1','Rescue yourself in a fast conversation','lesson'),
  (32,3,2,'Survival Kannada 2','Ask politely for help','lesson'),
  (33,3,3,'Survival Kannada — Speak','Say every phrase out loud','speak'),
  (34,3,4,'Survival Kannada — Unit Review','Mixed review of the whole unit','review'),
  (41,4,1,'Order Something 1','Order one of anything','lesson'),
  (42,4,2,'Order Something 2','Ask the price and say what you want','lesson'),
  (43,4,3,'Order Something — Speak','Say every phrase out loud','speak'),
  (44,4,4,'Order Something — Unit Review','Mixed review of the whole unit','review'),
  (51,5,1,'Coffee and Tea 1','Coffee, tea and milk','lesson'),
  (52,5,2,'Coffee and Tea 2','Sugar, hot and no sugar','lesson'),
  (53,5,3,'Coffee and Tea — Speak','Say every phrase out loud','speak'),
  (54,5,4,'Coffee and Tea — Unit Review','Mixed review of the whole unit','review'),
  (61,6,1,'Restaurant Kannada 1','Meals and breakfast items','lesson'),
  (62,6,2,'Restaurant Kannada 2','Taste, bill and one more','lesson'),
  (63,6,3,'Restaurant Kannada — Speak','Say every phrase out loud','speak'),
  (64,6,4,'Restaurant Kannada — Unit Review','Mixed review of the whole unit','review'),
  (71,7,1,'Paying 1','Money, change and cards','lesson'),
  (72,7,2,'Paying 2','Confirm the amount','lesson'),
  (73,7,3,'Paying — Speak','Say every phrase out loud','speak'),
  (74,7,4,'Paying — Unit Review','Mixed review of the whole unit','review'),
  (81,8,1,'Autos 1','Get in and set the meter','lesson'),
  (82,8,2,'Autos 2','Say where you are going and stop','lesson'),
  (83,8,3,'Autos — Speak','Say every phrase out loud','speak'),
  (84,8,4,'Autos — Unit Review','Mixed review of the whole unit','review');

insert into public.concepts (id, lesson_id, unit_id, order_index, kannada, transliteration, english, note, kind) values
  ('namaskara',11,1,0,'ನಮಸ್ಕಾರ','namaskara','hello','The all-purpose Kannada greeting. Works morning to night.','word'),
  ('hegiddira',11,1,1,'ಹೇಗಿದ್ದೀರಾ?','hegiddira?','how are you?','Polite form. With friends say hegiddi?','word'),
  ('haudu',11,1,2,'ಹೌದು','haudu','yes','Say it with a small nod.','word'),
  ('illa',12,1,0,'ಇಲ್ಲ','illa','no','Also means there isn''t any.','word'),
  ('dhanyavada',12,1,1,'ಧನ್ಯವಾದ','dhanyavada','thank you','Used constantly in shops and autos.','word'),
  ('sari',12,1,2,'ಸರಿ','sari','okay','The Kannada okay / correct.','word'),
  ('hesaru',21,2,0,'ಹೆಸರು','hesaru','name','Base word for name.','word'),
  ('nanna-hesaru',21,2,1,'ನನ್ನ ಹೆಸರು','nanna hesaru','my name is','Add your name after it.','phrase'),
  ('elli',21,2,2,'ಎಲ್ಲಿ','elli','where','Question word.','word'),
  ('inda',22,2,0,'ಇಂದ','inda','from','Attaches after a place name.','word'),
  ('vidyarthi',22,2,1,'ವಿದ್ಯಾರ್ಥಿ','vidyarthi','student','Useful all over campus.','word'),
  ('snehita',22,2,2,'ಸ್ನೇಹಿತ','snehita','friend','Female friend: snehite.','word'),
  ('artha-agalilla',31,3,0,'ನನಗೆ ಅರ್ಥ ಆಗಲಿಲ್ಲ','nanage artha agalilla','I do not understand','Your most important sentence.','phrase'),
  ('nidhanavagi-heli',31,3,1,'ನಿಧಾನವಾಗಿ ಹೇಳಿ','nidhanavagi heli','please speak slowly','nidhanavagi means slowly.','phrase'),
  ('innomme-heli',31,3,2,'ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ','innomme heli','say it again','innomme means once more.','phrase'),
  ('dayavittu',32,3,0,'ದಯವಿಟ್ಟು','dayavittu','please','Polite softener before a request.','word'),
  ('sahaya-madi',32,3,1,'ಸಹಾಯ ಮಾಡಿ','sahaya madi','please help','madi is the polite do.','phrase'),
  ('idu-enu',32,3,2,'ಇದು ಏನು?','idu enu?','what is this?','Point and ask.','phrase'),
  ('ondu',41,4,0,'ಒಂದು','ondu','one','Used before the item you want.','word'),
  ('kodi',41,4,1,'ಕೊಡಿ','kodi','give','Turns any noun into a polite order.','word'),
  ('ondu-kafi-kodi',41,4,2,'ಒಂದು ಕಾಫಿ ಕೊಡಿ','ondu kafi kodi','give me one coffee','The Bangalore starter sentence.','phrase'),
  ('eshtu',42,4,0,'ಎಷ್ಟು?','eshtu?','how much?','The price question.','word'),
  ('niru',42,4,1,'ನೀರು','niru','water','Ask ondu niru kodi.','word'),
  ('beku',42,4,2,'ಬೇಕು','beku','I want','Opposite is beda, do not want.','word'),
  ('kafi',51,5,0,'ಕಾಫಿ','kafi','coffee','Filter coffee capital.','word'),
  ('ti',51,5,1,'ಟೀ','ti','tea','Also called chaha.','word'),
  ('halu',51,5,2,'ಹಾಲು','halu','milk','halu kafi is milk coffee.','word'),
  ('sakkare',52,5,0,'ಸಕ್ಕರೆ','sakkare','sugar','Say it before they pour.','word'),
  ('bisi',52,5,1,'ಬಿಸಿ','bisi','hot','bisi niru is hot water.','word'),
  ('sakkare-beda',52,5,2,'ಸಕ್ಕರೆ ಬೇಡ','sakkare beda','no sugar','beda means do not want.','phrase'),
  ('uta',61,6,0,'ಊಟ','uta','meal','uta agitha? means have you eaten?','word'),
  ('dose',61,6,1,'ದೋಸೆ','dose','dosa','Order ondu dose kodi.','word'),
  ('idli',61,6,2,'ಇಡ್ಲಿ','idli','idli','Breakfast staple.','word'),
  ('ruchi',62,6,0,'ರುಚಿ','ruchi','taste','tumba ruchi means very tasty.','word'),
  ('bill-kodi',62,6,1,'ಬಿಲ್ ಕೊಡಿ','bill kodi','give me the bill','End of the meal.','phrase'),
  ('innondu',62,6,2,'ಇನ್ನೊಂದು','innondu','one more','innondu kafi kodi.','word'),
  ('hana',71,7,0,'ಹಣ','hana','money','Cash in general.','word'),
  ('chillare',71,7,1,'ಚಿಲ್ಲರೆ','chillare','change','chillare illa means no change.','word'),
  ('card-nadeyutta',71,7,2,'ಕಾರ್ಡ್ ನಡೆಯುತ್ತಾ?','card nadeyutta?','do you accept card?','nadeyutta means does it work.','phrase'),
  ('eshtu-ayitu',72,7,0,'ಎಷ್ಟು ಆಯಿತು?','eshtu ayitu?','how much was it?','Ask at the counter.','phrase'),
  ('illi-kodi',72,7,1,'ಇಲ್ಲಿ ಕೊಡಿ','illi kodi','give it here','illi means here.','phrase'),
  ('sariyagide',72,7,2,'ಸರಿಯಾಗಿದೆ','sariyagide','it is correct','Confirm the amount.','word'),
  ('auto',81,8,0,'ಆಟೋ','auto','auto rickshaw','Say it exactly like that.','word'),
  ('ellige',81,8,1,'ಎಲ್ಲಿಗೆ?','ellige?','where to?','The driver asks this first.','word'),
  ('meter-haki',81,8,2,'ಮೀಟರ್ ಹಾಕಿ','meter haki','put the meter on','Confident and polite.','phrase'),
  ('illi-nillisi',82,8,0,'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ','illi nillisi','stop here','Use it as you arrive.','phrase'),
  ('hogabeku',82,8,1,'ಹೋಗಬೇಕು','hogabeku','I need to go','Majestic-ge hogabeku.','word'),
  ('eshtu-aguttade',82,8,2,'ಎಷ್ಟು ಆಗುತ್ತದೆ?','eshtu aguttade?','how much will it be?','Ask before getting in.','phrase');