export const getStatus = (health) => {
  if (health > 0.7) return "capable";
  if (health > 0.3) return "damaged";
  return "destroyed";
};
