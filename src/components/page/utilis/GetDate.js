const today = new Date();
const GetDate = () => {
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  return year + '-' + month + '-' + date;
};
// const GetDate = () => {
//   return '2022-05-26';
// };
export default GetDate;
