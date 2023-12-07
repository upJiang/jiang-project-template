export default [
  {
    url: "/mock/getMockData",
    method: "GET",
    response: () => {
      return {
        code: 0,
        message: "ok",
        result: ["测试1", "测试2"],
      };
    },
  },
];
