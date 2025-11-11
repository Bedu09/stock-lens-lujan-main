import { Package, MapPin, Hash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const stockStatus = product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'destructive';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
                {product.descripcion}
              </h3>
            </div>
            <Badge variant={stockStatus === 'success' ? 'default' : stockStatus === 'warning' ? 'outline' : 'destructive'} className="flex-shrink-0">
              Stock: {product.stock}
            </Badge>
          </div>

          <div className="flex items-center gap-2 bg-primary/5 p-2 rounded-md border border-primary/20">
            <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium">Ubicación en depósito</span>
              <span className="font-semibold text-foreground">{product.ubicacion}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Hash className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <span className="font-mono font-medium text-muted-foreground truncate">{product.codigo}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
