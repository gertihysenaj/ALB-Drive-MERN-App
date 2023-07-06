import { useState } from "react";

function Faq() {
  const [activeQ, setActiveQ] = useState("q1");

  const openQ = (id) => {
    setActiveQ(activeQ === id ? "" : id);
  };

  const getClassAnswer = (id) => {
    return activeQ === id ? "active-answer" : "";
  };

  const getClassQuestion = (id) => {
    return activeQ === id ? "active-question" : "";
  };

  return (
    <>
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-content__title">
              <h5>FAQ</h5>
              <h2>Pyetjet e bëra më shpesh</h2>
              <p>
                Pyetjet e bëra më shpesh në lidhje me procesin e rezervimit të makinave me qira
                në faqen tonë të internetit: Përgjigjet ndaj shqetësimeve dhe pyetjeve të zakonshme.
              </p>
            </div>

            <div className="all-questions">
              <div className="faq-box">
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__question  ${getClassQuestion("q1")}`}
                >
                  <p>1. Çfarë është e veçantë në lidhje me krahasimin e marrëveshjeve të makinave me qira?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__answer ${getClassAnswer("q1")}`}
                >
                  Krahasimi i marrëveshjeve të makinave me qira është i rëndësishëm pasi ndihmon në gjetjen e
                   oferta më e mirë që i përshtatet buxhetit dhe kërkesave tuaja, duke ju siguruar
                   merrni vlerën më të madhe për paratë tuaja. Duke krahasuar të ndryshme
                   opsionet, mund të gjeni oferta që ofrojnë çmime më të ulëta,
                   shërbime shtesë, ose modele më të mira makinash. Mund të gjeni makinë
                   marrëveshjet e qirasë duke hulumtuar në internet dhe duke krahasuar çmimet nga
                   kompani të ndryshme me qira.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__question ${getClassQuestion("q2")}`}
                >
                  <p>2. Si i gjej ofertat e marrjes me qira të makinave?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__answer ${getClassAnswer("q2")}`}
                >
                  Ju mund të gjeni oferta për marrjen me qira të makinave duke hulumtuar në internet dhe
                   duke krahasuar çmimet nga kompani të ndryshme qiraje. Faqet e internetit
                   të tilla si Expedia, Kayak dhe Travelocity ju lejojnë të krahasoni
                   çmimet dhe shikoni opsionet e disponueshme të qirasë. Eshte gjithashtu
                   rekomandohet të regjistroheni për buletinet me email dhe të ndiqni marrjen me qira
                   kompanitë e makinave në rrjetet sociale për t'u informuar për ndonjë të veçantë
                   marrëveshjet ose promovimet.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__question ${getClassQuestion("q3")}`}
                >
                  <p>3. Si mund të gjej çmime kaq të ulëta të makinave me qira?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__answer ${getClassAnswer("q3")}`}
                >
                  Rezervoni paraprakisht: Rezervimi i makinës suaj me qira para kohe mundet
                   shpesh rezulton në çmime më të ulëta. Krahasoni çmimet nga të shumtat
                   kompanitë: Përdorni faqet e internetit si Kayak, Expedia ose Travelocity
                   krahasoni çmimet nga kompanitë e shumta të makinave me qira. Kërkoni
                   kodet dhe kuponët e zbritjes: Kërkoni për kode zbritje dhe
                   kuponat që mund t'i përdorni për të ulur çmimin e qirasë. Marrja me qira
                   nga një vend jashtë aeroportit ndonjëherë mund të rezultojë në më të ulët
                   çmimet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
