import React from "react";

function Footer() {
  const yearNow = new Date().getFullYear();

  return (
    <footer style={{margin: "50px auto"}}>
      <div>
        <p style={{textAlign: "center", fontSize:"0.8rem"}}> © {yearNow} Copyright: Cinek Film </p>
      </div>
    </footer>
  );
}
export default Footer;
