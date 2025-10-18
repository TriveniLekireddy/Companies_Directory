import { Building2, MapPin, Users, Calendar, ExternalLink } from 'lucide-react';

export function CompanyCard({ company, index }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden opacity-0 animate-fadeInUp"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {company.name}
              </h3>
              <p className="text-sm text-gray-500">{company.industry}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} className="text-gray-400 flex-shrink-0" />
            <span>{company.employee_count.toLocaleString()} employees</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-gray-400 flex-shrink-0" />
            <span>Founded in {company.founded_year}</span>
          </div>
        </div>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Visit Website
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
