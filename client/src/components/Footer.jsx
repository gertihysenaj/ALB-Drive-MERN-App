import Logo from "../images/logo/logo.png";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
                <img src={Logo} alt="logo-img"  className="footer-logo"/>
              <li>
                We offers a big range of vehicles for all your driving needs. We
                have the perfect car to meet your needs.
              </li>
              <li>
                <a href="tel:123456789"><i className="fa-solid fa-phone"></i> &nbsp; (355) 692-000-008</a>
              </li>

              <li>
                <a href="mailto: carrental@gmail.com">
                  <i className="fa-solid fa-envelope"></i>
                  &nbsp; gertihysenaj06@gmail.com
                </a>
              </li>

              <li>
                <a style={{ fontSize: "14px" }}>
                  &copy; 2023 Gerti Hysenaj. All rights reserved. 
                </a>
              </li>
              
            </ul>

            <ul className="footer-content__2">
              <li>Company</li>
              <li>
                <a href="#home">Book a Car</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/team">Our Team</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>Working Hours</li>
              <li>Mon - Fri: 9:00AM - 9:00PM</li>
              <li>Sat: 9:00AM - 19:00PM</li>
              <li>Sun: Closed</li>
            </ul>

            <ul className="footer-content__2">
              <li>Subscription</li>
              <li>
                <p>Subscribe your Email address for latest news & updates.</p>
              </li>
              <li>
                <input type="email" placeholder="Enter Email Address"></input>
              </li>
              <li>
                <button className="submit-email">Submit</button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
