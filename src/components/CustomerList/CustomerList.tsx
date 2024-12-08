import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCustomers } from '../../redux/customers/slice';
import { AppDispatch, RootState } from '../../redux/store';

import './CustomerList.css';

const CustomerList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data,
    totalItems,
    page,
    limit: currentLimit,
    loading,
    error,
  } = useSelector((state: RootState) => state.customers);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchCustomers({ page: 1 }));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchCustomers({ page: newPage, limit: currentLimit }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Customers List</h2>
      {error && (
        <p className="errorText" data-testid="error-text">
          <span>Oops! Something went wrong while loading the data.</span>
          <span>Please try refreshing the page, or come back later.</span>
          <span>If the problem persists, contact support.</span>
        </p>
      )}
      <ul>
        {data?.map(({ id, firstName, lastName, email, registrationDate }) => (
          <li key={id}>
            {id}, {firstName} {lastName}, {email}, {registrationDate.slice(0, 10)}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * currentLimit >= totalItems}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
