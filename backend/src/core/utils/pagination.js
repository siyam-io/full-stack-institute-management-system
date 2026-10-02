export const paginate = (page, limit, total) => ({
  page: Math.max(1, parseInt(page) || 1),
  limit: Math.min(100, parseInt(limit) || 30),
  total,
  totalPages: Math.ceil(total / Math.min(100, parseInt(limit) || 30)),
});

export const skipTake = (page, limit) => {
  const p = Math.max(1, parseInt(page) || 1);
  const l = Math.min(100, parseInt(limit) || 30);
  return { skip: (p - 1) * l, take: l };
};
