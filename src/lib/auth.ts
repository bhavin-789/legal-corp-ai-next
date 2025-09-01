// Simple authentication stub using localStorage
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'firm';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthManager {
  private static instance: AuthManager;
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };

  private constructor() {
    // Check localStorage on initialization
    this.loadFromStorage();
  }

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('legalcorp_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          this.state.user = user;
          this.state.isAuthenticated = true;
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
          this.logout();
        }
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined' && this.state.user) {
      localStorage.setItem('legalcorp_user', JSON.stringify(this.state.user));
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una mayúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una minúscula');
    }
    if (!/\d/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.state.isLoading = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate email format
    if (!this.validateEmail(email)) {
      this.state.isLoading = false;
      return { success: false, error: 'Formato de correo inválido' };
    }
    
    // Mock authentication - in real app, this would be an API call
    if (email && password.length >= 6) {
      // Check if user exists in localStorage (mock database)
      const usersStr = localStorage.getItem('legalcorp_users');
      const users = usersStr ? JSON.parse(usersStr) : [];
      const existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser) {
        this.state.isLoading = false;
        return { success: false, error: 'Credenciales inválidas' };
      }
      
      // In a real app, you would verify the password hash
      // For demo purposes, we'll accept any password >= 6 chars for existing users
      
      const user: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        plan: existingUser.plan || 'free',
        createdAt: existingUser.createdAt
      };
      
      this.state.user = user;
      this.state.isAuthenticated = true;
      this.saveToStorage();
      
      this.state.isLoading = false;
      return { success: true };
    }
    
    this.state.isLoading = false;
    return { success: false, error: 'Credenciales inválidas' };
  }

  async signup(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    this.state.isLoading = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate email format
    if (!this.validateEmail(email)) {
      this.state.isLoading = false;
      return { success: false, error: 'Formato de correo inválido' };
    }
    
    // Validate password strength
    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      this.state.isLoading = false;
      return { 
        success: false, 
        error: `Contraseña inválida: ${passwordValidation.errors.join(', ')}` 
      };
    }
    
    // Validate name
    if (!name || name.trim().length < 2) {
      this.state.isLoading = false;
      return { success: false, error: 'El nombre debe tener al menos 2 caracteres' };
    }
    
    // Check if user already exists (mock)
    const usersStr = localStorage.getItem('legalcorp_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      this.state.isLoading = false;
      return { success: false, error: 'El correo ya está registrado' };
    }
    
    // Create new user
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name.trim(),
      plan: 'free',
      createdAt: new Date().toISOString()
    };
    
    // Save to mock database
    users.push(user);
    localStorage.setItem('legalcorp_users', JSON.stringify(users));
    
    // Set as current user
    this.state.user = user;
    this.state.isAuthenticated = true;
    this.saveToStorage();
    
    this.state.isLoading = false;
    return { success: true };
  }

  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    this.state.isLoading = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate email format
    if (!this.validateEmail(email)) {
      this.state.isLoading = false;
      return { success: false, error: 'Formato de correo inválido' };
    }
    
    // Check if user exists
    const usersStr = localStorage.getItem('legalcorp_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const existingUser = users.find((u: any) => u.email === email);
    
    if (!existingUser) {
      this.state.isLoading = false;
      return { success: false, error: 'No hay ninguna cuenta asociada a este correo' };
    }
    
    // Mock password reset - in real app, this would send an email
    this.state.isLoading = false;
    return { success: true };
  }

  logout() {
    this.state.user = null;
    this.state.isAuthenticated = false;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('legalcorp_user');
    }
  }

  getState(): AuthState {
    return { ...this.state };
  }

  updateUser(updates: Partial<User>) {
    if (this.state.user) {
      this.state.user = { ...this.state.user, ...updates };
      this.saveToStorage();
      
      // Also update in mock database
      const usersStr = localStorage.getItem('legalcorp_users');
      if (usersStr) {
        const users = JSON.parse(usersStr);
        const userIndex = users.findIndex((u: any) => u.id === this.state.user?.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updates };
          localStorage.setItem('legalcorp_users', JSON.stringify(users));
        }
      }
    }
  }
}

export const authManager = AuthManager.getInstance();
export const useAuth = () => authManager.getState();