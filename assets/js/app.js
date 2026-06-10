// Chave usada no sessionStorage para salvar se o usuário está autenticado.
const AUTH_KEY = 'gamehub_authenticated';

// Chave usada no localStorage para guardar a preferência de tema do usuário.
const THEME_KEY = 'gamehub_theme';

// Função que aplica o tema claro ou escuro na página e atualiza o texto dos botões.
function applyTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-mode', isLight);
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.textContent = isLight ? '🌙 Dark mode' : '☀️ Light mode';
  });
}

// Função que configura o botão de dark mode e carrega o tema salvo anteriormente.
function setupTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  });
}

// Função que protege as páginas internas e redireciona para o login se não houver sessão ativa.
function protectPages() {
  const isProtected = document.body.dataset.protected === 'true';
  const isLoggedIn = sessionStorage.getItem(AUTH_KEY) === 'true';
  if (isProtected && !isLoggedIn) {
    window.location.href = 'login.html';
  }
}

// Função que valida o formulário de login usando o usuário fixo "adm" e a senha fixa "123".
function setupLogin() {
  const form = document.querySelector('#loginForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('#loginMessage');
    const usuario = form.usuario.value.trim();
    const senha = form.senha.value.trim();

    form.classList.add('was-validated');
    if (!form.checkValidity()) return;

    if (usuario === 'adm' && senha === '123') {
      sessionStorage.setItem(AUTH_KEY, 'true');
      window.location.href = 'index.html';
      return;
    }

    message.textContent = 'Usuário ou senha inválidos. Tente adm / 123.';
  });
}

// Função que configura o botão de sair, apaga a sessão do usuário e volta para a tela de login.
function setupLogout() {
  document.querySelectorAll('[data-logout]').forEach((button) => {
    button.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY);
      window.location.href = 'login.html';
    });
  });
}

// Função que valida campos especiais dos formulários, como CPF, telefone e confirmação de senha.
function validateCustomField(field) {
  if (field.dataset.rule === 'cpf') {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(field.value.trim());
  }

  if (field.dataset.rule === 'telefone') {
    return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(field.value.trim());
  }

  if (field.dataset.match) {
    const original = document.querySelector(`#${field.dataset.match}`);
    return original && field.value === original.value;
  }

  return true;
}

// Função que configura a validação avançada dos formulários de perfil e contato.
function setupAdvancedForms() {
  document.querySelectorAll('.needs-advanced-validation').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.querySelectorAll('[data-rule], [data-match]').forEach((field) => {
        field.setCustomValidity('');
      });

      let valid = form.checkValidity();

      form.querySelectorAll('[data-rule], [data-match]').forEach((field) => {
        const fieldIsValid = validateCustomField(field);
        field.setCustomValidity(fieldIsValid ? '' : 'Valor inválido');
        valid = fieldIsValid && valid;
      });

      form.classList.add('was-validated');
      if (!valid || !form.checkValidity()) return;

      const success = form.querySelector('[data-form-success]');
      if (success) success.textContent = 'Dados enviados com sucesso!';
      form.reset();
      form.classList.remove('was-validated');
    });
  });
}

// Evento que executa as configurações principais depois que todo o HTML da página é carregado.
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  protectPages();
  setupLogin();
  setupLogout();
  setupAdvancedForms();
});
