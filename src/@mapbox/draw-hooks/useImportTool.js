import { useMapbox } from "../useMapbox";

export const useImportTool = (inputRef) => {
  const { draw } = useMapbox();

  const upload = () => inputRef.current?.click();

  /**
   *
   * @param changeEvent {ChangeEvent<HTMLInputElement>}
   * @return {Promise<void>}
   */
  const handleClick = async (changeEvent) => {
    const file = changeEvent?.target?.files?.item(0);
    if (file) {
      if (file.size < 5242880) {
        draw.add(JSON.parse(await file.text()));
      } else {
        alert(
          "File size is to large, reduce to < 1MB, reduce geometry complexity with https://mapshaper.org/"
        );
      }
    }
  };

  return { upload, handleClick };
};
