export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required'
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required'
  
  if (password.length < 8) return 'Password must be at least 8 characters'
  
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
  
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character'
  
  return null
}

export function validateFullName(name: string): string | null {
  if (!name) return 'Full name is required'
  
  if (name.length < 2) return 'Name must be at least 2 characters'
  
  if (name.length > 100) return 'Name must be less than 100 characters'
  
  return null
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return 'Please confirm your password'
  
  if (password !== confirmPassword) return 'Passwords do not match'
  
  return null
}

export function validateLoginForm(email: string, password: string): ValidationResult {
  const errors: Record<string, string> = {}
  
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  
  const passwordError = validatePassword(password)
  if (passwordError) errors.password = passwordError
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateRegisterForm(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult {
  const errors: Record<string, string> = {}
  
  const nameError = validateFullName(fullName)
  if (nameError) errors.fullName = nameError
  
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  
  const passwordError = validatePassword(password)
  if (passwordError) errors.password = passwordError
  
  const confirmError = validateConfirmPassword(password, confirmPassword)
  if (confirmError) errors.confirmPassword = confirmError
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}