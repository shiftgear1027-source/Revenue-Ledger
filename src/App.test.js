import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const branch1 = [
  { product: 'Espresso Machine', revenue: 1250.5 },
  { product: 'Air Fryer', revenue: 899.99 },
];

const branch2 = [
  { product: 'Espresso Machine', revenue: 720.25 },
  { product: 'Toaster', revenue: 210 },
];

const branch3 = [
  { product: 'Blender', revenue: 150 },
  { product: 'Toaster', revenue: 45.5 },
];

function mockFetchImplementation(url) {
  const data = url.includes('branch1')
    ? branch1
    : url.includes('branch2')
    ? branch2
    : branch3;

  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
    url,
  });
}

beforeEach(() => {
  global.fetch = jest.fn(mockFetchImplementation);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('shows a loading state before data arrives', () => {
  render(<App />);
  expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
});

test('requests all three branch endpoints', async () => {
  render(<App />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

  const calledUrls = global.fetch.mock.calls.map((call) => call[0]);
  expect(calledUrls).toEqual(
    expect.arrayContaining([
      'api/branch1.json',
      'api/branch2.json',
      'api/branch3.json',
    ])
  );
});

test('merges products from multiple branches and sums their revenue', async () => {
  render(<App />);

  const espressoRow = await screen.findByText('Espresso Machine');
  expect(espressoRow).toBeInTheDocument();
  // 1250.50 + 720.25 = 1970.75
  expect(screen.getByText('$1,970.75')).toBeInTheDocument();

  // Toaster: 210 + 45.50 = 255.50
  expect(screen.getByText('Toaster')).toBeInTheDocument();
  expect(screen.getByText('$255.50')).toBeInTheDocument();
});

test('renders products sorted alphabetically by name', async () => {
  render(<App />);
  await screen.findByText('Espresso Machine');

  const rows = screen.getAllByRole('row').slice(1); // drop header row
  const names = rows.map((row) => row.cells[0].textContent);

  expect(names).toEqual(['Air Fryer', 'Blender', 'Espresso Machine', 'Toaster']);
});

test('displays the correct total revenue across all products', async () => {
  render(<App />);
  await screen.findByText('Espresso Machine');

  // 899.99 + 150 + 1970.75 + 255.50 = 3276.24
  expect(screen.getByTestId('total-revenue')).toHaveTextContent('$3,276.24');
});

test('search input is inline with its label', async () => {
  render(<App />);
  await screen.findByText('Espresso Machine');

  const input = screen.getByLabelText(/search products/i);
  expect(input).toBeInTheDocument();
  expect(input.closest('.search-row')).toContainElement(
    screen.getByText(/search products/i)
  );
});

test('filters the table by product name, case-insensitively, and updates the total', async () => {
  const user = userEvent.setup();
  render(<App />);
  await screen.findByText('Espresso Machine');

  const input = screen.getByLabelText(/search products/i);
  await user.type(input, 'TOAST');

  expect(screen.getByText('Toaster')).toBeInTheDocument();
  expect(screen.queryByText('Espresso Machine')).not.toBeInTheDocument();
  expect(screen.queryByText('Air Fryer')).not.toBeInTheDocument();
  expect(screen.queryByText('Blender')).not.toBeInTheDocument();

  // Filtered total should equal just the Toaster revenue: $255.50
  expect(screen.getByTestId('total-revenue')).toHaveTextContent('$255.50');
});

test('shows an empty state message when no products match the filter', async () => {
  const user = userEvent.setup();
  render(<App />);
  await screen.findByText('Espresso Machine');

  const input = screen.getByLabelText(/search products/i);
  await user.type(input, 'nonexistent-product-xyz');

  expect(screen.getByText(/no products match/i)).toBeInTheDocument();
  expect(screen.getByTestId('total-revenue')).toHaveTextContent('$0.00');
});

test('shows an error message if a branch request fails', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: false, url: 'api/branch1.json' })
  );

  render(<App />);

  expect(await screen.findByRole('alert')).toHaveTextContent(/went wrong/i);
});
