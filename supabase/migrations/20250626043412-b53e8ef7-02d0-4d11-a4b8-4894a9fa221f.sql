
-- Create a table for services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  category TEXT,
  hourly_rate DECIMAL(10,2),
  location TEXT,
  image_url TEXT,
  availability_status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to view services (for client page)
CREATE POLICY "Anyone can view services" 
  ON public.services 
  FOR SELECT 
  USING (true);

-- Create policy that allows providers to create their own services
CREATE POLICY "Providers can create their own services" 
  ON public.services 
  FOR INSERT 
  WITH CHECK (auth.uid() = provider_id);

-- Create policy that allows providers to update their own services
CREATE POLICY "Providers can update their own services" 
  ON public.services 
  FOR UPDATE 
  USING (auth.uid() = provider_id);

-- Create policy that allows providers to delete their own services
CREATE POLICY "Providers can delete their own services" 
  ON public.services 
  FOR DELETE 
  USING (auth.uid() = provider_id);
