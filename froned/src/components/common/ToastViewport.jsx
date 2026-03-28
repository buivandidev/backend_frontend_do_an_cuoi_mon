import { useToastStore } from '../../store/toast.store'

const typeClassMap = {
  success: 'toast-success',
  error: 'toast-error',
  warning: 'toast-warning',
  info: 'toast-info',
}

export default function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts)
  const remove = useToastStore((state) => state.remove)

  return (
    <section className="toast-viewport" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <article key={toast.id} className={`toast-card ${typeClassMap[toast.type] ?? typeClassMap.info}`}>
          <div>
            <p className="toast-title">{toast.title || 'Thông báo'}</p>
            <p className="toast-message">{toast.message || 'Yêu cầu đã được xử lý.'}</p>
          </div>

          <button onClick={() => remove(toast.id)} className="toast-close" aria-label="Đóng thông báo">
            x
          </button>
        </article>
      ))}
    </section>
  )
}