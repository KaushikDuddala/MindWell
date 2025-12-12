-- Add a table for specific date overrides (blocked dates or special availability)
CREATE TABLE IF NOT EXISTS counselor_date_overrides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  counselor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  override_date DATE NOT NULL,
  is_available BOOLEAN DEFAULT false, -- false = blocked, true = special availability
  start_time TIME,
  end_time TIME,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(counselor_id, override_date)
);

-- Enable RLS
ALTER TABLE counselor_date_overrides ENABLE ROW LEVEL SECURITY;

-- Policies for date overrides
CREATE POLICY "counselor_date_overrides_select_all" ON counselor_date_overrides
  FOR SELECT USING (true);

CREATE POLICY "counselor_date_overrides_insert_own" ON counselor_date_overrides
  FOR INSERT WITH CHECK (auth.uid() = counselor_id);

CREATE POLICY "counselor_date_overrides_update_own" ON counselor_date_overrides
  FOR UPDATE USING (auth.uid() = counselor_id);

CREATE POLICY "counselor_date_overrides_delete_own" ON counselor_date_overrides
  FOR DELETE USING (auth.uid() = counselor_id);
