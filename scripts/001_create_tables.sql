-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  user_type TEXT CHECK (user_type IN ('user', 'counselor', 'admin')) DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create counselor_profiles table
CREATE TABLE IF NOT EXISTS public.counselor_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  bio TEXT,
  specializations TEXT[],
  credentials TEXT,
  phone TEXT,
  location TEXT,
  years_experience INTEGER,
  is_accepting_patients BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create availability slots for counselors
CREATE TABLE IF NOT EXISTS public.counselor_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  counselor_id UUID REFERENCES public.counselor_profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(counselor_id, day_of_week, start_time, end_time)
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  counselor_id UUID REFERENCES public.counselor_profiles(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum categories
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum posts
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum replies
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  category TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Counselor profiles policies (public read, counselor write)
CREATE POLICY "counselor_profiles_select_all" ON public.counselor_profiles FOR SELECT USING (true);
CREATE POLICY "counselor_profiles_insert_own" ON public.counselor_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "counselor_profiles_update_own" ON public.counselor_profiles FOR UPDATE USING (auth.uid() = id);

-- Counselor availability policies
CREATE POLICY "counselor_availability_select_all" ON public.counselor_availability FOR SELECT USING (true);
CREATE POLICY "counselor_availability_insert_own" ON public.counselor_availability FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.counselor_profiles WHERE id = counselor_id AND id = auth.uid())
);
CREATE POLICY "counselor_availability_update_own" ON public.counselor_availability FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.counselor_profiles WHERE id = counselor_id AND id = auth.uid())
);
CREATE POLICY "counselor_availability_delete_own" ON public.counselor_availability FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.counselor_profiles WHERE id = counselor_id AND id = auth.uid())
);

-- Appointments policies
CREATE POLICY "appointments_select_own" ON public.appointments FOR SELECT USING (
  auth.uid() = user_id OR auth.uid() = counselor_id
);
CREATE POLICY "appointments_insert_users" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "appointments_update_own" ON public.appointments FOR UPDATE USING (
  auth.uid() = user_id OR auth.uid() = counselor_id
);
CREATE POLICY "appointments_delete_own" ON public.appointments FOR DELETE USING (
  auth.uid() = user_id OR auth.uid() = counselor_id
);

-- Forum categories policies (public read, admin write)
CREATE POLICY "forum_categories_select_all" ON public.forum_categories FOR SELECT USING (true);

-- Forum posts policies
CREATE POLICY "forum_posts_select_all" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "forum_posts_insert_authenticated" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "forum_posts_update_own" ON public.forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "forum_posts_delete_own" ON public.forum_posts FOR DELETE USING (auth.uid() = author_id);

-- Forum replies policies
CREATE POLICY "forum_replies_select_all" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "forum_replies_insert_authenticated" ON public.forum_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "forum_replies_update_own" ON public.forum_replies FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "forum_replies_delete_own" ON public.forum_replies FOR DELETE USING (auth.uid() = author_id);

-- Blog posts policies
CREATE POLICY "blog_posts_select_published" ON public.blog_posts FOR SELECT USING (
  is_published = true OR auth.uid() = author_id
);
CREATE POLICY "blog_posts_insert_authenticated" ON public.blog_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "blog_posts_update_own" ON public.blog_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "blog_posts_delete_own" ON public.blog_posts FOR DELETE USING (auth.uid() = author_id);

-- Testimonials policies
CREATE POLICY "testimonials_select_approved" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "testimonials_insert_all" ON public.testimonials FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_counselor_id ON public.appointments(counselor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_forum_posts_category_id ON public.forum_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_post_id ON public.forum_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published, published_at);
