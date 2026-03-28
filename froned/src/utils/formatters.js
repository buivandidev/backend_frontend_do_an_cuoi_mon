export const toVnDate = (value) => {
  if (!value) {
    return '-'
  }

  try {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return '-'
  }
}

export const shortText = (text, length = 160) => {
  if (!text) {
    return ''
  }
  if (text.length <= length) {
    return text
  }
  return `${text.slice(0, length)}...`
}
