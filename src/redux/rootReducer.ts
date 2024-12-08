import { customersReducer } from './customers/slice';

const rootReducer = {
  customers: customersReducer,
};

export default rootReducer;
