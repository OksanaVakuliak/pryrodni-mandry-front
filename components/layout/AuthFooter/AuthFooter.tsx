import css from './authFooter.module.css';

const AuthFooter = () => {
  const date = new Date();
  const dateYear = date.getFullYear();

  return (
    <footer className={css.footerContainer}>
      <div className="container">
        <p className={css.text}>{`© ${dateYear} Природні Мандри`}</p>
      </div>
    </footer>
  );
};

export default AuthFooter;
