import { counterReducer } from './counter/slice';
import { customersReducer } from './customers/slice';

const rootReducer = {
  counter: counterReducer,
  customers: customersReducer,
};

export default rootReducer;
