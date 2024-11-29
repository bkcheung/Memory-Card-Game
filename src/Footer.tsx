function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="absolute bottom-0 w-full p-4 text-center text-white/80">
      Copyright © {date}
      <a id="github" href="https://github.com/bkcheung">
        {" "}
        bkcheung
      </a>
    </footer>
  );
}
export default Footer;
