const paginatedData = (page, limit, result) =>
  ({
    pagination: {
      page: parseInt(page, 10),
      pageCount: Math.ceil(result.count / limit),
      pageSize: result.rows.length,
      totalCount: result.count,
    },
  });

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
