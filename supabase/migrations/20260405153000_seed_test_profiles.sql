begin;

create extension if not exists pgcrypto;

alter table public.profiles
  add column if not exists onboarding_completed_at timestamptz;

do $$
declare
  managed_emails constant text[] := array[
    'abby.demo@gotwo.local',
    'jules.demo@gotwo.local',
    'harper.test@gotwo.local',
    'rowan.test@gotwo.local'
  ];
  managed_user_ids uuid[];
  managed_connection_ids uuid[];
begin
  select coalesce(array_agg(id), array[]::uuid[])
  into managed_user_ids
  from auth.users
  where email = any(managed_emails);

  managed_user_ids := managed_user_ids || array[
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01'::uuid,
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02'::uuid
  ];

  select coalesce(array_agg(id), array[]::uuid[])
  into managed_connection_ids
  from public.user_connections
  where inviter_id = any(managed_user_ids)
     or invitee_id = any(managed_user_ids);

  delete from public.shared_saved_product_cards
  where user_connection_id = any(managed_connection_ids)
     or owner_user_id = any(managed_user_ids)
     or connection_user_id = any(managed_user_ids);

  delete from public.shared_connection_profile_fields
  where user_connection_id = any(managed_connection_ids)
     or owner_user_id = any(managed_user_ids)
     or connection_user_id = any(managed_user_ids);

  delete from public.shared_connection_derivations
  where user_connection_id = any(managed_connection_ids)
     or owner_user_id = any(managed_user_ids)
     or connection_user_id = any(managed_user_ids);

  delete from public.connection_access_settings
  where user_connection_id = any(managed_connection_ids)
     or owner_user_id = any(managed_user_ids)
     or connection_user_id = any(managed_user_ids);

  delete from public.connection_recommendations
  where couple_id = any(managed_connection_ids)
     or viewer_user_id = any(managed_user_ids)
     or connection_user_id = any(managed_user_ids);

  delete from public.connection_invite_events
  where couple_id = any(managed_connection_ids)
     or owner_user_id = any(managed_user_ids)
     or invitee_user_id = any(managed_user_ids);

  delete from public.connection_share_tokens
  where owner_user_id = any(managed_user_ids);

  delete from public.user_connections
  where id = any(managed_connection_ids)
     or inviter_id = any(managed_user_ids)
     or invitee_id = any(managed_user_ids);

  delete from public.notifications
  where user_id = any(managed_user_ids);

  delete from public.weekly_recommendations
  where user_id = any(managed_user_ids);

  delete from public.saved_product_cards
  where user_id = any(managed_user_ids);

  delete from public.know_me_responses
  where user_id = any(managed_user_ids);

  delete from public.onboarding_responses
  where user_id = any(managed_user_ids);

  delete from public.knowledge_derivations
  where user_id = any(managed_user_ids);

  delete from public.user_preferences
  where user_id = any(managed_user_ids);

  delete from public.user_settings
  where user_id = any(managed_user_ids);

  delete from public.user_discovery_contacts
  where user_id = any(managed_user_ids);

  delete from public.user_discovery_settings
  where user_id = any(managed_user_ids);

  delete from public.calendar_events
  where user_id = any(managed_user_ids);

  delete from public.calendar_accounts
  where user_id = any(managed_user_ids);

  delete from public.external_calendar_events
  where user_id = any(managed_user_ids);

  delete from public.profiles
  where user_id = any(managed_user_ids);

  delete from auth.identities
  where user_id = any(managed_user_ids);

  delete from auth.users
  where id = any(managed_user_ids);
end $$;

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'authenticated',
    'authenticated',
    'harper.test@gotwo.local',
    crypt('GoTwoTest!2026', gen_salt('bf')),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"display_name":"Harper Test Profile","test_profile":true,"test_profile_label":"test-profile","test_profile_seed":"harper.test@gotwo.local"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'authenticated',
    'authenticated',
    'rowan.test@gotwo.local',
    crypt('GoTwoTest!2026', gen_salt('bf')),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"display_name":"Rowan Test Profile","test_profile":true,"test_profile_label":"test-profile","test_profile_seed":"rowan.test@gotwo.local"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
values
  (
    '88d9d087-1c92-4f41-9cc0-3c1e679aa101',
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    '{"sub":"6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01","email":"harper.test@gotwo.local","email_verified":true,"phone_verified":false}'::jsonb,
    'email',
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    now(),
    now(),
    now()
  ),
  (
    '9a869c62-e3b7-4364-8a4a-236eb1d9b202',
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    '{"sub":"7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02","email":"rowan.test@gotwo.local","email_verified":true,"phone_verified":false}'::jsonb,
    'email',
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    now(),
    now(),
    now()
  );

