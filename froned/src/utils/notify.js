import { useToastStore } from '../store/toast.store'

const push = (payload) => {
  useToastStore.getState().push(payload)
}

export const notify = {
  success(message, title = 'Thành công') {
    push({ type: 'success', title, message })
  },

  error(message, title = 'Có lỗi xảy ra') {
    push({ type: 'error', title, message, duration: 4200 })
  },

  info(message, title = 'Thông tin') {
    push({ type: 'info', title, message })
  },

  warning(message, title = 'Lưu ý') {
    push({ type: 'warning', title, message, duration: 4200 })
  },
}
