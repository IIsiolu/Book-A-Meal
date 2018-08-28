/**
 * @summary paginated result sent to the client
 * pageCount = pages that can be displayed
  * pagesize=total item in current page totalCount=total item in DB
 * @param {number} page - current page,
 * @param {number} limit - start from
 * @param {object} result - paginated data
 * @returns {object} pagination - paginated data
 */
const paginatedData = (page, limit, result) =>
  ({
    pagination: {
      page: parseInt(page, 10),
      pageCount: Math.ceil(result.count / limit),
      pageSize: result.rows.length,
      totalCount: result.count,
    },
  });

  /**
   * @summary method to validates pagination from query
   * @param {string} req - http request
   * @returns {object} pagination values
   *
   */
const checkPagination = (req) => {
  // converts to decimal
  const page = Number.isInteger(parseInt(req.query.page, 10))
  && req.query.page > 0 ? req.query.page : 1;
  const limit = Number.isInteger(parseInt(req.query.limit, 10))
  && req.query.limit > 0 ? req.query.limit : 10;
  const offset = Number.isInteger(parseInt(req.query.limit, 10))
  && req.query.offset > 0 ? req.query.offset : (page - 1) * limit;

  return { page, limit, offset };
};

export { checkPagination, paginatedData };