insert into public.profiles (
  user_id,
  display_name,
  avatar_url,
  gender,
  age,
  birthday,
  anniversary,
  onboarding_completed_at,
  created_at,
  updated_at
)
values
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'Harper Test Profile',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Harper%20Test%20Profile',
    'female',
    31,
    '1994-08-22',
    '2020-06-14',
    now(),
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'Rowan Test Profile',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Rowan%20Test%20Profile',
    'non-binary',
    35,
    '1991-02-11',
    '2022-10-02',
    now(),
    now(),
    now()
  );

insert into public.user_discovery_settings (
  user_id,
  allow_name_discovery,
  allow_phone_discovery,
  share_avatar_in_discovery,
  created_at,
  updated_at
)
values
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', true, true, true, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', true, true, true, now(), now());

insert into public.user_discovery_contacts (
  user_id,
  phone_raw,
  phone_search_normalized,
  created_at,
  updated_at
)
values
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', '(312) 555-0101', '3125550101', now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', '(312) 555-0102', '3125550102', now(), now());

insert into public.user_settings (
  user_id,
  gift_reminders,
  connection_activity,
  recommendations,
  email_digests,
  share_prefs,
  share_wishlist,
  visible_profile,
  created_at,
  updated_at
)
values
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', true, true, true, false, true, true, true, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', true, true, true, false, true, true, true, now(), now());

