import { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, List, Building2 } from 'lucide-react';
import { companyService } from './services/companyService';
import { FilterControls } from './components/FilterControls';
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
    if (isInfiniteScroll) return filteredAndSortedCompanies.slice(0, currentPage * itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCompanies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCompanies, currentPage, isInfiniteScroll]);

  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);

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

  // Infinite scroll effect
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
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              industries={industries}
              locations={locations}
            />

            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredAndSortedCompanies.length}
                </span>{' '}
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

            {/* Animated Grid/Table */}
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

            {/* Pagination */}
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
