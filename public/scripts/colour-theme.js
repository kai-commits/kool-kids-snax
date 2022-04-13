$(() => {
  checkCurrentTheme();
  themeSwitch();
});

const themeSwitch = () => {
  $('[theme-id="theme-switch-btn"]').on('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const switchToTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', switchToTheme);
    window.localStorage.setItem('data-theme', switchToTheme);
  });
};

const checkCurrentTheme = () => {
  const theme = window.localStorage.getItem('data-theme');
  if (theme === 'dark') {
    $('[theme-id="theme-switch-btn"]').attr('checked', true);
  }
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    window.localStorage.setItem('data-theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    $('[theme-id="theme-switch-btn"]').attr('checked', false);
  }
};
