/**
 * aggregateProducts
 * Takes an array of branch datasets (each an array of { product, revenue }
 * sale records) and merges them into a single, alphabetically sorted list
 * of { name, totalRevenue }, summing revenue for products that appear
 * across multiple branches.
 */
export function aggregateProducts(branchDatasets) {
  const totalsByProduct = new Map();

  branchDatasets.forEach((branchData) => {
    (branchData || []).forEach((entry) => {
      if (!entry || !entry.product) return;

      const name = entry.product;
      const revenue = Number(entry.revenue) || 0;
      const current = totalsByProduct.get(name) || 0;

      totalsByProduct.set(name, current + revenue);
    });
  });

  return Array.from(totalsByProduct.entries())
    .map(([name, totalRevenue]) => ({ name, totalRevenue }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default aggregateProducts;
