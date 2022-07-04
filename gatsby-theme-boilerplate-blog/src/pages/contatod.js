import React from "react";
import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { getSrc } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const Contato = ({ location }) => {
  const { bgPatternImg, cardImage } = useSiteMetadatas();
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);

  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      opt={{
        titleSeo: `Contato - As Casamenteiras - Todo Amor Importa`,
        classes: "blog-list main-page-wrapper",
        schemaType: "blog",
        cardImage: getSrc(cardImage.childrenImageSharp[0]),
        serverUrl: location.origin,
      }}
    >
      <h2>Fale Conosco</h2>
      <p>Sem falar.</p>
    </MainPageWrapper>
  );
};

export default Contato;
