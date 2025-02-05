import "./PrivacyPolicy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <h2 className="privacy-policy-title">
        <strong>Politique de Confidentialité</strong>
      </h2>

      <p className="privacy-policy-intro">
        Bienvenue sur notre politique de confidentialité !
      </p>

      <p className="privacy-policy-paragraph">
        Nous respectons votre vie privée et nous engageons à protéger les
        informations personnelles que vous nous fournissez. Cette politique
        décrit la manière dont nous recueillons, utilisons et protégeons vos
        données personnelles.
      </p>

      <h4 className="privacy-policy-subtitle">
        <strong>Informations que nous collectons</strong>
      </h4>

      <p className="privacy-policy-paragraph">
        Nous collectons les informations suivantes lorsque vous utilisez notre
        site :
      </p>
      <ul className="privacy-policy-paragraph1">
        <li>
          Les informations que vous fournissez volontairement, comme votre nom,
          adresse e-mail, etc.
        </li>
        <li>
          Les données collectées automatiquement lors de l'utilisation du site
          (ex. cookies, IP, etc.).
        </li>
      </ul>

      <h4 className="privacy-policy-subtitle">
        <strong>Utilisation des informations</strong>
      </h4>

      <p className="privacy-policy-paragraph">
        Les informations que nous collectons sont utilisées pour :
      </p>
      <ul className="privacy-policy-paragraph1">
        <li>Améliorer notre site et nos services.</li>
        <li>Communiquer avec vous concernant vos demandes et services.</li>
        <li>
          Envoyer des newsletters, si vous vous êtes inscrit à notre liste de
          diffusion.
        </li>
      </ul>

      <h4 className="privacy-policy-subtitle">
        <strong>Partage des informations</strong>
      </h4>

      <p className="privacy-policy-paragraph">
        Nous ne vendons pas vos informations personnelles à des tiers.
        Cependant, nous pouvons partager des informations avec des partenaires
        de confiance pour les raisons suivantes :
      </p>
      <ul className="privacy-policy-paragraph1">
        <li>Fournir des services ou des fonctionnalités sur notre site.</li>
        <li>
          Se conformer à des obligations légales ou répondre à des demandes des
          autorités.
        </li>
      </ul>

      <h4 className="privacy-policy-subtitle">
        <strong>Cookies</strong>
      </h4>

      <p className="privacy-policy-paragraph">
        Nous utilisons des cookies pour améliorer votre expérience sur notre
        site. Les cookies nous aident à analyser le trafic, personnaliser le
        contenu et offrir des fonctionnalités spécifiques. Vous pouvez gérer vos
        préférences de cookies dans les paramètres de votre navigateur.
      </p>

      <h4 className="privacy-policy-subtitle">
        <strong>Protection des données</strong>
      </h4>

      <p className="privacy-policy-paragraph">
        Nous mettons en place des mesures de sécurité pour protéger vos données
        personnelles contre tout accès non autorisé, perte ou altération.
      </p>

      <h4 className="privacy-policy-subtitle">
        <strong>Vos droits</strong>
      </h4>

      <p className="privacy-policy-paragraph">Vous avez le droit de :</p>
      <ul className="privacy-policy-paragraph1">
        <li>Accéder aux informations que nous détenons à votre sujet.</li>
        <li>Demander la correction de données incorrectes ou obsolètes.</li>
        <li>
          Demander la suppression de vos données personnelles dans certaines
          circonstances.
        </li>
      </ul>

      <h4 className="privacy-policy-subtitle">
        <strong>Modifications de la politique de confidentialité</strong>
      </h4>

      <p className="privacy-policy-paragraph">
        Nous pouvons mettre à jour cette politique de confidentialité de temps
        en temps. Nous vous encourageons à consulter régulièrement cette page
        pour prendre connaissance des éventuelles modifications.
      </p>

      <h4 className="privacy-policy-subtitle">
        <strong>Contactez-nous</strong>
      </h4>

      <p className="privacy-policy-paragraph">
        Si vous avez des questions concernant cette politique de
        confidentialité, vous pouvez nous contacter à l'adresse suivante :
        <a href="mailto:contact@votresite.com" className="privacy-policy-link">
          contact@votresite.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
