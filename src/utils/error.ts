export const errorHandler = (error?: any) => {
  console.error(error);
  void wx.showToast({
    title: JSON.stringify(error) || "未知错误",
    icon: "none",
    mask: true,
  });
};
