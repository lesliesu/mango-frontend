import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCustomers } from '../../redux/customers/slice';
import { AppDispatch, RootState } from '../../redux/store';

const CustomerList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, totalItems, page, limit, loading, error } = useSelector(
    (state: RootState) => state.customers,
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchCustomers({ page: 1 }));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchCustomers({ page: newPage, limit }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Customers List</h2>
      <ul>
        {data?.map((customer) => (
          <li key={customer.id}>
            {customer.firstName} {customer.lastName}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page * limit >= totalItems}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
