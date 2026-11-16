import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 overflow-x-auto scrollbar-hide py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
      {/* Home link */}
      <Link href="/" className="flex items-center hover:text-foreground transition-colors whitespace-nowrap flex-shrink-0">
        <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
        <span className="hidden xs:inline">Trang chủ</span>
      </Link>
      
      {/* Breadcrumb items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center flex-shrink-0">
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 mx-1 sm:mx-2" />
            {item.href ? (
              <Link 
                href={item.href} 
                className={`hover:text-foreground transition-colors whitespace-nowrap ${
                  isLast ? 'font-medium text-foreground' : ''
                }`}
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className="text-foreground font-medium whitespace-nowrap"
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
