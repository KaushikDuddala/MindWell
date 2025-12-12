-- Add approval_status column to counselor_profiles
ALTER TABLE counselor_profiles 
ADD COLUMN approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Create index for faster queries
CREATE INDEX idx_counselor_profiles_approval_status ON counselor_profiles(approval_status);

-- Update existing counselors to 'approved' status
UPDATE counselor_profiles SET approval_status = 'approved';
