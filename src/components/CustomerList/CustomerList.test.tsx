/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';

import { render, screen, waitFor } from '@testing-library/react';

import { store } from '../../redux/store';

import CustomerList from './CustomerList';

import '@testing-library/jest-dom';

const mockAxios = new MockAdapter(axios);

const customersData = {
  totalItems: 25,
  limit: 10,
  page: 1,
  data: [
    {
      id: 'abcd1',
      firstName: 'Apple',
      lastName: 'Good',
      email: 'apple@g.c',
      registrationDate: '2022-10-22T00:00:00.000Z',
    },
  ],
};

describe('Customers Component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should renders loading state initially', () => {
    // Mock the axios GET request to delay the response
    mockAxios.onGet().reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, customersData]);
        }, 50);
      });
    });
    render(
      <Provider store={store}>
        <CustomerList />
      </Provider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should renders customers list after fetching data', async () => {
    mockAxios.onGet().reply(200, customersData);
    render(
      <Provider store={store}>
        <CustomerList />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Apple Good/i)).toBeInTheDocument();
    });
  });

  it('should renders error message when there is an error fetching data', async () => {
    // Mock the axios GET request to return an error
    mockAxios.onGet().reply(500);
    render(
      <Provider store={store}>
        <CustomerList />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-text')).toBeInTheDocument();
    });
  });

  // TODO adding unit test cases on pagination interactions
});
