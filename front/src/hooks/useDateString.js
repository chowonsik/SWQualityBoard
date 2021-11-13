const useDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return dateString;
};

export default useDateString;
