export const createMealState = {
  loading: false,
  success: false,
  error: null,
  meal: null,
};

export const fetchMealState = {
  loading: false,
  success: false,
  error: null,
  meals: null,
};

export const updateMealState = {
  loading: false,
  success: false,
  error: null,
  isError: false,
  meal: {},
};

export const deleteMealState = {
  loading: false,
  success: false,
  isMealDeleteError: false,
  error: null,
};

export const menuState = {
  menus: [],
  createdMenus: [],
  error: null,
};

export const todayMenuState = {
  menus: [],
  success: false,
  error: null,
  data: {},
};

export const orderState = {
  orders: [],
  createdOrders: [],
  myOrders: [],
  error: null,
};
