export const handleControllerError = (
  error: any,
  res: any,
  controllerName: string
) => {
  const message =
    error instanceof Error ? error.message : "Internal server error";

  console.log(`Error in ${controllerName}:`, message);
  res.status(500).json({ message });
};
