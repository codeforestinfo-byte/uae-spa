-- ============================================
-- SPA Booking System - Database Schema
-- ============================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  area TEXT,
  city TEXT DEFAULT 'Abu Dhabi',
  preferences TEXT[],
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- User appointments history view
CREATE VIEW user_appointments_view AS
SELECT
  a.id,
  a.client_id,
  a.service_id,
  s.name AS service_name,
  a.therapist_id,
  t.name AS therapist_name,
  a.appointment_date,
  a.appointment_time,
  a.address,
  a.area,
  a.payment_method,
  a.payment_status,
  a.status,
  a.notes,
  a.created_at
FROM appointments a
LEFT JOIN services s ON a.service_id = s.id
LEFT JOIN therapists t ON a.therapist_id = t.id;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id),
  popular BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Therapists
CREATE TABLE IF NOT EXISTS therapists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  nationality TEXT,
  specialties TEXT[],
  rating DECIMAL(3,2) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  avatar_url TEXT,
  status TEXT DEFAULT 'available',
  next_available_time TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Therapist service mapping
CREATE TABLE IF NOT EXISTS therapist_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE(therapist_id, service_id)
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  service_id UUID REFERENCES services(id),
  therapist_id UUID REFERENCES therapists(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  address TEXT,
  area TEXT,
  payment_method TEXT DEFAULT 'cash',
  payment_status TEXT DEFAULT 'pending',
  transaction_id TEXT,
  status TEXT DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  treatment TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Vouchers / Gift Cards
CREATE TABLE IF NOT EXISTS vouchers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  recipient_name TEXT,
  recipient_email TEXT,
  sender_name TEXT,
  sender_message TEXT,
  is_gift BOOLEAN DEFAULT true,
  redeemed BOOLEAN DEFAULT false,
  purchase_date TIMESTAMPTZ DEFAULT now()
);

-- Abu Dhabi areas
CREATE TABLE IF NOT EXISTS areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read therapists" ON therapists FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read vouchers" ON vouchers FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read areas" ON areas FOR SELECT USING (true);

-- Insert seed data
INSERT INTO categories (name) VALUES
  ('Lava Clamshell Massage'),
  ('Spa Highlights'),
  ('Leisure Packages'),
  ('Single Massage'),
  ('Couple Massage'),
  ('Combination Packages'),
  ('VIP Signature Services'),
  ('30-Minute Combo Treatments')
ON CONFLICT (name) DO NOTHING;

INSERT INTO areas (name) VALUES
  ('Al Zahiyah'),
  ('Al Khalidiyah'),
  ('Al Reem Island'),
  ('Al Maryah Island'),
  ('Saadiyat Island'),
  ('Yas Island'),
  ('Al Bateen'),
  ('Al Mushrif'),
  ('Al Muroor'),
  ('Mohammed Bin Zayed City'),
  ('Khalifa City'),
  ('Al Raha Beach')
ON CONFLICT (name) DO NOTHING;

INSERT INTO services (name, description, duration, price, category_id, popular) VALUES
  ('Lava Clamshell Treatment Massage', 'Our signature treatment using heated natural clamshells and organic aromatherapy oils.', 90, 350, (SELECT id FROM categories WHERE name = 'Lava Clamshell Massage'), true),
  ('Lava Clamshell Premium Session', 'Extended clamshell therapy combined with focused head-and-foot reflexology.', 120, 450, (SELECT id FROM categories WHERE name = 'Lava Clamshell Massage'), false),
  ('Lymphatic Drainage Detox Massage', 'Gentle rhythmic massage technique that stimulates lymph flow.', 75, 290, (SELECT id FROM categories WHERE name = 'Spa Highlights'), true),
  ('Anti-Cellulite Maderotherapy', 'Body-contouring treatment using custom anatomical wooden rollers.', 60, 280, (SELECT id FROM categories WHERE name = 'Spa Highlights'), false),
  ('Classic Relaxation Swedish Massage', 'Long flowing strokes designed to relax the entire body.', 60, 200, (SELECT id FROM categories WHERE name = 'Single Massage'), true),
  ('Deep Tissue & Sports Recovery Massage', 'Intense pressure targeting the deepest layers of muscle tissue.', 75, 260, (SELECT id FROM categories WHERE name = 'Single Massage'), false),
  ('Luxury Couple Royal Home Spa', 'Double relaxation journey with two dedicated therapists.', 90, 520, (SELECT id FROM categories WHERE name = 'Couple Massage'), true),
  ('Quick Tension Release (Neck & Back)', 'Targeted deep therapy for tight knots.', 30, 130, (SELECT id FROM categories WHERE name = '30-Minute Combo Treatments'), false),
  ('Revitalizing Foot Reflexology', 'Stimulates acupressure zones to reset energy levels.', 30, 120, (SELECT id FROM categories WHERE name = '30-Minute Combo Treatments'), false),
  ('Signature Combination Massage', 'Blend of Thai stretching, Balinese pressure, and Swedish strokes.', 90, 320, (SELECT id FROM categories WHERE name = 'Combination Packages'), false),
  ('Innovative Elite 4-Hand Massage', 'Two expert therapists coordinate in perfect unison.', 75, 490, (SELECT id FROM categories WHERE name = 'VIP Signature Services'), true)
ON CONFLICT DO NOTHING;

INSERT INTO therapists (name, nationality, specialties, rating, reviews_count, avatar_url, status, next_available_time, bio) VALUES
  ('Maria', 'Filipino', '{Lava Clamshell,Relaxation Massage,VIP Signature}', 4.9, 184, 'https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-19-1-470x470.jpg', 'available', NULL, 'Specializing in hot stone therapy and deep relaxation techniques with over 8 years of experience.'),
  ('Siti', 'Indonesian', '{Balinese Massage,Couple Massage,Spa Highlights}', 4.8, 142, 'https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-27-180x180.jpg', 'unavailable', 'Today 6:30 PM', 'Master of traditional Balinese and Indonesian spa rituals with a gentle, healing touch.'),
  ('Nalin', 'Thai', '{Thai Stretching,Lymphatic Drainage,Combo Packages}', 4.9, 198, 'https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-20-1-470x470.jpg', 'available', NULL, 'Expert in Thai yoga massage and lymphatic drainage therapy with 10+ years of practice.'),
  ('Linh', 'Vietnamese', '{Anti-Cellulite Maderotherapy,VIP Signature,30-min Combos}', 4.9, 130, 'https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-26-180x180.jpg', 'unavailable', 'Tomorrow 10:00 AM', 'Certified maderotherapy specialist focusing on body sculpting and cellulite reduction.'),
  ('Amara', 'Thai', '{Aromatherapy,Couple Massage,Hot Stone Therapy}', 4.9, 156, 'https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-18-1-470x470.jpg', 'available', NULL, 'Holistic wellness therapist trained in aromatherapy and couple massage techniques.')
ON CONFLICT DO NOTHING;
