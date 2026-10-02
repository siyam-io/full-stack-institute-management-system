export const formatUserResponse = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  fullName: user.fullName || user.full_name,
  role: user.role,
  photoUrl: user.photoUrl || user.photo_url,
  branch: user.branch,
  status: user.status,
});
