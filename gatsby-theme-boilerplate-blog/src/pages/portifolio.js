import React from "react";
import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { getSrc } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
const Portifolio = ({ location }) => {
  const { bgPatternImg, cardImage } = useSiteMetadatas();
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      opt={{
        titleSeo: `Módulos - As Casamenteiras - Todo Amor Importa`,
        classes: "blog-list main-page-wrapper",
        schemaType: "blog",
        cardImage: getSrc(cardImage.childrenImageSharp[0]),
        serverUrl: location.origin,
      }}
    >
      <h2>O que são módulos?</h2>
      <p>Teste aqui de tipografia aleatório contendo texto em língua nativa.</p>
    </MainPageWrapper>
  );
};

export default Portifolio;
