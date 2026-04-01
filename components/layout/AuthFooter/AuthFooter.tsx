import css from './authFooter.module.css';

const AuthFooter = () => {
  const date = new Date();
  const dateYear = date.getFullYear();

  return <p className={css.text}>{`© ${dateYear} Природні Мандри`}</p>;
};

export default AuthFooter;
