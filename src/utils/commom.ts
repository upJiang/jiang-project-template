// 处理 mock 直接返回 returnData
export const handleMockDataReturn = (url: string) => {
  if (!url) return;
  const mockModules = import.meta.glob("/mock/**", {
    eager: true,
  }) as Record<string, { default: [] }>;
  const curMock = Object.keys(mockModules).map((s) => mockModules[s].default);
  const current = curMock
    .flat()
    .find((item: { url: string }) => item.url === url) as unknown as {
    returnData: unknown;
  };
  return current.returnData;
};
