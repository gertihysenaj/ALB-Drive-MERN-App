import React from 'react';
import { useTranslation } from 'react-i18next';

function Banner() {
  const { t } = useTranslation();

  return (
    <>
      <section className="banner-section">
        <div className="container">
          <div className="banner-content">
            <div className="banner-content__text">
              <h2>{t('banner.title')}</h2>
              <p>
                {t('banner.description')}
                <span>{t('banner.support')}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;