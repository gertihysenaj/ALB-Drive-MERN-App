import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";

function Contact() {
  return (
    <>
      <section className="contact-page">
        <HeroPages name="Contact" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Keni nevojë për informacion shtesë?</h2>
              <p>
                 Një profesionist i shumëanshëm i aftë në fusha të shumta të
                 kërkimi, zhvillimi si dhe një specialist i të mësuarit. Mbi 15
                 vite eksperience.
              </p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; (355) 692-000-009
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                contact@albdrive.al
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; Tirane,
                Albania
              </a>
            </div>
            <div className="contact-div__form">
              <form>
                <label>
                Emri i plotë  <b>*</b>
                </label>
                <input type="text" placeholder='E.g: "Joe Shmoe"'></input>

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="youremail@example.com"></input>

                <label>
                  Na shkruani rreth kerkeses suaj <b>*</b>
                </label>
                <textarea placeholder="Write Here.."></textarea>

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Dergo
                  Mesazhin
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Rezervoni një makinë duke na kontaktuar</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3> (355) 692-000-009</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Contact;
