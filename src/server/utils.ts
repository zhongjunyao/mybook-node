export const getResTpl = (flag = 0, options = {
  ret: undefined
}) => {
  const success = {
    code: 1,
    messege: 'success',
    ...options
  }
  const failed = {
    code: 0,
    message: 'failed',
    ...options
  }
  switch (flag) {
    case 1:
      return success
    case 0:
    default:
      return failed
  }
}

