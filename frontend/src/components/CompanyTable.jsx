import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

export function CompanyTable({ companies, sortConfig, onSort }) {
  const getSortIcon = (field) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown size={16} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={16} className="text-blue-600" />
    ) : (
      <ArrowDown size={16} className="text-blue-600" />
    );
  };

  const SortableHeader = ({ field, label }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        {getSortIcon(field)}
      </div>
    </th>
  );

  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No companies found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="name" label="Company Name" />
              <SortableHeader field="industry" label="Industry" />
              <SortableHeader field="location" label="Location" />
              <SortableHeader field="employee_count" label="Employees" />
              <SortableHeader field="founded_year" label="Founded" />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{company.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {company.industry}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {company.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {company.employee_count.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {company.founded_year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Visit
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
