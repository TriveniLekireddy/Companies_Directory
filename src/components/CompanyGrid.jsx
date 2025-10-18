import { CompanyCard } from './CompanyCard';

export function CompanyGrid({ companies }) {
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No companies found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company, index) => (
        <CompanyCard key={company.id} company={company} index={index} />
      ))}
    </div>
  );
}
