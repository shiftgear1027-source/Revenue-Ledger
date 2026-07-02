import { aggregateProducts } from './aggregateProducts';

describe('aggregateProducts', () => {
  it('merges the same product across branches by summing revenue', () => {
    const branch1 = [{ product: 'Kettle', revenue: 100 }];
    const branch2 = [{ product: 'Kettle', revenue: 50 }];

    const result = aggregateProducts([branch1, branch2]);

    expect(result).toEqual([{ name: 'Kettle', totalRevenue: 150 }]);
  });

  it('sorts products alphabetically by name', () => {
    const branch1 = [
      { product: 'Toaster', revenue: 10 },
      { product: 'Air Fryer', revenue: 20 },
      { product: 'Blender', revenue: 30 },
    ];

    const result = aggregateProducts([branch1]);

    expect(result.map((p) => p.name)).toEqual(['Air Fryer', 'Blender', 'Toaster']);
  });

  it('keeps products that only exist in one branch', () => {
    const branch1 = [{ product: 'Kettle', revenue: 100 }];
    const branch2 = [{ product: 'Toaster', revenue: 50 }];

    const result = aggregateProducts([branch1, branch2]);

    expect(result).toEqual([
      { name: 'Kettle', totalRevenue: 100 },
      { name: 'Toaster', totalRevenue: 50 },
    ]);
  });

  it('handles empty or missing branch data gracefully', () => {
    expect(aggregateProducts([[], null, undefined])).toEqual([]);
  });

  it('merges across three branches correctly', () => {
    const branch1 = [{ product: 'Espresso Machine', revenue: 1250.5 }];
    const branch2 = [{ product: 'Espresso Machine', revenue: 720.25 }];
    const branch3 = [{ product: 'Espresso Machine', revenue: 0 }];

    const result = aggregateProducts([branch1, branch2, branch3]);

    expect(result).toEqual([{ name: 'Espresso Machine', totalRevenue: 1970.75 }]);
  });
});
