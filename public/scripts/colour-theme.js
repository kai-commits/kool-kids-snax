$(() => {
  checkCurrentTheme();
  themeSwitch();
});

const checkCurrentTheme = () => {
  const theme = window.localStorage.getItem('data-theme'); // Grabs the data-theme value from localStorage
  if (theme === 'dark') {
    $('[theme-id="theme-switch-btn"]').attr('checked', true); // Toggles the dark-mode button on
  }
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme); // Sets the data-theme for the page
  } else {
    window.localStorage.setItem('data-theme', 'light'); // Stores 'data-theme: light' in localStorage by default
    document.documentElement.setAttribute('data-theme', 'light');
    $('[theme-id="theme-switch-btn"]').attr('checked', false);
  }
};

const themeSwitch = () => {
  $('[theme-id="theme-switch-btn"]').on('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const switchToTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', switchToTheme);
    window.localStorage.setItem('data-theme', switchToTheme);
  });
};