insert into public.onboarding_responses (
  user_id,
  question_key,
  response_value,
  created_at,
  updated_at
)
values
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'identity', to_jsonb('female'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'birthday', to_jsonb('1994-08-22'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'anniversary', to_jsonb('2020-06-14'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'style-personality', '["classic","minimal","luxury"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'daily-vibe', '["polished","professional"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'spending-mindset', to_jsonb('quality'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'purchase-values', '["fit","timeless","comfort"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'free-time', '["dining","traveling","events"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'gift-preference', to_jsonb('thoughtful'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'aesthetic-lean', '["elegant","minimal"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'identity', to_jsonb('non-binary'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'birthday', to_jsonb('1991-02-11'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'anniversary', to_jsonb('2022-10-02'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'style-personality', '["sporty","edgy","laid-back"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'daily-vibe', '["creative","chill"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'spending-mindset', to_jsonb('balanced'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'purchase-values', '["comfort","price","trend"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'free-time', '["outdoors","fitness","staying-in"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'gift-preference', to_jsonb('experience'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'aesthetic-lean', '["street","boho"]'::jsonb, now(), now());

insert into public.know_me_responses (
  user_id,
  question_key,
  response_value,
  created_at,
  updated_at
)
values
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-01', '["classic","minimalist","trendy"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-02', to_jsonb('navy'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-04', to_jsonb('tailored'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-05', to_jsonb('linen'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-06', '["sneakers","boots","heels"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-10', '["luxury","sustainable","high-street"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-11', to_jsonb('gold'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-13', to_jsonb('put-together'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'sf-14', to_jsonb('fresh'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'fd-02', to_jsonb('japanese'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'fd-04', to_jsonb('iced'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'fd-05', '["none"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'fd-06', to_jsonb('dine-out'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'fd-07', to_jsonb('cocktails'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'fd-12', to_jsonb('fine-dining'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'fd-17', '["olives"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'gw-01', '["experiences","luxury","handmade"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'gw-04', to_jsonb('100-250'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'gw-05', to_jsonb('spa'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'gw-06', to_jsonb('always-updated'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'gw-11', to_jsonb('shows-listening'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'hl-01', to_jsonb('modern-minimal'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'hl-04', to_jsonb('woodsy'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'hl-07', to_jsonb('luxury-hotel'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'hl-16', to_jsonb('intimate'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'en-01', to_jsonb('reading'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'en-02', '["romance","documentary","indie"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'en-03', '["pop","indie","classical"]'::jsonb, now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'en-11', to_jsonb('dinner-out'::text), now(), now()),
  ('6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01', 'en-20', to_jsonb('self-care'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-01', '["minimalist","sporty","bohemian"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-02', to_jsonb('earth-tones'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-04', to_jsonb('relaxed'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-05', to_jsonb('athletic'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-06', '["sneakers","boots"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-10', '["athletic","vintage","indie"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-11', to_jsonb('mixed'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-13', to_jsonb('outdoorsy'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'sf-17', to_jsonb('balanced'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'fd-02', to_jsonb('mediterranean'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'fd-04', to_jsonb('tea'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'fd-05', '["vegetarian"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'fd-06', to_jsonb('home-cook'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'fd-07', to_jsonb('non-alcoholic'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'fd-14', to_jsonb('curry'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'gw-01', '["experiences","tech","practical"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'gw-05', to_jsonb('adventure'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'gw-06', to_jsonb('mental'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'gw-08', to_jsonb('plants-better'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'hl-01', to_jsonb('cozy-warm'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'hl-06', to_jsonb('few-easy'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'hl-08', to_jsonb('blender'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'hl-13', to_jsonb('some'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'hl-20', to_jsonb('fire-pit'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'en-01', to_jsonb('music'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'en-03', '["rock","electronic","indie"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'en-04', to_jsonb('outdoors'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'en-08', to_jsonb('board-games'::text), now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'en-13', '["hiking","cycling","yoga"]'::jsonb, now(), now()),
  ('7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02', 'en-18', to_jsonb('bucket-list'::text), now(), now());

insert into public.knowledge_derivations (
  user_id,
  derivation_key,
  derivation_payload,
  source_snapshot,
  created_at,
  updated_at
)
values
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'your_vibe',
    '{
      "persona_summary":"Harper is a polished, quietly luxe test profile with a strong point of view around refined basics, fresh beauty, special dinners, and gifts that feel intentional instead of loud.",
      "recommended_brands":["Aritzia","Reformation","Sezane","Mejuri","Jenni Kayne"],
      "recommended_stores":["Nordstrom","Shopbop","Anthropologie"],
      "image_themes":["coastal hotel","soft tailoring","elevated neutrals"],
      "color_palette":["ivory","navy","camel","soft black"],
      "gift_categories":["fine jewelry","luxury sleepwear","dining experiences"],
      "price_tier":"premium",
      "style_keywords":["polished","minimal","soft luxury","romantic","refined"]
    }'::jsonb,
    '{"source_kind":"test-profile-seed","profile_email":"harper.test@gotwo.local"}'::jsonb,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'your_vibe',
    '{
      "persona_summary":"Rowan is a creative, outdoors-leaning test profile who blends practical gear, warm home comfort, subtle tech, and experience-first gifting into one flexible personality.",
      "recommended_brands":["Patagonia","REI","Muji","Uniqlo","Bellroy"],
      "recommended_stores":["REI","Apple","Muji","Everlane"],
      "image_themes":["trail weekend","earth tones","cozy fire pit"],
      "color_palette":["olive","stone","black","warm rust"],
      "gift_categories":["travel gear","smart home","outdoor experiences"],
      "price_tier":"mid-range",
      "style_keywords":["functional","creative","relaxed","modern","outdoor"]
    }'::jsonb,
    '{"source_kind":"test-profile-seed","profile_email":"rowan.test@gotwo.local"}'::jsonb,
    now(),
    now()
  );

insert into public.weekly_recommendations (
  user_id,
  week_start,
  generated_at,
  updated_at,
  products
)
values
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    (current_date - ((extract(dow from current_date)::int + 6) % 7)),
    now(),
    now(),
    '[
      {
        "name":"Mini leather shoulder bag",
        "brand":"Coach",
        "price":"$295",
        "category":"clothes",
        "hook":"An everyday polish piece that still feels special.",
        "why":"Fits Harper''s refined, quietly luxe style and her preference for practical gifts with beautiful execution.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"harper-test-v2"
      },
      {
        "name":"Gold huggie earrings",
        "brand":"Mejuri",
        "price":"$98",
        "category":"clothes",
        "hook":"An easy win for her daily jewelry stack.",
        "why":"Harper consistently signals gold jewelry, polished styling, and repeat-wear accessories.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"harper-test-v2"
      },
      {
        "name":"Silk pajama short set",
        "brand":"Lunya",
        "price":"$178",
        "category":"home",
        "hook":"Useful comfort that still reads elevated.",
        "why":"Matches Harper''s luxury-hotel home preferences and love of gifts that feel personal and indulgent.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"harper-test-v2"
      },
      {
        "name":"Chef''s tasting dinner for two",
        "brand":"Experiential",
        "price":"$250+",
        "category":"home",
        "hook":"A date-night pick that feels romantic without being generic.",
        "why":"She likes Japanese food, fine dining, cocktails, and thoughtful experiences more than novelty gifts.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"harper-test-v2"
      }
    ]'::jsonb
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    (current_date - ((extract(dow from current_date)::int + 6) % 7)),
    now(),
    now(),
    '[
      {
        "name":"Technical daypack",
        "brand":"Bellroy",
        "price":"$159",
        "category":"tech",
        "hook":"Clean enough for the city and practical enough for daily carry.",
        "why":"Matches Rowan''s interest in useful gear, balanced spending, and a minimalist sporty wardrobe.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"rowan-test-v2"
      },
      {
        "name":"Portable tea and coffee brewer",
        "brand":"Wacaco",
        "price":"$149",
        "category":"home",
        "hook":"A compact ritual piece for travel days.",
        "why":"Rowan likes tea, road and adventure energy, and objects that are genuinely usable.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"rowan-test-v2"
      },
      {
        "name":"National park cabin weekend",
        "brand":"Experiential",
        "price":"$220+",
        "category":"home",
        "hook":"An experience-first gift that still feels memorable.",
        "why":"Fits Rowan''s outdoors, hiking, fire-pit, and bucket-list signals better than another physical item.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"rowan-test-v2"
      },
      {
        "name":"Smart lamp starter set",
        "brand":"Philips Hue",
        "price":"$129",
        "category":"tech",
        "hook":"A practical comfort upgrade for home.",
        "why":"They like some smart-home tech, warm cozy rooms, and products that improve everyday routines.",
        "image_url":null,
        "source_kind":"test-seed",
        "source_version":"rowan-test-v2"
      }
    ]'::jsonb
  );

insert into public.saved_product_cards (
  user_id,
  product_card_key,
  subcategory_label,
  card_title,
  field_values,
  image_url,
  created_at,
  updated_at
)
values
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'clothing-tops',
    'Favorite tops',
    'Silk tanks and fitted knits',
    '{"Favorite silhouettes":"Silk shell, ribbed knit, slim cardigan","Colors":"Ivory, navy, camel","Avoid details":"Oversized logos, neon trim"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'shoe-sneakers',
    'Sneakers',
    'Clean white everyday sneakers',
    '{"Brand":"Veja, New Balance","Material":"Smooth leather or suede accents","Notes":"Minimal branding and a slim profile"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'jewelry-necklaces',
    'Jewelry',
    'Delicate gold layers',
    '{"Metal":"Yellow gold","Style":"Fine layered chains","Avoid":"Bulky statement pieces"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'coffee-order',
    'Coffee order',
    'Vanilla iced oat latte',
    '{"Size":"Medium","Sweetness":"Lightly sweet","Notes":"Extra shot if it is a long day"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'favorite-restaurants',
    'Restaurants',
    'Sushi nights and cozy Italian',
    '{"Favorite cuisine":"Japanese, Italian","Go-to order":"Spicy tuna crispy rice and cacio e pepe","Occasion":"Date night or celebratory dinner"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'birthday-preferences',
    'Birthday gifts',
    'Thoughtful over flashy',
    '{"Best gift energy":"Thoughtful, polished, useful","Avoid":"Gag gifts or clutter","Perfect plan":"Dinner reservation and one beautiful item"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'wish-list',
    'Wish list',
    'Weekend bag and silk pajamas',
    '{"Most wanted":"Structured weekend bag, silk sleep set","Price comfort":"$100-$350","Why":"Both would get used constantly"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '6e4a86c5-2c6d-4d16-93cc-2a4c4e6a7b01',
    'scent-perfume',
    'Fragrance',
    'Fresh skin scent',
    '{"Notes":"Musk, bergamot, soft floral","Intensity":"Clean and close to skin","Avoid":"Heavy gourmand or syrupy vanilla"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'brand-preferences',
    'Favorite brands',
    'Functional everyday staples',
    '{"Brands":"Patagonia, Muji, Uniqlo, Bellroy","Notes":"Practical, durable, clean lines"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'tech-phone',
    'Tech',
    'Simple gear, no clutter',
    '{"Devices":"iPhone, AirPods, Kindle","Notes":"Useful upgrades beat flashy gadgets"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'coffee-tea',
    'Drink order',
    'Matcha, jasmine tea, and bright pour-over',
    '{"Favorites":"Matcha, jasmine tea, bright pour-over coffee","Notes":"Not into syrup-heavy drinks"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'travel-mountain',
    'Trips',
    'Cabins, trails, and cold mornings',
    '{"Ideal trip":"Cabin stay with hiking and a fire pit","Pace":"Active day, calm evening","Avoid":"Crowded party destinations"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'favorite-meals',
    'Favorite meals',
    'Mediterranean bowls and curry nights',
    '{"Favorite cuisine":"Mediterranean, Indian-inspired comfort meals","At-home default":"Roasted vegetables, grains, yogurt sauces","Notes":"Vegetarian-friendly options matter"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'grocery-specifics',
    'Groceries',
    'Always keep the fridge stocked',
    '{"Staples":"Greek yogurt, berries, sparkling water, herbs","Snacks":"Trail mix, dark chocolate, hummus","Avoid":"Very sugary snacks"}'::jsonb,
    null,
    now(),
    now()
  ),
  (
    '7c4bb75f-50d7-4f7f-8ac4-41f8895f8d02',
    'wish-list',
    'Wish list',
    'Travel gear and a better reading lamp',
    '{"Most wanted":"Compact daypack, smart lamp, new hiking layers","Price comfort":"$50-$200","Why":"Useful upgrades get used right away"}'::jsonb,
    null,
    now(),
    now()
  );

commit;

-- Test login emails: harper.test@gotwo.local and rowan.test@gotwo.local
-- Test login password: GoTwoTest!2026
-- Codebase classification: dev-only SQL seed for Harper and Rowan test profiles on the Knowledge Center base.
