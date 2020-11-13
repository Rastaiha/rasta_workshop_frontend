export default () => {
  try {
    const Intl = JSON.parse(localStorage.getItem('rastaState')).Intl;
    return Intl ? Intl.locale : 'fa';
  } catch {
    return 'fa';
  }
};
