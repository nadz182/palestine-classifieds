import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import { Card } from '../ui/Card';

export function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Card
            key={category.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <div className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-primary-100 rounded-full">
                <Icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-xs text-gray-500">
                {category.subcategories.length} subcategories
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
