import React from 'react';
import logoPlenaInclusion from '../fotos/logo-plena-inclusion.png';
import logoAtencionTemprana from '../fotos/logo-atencion-temprana.png';
import logoFundacionSermas from '../fotos/logo-fundacion-sermas.png';
import logoAEDIS from '../fotos/logo-aedis.png';
import logoCermiAragon from '../fotos/logo-cermi-aragon.png';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: 'grey', marginTop: 'auto', paddingBottom: '20px', bottom: 0 }}>
      <div className="container">
        <div className="footer-logos" style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="http://www.plenainclusionaragon.com/conocenos/identidad-corporativa" title="Plena inclusión">
            <img src={logoPlenaInclusion} alt="Plena inclusión" style={{ width: '60px', marginRight: '20px', marginTop: '25px' }} />
          </a>
          <a href="http://www.atenciontemprana.org/" target="_blank">
            <img src={logoAtencionTemprana} alt="Atención Temprana" style={{ width: '60px', marginRight: '20px', marginTop: '25px' }} />
          </a>
          <a href="https://www.facebook.com/fundacion.sermas" target="_blank">
            <img src={logoFundacionSermas} alt="Fundación Sermas" style={{ width: '60px', marginRight: '20px', marginTop: '15px' }} />
          </a>
          <a href="http://www.asociacionaedis.org/" title="AEDIS">
            <img src={logoAEDIS} alt="AEDIS" style={{ width: '60px', marginRight: '20px', marginTop: '15px' }} />
          </a>
          <a href="http://www.cermiaragon.es" target="_blank">
            <img src={logoCermiAragon} alt="Cermi Aragón" style={{ width: '60px', marginRight: '20px', marginTop: '15px' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
