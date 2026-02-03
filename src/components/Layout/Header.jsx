import { Link } from 'react-router-dom';
import { MapPin, Plus, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <MapPin className="w-8 h-8" />
            <span className="text-xl font-bold">Palestine Classifieds</span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="secondary" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/create-ad">
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Post Ad</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
