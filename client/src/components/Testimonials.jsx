import Img2 from "../images/testimonials/pfp1.jpg";
import Img3 from "../images/testimonials/pfp2.jpg";

function Testimonials() {
  return (
    <>
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-content">
            <div className="testimonials-content__title">
              <h4>Reviewed by People</h4>
              <h2>Dëshmitë e klienteve</h2>
              <p>
                 Zbuloni ndikimin pozitiv që kemi bërë tek klientët tanë
                 duke lexuar dëshmitë e tyre. Klientët tanë kanë provuar
                 shërbimin dhe rezultatet tona, duan te ndajne përvojat e tyre
                 pozitive me ju.
              </p>
            </div>

            <div className="all-testimonials">
              <div className="all-testimonials__box">
                <span className="quotes-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p>
                  "Ne morëm me qira një makinë nga kjo faqe interneti dhe patëm një 
                   përvojë te mrekullueshme! Rezervimi ishte i lehtë dhe tarifat e qerasë ishin
                   shumë të përballueshme. "
                </p>
                <div className="all-testimonials__box__name">
                  <div className="all-testimonials__box__name__profile">
                    <img src={Img2} alt="user_img" />
                    <span>
                      <h4>Klajdi Hoxha</h4>
                      <p>Tirane</p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="all-testimonials__box box-2">
                <span className="quotes-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p>
                  "Makina ishte në gjendje të shkëlqyer dhe e bëri udhëtimin tonë edhe më të mirë.
                   E rekomandoj shumë këtë faqe interneti për marrjen e makinave me qira!"
                </p>
                <div className="all-testimonials__box__name">
                  <div className="all-testimonials__box__name__profile">
                    <img src={Img3} alt="user_img" />
                    <span>
                      <h4>John Wick </h4>
                      <p>South England</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
