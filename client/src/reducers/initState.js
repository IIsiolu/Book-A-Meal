export const userState = {
  loading: false,
  success: false,
  error: null,
  loginError: null,
  loginSuccess: false,
  isAuthenticated: false,
  signedUp: false,
  signUpError: false,
  user: {
    role: null,
  },
};

export const menuState = {
  menus: [],
  created: false,
  success: false,
  isError: false,
  createMenuError: null,
  todayMenu: [],
  error: null,
  pagination: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    totalCount: 0,
  },
};

export const todayMenuState = {
  menus: [],
  success: false,
  error: null,
  data: {},
  pagination: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    totalCount: 0,
  },
};

export const imageInitState = {
  loading: false,
  success: false,
  error: null,
  imageUrl: null,
  id: null,
};

export const orderState = {
  orders: [],
  loading: false,
  success: false,
  isError: false,
  createdOrders: [],
  myOrders: [],
  error: null,
};

export const profileState = {
  userInfo: {},
};

export const apiResponseState = {
  isError: false,
  isSuccessful: false,
  error: {},
  message: {},
};

export const spinnerState = {
  isLoading: false,
};

export const createMealState = {
  loading: false,
  success: false,
  error: null,
  meal: null,
  mealsuccessful: false,
  isImageSuccess: false,
  imageUrl: '',
  isImageError: false,
  ImageUploadError: null,
};

export const mealState = {
  loading: false,
  isImageSuccess: false,
  imageUrl: '',
  meals: [],
  isImageError: false,
  ImageUploadError: null,
  success: false,
  error: null,
  mealsuccessful: false,
  pagination: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    totalCount: 0,
  },
};

export const deleteMealState = {
  loading: false,
  success: false,
  isMealDeleteError: false,
  error: null,
};

export const fetchMealState = {
  loading: false,
  success: false,
  error: null,
  meals: [],
  pagination: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    totalCount: 0,
  },
};

export const updateMealState = {
  loading: false,
  success: false,
  error: null,
  isError: false,
  updatedImage: '',
  imageUpdateSuccess: false,
  isimageUpdateError: false,
  imageUpdateError: null,
  meal: {},
};
