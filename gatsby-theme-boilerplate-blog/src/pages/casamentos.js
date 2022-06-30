import React from "react";
import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { getSrc } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const Documentacao = ({ location }) => {
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
      <h2>Glossário</h2>
      <p>Palavras-chave.</p>
      <h2>Pronto para começar</h2>
      <p>Palavras-chave.</p>
    </MainPageWrapper>
  );
};

export default Documentacao;
