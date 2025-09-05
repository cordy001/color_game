import Swal from 'sweetalert2';

export default function SweetAlert2(
  title: string,
  text: string,
  icon: 'success' | 'error' | 'warning' | 'info' | 'question',
  showConfirmButton = false,
  showLoading = false
) {
  return Swal.fire({
    title,
    text,
    icon,
    showConfirmButton,
    allowOutsideClick: false,
    didOpen: () => {
      if (showLoading) {
        Swal.showLoading();
      }
    }
  });
}