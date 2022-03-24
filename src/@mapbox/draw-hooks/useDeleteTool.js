import { useMapbox } from "../useMapbox";

export const useDeleteTool = () => {
  const { draw } = useMapbox();

  const deleteSelected = () => {
    draw.delete(draw.getSelectedIds());
  };

  const deleteAll = () => {
    draw.deleteAll();
  };

  return { deleteSelected, deleteAll };
};
