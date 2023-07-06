import SelectCar from "../images/plan/icon1.png";
import Contact from "../images/plan/icon2.png";
import Drive from "../images/plan/icon3.png";

function PlanTrip() {
  return (
    <>
      <section className="plan-section">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <h3>Planifikoni udhëtimin tuaj tani</h3>
              <h2>Marrje e shpejtë dhe e lehtë e makinave me qira</h2>
            </div>

            <div className="plan-container__boxes">
              <div className="plan-container__boxes__box">
                <img src={SelectCar} alt="icon_img" />
                <h3>Zgjidhni Makinë</h3>
                <p>
                  We offers a big range of vehicles for all your driving needs.
                  We have the perfect car to meet your needs
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <img src={Contact} alt="icon_img" />
                <h3>Kontaktoni operatorin</h3>
                <p>
                Ne ofrojmë një gamë të madhe automjetesh për të gjitha nevojat tuaja të drejtimit.
                   Ne kemi makinën perfekte për të plotësuar nevojat tuaja
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <img src={Drive} alt="icon_img" />
                <h3>Le të Vozisim</h3>
                <p>
                Pavarësisht nëse jeni duke hyrë në rrugën e hapur, ne ju kemi mbuluar
                   me gamën tonë të gjerë të makinave
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;
