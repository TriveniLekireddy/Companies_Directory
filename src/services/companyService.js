import { supabase } from '../lib/supabase';

export const companyService = {
  async getAllCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch companies: ${error.message}`);
    }

    return data || [];
  },

  async getUniqueIndustries() {
    const { data, error } = await supabase
      .from('companies')
      .select('industry');

    if (error) {
      throw new Error(`Failed to fetch industries: ${error.message}`);
    }

    const industries = [...new Set(data.map(item => item.industry))];
    return industries.sort();
  },

  async getUniqueLocations() {
    const { data, error } = await supabase
      .from('companies')
      .select('location');

    if (error) {
      throw new Error(`Failed to fetch locations: ${error.message}`);
    }

    const locations = [...new Set(data.map(item => item.location))];
    return locations.sort();
  },
};
