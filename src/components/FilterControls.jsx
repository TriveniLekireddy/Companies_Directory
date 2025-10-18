import { Search, X } from 'lucide-react';

export function FilterControls({ filters, onFilterChange, industries, locations }) {
  const handleSearchChange = (value) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleIndustryChange = (value) => {
    onFilterChange({ ...filters, industry: value });
  };

  const handleLocationChange = (value) => {
    onFilterChange({ ...filters, location: value });
  };

  const handleEmployeeRangeChange = (value) => {
    onFilterChange({ ...filters, employeeRange: value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      search: '',
      industry: '',
      location: '',
      employeeRange: '',
    });
  };

  const hasActiveFilters = filters.search || filters.industry || filters.location || filters.employeeRange;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Filter Companies</h2>
        {hasActiveFilters && (
  <button
    onClick={handleClearFilters}
    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-colors"
  >
    <X size={16} />
    Clear Filters
  </button>
)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Company
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="search"
              type="text"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            id="industry"
            value={filters.industry}
            onChange={(e) => handleIndustryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="employeeRange" className="block text-sm font-medium text-gray-700 mb-2">
            Employee Count
          </label>
          <select
            id="employeeRange"
            value={filters.employeeRange}
            onChange={(e) => handleEmployeeRangeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">All Sizes</option>
            <option value="0-100">0-100 employees</option>
            <option value="101-500">101-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1001+">1001+ employees</option>
          </select>
        </div>
      </div>
    </div>
  );
}
