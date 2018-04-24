
const ACTIVATE_ADMIN = 'ACTIVATE_ADMIN'
const DEACTIVATE_ADMIN = 'DEACTIVATE_ADMIN'

export const activateAdmin = () => ({
  type: ACTIVATE_ADMIN,
})

export const deactivateAdmin = () => ({
  type: DEACTIVATE_ADMIN,
})

export default (prevState = false, action) => {
  switch (action.type) {
    case ACTIVATE_ADMIN:
      return true

    case DEACTIVATE_ADMIN:
      return false

    default: return prevState
  }
}