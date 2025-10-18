import { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, List, Building2, Search, X, Filter } from 'lucide-react';
import { companyService } from './services/companyService';
import { CompanyGrid } from './components/CompanyGrid';
import { CompanyTable } from './components/CompanyTable';
import { Pagination } from './components/Pagination';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    location: '',
    employeeRange: '',
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'name',
    direction: 'asc',
  });
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 9;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [companiesData, industriesData, locationsData] = await Promise.all([
        companyService.getAllCompanies(),
        companyService.getUniqueIndustries(),
        companyService.getUniqueLocations(),
      ]);
      setCompanies(companiesData);
      setIndustries(industriesData);
      setLocations(locationsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    handleFilterChange({
      search: '',
      industry: '',
      location: '',
      employeeRange: '',
    });
  };

  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...companies];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((company) =>
        company.name.toLowerCase().includes(searchLower)
      );
    }

    if (filters.industry) {
      result = result.filter((company) => company.industry === filters.industry);
    }

    if (filters.location) {
      result = result.filter((company) => company.location === filters.location);
    }

    if (filters.employeeRange) {
      result = result.filter((company) => {
        const count = company.employee_count;
        switch (filters.employeeRange) {
          case '0-100':
            return count >= 0 && count <= 100;
          case '101-500':
            return count >= 101 && count <= 500;
          case '501-1000':
            return count >= 501 && count <= 1000;
          case '1001+':
            return count >= 1001;
          default:
            return true;
        }
      });
    }

    result.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [companies, filters, sortConfig]);

  const paginatedCompanies = useMemo(() => {
    if (isInfiniteScroll)
      return filteredAndSortedCompanies.slice(0, currentPage * itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCompanies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCompanies, currentPage, isInfiniteScroll]);

  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);

  useEffect(() => {
    if (!isInfiniteScroll) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInfiniteScroll, currentPage, totalPages]);

  const hasActiveFilters =
    filters.search || filters.industry || filters.location || filters.employeeRange;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Companies Directory</h1>
              <p className="text-gray-600 mt-1">
                Browse and filter through {companies.length} companies across various industries
              </p>
            </div>
          </div>
        </header>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadData} />
        ) : (
          <>
            {/* Toggle Filters Button with Icon */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-colors"
              >
                <Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Company</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
                        placeholder="Search by name..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={filters.industry}
                      onChange={(e) => handleFilterChange({ ...filters, industry: e.target.value })}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      value={filters.location}
                      onChange={(e) => handleFilterChange({ ...filters, location: e.target.value })}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                    <select
                      value={filters.employeeRange}
                      onChange={(e) => handleFilterChange({ ...filters, employeeRange: e.target.value })}
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
            )}

            {/* Companies Grid/Table */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredAndSortedCompanies.length}</span>{' '}
                {filteredAndSortedCompanies.length === 1 ? 'company' : 'companies'} found
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all text-sm font-medium ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <LayoutGrid size={18} />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all text-sm font-medium ${
                      viewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <List size={18} />
                    Table
                  </button>
                </div>

                {viewMode === 'grid' && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm font-medium">View Mode:</span>
                    <button
                      onClick={() => setIsInfiniteScroll(false)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                        !isInfiniteScroll
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Pagination
                    </button>
                    <button
                      onClick={() => setIsInfiniteScroll(true)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                        isInfiniteScroll
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Infinite Scroll
                    </button>
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key={`grid-${isInfiniteScroll}-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyGrid companies={paginatedCompanies} />
                </motion.div>
              ) : (
                <motion.div
                  key={`table-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyTable
                    companies={paginatedCompanies}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {viewMode === 'grid' && !isInfiniteScroll && totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredAndSortedCompanies.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
