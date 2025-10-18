/*
  # Create Companies Directory Database
  
  1. New Tables
    - `companies`
      - `id` (uuid, primary key) - Unique identifier for each company
      - `name` (text) - Company name
      - `industry` (text) - Industry sector
      - `location` (text) - Company location/city
      - `employee_count` (integer) - Number of employees
      - `founded_year` (integer) - Year company was founded
      - `description` (text) - Brief company description
      - `website` (text) - Company website URL
      - `created_at` (timestamp) - Record creation timestamp
      
  2. Security
    - Enable RLS on `companies` table
    - Add policy for public read access (directory is publicly viewable)
    
  3. Sample Data
    - Insert 25 diverse companies across various industries
*/

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text NOT NULL,
  location text NOT NULL,
  employee_count integer NOT NULL,
  founded_year integer NOT NULL,
  description text NOT NULL,
  website text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to companies directory
CREATE POLICY "Anyone can view companies"
  ON companies
  FOR SELECT
  USING (true);

-- Insert 25 sample companies
INSERT INTO companies (name, industry, location, employee_count, founded_year, description, website) VALUES
('TechVision Inc', 'Technology', 'San Francisco', 250, 2015, 'Leading AI and machine learning solutions provider', 'https://techvision.example.com'),
('GlobalFinance Corp', 'Finance', 'New York', 1500, 2008, 'International banking and financial services', 'https://globalfinance.example.com'),
('HealthCare Plus', 'Healthcare', 'Boston', 800, 2012, 'Innovative healthcare technology and services', 'https://healthcareplus.example.com'),
('EcoEnergy Solutions', 'Energy', 'Austin', 350, 2017, 'Renewable energy and sustainability solutions', 'https://ecoenergy.example.com'),
('FoodDelights Co', 'Food & Beverage', 'Chicago', 120, 2019, 'Organic food products and restaurant chain', 'https://fooddelights.example.com'),
('AutoDrive Motors', 'Automotive', 'Detroit', 2000, 2005, 'Electric vehicle manufacturer', 'https://autodrive.example.com'),
('CloudSpace Networks', 'Technology', 'Seattle', 450, 2016, 'Cloud infrastructure and networking solutions', 'https://cloudspace.example.com'),
('RetailMax Group', 'Retail', 'Los Angeles', 5000, 2000, 'Multi-brand retail and e-commerce platform', 'https://retailmax.example.com'),
('EduLearn Platform', 'Education', 'Austin', 180, 2018, 'Online learning and educational technology', 'https://edulearn.example.com'),
('MediaStream Studios', 'Entertainment', 'Los Angeles', 600, 2013, 'Digital media production and streaming services', 'https://mediastream.example.com'),
('ConstructBuild Ltd', 'Construction', 'Houston', 900, 2010, 'Commercial and residential construction', 'https://constructbuild.example.com'),
('FashionForward Brands', 'Fashion', 'New York', 300, 2014, 'Contemporary fashion and lifestyle brands', 'https://fashionforward.example.com'),
('BioPharm Research', 'Pharmaceuticals', 'Boston', 1200, 2007, 'Biotechnology and pharmaceutical research', 'https://biopharm.example.com'),
('TravelEase Ventures', 'Travel & Tourism', 'Miami', 220, 2016, 'Travel booking and tourism services', 'https://travelease.example.com'),
('CyberSecure Systems', 'Cybersecurity', 'San Francisco', 400, 2015, 'Enterprise cybersecurity solutions', 'https://cybersecure.example.com'),
('AgriGrow Innovations', 'Agriculture', 'Des Moines', 150, 2017, 'Sustainable agriculture technology', 'https://agrigrow.example.com'),
('SportsFit Equipment', 'Sports & Fitness', 'Denver', 280, 2011, 'Athletic equipment and fitness solutions', 'https://sportsfit.example.com'),
('InsureTech Partners', 'Insurance', 'Chicago', 650, 2009, 'Digital insurance and risk management', 'https://insuretech.example.com'),
('LogiChain Global', 'Logistics', 'Seattle', 1800, 2006, 'International logistics and supply chain', 'https://logichain.example.com'),
('PropTech Realty', 'Real Estate', 'New York', 320, 2018, 'Real estate technology and property management', 'https://proptech.example.com'),
('GameStudio Interactive', 'Gaming', 'San Francisco', 500, 2014, 'Video game development and publishing', 'https://gamestudio.example.com'),
('LegalTech Solutions', 'Legal Services', 'Washington DC', 180, 2016, 'Legal technology and practice management', 'https://legaltech.example.com'),
('GreenSpace Design', 'Architecture', 'Portland', 95, 2019, 'Sustainable architecture and urban design', 'https://greenspace.example.com'),
('AeroTech Industries', 'Aerospace', 'Houston', 1100, 2008, 'Aerospace engineering and manufacturing', 'https://aerotech.example.com'),
('ChemCore Materials', 'Chemicals', 'Dallas', 750, 2010, 'Specialty chemicals and materials science', 'https://chemcore.example.com');