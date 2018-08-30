import { START_LOADER, STOP_LOADER } from './actionsTypes';

/**
 * @function setFetching
 * @returns {object} actionType
 */
export const startLoader = () => ({
  type: START_LOADER,
});

/**
 * @function startLoader
 * @returns {object} actionType
 */
export const stopLoader = () => ({
  type: STOP_LOADER,
});
