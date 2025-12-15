// Validación de Formularios Profesional

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationRules {
  [field: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    email?: boolean;
    phone?: boolean;
    custom?: (value: any) => string | null;
  };
}

export const validateForm = (
  data: Record<string, any>,
  rules: ValidationRules
): ValidationError[] => {
  const errors: ValidationError[] = [];

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];

    // Validar requerido
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors.push({
        field,
        message: `${field} es requerido`
      });
      return;
    }

    if (!value) return;

    // Validar email
    if (rule.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push({
          field,
          message: 'Email inválido'
        });
      }
    }

    // Validar teléfono
    if (rule.phone) {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value.toString())) {
        errors.push({
          field,
          message: 'Teléfono inválido'
        });
      }
    }

    // Validar longitud mínima
    if (rule.minLength && value.toString().length < rule.minLength) {
      errors.push({
        field,
        message: `${field} debe tener al menos ${rule.minLength} caracteres`
      });
    }

    // Validar longitud máxima
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      errors.push({
        field,
        message: `${field} debe tener máximo ${rule.maxLength} caracteres`
      });
    }

    // Validar patrón
    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push({
        field,
        message: `${field} tiene formato inválido`
      });
    }

    // Validar personalizada
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        errors.push({
          field,
          message: customError
        });
      }
    }
  });

  return errors;
};

// Reglas predefini das comunes
export const commonRules = {
  email: {
    required: true,
    email: true
  },
  password: {
    required: true,
    minLength: 6
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  phone: {
    required: true,
    phone: true
  },
  url: {
    pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  }
};

// Sanitizar entrada (prevenir XSS básico)
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .trim();
};

// Validar contraseña fuerte
export const validatePassword = (password: string): {
  isStrong: boolean;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChar: boolean;
  };
} => {
  return {
    isStrong:
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password),
    requirements: {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password)
    }
  };
};

// Crear mensajes de error legibles
export const getErrorMessage = (error: ValidationError): string => {
  return error.message;
};
