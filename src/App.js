import React, { useEffect, useMemo, useState } from 'react';
import { aggregateProducts } from './utils/aggregateProducts';
import { formatNumber } from './utils/formatNumber';
import './App.css';

const BRANCH_FILES = ['api/branch1.json', 'api/branch2.json', 'api/branch3.json'];

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let isMounted = true;

    async function loadBranches() {
      try {
        const responses = await Promise.all(
          BRANCH_FILES.map((file) => fetch(file))
        );

        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load ${response.url}`);
          }
        });

        const branchDatasets = await Promise.all(
          responses.map((response) => response.json())
        );

        if (isMounted) {
          setProducts(aggregateProducts(branchDatasets));
          setStatus('ready');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
        }
      }
    }

    loadBranches();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const totalRevenue = useMemo(
    () => filteredProducts.reduce((sum, product) => sum + product.totalRevenue, 0),
    [filteredProducts]
  );

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-eyebrow">{BRANCH_FILES.length} branches merged</p>
        <h1 className="app-title">Revenue Ledger</h1>
        <p className="app-tagline">Every branch, one running total.</p>
      </header>

      <main className="ledger-card">
        <div className="search-row">
          <label htmlFor="product-search">Search products</label>
          <input
            id="product-search"
            type="text"
            placeholder="e.g. blender"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            disabled={status !== 'ready'}
          />
        </div>

        {status === 'loading' && (
          <p className="status-message" role="status">
            Loading revenue from all branches&hellip;
          </p>
        )}

        {status === 'error' && (
          <p className="status-message status-message--error" role="alert">
            Something went wrong loading branch data. Please try again.
          </p>
        )}

        {status === 'ready' && (
          <>
            <table className="ledger-table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col" className="numeric-col">
                    Total Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="empty-row">
                      No products match &ldquo;{searchTerm}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.name}>
                      <td>{product.name}</td>
                      <td className="numeric-col">{formatNumber(product.totalRevenue)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="total-row">
              <span className="total-label">Total revenue</span>
              <span className="total-value" data-testid="total-revenue">
                {formatNumber(totalRevenue)}
              </span>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
