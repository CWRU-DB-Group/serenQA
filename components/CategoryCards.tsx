import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {Category} from "@/lib/category";

const CategoryDisplay = ({ data, onClick }: { data: Category, onClick: (value: string) => void }) => {
  return (
    <Card className="mb-6 cursor-pointer" onClick={() => onClick(`batch${data.batch_id}`)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{data.batch_name} (batch #{data.batch_id})</span>
          <span className="text-sm text-muted-foreground">Total: {data.total}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(data.categories).map(([category, subcategories]) => (
            <div key={category} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2 ml-4">
                {Object.entries(subcategories).map(([subcategory, count]) => (
                  <div key={subcategory} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{subcategory}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Example usage component that handles multiple categories
const CategoryCards = ({ categories, onClick }: { categories: Category[], onClick: (value: string) => void}) => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6">Available Categories</h3>
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
      {categories.map((category) => (
        <CategoryDisplay key={category.batch_id} data={category} onClick={onClick} />
      ))}
    </div>
    </>
  );
};

export default CategoryCards;