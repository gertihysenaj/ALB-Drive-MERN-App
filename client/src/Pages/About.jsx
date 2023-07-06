import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import PlanTrip from "../components/PlanTrip";
import AboutMain from "../images/about/about-main.jpg";
import Box1 from "../images/about/icon1.png";
import Box2 from "../images/about/icon2.png";
import Box3 from "../images/about/icon3.png";

function About() {
  return (
    <>
      <section className="about-page">
        <HeroPages name="About" />
        <div className="container">
          <div className="about-main">
            <img
              className="about-main__img"
              src={AboutMain}
              alt="car-renting"
            />
            <div className="about-main__text">
              <h3>Rreth Kompanise</h3>
              <h2>Ju ndezni makinen dhe aventura juaj fillon</h2>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum at nulla facilisis mollis. 
              Proin suscipit eu elit nec dictum. Aliquam pretium urna at ornare luctus. Suspendisse metus lorem, 
              consequat ac venenatis at, fermentum eget tortor. Maecenas iaculis accumsan arcu, et rutrum ipsum condimentum nec. 
              Suspendisse in interdum turpis. Etiam dolor erat, facilisis vel ipsum eu, dignissim maximus ante. In nec quam iaculis, 
              aliquet ante condimentum, sodales velit. Nunc vel arcu in est molestie ultricies ac vel orci. 
              </p>
              <div className="about-main__text__icons">
                <div className="about-main__text__icons__box">
                  <img src={Box1} alt="car-icon" />
                  <span>
                    <h4>20</h4>
                    <p>Lloje Makinash</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box2} alt="car-icon" />
                  <span>
                    <h4>85</h4>
                    <p>Lokacione</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box3} alt="car-icon" className="last-fk" />
                  <span>
                    <h4>75</h4>
                    <p>Servise makinash</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <PlanTrip />
        </div>
      </section>
      <div className="book-banner">
        <div className="book-banner__overlay"></div>
        <div className="container">
          <div className="text-content">
            <h2>Rezervoni një makinë duke na kontaktuar</h2>
            <span>
              <i className="fa-solid fa-phone"></i>
              <h3>(355) 692-000-009</h3>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
