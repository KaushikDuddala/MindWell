-- Insert forum categories
INSERT INTO public.forum_categories (name, description, slug) VALUES
  ('Anxiety Support', 'Share experiences and coping strategies for anxiety', 'anxiety-support'),
  ('Depression & Mood', 'Discuss depression, mood disorders, and recovery', 'depression-mood'),
  ('Stress Management', 'Tips and techniques for managing daily stress', 'stress-management'),
  ('Self-Care', 'Share self-care practices and wellness routines', 'self-care'),
  ('Success Stories', 'Inspiring stories of overcoming mental health challenges', 'success-stories'),
  ('General Discussion', 'Open discussion about mental health topics', 'general-discussion')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample testimonials
INSERT INTO public.testimonials (author_name, content, is_approved, is_featured) VALUES
  ('Sarah M.', 'Finding support through this platform changed my life. The counselors are compassionate and truly understand what it''s like to struggle with anxiety. I''m grateful for the resources and community here.', true, true),
  ('Michael T.', 'After years of dealing with depression alone, I finally reached out. The appointment scheduling made it so easy to connect with a counselor. I''m now on a path to recovery and feeling hopeful.', true, true),
  ('Emily R.', 'The community forums provided a safe space where I could share my struggles without judgment. Knowing I''m not alone has been incredibly powerful in my healing journey.', true, true),
  ('James K.', 'I was hesitant about online counseling, but the professionals here are exceptional. The flexible scheduling and comfortable environment made all the difference in my mental health journey.', true, false)
ON CONFLICT DO NOTHING;
