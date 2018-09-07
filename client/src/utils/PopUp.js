import swal from 'sweetalert';

const PopUp = (header, message, type, func) => (
  swal(
    header,
    message, type,
  ).then(() => {
    func();
  })
);

export default PopUp;
